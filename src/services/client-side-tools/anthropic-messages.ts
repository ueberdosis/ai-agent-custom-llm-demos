"use server";

import {
  AiAgentToolkit,
  anthropicMessagesAdapter,
  ChatMessagesFormatter,
  toolsStarterKit,
} from "@tiptap-pro/extension-ai-agent-server";
import {
  ChatMessage,
  SchemaAwarenessData,
} from "@tiptap-pro/extension-ai-agent";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/src/services/common/system-prompt";
import { replaceAllTool } from "./common/replace-all-tool";

export async function clientSideToolsAnthropicMessagesService(options: {
  chatMessages: ChatMessage[];
  schemaAwarenessData: SchemaAwarenessData;
}) {
  // Create the AI Agent toolkit with Anthropic Messages adapter and custom tools
  const toolkit = new AiAgentToolkit({
    adapter: anthropicMessagesAdapter,
    schemaAwarenessData: options.schemaAwarenessData,
    // Add a custom tool to the list of client-side tools
    tools: [...toolsStarterKit(), replaceAllTool()],
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

  // Call the Anthropic Claude Messages API
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-0",
    max_tokens: 2048,
    system: `${systemPrompt}\n${toolkit.getSystemPrompt()}`,
    messages: formatter.format(),
    // Provide the tools that the AI model can call
    tools: toolkit.format(),
  });

  // Convert the response to the format expected by the AI Agent extension
  formatter.addAiResponse(response);

  return formatter.getResolverResponse();
}
