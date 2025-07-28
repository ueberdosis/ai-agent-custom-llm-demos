"use client";

import {
  AiAgentProvider,
  toolHandlersStarterKit,
} from "@tiptap-pro/extension-ai-agent";
import { clientSideToolsOpenaiResponsesApiService } from "@/src/services/client-side-tools/openai-responses-api";
import App from "@/src/view/client-side-tools/common";
import { replaceAllToolHandler } from "@/src/view/client-side-tools/common/replace-all-tool-handler";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await clientSideToolsOpenaiResponsesApiService({
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

export default function ClientSideToolsOpenaiResponsesApiView() {
  return <App provider={provider} />;
}
