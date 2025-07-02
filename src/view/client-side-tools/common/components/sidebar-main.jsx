import { useEffect, useRef } from 'react'

import { useAiAgentProvider, useAiAgentProviderState } from '../state/ai-agent-context.jsx'
import { ChatMessageComponent } from './chat-message-component.jsx'
import { ErrorState, LoadingState } from './loading-state.jsx'
import { ReviewingComponent } from './reviewing-component.jsx'

/**
 * The main content area of the AI agent sidebar.
 * Displays chat messages, loading states, error states, and the reviewing component.
 */
export function SidebarMain() {
  const chatMessages = useAiAgentProviderState(state => state.chatMessages)
  const status = useAiAgentProviderState(state => state.status)
  const { provider } = useAiAgentProvider()
  const scrollRef = useRef(null)

  /**
   * Scrolls the chat messages to the bottom when new messages are added or the status changes.
   */
  useEffect(() => {
    if (scrollRef.current && chatMessages.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages, status])

  return (
    <div className="sidebar-scroll" ref={scrollRef}>
      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <ChatMessageComponent key={index} message={message} />
        ))}
        {status === 'reviewingToolCall' && <ReviewingComponent />}
        {status === 'loading' && <LoadingState />}
        {status === 'loadingError' && <ErrorState onReload={() => provider.run()} />}
      </div>
    </div>
  )
}
