import React, { FC, useCallback } from 'react'
import { ContextContainer, StyledQuizCardHeader } from '../molecules/QuizCard'
import { IMAGES } from '../../constants/images'
import CardContainer from '../atoms/CardContainer'
import { BackColor } from '../../types/types'
import { CSSProperties } from 'styled-components'

interface Props {
  backColor: BackColor
  answerType: string
  content: string
  cardContainerStyle?: CSSProperties
  isMyFeed: boolean
  isLikeActive?: boolean
  onClickLike?: () => void
  onClickOption?: () => void
}

const QuizAnswerCard: FC<Props> = (props) => {
  const getImage = useCallback((backColor: string, answerType: string) => {
    switch (backColor) {
      case answerType === 'O' && '#6799FE':
        return IMAGES.img_o_yl
      case answerType === 'O' && '#67D585':
        return IMAGES.img_o_yr
      case answerType === 'O' && '#F1D75F':
        return IMAGES.img_o_gr
      case answerType === 'O' && '#FF823D':
        return IMAGES.img_o_bl
      case answerType === 'O' && '#CC4349':
        return IMAGES.img_o_bl
      case answerType === 'X' && '#6799FE':
        return IMAGES.img_x_yl
      case answerType === 'X' && '#67D585':
        return IMAGES.img_x_yr
      case answerType === 'X' && '#F1D75F':
        return IMAGES.img_x_gr
      case answerType === 'X' && '#FF823D':
        return IMAGES.img_x_bl
      case answerType === 'X' && '#CC4349':
        return IMAGES.img_x_bl
      default:
        return IMAGES.img_o_bl
    }
  }, [])
  return (
    <CardContainer backColor={props.backColor} style={props.cardContainerStyle}>
      <ContextContainer bottomHeight="none">
        <StyledQuizCardHeader
          onClickLike={props.onClickLike}
          onClickOption={props.onClickOption}
          isLikeActive={props.isLikeActive}
          color={props.backColor}
          isMyFeed={props.isMyFeed}
        />
        <div className="textArea">{props.content}</div>
        <div className="bottomArea">
          <img
            src={getImage(props.backColor, props.answerType)}
            alt="answer_img"
            className="answerImg"
          />
        </div>
      </ContextContainer>
    </CardContainer>
  )
}

export default QuizAnswerCard
