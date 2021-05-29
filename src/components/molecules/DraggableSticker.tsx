import React, { FC, useState, useCallback, useEffect } from 'react'
import useImage from 'use-image'
import { Image as KonvaImage, Group } from 'react-konva'
import { StickerInfo } from './PickableSticker'
import { KonvaEventObject } from 'konva/types/Node'
import { SVGS } from '../../constants/svgs'
interface Props {
  stickerImage: StickerInfo
  onDelete: (evt: KonvaEventObject<TouchEvent | MouseEvent>) => void
  onDragEnd: (evt: KonvaEventObject<DragEvent>) => void
  showDeleteBtnByTouching: (i: KonvaEventObject<TouchEvent>) => void
  showDeleteBtnIdx: number | string
  idx: number
}
const DraggableSticker: FC<Props> = (props) => {
  const [stickerImage] = useImage(props.stickerImage.imgUrl)
  const [deleteImage] = useImage(SVGS.icon_delete_sticker)
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
  const showDeleteBtnByTouching = useCallback((boolean) => {
    setShowDeleteBtn(boolean)
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
  useEffect(() => {
    if (props.showDeleteBtnIdx === props.idx) {
      showDeleteBtnByTouching(true)
    } else {
      showDeleteBtnByTouching(false)
    }
  }, [props.idx, props.showDeleteBtnIdx, showDeleteBtnByTouching])
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
      onTouchStart={props.showDeleteBtnByTouching}
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
