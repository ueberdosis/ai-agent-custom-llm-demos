"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { serverSideToolsAnthropicMessagesService } from "@/src/services/server-side-tools/anthropic-messages";
import App from "@/src/view/server-side-tools/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await serverSideToolsAnthropicMessagesService({
      chatMessages,
      schemaAwarenessData,
    });
    return response;
  },
});

export default function ServerSideToolsAnthropicMessagesView() {
  return <App provider={provider} />;
}
