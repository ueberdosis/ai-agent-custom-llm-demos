"use server";

import {
  AiAgentToolkit,
  openaiResponsesAdapter,
  ChatMessagesFormatter,
} from "@tiptap-pro/extension-ai-agent-server";
import {
  ChatMessage,
  SchemaAwarenessData,
} from "@tiptap-pro/extension-ai-agent";
import OpenAI from "openai";
import { systemPrompt } from "@/src/services/common/system-prompt";

export async function basicOpenaiResponsesApiService(options: {
  chatMessages: ChatMessage[];
  schemaAwarenessData: SchemaAwarenessData;
}) {
  // Create the AI Agent toolkit with OpenAI Responses adapter
  const toolkit = new AiAgentToolkit({
    adapter: openaiResponsesAdapter,
    schemaAwarenessData: options.schemaAwarenessData,
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

  // Call the OpenAI Responses API
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "developer",
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
