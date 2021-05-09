import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import ProfileTemplate from '../templates/ProfileTemplate'

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ''
  )

  const router = useRouter()

  const onChangeImage = useCallback((event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setProfileImage(file)
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
  }, [])
  return (
    <ProfileTemplate
      profileImage={profileImage}
      previewImage={previewImage}
      onClickLeft={router.back}
      onClickRight={router.back}
      onChangeImage={onChangeImage}
      onClickIntro={() => router.push('/profileEdit')}
      onClickLogout={() => {
        console.log('logout')
      }}
    />
  )
}

export default ProfilePage
