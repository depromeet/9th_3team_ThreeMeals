import * as React from 'react'
import { storiesOf } from '@storybook/react'
import AnswerCard from '../../components/organisms/AnswerCard'

storiesOf('organisms/AnswerCard', module).add('with #FF833D', () => {
  return (
    <AnswerCard
      questionTitle="김덕배님 남자친구는 있으신지요 ????"
      backColor={'#FF833D'}
    />
  )
})

storiesOf('organisms/AnswerCard', module).add('with input #67D585', () => {
  return (
    <AnswerCard
      questionTitle="김덕배님 남자친구는 있으신지요 ????"
      backColor={'#67D585'}
    />
  )
})
