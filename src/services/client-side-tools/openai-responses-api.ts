"use server";

import {
  AiAgentToolkit,
  ChatMessagesFormatter,
  openaiResponsesAdapter,
  toolsStarterKit,
} from "@tiptap-pro/extension-ai-agent-server";
import { ChatMessage } from "@tiptap-pro/extension-ai-agent";
import { replaceAllTool } from "@/src/services/client-side-tools/common/replace-all-tool";
import { systemPrompt } from "@/src/services/common/system-prompt";
import OpenAI from "openai";

export async function clientSideToolsOpenaiResponsesApiService(options: {
  chatMessages: ChatMessage[];
}) {
  // Create the AI Agent toolkit with OpenAI Responses adapter and custom tools
  const toolkit = new AiAgentToolkit({
    adapter: openaiResponsesAdapter,
    // Add a custom tool to the list of client-side tools
    tools: [...toolsStarterKit(), replaceAllTool()],
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
