import React, { FC } from 'react'
import { ContextContainer, StyledQuizCardHeader } from '../molecules/QuizCard'
import { IMAGES } from '../../constants/images'
import CardContainer from '../atoms/CardContainer'
import { BackColor } from '../../types/types'

interface Props {
  backColor: BackColor
  answerType: boolean
  content: string
  isMyFeed: boolean
}
const getImage = (backColor: string, answerType: boolean) => {
  switch (backColor) {
    case answerType && '#6799FE':
      return IMAGES.img_o_yl
    case answerType && '#67D585':
      return IMAGES.img_o_yr
    case answerType && '#F1D75F':
      return IMAGES.img_o_gr
    case answerType && '#FF823D':
      return IMAGES.img_o_bl
    case !answerType && '#6799FE':
      return IMAGES.img_x_yl
    case !answerType && '#67D585':
      return IMAGES.img_x_yr
    case !answerType && '#F1D75F':
      return IMAGES.img_x_gr
    case !answerType && '#FF823D':
      return IMAGES.img_x_bl
    default:
      return IMAGES.img_o_bl
  }
}
const QuizAnswerCard: FC<Props> = (props) => {
  return (
    <CardContainer backColor={props.backColor}>
      <ContextContainer bottomHeight="none">
        <StyledQuizCardHeader
          // isLikeActive={props.cardHeader.isLikeActive}
          // className={props.cardHeader.className}
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
