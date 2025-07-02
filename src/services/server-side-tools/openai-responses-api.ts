"use server";

import { systemPrompt } from "@/src/services/common/system-prompt";
import { ChatMessage } from "@tiptap-pro/extension-ai-agent";
import {
  AiAgentToolkit,
  ChatMessagesFormatter,
  openaiResponsesAdapter
} from "@tiptap-pro/extension-ai-agent-server";
import OpenAI from "openai";
import { getWeather } from "./common/get-weather";
import { locationSchema } from "./common/schemas";
// Define the weather tool for OpenAI Responses API format
const weatherTool: OpenAI.Responses.Tool = {
  type: "function",
  name: "get_weather",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The location to get the weather for",
      },
    },
    required: ["location"],
  },
  strict: false,
};

const isGetWeatherMessage = (
  message: OpenAI.Responses.ResponseOutputItem
): message is OpenAI.Responses.ResponseFunctionToolCall =>
  message.type === "function_call" && message.name === "get_weather";

export async function serverSideToolsOpenaiResponsesApiService(options: {
  chatMessages: ChatMessage[];
}) {
  // Create the AI Agent toolkit with OpenAI Responses adapter
  const toolkit = new AiAgentToolkit({
    adapter: openaiResponsesAdapter,
  });

  // Create the chat messages formatter
  const formatter = new ChatMessagesFormatter({
    initialMessages: options.chatMessages,
    adapter: openaiResponsesAdapter,
  });

  // Initialize the OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let response: OpenAI.Responses.Response | null = null;

  while (!response || response.output?.some(isGetWeatherMessage)) {
    // Call the OpenAI Responses API
    response = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "developer",
          content: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
        },
        ...formatter.format(),
      ],
      // Include the weather tool in the tools array, beside the other tools provided by AiAgentToolkit
      tools: [...toolkit.format(), weatherTool],
    });
    // Convert the response to the format expected by the AI Agent extension
    formatter.addAiResponse(response);

    // Process weather tool calls
    for (const toolCall of response.output) {
      if (isGetWeatherMessage(toolCall)) {
        const args = locationSchema.parse(JSON.parse(toolCall.arguments));
        const weatherResult = await getWeather(args.location);

        // Add the tool call result to the formatter
        formatter.addChatMessage({
          type: "toolCallResult",
          toolName: "get_weather",
          toolCallId: toolCall.call_id,
          result: weatherResult,
          isError: false,
        });
      }
    }
  }

  return formatter.getResolverResponse();
}
