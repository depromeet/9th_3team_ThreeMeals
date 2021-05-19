import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import OthersContentTemplate from '../templates/OthersContentTemplate'
const OthersContentPage: React.FC = () => {
  const router = useRouter()

  return (
    <AppContainer>
      <OthersContentTemplate
        profileImage={IMAGES.background}
        onClickWrite={() => {
          router.push('newSecretCard')
        }}
        onClickLeft={router.back}
        onClickSecondRight={router.back}
      />
    </AppContainer>
  )
}

export default OthersContentPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
