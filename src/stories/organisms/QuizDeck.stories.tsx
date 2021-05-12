import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuizDeck from '../../components/organisms/QuizDeck'

const dummyCardData = [
  '다시 제출하시겠습니까?',
  'you are singer?',
  'compose your self man',
  'are you freaking out?',
  'check out',
]

const dummyCardHeaderData = {
  isLikeActive: false,
  className: 'cardHeader',
  color: 'orange' as const,
}

storiesOf('organisms/QuizDeck', module).add('with text', () => {
  return <QuizDeck data={dummyCardData} cardHeader={dummyCardHeaderData} />
})
