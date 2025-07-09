"use client";

import { AiAgentProvider } from "@tiptap-pro/extension-ai-agent";
import { basicOpenaiChatCompletionsApiService } from "@/src/services/basic/openai-chat-completions-api";
import App from "@/src/view/basic/common";

const provider = new AiAgentProvider({
  resolver: async ({ chatMessages, schemaAwarenessData }) => {
    const response = await basicOpenaiChatCompletionsApiService({
      chatMessages,
      schemaAwarenessData,
    });
    return response;
  },
});

export default function BasicOpenaiChatCompletionsApiView() {
  return <App provider={provider} />;
}
