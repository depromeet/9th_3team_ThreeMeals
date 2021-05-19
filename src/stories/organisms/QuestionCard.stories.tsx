import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuestionCard, {
  CardColor,
} from '../../components/organisms/QuestionCard'

storiesOf('organisms/QuestionCard', module).add('with #FF833D', () => {
  return (
    <QuestionCard
      questionTitle="김덕배님 남자친구는 있으신지요 ????"
      backColor={CardColor.orange}
    />
  )
})

storiesOf('organisms/QuestionCard', module).add('with input #67D585', () => {
  return (
    <QuestionCard
      questionTitle="김덕배님 남자친구는 있으신지요 ????"
      backColor={CardColor.green}
      isInput
    />
  )
})
