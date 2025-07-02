"use server";

import {
  AiAgentToolkit,
  anthropicMessagesAdapter,
  ChatMessagesFormatter,
} from "@tiptap-pro/extension-ai-agent-server";
import { ChatMessage } from "@tiptap-pro/extension-ai-agent";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/src/services/common/system-prompt";

export async function basicAnthropicMessagesService(options: {
  chatMessages: ChatMessage[];
}) {
  // Create the AI Agent toolkit with Anthropic Messages adapter
  const toolkit = new AiAgentToolkit({
    adapter: anthropicMessagesAdapter,
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
