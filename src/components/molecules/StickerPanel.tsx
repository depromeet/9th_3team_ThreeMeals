import React, { FC, useRef, useState, useCallback, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import styled from 'styled-components'
import Konva from 'konva'
import DraggableSticker from './DraggableSticker'
import { StickerInfo } from './PickableSticker'
import { KonvaEventObject } from 'konva/types/Node'
interface Props extends StickerInfo {
  addToPanelByClicking?: (
    imgUrl: string,
    width: number
  ) => { imgUrl: string; width: number }
  clickedSticker: boolean
  closeDeleteBtn: boolean
}

interface OnDragFuncProps {
  e?: KonvaEventObject<DragEvent>
  i: number
  image: StickerInfo
}
const StickerPanel: FC<Props> = (props) => {
  const stageRef: React.RefObject<Konva.Stage> | null = useRef(null)
  const [images, setImages] = useState<StickerInfo[]>([])
  const [showDeleteBtn, setShowDeleteBtn] = useState<number | string>('')
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (stageRef.current) {
        stageRef.current.setPointersPositions(e)
        const droppedImgInfo = {
          positions: stageRef.current.getPointerPosition(),
          imgUrl: props.imgUrl,
          width: props.width,
        }
        setImages([...images, droppedImgInfo])
      }
    },
    [images, props.imgUrl, props.width]
  )
  const addToPanelByClicking = useCallback(
    (width, imgUrl) => {
      const droppedImgInfo = {
        positions: { x: 200, y: 200 },
        imgUrl: imgUrl,
        width: width,
      }
      setImages([...images, droppedImgInfo])
    },
    [images]
  )
  useEffect(() => {
    if (props.clickedSticker) {
      addToPanelByClicking(props.width, props.imgUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.clickedSticker, props.imgUrl, props.width])
  useEffect(() => {
    if (props.closeDeleteBtn) {
      setShowDeleteBtn('')
    }
  }, [props.closeDeleteBtn])
  const onDeleteImg = useCallback(
    (index) => {
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)
    },
    [images]
  )
  const onDragEndImg = useCallback((dragProps: OnDragFuncProps) => {
    if (dragProps.image.positions && dragProps.e?.target) {
      dragProps.image.positions.x = dragProps.e.target.x()
      dragProps.image.positions.y = dragProps.e.target.y()
    }
  }, [])
  const showDeleteBtnByTouching = useCallback(
    (e: KonvaEventObject<TouchEvent>, i: number) => {
      setShowDeleteBtn(i)
    },
    []
  )
  return (
    <PanelContainer
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        e.stopPropagation()
      }}
    >
      <Stage
        width={500}
        height={500}
        style={{ border: '1px solid grey' }}
        ref={stageRef}
      >
        <Layer>
          {images.map((image, i) => {
            return (
              <DraggableSticker
                key={i}
                idx={i}
                stickerImage={image}
                onDelete={() => onDeleteImg(i)}
                onDragEnd={() => onDragEndImg({ i: i, image: image })}
                showDeleteBtnByTouching={(e) => showDeleteBtnByTouching(e, i)}
                showDeleteBtnIdx={showDeleteBtn}
              />
            )
          })}
        </Layer>
      </Stage>
    </PanelContainer>
  )
}

export default StickerPanel

const PanelContainer = styled.div`
  width: 500px;
  border: 1px solid black;
  height: 500px;
`
