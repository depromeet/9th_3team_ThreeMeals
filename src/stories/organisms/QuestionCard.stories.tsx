import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuestionCard from '../../components/organisms/QuestionCard'

storiesOf('organisms/QuestionCard', module).add('with #67D585', () => {
  return (
    <div style={{ display: 'flex', width: 400, paddingLeft: 100 }}>
      <QuestionCard
        questionTitle="김덕배님 남자친구는 있으신지요 ????"
        backColor="#67D585"
      />
    </div>
  )
})

storiesOf('organisms/QuestionCard', module).add('with #FF833D', () => {
  return (
    <div style={{ display: 'flex', width: 400, paddingLeft: 100 }}>
      <QuestionCard
        questionTitle="김덕배님 남자친구는 있으신지요 ????"
        backColor="#FF833D"
      />
    </div>
  )
})
