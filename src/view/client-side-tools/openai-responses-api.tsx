"use client";

import {
  AiAgentProvider,
  toolHandlersStarterKit,
} from "@tiptap-pro/extension-ai-agent";
import { clientSideToolsOpenaiResponsesApiService } from "@/src/services/client-side-tools/openai-responses-api";
import App from "@/src/view/client-side-tools/common";
import { replaceAllToolHandler } from "@/src/view/client-side-tools/common/replace-all-tool-handler.js";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await clientSideToolsOpenaiResponsesApiService({
      chatMessages,
    });
    return response;
  },
  toolHandlers: [...toolHandlersStarterKit(), replaceAllToolHandler()],
});

export default function ClientSideToolsOpenaiResponsesApiView() {
  return <App provider={provider} />;
}
