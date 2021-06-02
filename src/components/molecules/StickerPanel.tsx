import React, { VFC, useRef, useState, useCallback, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import styled from 'styled-components'
import Konva from 'konva'
import DraggableSticker from './DraggableSticker'
import { StickerInfo } from './PickableSticker'
import { useReactiveVar } from '@apollo/client'
import addToPanelVar from '../../lib/localStore/stickerPanel'

interface OnDragFuncProps {
  e?: Konva.KonvaEventObject<DragEvent>
  i: number
  image: StickerInfo
}
const StickerPanel: VFC = () => {
  const stageRef: React.RefObject<Konva.Stage> | null = useRef(null)
  const addToPanelInfo = useReactiveVar(addToPanelVar)
  const [images, setImages] = useState<StickerInfo[]>([])
  const [showDeleteBtn, setShowDeleteBtn] = useState<number | string>('')
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (stageRef.current && addToPanelInfo.imgUrl && addToPanelInfo.width) {
        stageRef.current.setPointersPositions(e)
        const droppedImgInfo = {
          positions: stageRef.current.getPointerPosition(),
          imgUrl: addToPanelInfo.imgUrl,
          width: addToPanelInfo.width,
        }
        setImages([...images, droppedImgInfo])
      }
    },
    [addToPanelInfo.imgUrl, addToPanelInfo.width, images]
  )
  const addToPanelByClicking = useCallback(
    (width, imgUrl) => {
      const droppedImgInfo = {
        positions: { x: 279 / 2, y: 192 / 2 },
        imgUrl: imgUrl,
        width: width,
      }
      setImages([...images, droppedImgInfo])
    },
    [images]
  )
  useEffect(() => {
    if (addToPanelInfo.clickedSticker) {
      addToPanelByClicking(addToPanelInfo.width, addToPanelInfo.imgUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addToPanelInfo.clickedSticker,
    addToPanelInfo.imgUrl,
    addToPanelInfo.width,
  ])
  useEffect(() => {
    if (addToPanelInfo.closeDeleteBtn) {
      setShowDeleteBtn('')
    }
  }, [addToPanelInfo.closeDeleteBtn])
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
    (e: Konva.KonvaEventObject<TouchEvent>, i: number) => {
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
      <Stage width={279} height={192} ref={stageRef}>
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

export default React.memo(StickerPanel)

const PanelContainer = styled.div`
  width: 279px;
  height: 192px;
`
