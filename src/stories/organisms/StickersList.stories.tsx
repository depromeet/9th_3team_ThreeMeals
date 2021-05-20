import * as React from 'react'
import { storiesOf } from '@storybook/react'
import StickersList from '../../components/organisms/StickersList'
import { IMAGES } from '../../constants/images'
const dummyStickersData = [
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
    positionX: 20,
    positionY: 30,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
    positionX: 20,
    positionY: 30,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
    positionX: 20,
    positionY: 30,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
    positionX: 20,
    positionY: 30,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
    positionX: 20,
    positionY: 30,
  },
  {
    imgUrl: IMAGES.sample_sticker,
    width: 100,
    positionX: 20,
    positionY: 30,
  },
]

storiesOf('organisms/stickersList', module).add('sample', () => {
  const addStickerToPanel = () => {
    return
  }
  return (
    <div style={{ width: '500px' }}>
      <StickersList
        stickersData={dummyStickersData}
        addStickerToPanel={addStickerToPanel}
      />
    </div>
  )
})
