import { useState } from 'react'

import { businessUseCases } from '../constants/business-use-cases.js'
import { useAiAgentProvider } from '../state/ai-agent-context.jsx'
import { useUserMessageProvider } from '../state/user-message-context.jsx'

/**
 * A menu component that displays a list of predefined business use cases.
 * Clicking on a use case updates the editor content and the user message input.
 */
export function BusinessUseCasesMenu() {
  const [currentUseCase, setCurrentUseCase] = useState(businessUseCases[0].name)
  const { setMessage } = useUserMessageProvider()
  const { editor, provider } = useAiAgentProvider()

  /**
   * Handles the change event for the business use case select.
   * Resets the AI agent provider, sets the editor content, and updates the user message.
   *
   * @param event - The select change event.
   */
  const handleUseCaseChange = event => {
    const selectedUseCaseName = event.target.value
    const useCase = businessUseCases.find(uc => uc.name === selectedUseCaseName)

    provider.reset()
    editor.chain().setContent(useCase.editorContent).stopTrackingAiChanges().run()
    setMessage(useCase.prompt)
    setCurrentUseCase(useCase.name)
  }

  return (
    <div className="business-use-cases-menu">
      <div className="label-large">Predefined use cases</div>
      <select className="use-case-select" value={currentUseCase} onChange={handleUseCaseChange}>
        {businessUseCases.map(useCase => (
          <option key={useCase.name} value={useCase.name}>
            {useCase.name}
          </option>
        ))}
      </select>
    </div>
  )
}
