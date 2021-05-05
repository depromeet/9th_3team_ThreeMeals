import { useRouter } from 'next/router'
import ProfileTemplate from '../templates/ProfileTemplate'

const ProfilePage: React.FC = () => {
  const router = useRouter()
  return (
    <ProfileTemplate
      onClickLeft={router.back}
      onClickRight={router.back}
      onClickIntro={() => router.push('/profileEdit')}
      onClickLogout={() => {
        console.log('logout')
      }}
    />
  )
}

export default ProfilePage
