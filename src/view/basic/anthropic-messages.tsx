"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { basicAnthropicMessagesService } from "@/src/services/basic/anthropic-messages";
import App from "@/src/view/basic/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await basicAnthropicMessagesService({ chatMessages });
    return response;
  },
});

export default function BasicAnthropicMessagesView() {
  return <App provider={provider} />;
}
