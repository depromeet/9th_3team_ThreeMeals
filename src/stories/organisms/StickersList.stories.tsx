import * as React from 'react'
import { storiesOf } from '@storybook/react'
import StickersList from '../../components/organisms/StickersList'
import { IMAGES } from '../../constants/images'
import StickerPanel from '../../components/molecules/StickerPanel'
const dummyStickersData = [
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
  },
]

storiesOf('organisms/stickersList', module).add('sample', () => {
  const [pickedImgUrl, setPickedImgUrl] = React.useState<string>('')
  const [pickedImgWidth, setPickedImgWidth] = React.useState<number>(0)
  const updatePickedImgUrl = (imgUrl: string) => {
    setPickedImgUrl(imgUrl)
  }
  const updatePickedImgWidth = (width: number) => {
    setPickedImgWidth(width)
  }
  const addToPanelByClicking = () => {
    return { imgUrl: pickedImgUrl, width: pickedImgWidth }
  }
  return (
    <div style={{ width: '500px' }}>
      <StickersList
        stickersData={dummyStickersData}
        updatePickedImgUrl={updatePickedImgUrl}
        updatePickedImgWidth={updatePickedImgWidth}
        addToPanelByClicking={addToPanelByClicking}
      />
      <StickerPanel
        imgUrl={pickedImgUrl}
        width={pickedImgWidth}
        pickedImgUrl={pickedImgUrl}
        addToPanelByClicking={addToPanelByClicking}
      />
    </div>
  )
})
