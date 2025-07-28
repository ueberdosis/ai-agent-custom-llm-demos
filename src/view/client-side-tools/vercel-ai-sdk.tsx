"use client";

import {
  AiAgentProvider,
  toolHandlersStarterKit,
} from "@tiptap-pro/extension-ai-agent";
import { clientSideToolsVercelAiSdkService } from "@/src/services/client-side-tools/vercel-ai-sdk";
import App from "@/src/view/client-side-tools/common";
import { replaceAllToolHandler } from "@/src/view/client-side-tools/common/replace-all-tool-handler";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await clientSideToolsVercelAiSdkService({
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

export default function ClientSideToolsVercelAiSdkView() {
  return <App provider={provider} />;
}
