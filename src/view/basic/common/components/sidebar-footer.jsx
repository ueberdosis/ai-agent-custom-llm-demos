import React from 'react'

import { useAiAgentProvider, useAiAgentProviderState } from '../state/ai-agent-context.jsx'
import { useUserMessageProvider } from '../state/user-message-context.jsx'
import { SelectionPreview } from './selection-preview.jsx'

/**
 * The footer component for the AI agent sidebar.
 * Contains the chat message input area and controls for sending messages and auto-accepting changes.
 */
export function SidebarFooter() {
  const { message, setMessage } = useUserMessageProvider()
  /**
   * Validates the chat message form.
   *
   * @returns True if the message is not empty, false otherwise.
   */
  function validateForm() {
    return message.length > 0
  }

  const autoAccept = useAiAgentProviderState(state => state.autoAccept)
  const { provider, editor } = useAiAgentProvider()

  /**
   * Submits the chat message form.
   * Sends the user message to the AI agent provider and clears the input.
   */
  function submitForm() {
    if (validateForm()) {
      setMessage('')
      provider.addUserMessage(message, {
        addSelection: true,
      })
      provider.run()
    }
  }

  /**
   * Handles the key down event on the textarea.
   * Submits the form when the Enter key is pressed without the Shift key.
   *
   * @param event - The keyboard event.
   */
  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitForm()
    }
  }

  /**
   * Handles the change event on the textarea.
   * Updates the user message state with the textarea value.
   *
   * @param e - The change event.
   */
  const handleChange = e => {
    setMessage(e.target.value)
  }

  return (
    <form className="sidebar-footer">
      <div className="label-large">Chat message</div>
      <SelectionPreview editor={editor} />
      <textarea
        name="chat-message"
        placeholder="Send a message"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="textarea"
      />
      <div className="button-group">
        <button
          type="button"
          onClick={() => {
            submitForm()
          }}
          className="primary"
        >
          Send
        </button>
        <button
          type="button"
          onClick={() => {
            if (provider.state.autoAccept === 'always') {
              provider.setAutoAccept('onlyRead')
            } else {
              provider.setAutoAccept('always')
              if (provider.state.status === 'reviewingToolCall') {
                provider.acceptToolCall()
                provider.run()
              }
            }
          }}
          className={autoAccept === 'always' ? 'is-active' : ''}
        >
          Auto-accept changes
        </button>
      </div>
    </form>
  )
}
