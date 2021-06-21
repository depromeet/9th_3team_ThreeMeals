import React, { FC } from 'react'
import styled from 'styled-components'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import QuizDeck from '../organisms/QuizDeck'
import { BackColor } from '../../types/types'
interface Props {
  cardData: Array<{ id: string; content: string }>
  backColors: Array<BackColor>
  onClickHeaderLeft: () => void
}

const AnswerNewOXTemplate: FC<Props> = (props) => {
  console.log('cardData', props.cardData)
  return (
    <TempContainer>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        onClickLeft={props.onClickHeaderLeft}
      />
      <BodyContainer>
        <QuizDeck cardData={props.cardData} backColors={props.backColors} />
      </BodyContainer>
    </TempContainer>
  )
}

export default AnswerNewOXTemplate

const TempContainer = styled.div`
  width: 100%;
`

const BodyContainer = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
