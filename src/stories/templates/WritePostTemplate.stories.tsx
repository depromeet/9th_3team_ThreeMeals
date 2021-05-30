import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import WritePostTemplate from '../../components/templates/WritePostTemplate'

storiesOf('templates/WritePost', module).add('QuestionOtherFeed', () => {
  return (
    <AppContainer>
      <WritePostTemplate
        TempType="Q"
        optionActiveState={{ Temp: false, Forever: false }}
        backColor={'#6799FE'}
      />
    </AppContainer>
  )
})

storiesOf('templates/WritePost', module).add('AnswerMyFeed', () => {
  return (
    <AppContainer>
      <WritePostTemplate
        TempType="A"
        optionActiveState={{ Temp: false, Forever: false }}
        backColor={'#6799FE'}
      />
    </AppContainer>
  )
})

storiesOf('templates/WritePost', module).add('OXOtherFeed', () => {
  return (
    <AppContainer>
      <WritePostTemplate
        TempType="OX"
        optionActiveState={{ Temp: false, Forever: false }}
        backColor={'#6799FE'}
      />
    </AppContainer>
  )
})
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
