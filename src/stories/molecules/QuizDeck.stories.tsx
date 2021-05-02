import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuizDeck from '../../components/molecules/QuizDeck'

const dummyCardData = [
  '다시 제출하시겠습니까?',
  'you are singer?',
  'compose your self man',
  'are you freaking out?',
  'check out',
]

storiesOf('molecules/QuizDeck', module).add('with text', () => {
  return <QuizDeck data={dummyCardData} />
})
