import { useMutation, useQuery } from '@apollo/client'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import {
  GET_MY_PROFILE,
  UPDATE_ACCOUNT_INFO,
} from '../../lib/queries/meQueries'
import DefaultLine from '../atoms/DefaultLine'
import IconOnImage from '../atoms/IconOnImage'
import Header from '../molecules/Header'
import { useRouter } from 'next/router'

interface Props {
  profileImage: string | undefined
  previewImage: string
  fileInput?: MutableRefObject<HTMLInputElement | null>
  nickName: string
  onChangeImage?: (e: any) => void
  onClickIcon?: () => void
  onClickLeft?: () => void
  onClickRight?: () => void
  onClickIntro?: () => void
  onClickName?: () => void
  onClickLogout?: () => void
  introduction?: string
  myId: string
}

const ProfileTemplate: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const {
    data: { getMyAccountInfo },
  } = useQuery(GET_MY_PROFILE)
  const [updateAccountInfo] = useMutation(UPDATE_ACCOUNT_INFO, {
    onCompleted: () => {
      router.back()
    },
  })

  const [blurRightText, setBlurRightText] = useState<boolean>(true)
  const [inputValues, setInputValues] = useState({
    content: getMyAccountInfo.content,
    instaId: '',
  })
  const [windowObjet, setWindowObjet] = useState<Window | undefined>()
  useEffect(() => {
    setTimeout(() => {
      setBlurRightText(false)
    }, 1000)
  }, [])
  const onChangeInput = useCallback(
    (e) => {
      const { id, value } = e.target
      setInputValues({ ...inputValues, [id]: value })
    },
    [inputValues]
  )
  const onSave = () => {
    updateAccountInfo({
      variables: {
        nickname: getMyAccountInfo.nickname,
        content: inputValues.content,
      },
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowObjet(window)
    }
  }, [])
  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        rightText={'저장'}
        onClickLeft={props.onClickLeft}
        onClickRight={onSave}
        blurRightText={blurRightText}
      />
      <IconOnImage
        containerStyle={{
          marginTop: 24,
          justifyContent: 'center',
          marginLeft: '2rem',
        }}
        image={props.previewImage}
        curImage={props.profileImage}
        icon={IMAGES.icon_20_camera}
        imageStyle={{ width: 88, height: 88, objectFit: 'cover' }}
        iconStyle={{ width: 20, height: 20 }}
        onClickIcon={props.onClickIcon}
      />
      <input
        hidden
        ref={props.fileInput}
        type="file"
        accept="image/*"
        name="profile_img"
        onChange={props.onChangeImage}
      />
      <IntroContainer style={{ marginTop: 40 }}>
        <IntroTitle>이름</IntroTitle>
        <IntroDesc onClick={props.onClickName}>{props.nickName}</IntroDesc>
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>소개</IntroTitle>
        <IntroInput
          id="content"
          onChange={onChangeInput}
          value={inputValues.content}
          placeholder="소개글을 작성해주세요"
        />
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>인스타</IntroTitle>
        <IntroInput
          id="instaId"
          placeholder="인스타그램 아이디를 작성해주세요!"
          value={inputValues.instaId}
          onChange={onChangeInput}
          autoComplete={undefined}
        />
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>URL</IntroTitle>
        <IntroDesc>
          {windowObjet !== undefined
            ? windowObjet.location.origin + '/otherscontent/' + props.myId
            : ''}
        </IntroDesc>
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <Footer>
        <DefaultLine containerStyle={{ maxWidth: 500 }} />
        <FooterText onClick={props.onClickLogout}>로그아웃</FooterText>
      </Footer>
    </Container>
  )
}

export default ProfileTemplate

const Container = styled.div`
  max-width: 500px;
  width: 100%;
`
const IntroContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 27px;
`

const IntroTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: #ffffff;
  width: 3rem;
`
const IntroDesc = styled.span`
  margin-left: 24px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #ffffff;
  white-space: nowrap;
  overflow-x: hidden;
`

const IntroInput = styled.input`
  margin-left: 24px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #ffffff;
  white-space: nowrap;
  overflow-x: hidden;
  background: none;
  border: none;
  width: 100%;
`

const Footer = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 66px;
  width: 100%;
  border: 1px;
  border-color: #202020;
  text-align: center;
`

const FooterText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  cursor: pointer;
  color: #ff5050;
  margin: 0 auto;
  margin-top: 23px;
  max-width: 500px;
`
