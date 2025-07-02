function truncate(value) {
  return value.slice(0, 25) + (value.length > 20 ? '...' : '')
}

export function SelectionPreview({ editor }) {
  const selection = editor.state.selection
  if (selection.empty) {
    return null
  }
  const { from, to } = selection
  const selectedText = editor.state.doc.textBetween(from, to, ' ')

  return <div className="selection-preview label">{truncate(selectedText)}</div>
}
