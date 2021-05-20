import React, { FC } from 'react'

interface Props extends StickerInfo {
  addStickerToPanel: (prop: StickerInfo) => void
}
export interface StickerInfo {
  imgUrl: string
  width: number
  positionX: number
  positionY: number
}

const PickableSticker: FC<Props> = (props) => {
  return (
    <button
      type="button"
      onClick={() => {
        props.addStickerToPanel({
          imgUrl: props.imgUrl,
          width: props.width,
          positionX: props.positionX,
          positionY: props.positionY,
        })
      }}
    >
      <img alt="stickerImg" src={props.imgUrl} width={props.width} />
    </button>
  )
}

export default PickableSticker
