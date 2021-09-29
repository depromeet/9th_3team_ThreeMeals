import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import PickableSticker from '../molecules/PickableSticker'
import { IMAGES } from '../../constants/images'
import { addToPanel } from '../../lib/localStore/stickerPanel'
import { GetEmoticonInfo } from '../../lib/queries/getQueries'

interface Props {
  stickers: GetEmoticonInfo[]
  addToPanelByClicking: () => void
  onClickOpenStickerList: () => void
}

const StickersList: FC<Props> = (props) => {
  const onDragStart = useCallback(
    (fileUrl: string, width: number, id?: string) => {
      addToPanel({ imgUrl: fileUrl, width: width, emoticonId: id })

      setTimeout(() => {
        props.onClickOpenStickerList()
      }, 100)
    },
    [props]
  )
  const onTouchStart = useCallback(
    (fileUrl: string, width: number, id?: string) => {
      addToPanel({ imgUrl: fileUrl, width: width, emoticonId: id })

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
              onDragStart={() => onDragStart(sticker.fileUrl, 140, sticker.id)}
              onClick={() => onTouchStart(sticker.fileUrl, 140, sticker.id)}
            >
              <PickableSticker
                key={i}
                fileUrl={sticker.fileUrl}
                width={140}
                position={sticker.position}
                emoticonId={sticker.id}
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
  min-height: 100%;
  background: #000000;
  max-width: 500px;
  top: 0;
  bottom: 0;
  overflow: auto;
  overflow-x: hidden;
  @media screen and (max-width: 375px) {
    top: 0;
    left: 0;
  }
`

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 123px);
  justify-content: flex-start;
  @media screen and (max-width: 360px) {
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
