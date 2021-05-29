import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import ContentTemplate from '../templates/ContentTemplate'
const ContentPage: React.FC = () => {
  const router = useRouter()

  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
    },
    [router]
  )
  const onClickWrite = useCallback(() => {
    router.push('/writePost')
  }, [router])
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
