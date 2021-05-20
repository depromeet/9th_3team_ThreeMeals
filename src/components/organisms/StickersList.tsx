import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import PickableSticker, { StickerInfo } from '../molecules/PickableSticker'
interface Props {
  stickersData: StickerInfo[]
  updatePickedImgUrl: (imgUrl: string) => void
  updatePickedImgWidth: (imgWidth: number) => void
  addToPanelByClicking: () => void
}

const StickersList: FC<Props> = (props) => {
  const onDragStart = useCallback(
    (imgUrl: string, width: number) => {
      props.updatePickedImgWidth(width)
      props.updatePickedImgUrl(imgUrl)
    },
    [props]
  )
  const onTouchStart = useCallback(
    (imgUrl: string, width: number) => {
      props.updatePickedImgWidth(width)
      props.updatePickedImgUrl(imgUrl)
      props.addToPanelByClicking()
    },
    [props]
  )
  return (
    <GridContainer>
      {props.stickersData.map((sticker, i) => {
        return (
          <div
            key={i}
            onDragStart={() => onDragStart(sticker.imgUrl, sticker.width)}
            onTouchStart={() => onTouchStart(sticker.imgUrl, sticker.width)}
          >
            <PickableSticker
              key={i}
              imgUrl={sticker.imgUrl}
              width={sticker.width}
              positions={sticker.positions}
            />
          </div>
        )
      })}
    </GridContainer>
  )
}

export default StickersList

const GridContainer = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: grid;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(3, 100px);
`
