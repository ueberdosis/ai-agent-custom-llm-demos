import { useAiAgentProvider, useAiAgentProviderState } from '../state/ai-agent-context.jsx'

/**
 * Custom hook to find the last tool call message in the chat messages.
 *
 * @returns The last tool call message, or undefined if none is found.
 */
function useToolCall() {
  return useAiAgentProviderState(state => state.chatMessages.findLast(message => message.type === 'toolCall'))
}

/**
 * A component that displays when the AI agent proposes an action (tool call) and requires user confirmation.
 * It shows what the AI agent wants to do and provides buttons to accept or reject the action.
 */
export function ReviewingComponent() {
  const { provider } = useAiAgentProvider()
  const toolCall = useToolCall()

  if (!toolCall) {
    return (
      <div className="confirmation-chat-message">
        <div className="label">The AI Agent called an unknown tool.</div>
      </div>
    )
  }

  return (
    <div className="confirmation-chat-message">
      <div className="label">💡 Changes suggested</div>

      <div className="button-group">
        <button
          className="button primary"
          type="button"
          onClick={() => {
            provider.acceptToolCall()
            provider.run()
          }}
        >
          Accept all
        </button>
        <button className="button destructive" type="button" onClick={() => provider.rejectToolCall()}>
          Reject
        </button>
      </div>
    </div>
  )
}
