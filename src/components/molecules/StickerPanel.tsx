import React, { FC, useRef, useState, useCallback, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import styled from 'styled-components'
import Konva from 'konva'
import DraggableSticker from './DraggableSticker'
import { useReactiveVar } from '@apollo/client'
import addToPanelVar from '../../lib/localStore/stickerPanel'
import { addToWritePostInfo } from '../../lib/localStore/writePost'
import { StickerInfo } from '../../types/types'
import PostedSticker from './PostedSticker'

interface Props {
  postedStickers?: StickerInfo[]
}

interface OnDragFuncProps {
  e?: Konva.KonvaEventObject<DragEvent>
  i: number
  image: StickerInfo
}
const StickerPanel: FC<Props> = (props) => {
  const stageRef: React.RefObject<Konva.Stage> | null = useRef(null)
  const addToPanelInfo = useReactiveVar(addToPanelVar)
  const [stickers, setStickers] = useState<StickerInfo[]>([])
  const [showDeleteBtn, setShowDeleteBtn] = useState<number | string>('')
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (
        stageRef.current &&
        addToPanelInfo.imgUrl &&
        addToPanelInfo.width &&
        addToPanelInfo.emoticonId
      ) {
        stageRef.current.setPointersPositions(e)
        const positions = stageRef.current.getPointerPosition()
        const droppedImgInfo = {
          position: { positionX: positions?.x, positionY: positions?.y },
          fileUrl: addToPanelInfo.imgUrl,
          width: addToPanelInfo.width,
          emoticonId: addToPanelInfo.emoticonId,
        }
        setStickers([...stickers, droppedImgInfo])
      }
    },
    [
      addToPanelInfo.emoticonId,
      addToPanelInfo.imgUrl,
      addToPanelInfo.width,
      stickers,
    ]
  )
  const addToPanelByClicking = useCallback(
    (width, imgUrl, id) => {
      const droppedImgInfo = {
        position: { positionX: 279 / 2, positionY: 192 / 2 },
        fileUrl: imgUrl,
        width: width,
        emoticonId: id,
      }
      setStickers([...stickers, droppedImgInfo])
    },
    [stickers]
  )
  const onDeleteImg = useCallback(
    (index) => {
      const newImages = [...stickers]
      newImages.splice(index, 1)
      setStickers(newImages)
    },
    [stickers]
  )
  const onDragEndImg = useCallback((dragProps: OnDragFuncProps) => {
    if (dragProps.image.position && dragProps.e?.target) {
      dragProps.image.position.positionX = dragProps.e.target.x()
      dragProps.image.position.positionY = dragProps.e.target.y()
    }
  }, [])
  const showDeleteBtnByTouching = useCallback(
    (e: Konva.KonvaEventObject<TouchEvent>, i: number) => {
      setShowDeleteBtn(i)
    },
    []
  )
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (props.postedStickers === undefined) {
      e.stopPropagation()
    }
  }
  useEffect(() => {
    if (addToPanelInfo.clickedSticker) {
      addToPanelByClicking(
        addToPanelInfo.width,
        addToPanelInfo.imgUrl,
        addToPanelInfo.emoticonId
      )
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
  useEffect(() => {
    addToWritePostInfo({ emoticons: stickers })
  }, [stickers, onDragEndImg])

  return (
    <PanelContainer
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onTouchStart={(e) => onTouchStart(e)}
    >
      <Stage width={279} height={192} ref={stageRef}>
        <Layer>
          {props.postedStickers
            ? props.postedStickers.map((sticker, i) => {
                return <PostedSticker stickerImage={sticker} key={i} />
              })
            : stickers.map((image, i) => {
                return (
                  <DraggableSticker
                    key={i}
                    idx={i}
                    stickerImage={image}
                    onDelete={() => onDeleteImg(i)}
                    onDragEnd={() => onDragEndImg({ i: i, image: image })}
                    showDeleteBtnByTouching={(e) =>
                      showDeleteBtnByTouching(e, i)
                    }
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
