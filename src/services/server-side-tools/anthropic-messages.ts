"use server";

import { systemPrompt } from "@/src/services/common/system-prompt";
import Anthropic from "@anthropic-ai/sdk";
import {
  ChatMessage,
  SchemaAwarenessData,
} from "@tiptap-pro/extension-ai-agent";
import {
  AiAgentToolkit,
  anthropicMessagesAdapter,
  ChatMessagesFormatter,
} from "@tiptap-pro/extension-ai-agent-server";
import { getWeather } from "./common/get-weather";
import { locationSchema } from "./common/schemas";

// Define the weather tool for Anthropic Claude Messages API format
const weatherTool = {
  name: "get_weather",
  description: "Returns the weather in a given location",
  input_schema: {
    type: "object" as const,
    properties: {
      location: {
        type: "string" as const,
        description: "The location to get the weather for",
      },
    },
    required: ["location"],
  },
};

const isGetWeatherToolUse = (
  content: Anthropic.Messages.ContentBlock
): content is Anthropic.Messages.ToolUseBlock =>
  content.type === "tool_use" && content.name === "get_weather";

export async function serverSideToolsAnthropicMessagesService(options: {
  chatMessages: ChatMessage[];
  schemaAwarenessData: SchemaAwarenessData;
}) {
  // Create the AI Agent toolkit with Anthropic Messages adapter
  const toolkit = new AiAgentToolkit({
    adapter: anthropicMessagesAdapter,
    schemaAwarenessData: options.schemaAwarenessData,
  });

  // Create the chat messages formatter
  const formatter = new ChatMessagesFormatter({
    initialMessages: options.chatMessages,
    adapter: anthropicMessagesAdapter,
  });

  // Initialize the Anthropic client
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  let response: Anthropic.Messages.Message | null = null;

  // Handle server-side tool calls (weather tool)
  while (!response || response.content.some(isGetWeatherToolUse)) {
    // Call the Anthropic Claude Messages API
    response = await anthropic.messages.create({
      model: "claude-sonnet-4-0",
      max_tokens: 2048,
      system: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
      messages: formatter.format(),
      // Include the weather tool in the tools array, beside the other tools in AiAgentToolkit
      tools: [...toolkit.format(), weatherTool],
    });

    // Convert the response to the format expected by the AI Agent extension
    formatter.addAiResponse(response);

    // Process weather tool calls
    for (const content of response.content) {
      if (isGetWeatherToolUse(content)) {
        const { location } = locationSchema.parse(content.input);
        const weatherResult = await getWeather(location);

        // Add the tool call result to the formatter
        formatter.addChatMessage({
          type: "toolCallResult",
          toolName: "get_weather",
          toolCallId: content.id,
          result: weatherResult,
          isError: false,
        });
      }
    }
  }

  return formatter.getResolverResponse();
}
