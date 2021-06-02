import * as React from 'react'
import { storiesOf } from '@storybook/react'
import StickersList from '../../components/organisms/StickersList'
import { IMAGES } from '../../constants/images'
import StickerPanel from '../../components/molecules/StickerPanel'
const dummyStickersData = [
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

storiesOf('organisms/stickersList', module).add('sample', () => {
  const [pickedImgUrl, setPickedImgUrl] = React.useState<string>('')
  const [pickedImgWidth, setPickedImgWidth] = React.useState<number>(0)
  const [clickedSticker, setClickedSticker] = React.useState<boolean>(false)
  const [closeDeleteBtn, setCloseDeleteBtn] = React.useState<boolean>(false)
  const updatePickedImgUrl = (imgUrl: string) => {
    setPickedImgUrl(imgUrl)
  }
  const updatePickedImgWidth = (width: number) => {
    setPickedImgWidth(width)
  }
  const addToPanelByClicking = () => {
    setClickedSticker(true)
    setTimeout(() => {
      setClickedSticker(false)
    }, 500)
  }
  const closeDeleteBtnByTouching = () => {
    setCloseDeleteBtn(true)
    setTimeout(() => {
      setCloseDeleteBtn(false)
    }, 500)
  }
  return (
    <div style={{ width: '500px' }} onTouchStart={closeDeleteBtnByTouching}>
      <StickersList
        updatePickedImgUrl={updatePickedImgUrl}
        updatePickedImgWidth={updatePickedImgWidth}
        addToPanelByClicking={addToPanelByClicking}
      />
      <StickerPanel
      // imgUrl={pickedImgUrl}
      // width={pickedImgWidth}
      // clickedSticker={clickedSticker}
      // closeDeleteBtn={closeDeleteBtn}
      />
    </div>
  )
})
