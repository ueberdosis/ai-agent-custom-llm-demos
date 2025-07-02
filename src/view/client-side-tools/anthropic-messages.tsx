"use client";

import {
  AiAgentProvider,
  toolHandlersStarterKit,
} from "@tiptap-pro/extension-ai-agent";
import { clientSideToolsAnthropicMessagesService } from "@/src/services/client-side-tools/anthropic-messages";
import App from "@/src/view/client-side-tools/common";
import { replaceAllToolHandler } from "@/src/view/client-side-tools/common/replace-all-tool-handler.js";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await clientSideToolsAnthropicMessagesService({
      chatMessages,
    });
    return response;
  },
  toolHandlers: [...toolHandlersStarterKit(), replaceAllToolHandler()],
});

export default function ClientSideToolsAnthropicMessagesView() {
  return <App provider={provider} />;
}
