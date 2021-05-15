import { ReactElement } from 'react'

export const SpacingText = (content: string): ReactElement[] => {
  const SplitedText = content.split('\\n').map((line, index) => {
    return <p key={index}>{line}</p>
  })
  return SplitedText
}
