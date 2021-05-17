import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import NewSecretCardTemplate from '../templates/NewSecretCardTemplate'

const ProfileEditPage: React.FC = () => {
  const router = useRouter()
  const onClickSend = useCallback((text: string) => {
    console.log('finish text : ', text)
  }, [])
  return (
    <AppContainer>
      <NewSecretCardTemplate
        profileImage={IMAGES.background}
        onClickSend={onClickSend}
        onClickLeft={router.back}
      />
    </AppContainer>
  )
}

export default ProfileEditPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
