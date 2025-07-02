"use server";

import {
  AiAgentToolkit,
  vercelAiSdkAdapter,
  ChatMessagesFormatter,
} from "@tiptap-pro/extension-ai-agent-server";
import { ChatMessage } from "@tiptap-pro/extension-ai-agent";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { systemPrompt } from "@/src/services/common/system-prompt";

export async function basicVercelAiSdkService(options: {
  chatMessages: ChatMessage[];
}) {
  // Create the AI Agent toolkit with Vercel AI SDK adapter
  const toolkit = new AiAgentToolkit({
    adapter: vercelAiSdkAdapter,
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
    // Provide the tools that the AI model can call
    tools: toolkit.format(),
  });

  // Convert the response to the format expected by the AI Agent extension
  formatter.addAiResponse(response);

  return formatter.getResolverResponse();
}
