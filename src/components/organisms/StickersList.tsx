import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import PickableSticker, { StickerInfo } from '../molecules/PickableSticker'
import { IMAGES } from '../../constants/images'
interface Props {
  updatePickedImgUrl: (imgUrl: string) => void
  updatePickedImgWidth: (imgWidth: number) => void
  addToPanelByClicking: () => void
  onClickOpenStickerList: () => void
}
const dummyStickersData: StickerInfo[] = [
  {
    imgUrl: IMAGES.sticker_food_apple,
    width: 125,
  },
  {
    imgUrl: IMAGES.sticker_food_bread,
    width: 125,
  },
  {
    imgUrl: IMAGES.sticker_food_watermelon,
    width: 125,
  },
  {
    imgUrl: IMAGES.sticker_food_apple,
    width: 125,
  },
  {
    imgUrl: IMAGES.sticker_food_bread,
    width: 125,
  },
  {
    imgUrl: IMAGES.sticker_food_watermelon,
    width: 125,
  },
]
const StickersList: FC<Props> = (props) => {
  const onDragStart = useCallback(
    (imgUrl: string, width: number) => {
      props.updatePickedImgWidth(width)
      props.updatePickedImgUrl(imgUrl)
      setTimeout(() => {
        props.onClickOpenStickerList()
      }, 100)
    },
    [props]
  )
  const onTouchStart = useCallback(
    (imgUrl: string, width: number) => {
      props.updatePickedImgWidth(width)
      props.updatePickedImgUrl(imgUrl)
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
        {dummyStickersData.map((sticker, i) => {
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
    </ListContainer>
  )
}

export default React.memo(StickersList)

const ListContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000000;
  max-width: 500px;
  @media screen and (max-width: 375px) {
    top: 0;
    left: 0;
  }
`

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
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
