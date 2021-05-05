import { useRouter } from 'next/router'
import ProfileEditTemplate from '../templates/ProfileEditTemplate'

const ProfileEditPage: React.FC = () => {
  const router = useRouter()
  return (
    <ProfileEditTemplate onClickLeft={router.back} onClickRight={router.back} />
  )
}

export default ProfileEditPage
