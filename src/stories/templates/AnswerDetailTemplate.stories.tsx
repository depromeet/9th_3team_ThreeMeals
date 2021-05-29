import * as React from 'react'
import { storiesOf } from '@storybook/react'
import AnswerDetailTemplate from '../../components/templates/AnswerDetailTemplate'
import styled from 'styled-components'

storiesOf('templates/AnswerDetail', module).add('AnswerDetailTemplate', () => {
  return (
    <AppContainer>
      <AnswerDetailTemplate />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
