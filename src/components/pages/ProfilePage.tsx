import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import jsCookies from 'js-cookie'
import ProfileTemplate from '../templates/ProfileTemplate'
import Modal from '../molecules/Modal'
import { IMAGES } from '../../constants/images'
import {
  GET_MY_PROFILE,
  UPDATE_DEFAULT_PROFILE_IMAGE,
} from '../../lib/queries/meQueries'
import { SINGLE_UPLOAD } from '../../lib/queries/singleFileUploadQuery'

const ProfilePage: React.FC = () => {
  const {
    data: { getMyAccountInfo },
    refetch,
  } = useQuery(GET_MY_PROFILE)
  const [singleUploadMutation] = useMutation(SINGLE_UPLOAD)
  const [updateDefaultProfileImage] = useMutation(
    UPDATE_DEFAULT_PROFILE_IMAGE,
    {
      onCompleted: () => {
        refetch()
      },
    }
  )

  const fileInput = useRef<HTMLInputElement | null>(null)
  const [profileImage, setProfileImage] = useState<string | undefined>(
    getMyAccountInfo.image
  )
  const [previewImage, setPreviewImage] = useState<string>(
    getMyAccountInfo.image
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const onClickIcon = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onChangeImage = useCallback(
    (event) => {
      event.preventDefault()
      const reader = new FileReader()
      const file = event.target.files[0]
      reader.onloadend = () => {
        setProfileImage(file)
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result)
        }

        setIsOpen(false)
      }
      event.target.value = null
      reader.readAsDataURL(file)
      singleUploadMutation({
        variables: {
          file,
        },
      })
    },
    [singleUploadMutation]
  )

  useEffect(() => {
    setProfileImage(getMyAccountInfo.image)
    setPreviewImage(getMyAccountInfo.image)
  }, [getMyAccountInfo])

  return (
    <AppContainer>
      <ProfileTemplate
        fileInput={fileInput}
        profileImage={profileImage}
        previewImage={previewImage}
        onClickLeft={router.back}
        onClickRight={router.back}
        onChangeImage={onChangeImage}
        onClickIntro={() =>
          router.push('/profile/[edit]', '/profile/contentEdit')
        }
        onClickName={() => router.push('/profile/[edit]', '/profile/nameEdit')}
        onClickLogout={() => {
          jsCookies.remove('token')
          router.push('/')
        }}
        nickName={getMyAccountInfo.nickname}
        onClickIcon={onClickIcon}
        introduction={getMyAccountInfo.content}
        myId={getMyAccountInfo.id}
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
          updateDefaultProfileImage()
          setIsOpen(false)
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
