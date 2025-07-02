"use server";

import {
  AiAgentToolkit,
  openaiChatCompletionsAdapter,
  ChatMessagesFormatter,
} from "@tiptap-pro/extension-ai-agent-server";
import { ChatMessage } from "@tiptap-pro/extension-ai-agent";
import OpenAI from "openai";
import { systemPrompt } from "@/src/services/common/system-prompt";

export async function basicOpenaiChatCompletionsApiService(options: {
  chatMessages: ChatMessage[];
}) {
  // Create the AI Agent toolkit with OpenAI Chat Completions adapter
  const toolkit = new AiAgentToolkit({
    adapter: openaiChatCompletionsAdapter,
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
