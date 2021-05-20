import React, { FC, useState, useCallback } from 'react'
import useImage from 'use-image'
import { Image as KonvaImage, Group } from 'react-konva'
import { StickerInfo } from './PickableSticker'
import { KonvaEventObject } from 'konva/types/Node'
import { IMAGES } from '../../constants/images'
interface Props {
  stickerImage: StickerInfo
  onDelete: (evt: KonvaEventObject<TouchEvent | MouseEvent>) => void
  onDragEnd: (evt: KonvaEventObject<DragEvent>) => void
}
const DraggableSticker: FC<Props> = (props) => {
  const [stickerImage] = useImage(props.stickerImage.imgUrl)
  const [deleteImage] = useImage(IMAGES.icon_32_close)
  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const stickerHeight = stickerImage
    ? (props.stickerImage.width * stickerImage.height) / stickerImage.width
    : 0
  const onHovering = useCallback(() => {
    setShowDeleteBtn(true)
  }, [])
  const outHovering = useCallback(() => {
    setShowDeleteBtn(false)
  }, [])
  const onDragEndImg = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      setIsDragging(false)
      if (props.stickerImage.positions) {
        props.stickerImage.positions.x = e.target.x()
        props.stickerImage.positions.y = e.target.y()
      }
    },
    [props.stickerImage.positions]
  )
  const onDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])
  return (
    <Group
      draggable
      x={props.stickerImage.positions?.x}
      y={props.stickerImage.positions?.y}
      offsetX={stickerImage ? stickerImage.width / 2 : 0}
      offsetY={stickerImage ? stickerImage.height / 2 : 0}
      onDragStart={onDragStart}
      onDragEnd={onDragEndImg}
      onMouseOver={onHovering}
      onMouseLeave={outHovering}
    >
      <KonvaImage
        width={props.stickerImage.width}
        height={stickerHeight}
        image={stickerImage}
      />
      {showDeleteBtn && !isDragging && (
        <KonvaImage
          onTouchStart={props.onDelete}
          onClick={props.onDelete}
          image={deleteImage}
          width={25}
          height={25}
          offsetX={-props.stickerImage.width / 2 - 20}
        />
      )}
    </Group>
  )
}

export default DraggableSticker
