/**
 * Returns an array of initial chat messages for the AI agent interface.
 * These messages are displayed when a new chat session starts.
 *
 * @returns An array of initial chat messages.
 */
export function getInitialChatMessages() {
  return [
    {
      type: 'ai',
      text: "Hello, I'm an AI assistant that can edit your document. How can I help you?",
    },
  ]
}
