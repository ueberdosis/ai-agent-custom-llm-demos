"use server";

import {
  AiAgentToolkit,
  vercelAiSdkAdapter,
  ChatMessagesFormatter,
  toolsStarterKit,
} from "@tiptap-pro/extension-ai-agent-server";
import { ChatMessage } from "@tiptap-pro/extension-ai-agent";
import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { systemPrompt } from "@/src/services/common/system-prompt";
import { getWeather } from "./common/get-weather";

// Define the weather tool in Vercel AI SDK format
const weatherTool = tool({
  description: "Get the weather in a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async (args) => {
    const result = await getWeather(args.location);
    return result;
  },
});

export async function serverSideToolsVercelAiSdkService(options: {
  chatMessages: ChatMessage[];
}) {
  // Create the AI Agent toolkit with Vercel AI SDK adapter
  const toolkit = new AiAgentToolkit({
    adapter: vercelAiSdkAdapter,
    tools: toolsStarterKit(),
  });

  // Create the chat messages formatter
  const formatter = new ChatMessagesFormatter({
    initialMessages: options.chatMessages,
    adapter: vercelAiSdkAdapter,
  });

  // Call the Vercel AI SDK
  const response = await generateText({
    model: openai("gpt-4.1"),
    messages: [
      {
        role: "system",
        content: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
      },
      ...formatter.format(),
    ],
    // Include the weather tool in the tools object, beside the other tools
    // provided by AiAgentToolkit
    tools: {
      ...toolkit.format(),
      get_weather: weatherTool,
    },
    // Enable multi-step tool calls
    maxSteps: 5,
  });

  // Convert the response to the format expected by the AI Agent extension
  formatter.addAiResponse(response);

  return formatter.getResolverResponse();
}
