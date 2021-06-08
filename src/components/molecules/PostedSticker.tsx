import React, { FC } from 'react'
import { Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import { StickerInfo } from '../../types/types'
interface Props {
  stickerImage: StickerInfo
}

const PostedSticker: FC<Props> = (props) => {
  const [stickerImage] = useImage(props.stickerImage.fileUrl)
  const stickerHeight = stickerImage
    ? (140 * stickerImage.height) / stickerImage.width
    : 0
  return (
    <KonvaImage
      width={props.stickerImage.width}
      height={stickerHeight}
      image={stickerImage}
      x={50}
      y={50}
    />
  )
}

export default PostedSticker
