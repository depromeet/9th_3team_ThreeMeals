import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuestionCard from '../../components/organisms/QuestionCard'

<<<<<<< HEAD
storiesOf('molecules/QuestionCard', module).add('with text', () => {
=======
storiesOf('molecules/QuestionCard', module).add('with #67D585', () => {
>>>>>>> 31f858a64f79671976d5762c62e84017b52db342
  return (
    <div style={{ display: 'flex', width: 400, paddingLeft: 100 }}>
      <QuestionCard
        questionTitle="김덕배님 남자친구는 있으신지요 ????"
        backColor="#67D585"
      />
    </div>
  )
})
<<<<<<< HEAD
=======

storiesOf('molecules/QuestionCard', module).add('with #FF833D', () => {
  return (
    <div style={{ display: 'flex', width: 400, paddingLeft: 100 }}>
      <QuestionCard
        questionTitle="김덕배님 남자친구는 있으신지요 ????"
        backColor="#FF833D"
      />
    </div>
  )
})
>>>>>>> 31f858a64f79671976d5762c62e84017b52db342
