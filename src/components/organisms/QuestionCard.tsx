import React from 'react'
import styled from 'styled-components'

import LabelCardHeader from '../molecules/LabelCardHeader'
import CardLabel from '../atoms/CardLabel'
import { SVGS } from '../../constants/svgs'

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
  top: 16px;
  left: -14px;
`

const BottomContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 24px;
  left: -5px;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: white;
  img {
    margin-right: 7px;
  }
`

const QuestionCard: React.FunctionComponent<Props> = (props) => {
  return (
    <Container backColor={props.backColor}>
      <StyledLabelCardHeader
        labelComponent={<CardLabel text={'-13:33:33'} />}
      />
      <p>{props.questionTitle}</p>
      <BottomContainer>
        <img
          src={SVGS.icon_left_arrow_wh}
          alt="arrow-left"
          width={45}
          height={37}
        />
        밀어서 답장보기
      </BottomContainer>
    </Container>
  )
}

export default QuestionCard
