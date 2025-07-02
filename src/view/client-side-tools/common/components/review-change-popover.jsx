import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react'
import { createPortal } from 'react-dom'

import { useAiAgentProvider } from '../state/ai-agent-context.jsx'

/**
 * Shows a popover on the selected change. Lets the user accept or reject the
 * change made by the AI Agent.
 *
 * @param props - The component props.
 * @param props.element - The HTML element to which the popover should be attached.
 */
export function ReviewChangePopover({ element }) {
  const { editor, provider } = useAiAgentProvider()
  const selectedChange = editor.extensionStorage.aiChanges.getSelectedChange()
  const changes = editor.extensionStorage.aiChanges.getChanges()
  const isOpen = Boolean(element && selectedChange)

  const { refs, floatingStyles } = useFloating({
    open: Boolean(element),
    middleware: [offset(8), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  return (
    <>
      {element && createPortal(<span ref={refs.setReference}></span>, element)}
      {isOpen && (
        <div className="suggestion-tooltip-parent" ref={refs.setFloating} style={floatingStyles}>
          <div className="suggestion-tooltip">
            <div className="button-group">
              <button
                type="button"
                onClick={() => {
                  if (changes.length === 1) {
                    provider.acceptToolCall()
                    provider.run()
                  } else {
                    editor.chain().acceptAiChange(selectedChange.id).focus().run()
                  }
                }}
              >
                Apply
              </button>
              <button
                type="button"
                className="destructive"
                onClick={() => {
                  editor.chain().rejectAiChange(selectedChange.id).focus().run()
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
