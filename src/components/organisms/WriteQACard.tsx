import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import CardContainer from '../atoms/CardContainer'
import { StickerInfo } from '../molecules/PickableSticker'
import StickerPanel from '../molecules/StickerPanel'

interface Props {
  backColor: string
  isWithSticker: boolean
  stickers?: StickerInfo[]
}

const WriteQACard: FC<Props> = (props) => {
  const [pickedImgUrl, setPickedImgUrl] = useState<string>('')
  const [pickedImgWidth, setPickedImgWidth] = useState<number>(0)
  const [clickedSticker, setClickedSticker] = useState<boolean>(false)
  const [closeDeleteBtn, setCloseDeleteBtn] = useState<boolean>(false)
  const updatePickedImgUrl = useCallback((imgUrl: string) => {
    setPickedImgUrl(imgUrl)
  }, [])
  const updatePickedImgWidth = useCallback((width: number) => {
    setPickedImgWidth(width)
  }, [])
  const addToPanelByClicking = useCallback(() => {
    setClickedSticker(true)
    setTimeout(() => {
      setClickedSticker(false)
    }, 500)
  }, [])
  const closeDeleteBtnByTouching = useCallback(() => {
    setCloseDeleteBtn(true)
    setTimeout(() => {
      setCloseDeleteBtn(false)
    }, 500)
  }, [])
  return (
    <CardContainer backColor={props.backColor}>
      <ContentContainer>
        <textarea placeholder={`질문을 자유롭게\n작성해 주세요.`} />
        <StickerContainer isWithSticker={props.isWithSticker}>
          {pickedImgUrl && pickedImgWidth ? (
            <StickerPanel
              imgUrl={pickedImgUrl}
              width={pickedImgWidth}
              clickedSticker={clickedSticker}
              closeDeleteBtn={closeDeleteBtn}
            />
          ) : (
            <div style={{ padding: '10px' }}>stickers!</div>
          )}
        </StickerContainer>
      </ContentContainer>
    </CardContainer>
  )
}

export default WriteQACard

interface StickerProps {
  isWithSticker: boolean
}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  textarea {
    flex: 1;
    width: 100%;
    border: none;
    background: none;
    font-weight: 500;
    font-size: 20px;
    font-family: Apple SD Gothic Neo;
    line-height: 32px;
    color: #000000;
    resize: none;
    &:focus {
      outline: none;
    }
    ::-webkit-scrollbar {
      width: 2px;
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #adb5bd;
      opacity: 0.1;
    }
  }
`

const StickerContainer = styled.div<StickerProps>`
  display: ${(props) => (props.isWithSticker ? 'block' : 'none')};
  border: dashed 1px #000000;
  height: 60%;
  opacity: 0.5;
  img {
    width: 100%;
  }
`
