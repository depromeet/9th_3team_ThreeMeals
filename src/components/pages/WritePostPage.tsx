import React, { VFC, useState, useCallback, useEffect } from 'react'
import WritePostTemplate from '../templates/WritePostTemplate'
import { useRouter } from 'next/router'
import { BackColor } from '../../types/types'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import writePostInfoVar, {
  addToWritePostInfo,
} from '../../lib/localStore/writePost'
import addToPanelVar, { addToPanel } from '../../lib/localStore/stickerPanel'
const WritePostPage: VFC = () => {
  const router = useRouter()
  const { id: postType } = router.query
  const writePostInfo = useReactiveVar(writePostInfoVar)
  const addToPanelInfo = useReactiveVar(addToPanelVar)
  const [backColor, setBackColor] = useState<BackColor>('#67D585')
  const [optionActiveState, setOptionActiveState] = useState({
    Temp: true,
    Forever: false,
  })
  const [openStickerList, setOpenStickerList] = useState(false)
  const [openSaveModal, setOpenSaveModal] = useState(false)
  const onClickTermType = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { value } = e.currentTarget
      if (value === 'Temp') {
        setOptionActiveState({
          Temp: true,
          Forever: false,
        })
        addToWritePostInfo({ secretType: 'Temp' })
      } else {
        setOptionActiveState({
          Temp: false,
          Forever: true,
        })
        addToWritePostInfo({ secretType: 'Forever' })
      }
    },
    []
  )
  const onClickBackColor = useCallback(
    (e) => {
      const { id } = e.currentTarget
      setBackColor(id)
      addToWritePostInfo({ backColor: backColor })
    },
    [backColor]
  )
  const onClickOpenStickerList = useCallback(() => {
    setOpenStickerList(!openStickerList)
  }, [openStickerList])
  const updatePickedImgUrl = useCallback((imgUrl: string) => {
    addToPanel({ imgUrl: imgUrl })
  }, [])
  const updatePickedImgWidth = useCallback((width: number) => {
    addToPanel({ width: width })
  }, [])
  const addToPanelByClicking = useCallback(() => {
    addToPanel({ clickedSticker: true })
    setTimeout(() => {
      addToPanel({ clickedSticker: false })
    }, 500)
  }, [])
  const closeDeleteBtnByTouching = useCallback(() => {
    addToPanel({ closeDeleteBtn: true })
    setTimeout(() => {
      addToPanel({ closeDeleteBtn: false })
    }, 500)
  }, [])
  const onClickSaveBtn = useCallback(() => {
    setOpenSaveModal(true)
  }, [])
  useEffect(() => {
    if (typeof postType === 'string') {
      addToWritePostInfo({
        backColor: backColor,
        postType: postType,
        secretType: 'Temp',
      })
    }
  }, [backColor, postType])
  return (
    <AppContainer>
      <WritePostTemplate
        TempType={typeof postType === 'string' ? postType : 'null'}
        optionActiveState={optionActiveState}
        backColor={backColor}
        openStickerList={openStickerList}
        onClickTermType={onClickTermType}
        onClickBackColor={onClickBackColor}
        onClickOpenStickerList={onClickOpenStickerList}
        updatePickedImgUrl={updatePickedImgUrl}
        updatePickedImgWidth={updatePickedImgWidth}
        addToPanelByClicking={addToPanelByClicking}
        closeDeleteBtnByTouching={closeDeleteBtnByTouching}
        onClickSaveBtn={onClickSaveBtn}
      />
    </AppContainer>
  )
}

export default WritePostPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
