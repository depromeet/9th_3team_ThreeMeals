import React, { FC, useState, useCallback, useEffect } from 'react'
import useImage from 'use-image'
import { Image as KonvaImage, Group } from 'react-konva'
import { SVGS } from '../../constants/svgs'
import Konva from 'konva'
import { StickerInfo } from '../../types/types'
interface Props {
  stickerImage: StickerInfo
  onDelete: (evt: Konva.KonvaEventObject<TouchEvent | MouseEvent>) => void
  onDragEnd: (evt: Konva.KonvaEventObject<DragEvent>) => void
  showDeleteBtnByTouching: (i: Konva.KonvaEventObject<TouchEvent>) => void
  showDeleteBtnIdx: number | string
  idx: number
}
const DraggableSticker: FC<Props> = (props) => {
  const [stickerImage] = useImage(props.stickerImage.fileUrl)
  const [deleteImage] = useImage(SVGS.icon_delete_sticker)
  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const stickerHeight = stickerImage
    ? (140 * stickerImage.height) / stickerImage.width
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
    (e) => {
      setIsDragging(false)
      if (props.stickerImage.position) {
        props.stickerImage.position.positionX = e.target.x()
        props.stickerImage.position.positionY = e.target.y()
      }
    },
    [props.stickerImage.position]
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
      x={props.stickerImage.position?.positionX}
      y={props.stickerImage.position?.positionY}
      offsetX={stickerImage ? stickerImage.width / 2 : 0}
      offsetY={stickerImage ? stickerImage.height / 2 : 0}
      onDragStart={onDragStart}
      onDragEnd={onDragEndImg}
      onMouseOver={onHovering}
      onMouseLeave={outHovering}
      onTouchStart={props.showDeleteBtnByTouching}
    >
      <KonvaImage width={140} height={stickerHeight} image={stickerImage} />
      {showDeleteBtn && !isDragging && (
        <KonvaImage
          onTouchStart={props.onDelete}
          onClick={props.onDelete}
          image={deleteImage}
          width={25}
          height={25}
          offsetX={-140 / 2 - 20}
        />
      )}
    </Group>
  )
}

export default DraggableSticker
