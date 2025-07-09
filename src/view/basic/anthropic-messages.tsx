"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { basicAnthropicMessagesService } from "@/src/services/basic/anthropic-messages";
import App from "@/src/view/basic/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await basicAnthropicMessagesService({ chatMessages, schemaAwarenessData });
    return response;
  },
});

export default function BasicAnthropicMessagesView() {
  return <App provider={provider} />;
}
