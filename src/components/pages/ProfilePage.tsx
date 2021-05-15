import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import ProfileTemplate from '../templates/ProfileTemplate'
import Modal from '../molecules/Modal'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'

const ProfilePage: React.FC = () => {
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [profileImage, setProfileImage] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ''
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const onClickIcon = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onChangeImage = useCallback((event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setProfileImage(file)
      setPreviewImage(reader.result)
      setIsOpen(false)
    }
    event.target.value = null
    reader.readAsDataURL(file)
  }, [])
  return (
    <AppContainer>
      <ProfileTemplate
        fileInput={fileInput}
        profileImage={profileImage}
        previewImage={previewImage}
        onClickLeft={router.back}
        onClickRight={router.back}
        onChangeImage={onChangeImage}
        onClickIntro={() => router.push('/profileEdit')}
        onClickLogout={() => {
          console.log('logout')
        }}
        onClickIcon={onClickIcon}
      />

      <Modal
        open={isOpen}
        titleEmoji={IMAGES.background}
        title={'프로필 사진을 변경하시겠습니까?'}
        confirmText={'앨범에서 사진 선택'}
        confirmSecondText={'기본 이미지로 변경'}
        cancelText={'취소'}
        onClickConfirm={() => {
          fileInput.current?.click()
        }}
        onClickConfirmSecond={() => {
          console.log('second')
        }}
        onClickCancel={() => {
          setIsOpen(false)
        }}
      />
    </AppContainer>
  )
}

export default ProfilePage
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
