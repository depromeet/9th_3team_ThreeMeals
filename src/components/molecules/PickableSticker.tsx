import React, { FC } from 'react'
import { Vector2d } from 'konva/types/types'

export interface StickerInfo {
  imgUrl: string
  width: number
  positions?: Vector2d | null
}

const PickableSticker: FC<StickerInfo> = (props) => {
  return (
    <img
      alt="stickerImg"
      src={props.imgUrl}
      width={props.width}
      draggable={true}
    />
  )
}

export default PickableSticker
