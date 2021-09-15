import React, { FC, useState, useCallback, useEffect } from 'react'
import useImage from 'use-image'
import { Image as KonvaImage, Group } from 'react-konva'
import { SVGS } from '../../constants/svgs'
import Konva from 'konva'
import { StickerInfo } from '../../types/types'
import { Vector2d } from 'konva/lib/types'

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
  const checkDragBound = useCallback((pos: Vector2d) => {
    let abledXPosition
    let abledYPosition
    if (pos.x <= 170) {
      abledXPosition = 170
    } else if (pos.x > 352) {
      abledXPosition = 352
    } else {
      abledXPosition = pos.x
    }
    if (pos.y <= 173) {
      abledYPosition = 173
    } else if (pos.y >= 250) {
      abledYPosition = 250
    } else {
      abledYPosition = pos.y
    }

    return {
      x: abledXPosition,
      y: abledYPosition,
    }
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
      dragBoundFunc={checkDragBound}
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
          offsetX={-140 / 2 - 30}
        />
      )}
    </Group>
  )
}

export default DraggableSticker
