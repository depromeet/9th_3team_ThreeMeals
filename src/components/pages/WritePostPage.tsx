import React, { VFC, useState, useCallback, useEffect } from 'react'
import WritePostTemplate from '../templates/WritePostTemplate'
import { useRouter } from 'next/router'
import { BackColor } from '../../types/types'
import styled from 'styled-components'
import { useReactiveVar, useMutation, useQuery } from '@apollo/client'
import writePostInfoVar, {
  addToWritePostInfo,
} from '../../lib/localStore/writePost'
import { addToPanel } from '../../lib/localStore/stickerPanel'
import StickersList from '../organisms/StickersList'
import Modal from '../molecules/Modal'
import {
  CREATE_POST,
  CreatePostRes,
  CreatePostParams,
} from '../../lib/queries/createQueries'
import {
  GET_ALL_EMOTICONS,
  GetAllEmoticons,
} from '../../lib/queries/getQueries'
import { GET_MY_PROFILE, getMyAccountInfo } from '../../lib/queries/meQueries'
const WritePostPage: VFC = () => {
  const { data: emoticonsData } = useQuery<GetAllEmoticons>(GET_ALL_EMOTICONS)
  const { data: profileData } = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const allEmoticons = emoticonsData?.getAllEmoticons
  const profile = profileData?.getMyAccountInfo
  const router = useRouter()
  const { id: postType, otherId } = router.query
  const writePostInfo = useReactiveVar(writePostInfoVar)
  const [createPostMutation] =
    useMutation<CreatePostRes, CreatePostParams>(CREATE_POST)
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
      addToWritePostInfo({ color: backColor })
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
    if (!writePostInfo?.content) {
      return
    }
    setOpenSaveModal(true)
  }, [writePostInfo?.content])
  const onClickConfirm = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    console.log('send:', writePostInfo)
    if (writePostInfo && typeof writePostInfo !== undefined) {
      createPostMutation({ variables: writePostInfo }).then(() => {
        router.push('/content')
      })
    }
  }
  useEffect(() => {
    if (typeof postType === 'string' && profile && !otherId) {
      addToWritePostInfo({
        color: backColor,
        postType: postType,
        secretType: 'Temp',
        toAccountId: profile.id,
      })
    } else if (
      typeof postType === 'string' &&
      profile &&
      typeof otherId === 'string'
    ) {
      addToWritePostInfo({
        color: backColor,
        postType: postType,
        secretType: 'Temp',
        toAccountId: otherId,
      })
    }
  }, [backColor, otherId, postType, profile])
  console.log(writePostInfo)
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
        closeDeleteBtnByTouching={closeDeleteBtnByTouching}
        onClickSaveBtn={onClickSaveBtn}
      />
      {allEmoticons && openStickerList ? (
        <StickersList
          stickers={allEmoticons}
          updatePickedfileUrl={updatePickedImgUrl}
          updatePickedImgWidth={updatePickedImgWidth}
          addToPanelByClicking={addToPanelByClicking}
          onClickOpenStickerList={onClickOpenStickerList}
        />
      ) : null}
      <Modal
        open={openSaveModal}
        title="작성을 완료하시겠습니까?"
        titleEmojiTextType="✏️"
        description="욕설 및 비방은 신고의 대상이 될 수 있습니다."
        confirmText="작성완료"
        cancelText="취소"
        onClickCancel={() => {
          setOpenSaveModal(false)
        }}
        onClickConfirm={onClickConfirm}
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
