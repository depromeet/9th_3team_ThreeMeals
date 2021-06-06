import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import ContentTemplate from '../templates/ContentTemplate'
import Modal from '../molecules/Modal'

const ContentPage: React.FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
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
