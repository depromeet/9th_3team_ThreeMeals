import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import ContentTemplate from '../templates/ContentTemplate'
const ContentPage: React.FC = () => {
  const router = useRouter()

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
