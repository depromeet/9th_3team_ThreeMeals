import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import WritePostTemplate from '../../components/templates/WritePostTemplate'

storiesOf('templates/WritePost', module).add('QuestionOtherFeed', () => {
  return (
    <AppContainer>
      <WritePostTemplate TempType="Q" isWithSticker={true} />
    </AppContainer>
  )
})

storiesOf('templates/WritePost', module).add('AnswerMyFeed', () => {
  return (
    <AppContainer>
      <WritePostTemplate TempType="A" isWithSticker={true} />
    </AppContainer>
  )
})

storiesOf('templates/WritePost', module).add('OXOtherFeed', () => {
  return (
    <AppContainer>
      <WritePostTemplate TempType="OX" isWithSticker={false} />
    </AppContainer>
  )
})
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
