import React, { FC } from 'react'
import { Image as KonvaImage, Group } from 'react-konva'
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
    <Group
      x={props.stickerImage.position?.positionX}
      y={props.stickerImage.position?.positionY}
      offsetX={stickerImage ? stickerImage.width / 2 : 0}
      offsetY={stickerImage ? stickerImage.height / 2 : 0}
    >
      <KonvaImage width={140} height={stickerHeight} image={stickerImage} />
    </Group>
  )
}

export default PostedSticker
