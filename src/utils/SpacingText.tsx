export const SpacingText = (content: string) => {
  const SplitedText = content.split('/n').map((line) => {
    return <p>{line}</p>
  })
  return SplitedText
}
