"use server";

import {
  AiAgentToolkit,
  vercelAiSdkAdapter,
  ChatMessagesFormatter,
  toolsStarterKit,
} from "@tiptap-pro/extension-ai-agent-server";
import {
  ChatMessage,
  SchemaAwarenessData,
} from "@tiptap-pro/extension-ai-agent";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { systemPrompt } from "@/src/services/common/system-prompt";
import { replaceAllTool } from "@/src/services/client-side-tools/common/replace-all-tool";

export async function clientSideToolsVercelAiSdkService(options: {
  chatMessages: ChatMessage[];
  schemaAwarenessData: SchemaAwarenessData;
}) {
  // Create the AI Agent toolkit with Vercel AI SDK adapter and custom tools
  const toolkit = new AiAgentToolkit({
    adapter: vercelAiSdkAdapter,
    schemaAwarenessData: options.schemaAwarenessData,
    // Add a custom tool to the list of client-side tools
    tools: [...toolsStarterKit(), replaceAllTool()],
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
