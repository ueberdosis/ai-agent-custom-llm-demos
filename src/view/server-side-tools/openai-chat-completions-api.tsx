"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { serverSideToolsOpenaiChatCompletionsApiService } from "@/src/services/server-side-tools/openai-chat-completions-api";
import App from "@/src/view/server-side-tools/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages }) => {
    const response = await serverSideToolsOpenaiChatCompletionsApiService({
      chatMessages,
    });
    return response;
  },
});

export default function ServerSideToolsOpenaiChatCompletionsApiView() {
  return <App provider={provider} />;
}
