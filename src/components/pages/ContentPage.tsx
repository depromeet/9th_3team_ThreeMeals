import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import ContentTemplate from '../templates/ContentTemplate'
import Modal from '../molecules/Modal'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import { useQuery } from '@apollo/client'
import {
  getPost,
  getPostParams,
  GET_POST,
} from '../../lib/queries/getPostQueries'

const ContentPage: React.FC = () => {
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: { first: 10, accountId: myAccount.data?.getMyAccountInfo.id },
  })
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClickAnswerCard = useCallback(
    (postId, isMine) => {
      router.push({ pathname: '/answerDetail', query: { postId, isMine } })
    },
    [router]
  )
  const onClickWrite = useCallback(() => {
    router.push('/writePost')
  }, [router])

  const onClickRemove = useCallback((id: string, tabIndex: number) => {
    console.log('onClickRemove id', id, tabIndex)
    setIsOpen(true)
  }, [])

  const onClickLike = useCallback((id: string, tabIndex: number) => {
    console.log('onClickLike id', id, tabIndex)
  }, [])

  return (
    <AppContainer>
      <ContentTemplate
        getPost={getPost.data}
        myAccount={myAccount.data}
        isProfile={true}
        profileImage={IMAGES.background}
        onClickLeft={router.back}
        onClickSecondRight={() => {
          router.push('/notification')
        }}
        onClickNewSecretCard={() => {
          router.push('/newSecretCard')
        }}
        onClickAnswerCard={onClickAnswerCard}
        onClickWrite={onClickWrite}
        onClickRemove={onClickRemove}
        onClickLike={onClickLike}
      />
      <Modal
        open={isOpen}
        title={'이 질문을 삭제하시겠습니까?'}
        titleEmojiTextType="💬"
        confirmText={'삭제하기'}
        cancelText={'취소'}
        onClickConfirm={() => {
          console.log('onClickMOdal')
        }}
        onClickCancel={() => {
          setIsOpen(false)
        }}
      />
    </AppContainer>
  )
}

export default ContentPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
