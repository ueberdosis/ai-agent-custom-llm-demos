"use server";

import {
  AiAgentToolkit,
  openaiChatCompletionsAdapter,
  ChatMessagesFormatter,
  toolsStarterKit,
} from "@tiptap-pro/extension-ai-agent-server";
import {
  ChatMessage,
  SchemaAwarenessData,
} from "@tiptap-pro/extension-ai-agent";
import OpenAI from "openai";
import { systemPrompt } from "@/src/services/common/system-prompt";
import { replaceAllTool } from "./common/replace-all-tool";
export async function clientSideToolsOpenaiChatCompletionsApiService(options: {
  chatMessages: ChatMessage[];
  schemaAwarenessData: SchemaAwarenessData;
}) {
  // Create the AI Agent toolkit with OpenAI Chat Completions adapter and custom tools
  const toolkit = new AiAgentToolkit({
    adapter: openaiChatCompletionsAdapter,
    schemaAwarenessData: options.schemaAwarenessData,
    // Add a custom tool to the list of client-side tools
    tools: [...toolsStarterKit(), replaceAllTool()],
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

  // Call the OpenAI Chat Completions API
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
      },
      ...formatter.format(),
    ],
    // Provide the tools that the AI model can call
    tools: toolkit.format(),
  });

  // Convert the response to the format expected by the AI Agent extension
  formatter.addAiResponse(response);

  return formatter.getResolverResponse();
}
