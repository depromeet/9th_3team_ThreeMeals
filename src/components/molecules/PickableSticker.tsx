import React, { FC } from 'react'
import Konva from 'konva'

export interface StickerInfo {
  imgUrl: string
  width: number
  positions?: Konva.Vector2d | null
}

const PickableSticker: FC<StickerInfo> = (props) => {
  return (
    <img alt="stickerImg" src={props.imgUrl} width={140} draggable={true} />
  )
}

export default PickableSticker
