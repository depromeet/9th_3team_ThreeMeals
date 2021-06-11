import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Slick from 'react-slick'
import LabelCardHeader from '../molecules/LabelCardHeader'
import CardLabel from '../atoms/CardLabel'
import { SVGS } from '../../constants/svgs'
import { IMAGES } from '../../constants/images'
import { StickerInfo } from '../../types/types'
import dynamic from 'next/dynamic'
import {
  hourDiffCalc,
  timeDiffCalc,
  dateDiffToTimer,
} from '../../utils/TimeDiffCalc'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
const StickerPanelWithNoSSR = dynamic(
  () => import('../molecules/StickerPanel'),
  { ssr: false }
)

type TimeStatus = 'timer' | 'show' | 'bong-in'
interface Props {
  id?: string
  questionTitle: string
  backColor: string
  isInput?: boolean
  stickers?: StickerInfo[]
  secretType?: string
  createdAt: string
  updatedAt: string
  comments?: {
    id: string
    content: string
    secretType: string
    commentState: string
    createdAt: string
    updatedAt: string
  }[]
  onClickSend?: (text: string, postId: string, secretType: string) => void
  onClickLike?: () => void
  onClickOption?: () => void
}

const QuestionCard: React.FunctionComponent<Props> = (props) => {
  const [currentValue, setCurrentValue] = useState('')
  const [timerValue, setTimerValue] = useState<string>()
  const onClickSend = useCallback(() => {
    props.onClickSend &&
      props.id &&
      props.secretType &&
      props.onClickSend(currentValue, props.id, props.secretType)
  }, [currentValue, props])

  const timeStatus = useMemo((): TimeStatus => {
    const hourDiff = hourDiffCalc(new Date(), new Date(props.createdAt))

    if (props.secretType === 'Forever') {
      return 'bong-in'
    } else {
      if (hourDiff < 24) {
        return 'timer'
      } else if (hourDiff < 49) {
        return 'show'
      } else {
        return 'bong-in'
      }
    }
  }, [props.createdAt, props.secretType])

  useEffect(() => {
    const interval = setInterval(() => {
      const postDate = new Date(props.createdAt)
      postDate.setHours(postDate.getHours() + 24)
      setTimerValue(dateDiffToTimer(new Date(postDate), new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [props.createdAt])
  return (
    <Slick
      dots={false}
      arrows={undefined}
      infinite={false}
      variableWidth={false}
      css={{ textAlign: 'center' }}
    >
      <Container backColor={props.backColor}>
        <StyledLabelCardHeader
          labelComponent={
            timeStatus === 'bong-in' ? (
              <PrivateCardLabel text="BONG IN" active={false} />
            ) : timeStatus === 'show' ? (
              <div>보이기</div>
            ) : (
              <CardLabel text={timerValue || '00:00:00'} active />
            )
          }
          onClickLike={props.onClickLike}
          onClickOption={props.onClickOption}
        />
        <p>{props.questionTitle}</p>
        <StickerContainer>
          <StickerPanelWithNoSSR postedStickers={props.stickers} />
        </StickerContainer>
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
      <SecondContainer backColor={props.backColor} style={{ opacity: 0.05 }}>
        {props.isInput ? (
          <>
            <TextArea
              value={currentValue}
              onChange={(e) => {
                setCurrentValue(e.target.value)
              }}
            />
            {currentValue === '' ? (
              <SaveButton
                src={IMAGES.button_floating_save_disabled}
                width={80}
              />
            ) : (
              props.onClickSend && (
                <SaveButton
                  onClick={onClickSend}
                  src={IMAGES.button_floating_save_active}
                  width={80}
                />
              )
            )}
          </>
        ) : (
          <>
            {props.comments && props.comments?.length > 0 ? (
              <>
                <SecondTimeText>
                  {timeDiffCalc(
                    new Date(props.comments[0].createdAt),
                    new Date()
                  )}
                </SecondTimeText>
                <p>{props.comments[0].content}</p>
              </>
            ) : null}
          </>
        )}
      </SecondContainer>
    </Slick>
  )
}

export default QuestionCard

const Container = styled.div<{ backColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ backColor }) => backColor};
  height: 392px;
  border-radius: 24px;
  padding: 24px;

  p {
    text-align: initial;
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
  width: 90% !important;
  max-width: 396px;
  *:focus {
    outline: 0;
  }
`

const SecondContainer = styled.div<{ backColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ backColor }) => backColor + '0D'};
  height: 392px;
  border-radius: 24px;
  padding: 24px;
  border: ${({ backColor }) => backColor};
  border-style: solid;
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.02em;
    color: white;
  }

  margin-bottom: 16px;
  margin-left: 5%;
  margin-right: 5%;
  width: 90% !important;
  max-width: 396px;
  text-align: center;
  *:focus {
    outline: 0;
  }
`

const StyledLabelCardHeader = styled(LabelCardHeader)`
  width: 100%;
  top: 16px;
  left: -14px;
  margin-bottom: 20px;
`

const StickerContainer = styled.div`
  width: 100%;
  height: 192px;
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

const SecondTimeText = styled.div`
  margin-bottom: 40px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height, or 200% */

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: rgba(255, 255, 255, 0.8);
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background: border-box;
  border-radius: 24px;
  font-family: Apple SD Gothic Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  /* or 133% */
  letter-spacing: -0.02em;
  color: #ffffff;
  &:focus {
    outline: none;
  }
`
const SaveButton = styled.img`
  position: absolute;
  right: 0;
  bottom: 0px;
`
