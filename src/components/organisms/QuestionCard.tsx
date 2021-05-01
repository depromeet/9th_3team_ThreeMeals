import React from 'react'
import styled from 'styled-components'

import LabelCardHeader from '../molecules/LabelCardHeader'
import CardLabel from '../atoms/CardLabel'

interface Props {
  questionTitle: string
  backColor: string
}

const Container = styled.div<{ backColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ backColor }) => backColor};
  height: 360px;
  border-radius: 24px;
  padding: 96px 24px 24px;
  width: 100%;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.02em;
    color: #000000;
  }
`

const StyledLabelCardHeader = styled(LabelCardHeader)`
  position: absolute;
  width: 100%;
  right: 24px;
  top: 16px;
`

const QuestionCard: React.FunctionComponent<Props> = (props) => {
  return (
    <Container backColor={props.backColor}>
      <StyledLabelCardHeader
        labelComponent={<CardLabel text={'-13:33:33'} />}
      />
      <p>{props.questionTitle}</p>
    </Container>
  )
}

export default QuestionCard
