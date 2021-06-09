import React, { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'
import Slick from 'react-slick'
import LabelCardHeader from '../molecules/LabelCardHeader'
import CardLabel from '../atoms/CardLabel'
import { SVGS } from '../../constants/svgs'
import { IMAGES } from '../../constants/images'
import { StickerInfo } from '../../types/types'
import dynamic from 'next/dynamic'
const StickerPanelWithNoSSR = dynamic(
  () => import('../molecules/StickerPanel'),
  { ssr: false }
)
interface Props {
  id?: string
  questionTitle: string
  backColor: string
  labelComponent?: ReactNode
  isInput?: boolean
  stickers?: StickerInfo[]
  onClickSend?: (text: string) => void
  onClickLike?: () => void
  onClickOption?: () => void
}

const Container = styled.div<{ backColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ backColor }) => backColor};
  height: 360px;
  border-radius: 24px;
  padding: 96px 24px 24px;

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
  width: initial !important;
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
  height: 360px;
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
  position: absolute;
  width: 100%;
  top: 16px;
  left: -14px;
`

const StickerContainer = styled.div`
  margin-top: 16px;
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
const QuestionCard: React.FunctionComponent<Props> = (props) => {
  const [currentValue, setCurrentValue] = useState('')

  const onClickSend = useCallback(() => {
    props.onClickSend && props.onClickSend(currentValue)
  }, [currentValue, props])
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
            props.labelComponent || (
              <CardLabel text={'-13:33:33'} active={true} />
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
            <SecondTimeText>{'10분전'}</SecondTimeText>
            <p>{props.questionTitle}</p>
          </>
        )}
      </SecondContainer>
    </Slick>
  )
}

export default QuestionCard
