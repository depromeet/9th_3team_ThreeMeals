import { useRouter } from 'next/router'
import styled from 'styled-components'
import ProfileEditTemplate from '../templates/ProfileEditTemplate'

const ProfileEditPage: React.FC = () => {
  const router = useRouter()
  return (
    <AppContainer>
      <ProfileEditTemplate
        onClickLeft={router.back}
        onClickRight={router.back}
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
