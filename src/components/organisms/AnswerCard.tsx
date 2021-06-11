import React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import dayjs from 'dayjs'
import { StickerInfo } from '../../types/types'
import dynamic from 'next/dynamic'
const StickerPanelWithNoSSR = dynamic(
  () => import('../molecules/StickerPanel'),
  { ssr: false }
)
interface Props {
  /** isContent is for only contents without otherContents */
  isContent?: boolean
  id?: string
  questionTitle: string
  backColor: string
  time?: string
  count?: number
  stickers?: StickerInfo[]
  onClickShare?: () => void
  onClickOption?: () => void
  onClickPost?: () => void
}

const AnswerCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Container backColor={props.backColor}>
        <Header>
          <TimeContainer>
            {dayjs(props.time).format('HH:mm:ss') || '-13:33:33'}
          </TimeContainer>
          <div>
            {props.isContent && props.id && (
              <CopyToClipboard text={props.id}>
                <Image
                  src={IMAGES.icon_32_share}
                  onClick={props.onClickShare}
                />
              </CopyToClipboard>
            )}
            {props.onClickOption && (
              <Image
                src={IMAGES.icon_32_option}
                onClick={props.onClickOption}
              />
            )}
          </div>
        </Header>
        <p>{props.questionTitle}</p>
        <StickerContainer>
          <StickerPanelWithNoSSR postedStickers={props.stickers} />
        </StickerContainer>
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
  margin-top: 16px;
  width: 100%;
  height: 192px;
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
