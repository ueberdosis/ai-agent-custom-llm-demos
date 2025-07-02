/**
 * Renders a loading state component with a spinner icon and a message.
 * This component is displayed while waiting for an AI response.
 */
export function LoadingState() {
  return (
    <div className="loading-state">
      <svg
        className="spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p className="label-small">Loading AI response...</p>
    </div>
  )
}

/**
 * Renders an error state component with an icon and a message, when the AI response fails to load.
 * It includes a clickable message that triggers a reload action when clicked.
 *
 * @param props - The component props.
 * @param props.onReload - Callback function to be called when the reload action is triggered.
 */
export function ErrorState({ onReload }) {
  return (
    <div className="error-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="alert-triangle"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
      <p className="label-small" onClick={onReload}>
        Error loading AI response. Click to reload
      </p>
    </div>
  )
}
