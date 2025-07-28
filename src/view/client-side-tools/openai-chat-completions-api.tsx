"use client";

import {
  AiAgentProvider,
  toolHandlersStarterKit,
} from "@tiptap-pro/extension-ai-agent";
import { clientSideToolsOpenaiChatCompletionsApiService } from "@/src/services/client-side-tools/openai-chat-completions-api";
import App from "@/src/view/client-side-tools/common";
import { replaceAllToolHandler } from "@/src/view/client-side-tools/common/replace-all-tool-handler";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await clientSideToolsOpenaiChatCompletionsApiService({
      chatMessages,
      schemaAwarenessData,
    });
    return response;
  },
  toolHandlers: [...toolHandlersStarterKit(), replaceAllToolHandler()],
  reviewOptions: {
    extension: "aiChanges",
  },
});

export default function ClientSideToolsOpenaiChatCompletionsApiView() {
  return <App provider={provider} />;
}
