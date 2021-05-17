import * as React from 'react'
import { storiesOf } from '@storybook/react'
import QuizAnswerCard from '../../components/organisms/QuizAnswerCard'

const dummyMyFeedHeaderData = {
  isLikeActive: false,
  className: 'cardHeader',
  color: 'orange' as const,
  isMyFeed: true,
}
const dummyOthersFeedHeaderData = {
  isLikeActive: false,
  className: 'cardHeader',
  color: 'blue' as const,
  isMyFeed: false,
}

storiesOf('organisms/QuizAnswerCard', module).add('myFeed', () => {
  return (
    <QuizAnswerCard
      cardHeader={dummyMyFeedHeaderData}
      backColor="#FF823D"
      answerType={true}
    >
      김덕배님 남자친구는 있으신지요 ????
    </QuizAnswerCard>
  )
})

storiesOf('organisms/QuizAnswerCard', module).add('othersFeed', () => {
  return (
    <QuizAnswerCard
      cardHeader={dummyOthersFeedHeaderData}
      backColor="#6799FE"
      answerType={false}
    >
      김덕배님 남자친구는 있으신지요 ????
    </QuizAnswerCard>
  )
})
