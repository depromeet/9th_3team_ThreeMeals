import React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { CardColor } from './QuestionCard'

interface Props {
  questionTitle: string
  backColor: CardColor
  time?: string
  count?: number
  onClickShare?: () => void
  onClickOption?: () => void
  onClickPost?: () => void
}

const backgroundColor = {
  [CardColor.orange]: '#FF823D',
  [CardColor.green]: '#67D585',
  [CardColor.blue]: '#6799FE',
  [CardColor.yellow]: '#F1D75F',
  [CardColor.red]: '#CC4349',
}

const AnswerCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Container backColor={backgroundColor[props.backColor]}>
        <Header>
          <TimeContainer>{props.time || '-13:33:33'}</TimeContainer>
          <div>
            <Image src={IMAGES.icon_32_share} onClick={props.onClickShare} />
            <Image src={IMAGES.icon_32_option} onClick={props.onClickOption} />
          </div>
        </Header>
        <p>{props.questionTitle}</p>
        <StickerContainer>스티커</StickerContainer>
        <BottomContainer onClick={props.onClickPost}>
          <CommentImage
            src={IMAGES.icon_24_comment}
            onClick={props.onClickOption}
          />
          <CommentCount>{`${props.count || 0}` + '개'}</CommentCount>
        </BottomContainer>
      </Container>
    </div>
  )
}

export default AnswerCard
const Container = styled.div<{ backColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ backColor }) => backColor};
  width: initial !important;
  max-width: 396px;
  height: 392px;
  border-radius: 24px;
  padding: 24px;
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  margin-bottom: 16px;
  margin-left: 5%;
  margin-right: 5%;
  *:focus {
    outline: 0;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`
const TimeContainer = styled.div`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height, or 200% */

  letter-spacing: -0.02em;

  color: rgba(0, 0, 0, 0.8);
`

const Image = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`

const StickerContainer = styled.div`
  width: 100%;
  height: 192px;
  border: 1px solid red;
`
const BottomContainer = styled.div`
  position: absolute;
  bottom: 25px;
`

const CommentImage = styled.img`
  width: 24px;
  height: 24px;
  float: left;
  cursor: pointer;
`

const CommentCount = styled.div`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  letter-spacing: -0.02em;

  color: rgba(0, 0, 0, 0.8);
  float: left;
  position: relative;
  top: 4px;
  left: 6px;
  cursor: pointer;
`
