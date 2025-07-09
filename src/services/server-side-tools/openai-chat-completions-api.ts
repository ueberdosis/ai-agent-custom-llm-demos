"use server";

import { systemPrompt } from "@/src/services/common/system-prompt";
import {
  ChatMessage,
  SchemaAwarenessData,
} from "@tiptap-pro/extension-ai-agent";
import {
  AiAgentToolkit,
  ChatMessagesFormatter,
  openaiChatCompletionsAdapter,
} from "@tiptap-pro/extension-ai-agent-server";
import OpenAI from "openai";
import { getWeather } from "./common/get-weather";
import { locationSchema } from "./common/schemas";
// Define the weather tool for OpenAI Chat Completions API format
const weatherTool = {
  type: "function" as const,
  function: {
    name: "get_weather",
    description: "Returns the weather in a given location",
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
  },
};

const isGetWeatherToolCall = (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
) => toolCall.function.name === "get_weather";

export async function serverSideToolsOpenaiChatCompletionsApiService(options: {
  chatMessages: ChatMessage[];
  schemaAwarenessData: SchemaAwarenessData;
}) {
  // Create the AI Agent toolkit with OpenAI Chat Completions adapter
  const toolkit = new AiAgentToolkit({
    adapter: openaiChatCompletionsAdapter,
    schemaAwarenessData: options.schemaAwarenessData,
  });

  // Create the chat messages formatter
  const formatter = new ChatMessagesFormatter({
    initialMessages: options.chatMessages,
    adapter: openaiChatCompletionsAdapter,
  });

  // Initialize the OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let response: OpenAI.Chat.Completions.ChatCompletion | null = null;

  // Handle server-side tool calls (weather tool)
  while (
    !response ||
    response.choices[0].message.tool_calls?.some(isGetWeatherToolCall)
  ) {
    // Call the OpenAI Chat Completions API
    response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
        },
        ...formatter.format(),
      ],
      // Include the weather tool in the tools array, beside the other tools in AiAgentToolkit
      tools: [...toolkit.format(), weatherTool],
    });

    // Convert the response to the format expected by the AI Agent extension
    formatter.addAiResponse(response);

    // Process weather tool calls
    for (const toolCall of response.choices[0].message.tool_calls || []) {
      if (isGetWeatherToolCall(toolCall)) {
        const args = locationSchema.parse(
          JSON.parse(toolCall.function.arguments)
        );
        const weatherResult = await getWeather(args.location);

        // Add the tool call result to the formatter
        formatter.addChatMessage({
          type: "toolCallResult",
          toolName: "get_weather",
          toolCallId: toolCall.id,
          result: weatherResult,
          isError: false,
        });
      }
    }
  }

  return formatter.getResolverResponse();
}
