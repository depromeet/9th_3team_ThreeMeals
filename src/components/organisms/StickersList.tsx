import React, { FC } from 'react'
import styled from 'styled-components'
import PickableSticker, { StickerInfo } from '../molecules/PickableSticker'
interface Props {
  stickersData: StickerInfo[]
  addStickerToPanel: (prop: StickerInfo) => void
}

const StickersList: FC<Props> = (props) => {
  return (
    <GridContainer>
      {props.stickersData.map((sticker, i) => {
        return (
          <PickableSticker
            key={i}
            addStickerToPanel={props.addStickerToPanel}
            imgUrl={sticker.imgUrl}
            width={sticker.width}
            positionX={sticker.positionX}
            positionY={sticker.positionY}
          />
        )
      })}
    </GridContainer>
  )
}

export default StickersList

const GridContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(4, 100px);
  grid-template-columns: repeat(3, 100px);
`
