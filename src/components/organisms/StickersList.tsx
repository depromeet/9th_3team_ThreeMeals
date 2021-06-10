import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import PickableSticker from '../molecules/PickableSticker'
import { IMAGES } from '../../constants/images'
import { StickerInfo } from '../../types/types'

interface Props {
  stickers: StickerInfo[]
  updatePickedfileUrl: (fileUrl: string) => void
  updatePickedImgWidth: (imgWidth: number) => void
  addToPanelByClicking: () => void
  onClickOpenStickerList: () => void
}

const StickersList: FC<Props> = (props) => {
  const onDragStart = useCallback(
    (fileUrl: string, width: number) => {
      props.updatePickedImgWidth(width)
      props.updatePickedfileUrl(fileUrl)
      setTimeout(() => {
        props.onClickOpenStickerList()
      }, 100)
    },
    [props]
  )
  const onTouchStart = useCallback(
    (fileUrl: string, width: number) => {
      props.updatePickedImgWidth(width)
      props.updatePickedfileUrl(fileUrl)
      props.addToPanelByClicking()
      props.onClickOpenStickerList()
    },
    [props]
  )
  return (
    <ListContainer>
      <Header>
        <img
          src={IMAGES.icon_24_close_wh}
          alt="closeIcon"
          onClick={props.onClickOpenStickerList}
        />
        <span>Stickers</span>
      </Header>
      <GridContainer>
        {props.stickers.map((sticker, i) => {
          return (
            <div
              key={i}
              onDragStart={() => onDragStart(sticker.fileUrl, 140)}
              onClick={() => onTouchStart(sticker.fileUrl, 140)}
            >
              <PickableSticker
                key={i}
                fileUrl={sticker.fileUrl}
                width={sticker.width}
                position={sticker.position}
              />
            </div>
          )
        })}
      </GridContainer>
    </ListContainer>
  )
}

export default React.memo(StickersList)

const ListContainer = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  max-width: 500px;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  @media screen and (max-width: 375px) {
    top: 0;
    left: 0;
  }
  ::-webkit-scrollbar {
    width: 1px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #adb5bd;
    opacity: 0.1;
  }
`

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 123px);
  justify-content: flex-start;
  @media screen and (max-width: 320px) {
    justify-content: center;
  }
`
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  img {
    height: 24px;
    position: absolute;
    left: 0;
    padding-left: 20px;
  }
  span {
    color: white;
    font-family: SF Pro Display;
    font-weight: bold;
    font-size: 20px;
  }
  @media screen and (max-width: 450px) {
    padding: 0;
  }
`
