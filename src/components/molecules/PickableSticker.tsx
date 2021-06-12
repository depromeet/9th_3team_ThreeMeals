import React, { FC } from 'react'
import { StickerInfo } from '../../types/types'

const PickableSticker: FC<StickerInfo> = (props) => {
  return (
    <img alt="stickerImg" src={props.fileUrl} width={140} draggable={true} />
  )
}

export default PickableSticker
