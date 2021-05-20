import React, { FC, useRef, useState, useCallback, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import styled from 'styled-components'
import Konva from 'konva'
import DraggableSticker from './DraggableSticker'
import { StickerInfo } from './PickableSticker'
import { KonvaEventObject } from 'konva/types/Node'
interface Props extends StickerInfo {
  pickedImgUrl?: string | React.MutableRefObject<undefined>
  addToPanelByClicking: () => {
    imgUrl: string
    width: number
  }
}

interface OnDragFuncProps {
  e?: KonvaEventObject<DragEvent>
  i: number
  image: StickerInfo
}
const StickerPanel: FC<Props> = (props) => {
  const stageRef: React.RefObject<Konva.Stage> | null = useRef(null)
  const [images, setImages] = useState<StickerInfo[]>([])
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
    (stickerInfo) => {
      const droppedImgInfo = {
        positions: { x: 200, y: 200 },
        imgUrl: stickerInfo.imgUrl,
        width: stickerInfo.width,
      }
      setImages([...images, droppedImgInfo])
    },
    [images]
  )
  //   useEffect(() => {
  //     const pickedStickerInfo = props.addToPanelByClicking()
  //     addToPanelByClicking(pickedStickerInfo)
  //   }, [addToPanelByClicking, props])
  const onDeleteImg = useCallback(
    (index) => {
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)
    },
    [images]
  )
  const onDragEndImg = useCallback((props: OnDragFuncProps) => {
    if (props.image.positions && props.e?.target) {
      props.image.positions.x = props.e.target.x()
      props.image.positions.y = props.e.target.y()
    }
  }, [])

  return (
    <PanelContainer onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
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
                stickerImage={image}
                onDelete={() => onDeleteImg(i)}
                onDragEnd={() => onDragEndImg({ i: i, image: image })}
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
