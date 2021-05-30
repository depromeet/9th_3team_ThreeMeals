import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuizDeck from '../../components/organisms/QuizDeck'
import { BackColor } from '../../types/types'

const dummyCardData = [
  '다시 제출하시겠습니까?',
  'you are singer?',
  'compose your self man',
  'are you freaking out?',
  'check out',
]

const colors: BackColor[] = [
  '#6799FE',
  '#6799FE',
  '#6799FE',
  '#6799FE',
  '#6799FE',
]

const dummyCardHeaderData = {
  isLikeActive: false,
  className: 'cardHeader',
  color: '#6799FE' as const,
  isMyFeed: true,
}

storiesOf('organisms/QuizDeck', module).add('with text', () => {
  return (
    <QuizDeck
      data={dummyCardData}
      cardHeader={dummyCardHeaderData}
      backColors={colors}
    />
  )
})
