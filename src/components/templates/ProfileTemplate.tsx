import { useMutation, useQuery } from '@apollo/client'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import {
  DEREGISTER_SNSINFO,
  getMyAccountInfo,
  GET_MY_PROFILE,
  REGISTER_SNSINFO,
  SnsInfo,
  UPDATE_ACCOUNT_INFO,
} from '../../lib/queries/meQueries'
import DefaultLine from '../atoms/DefaultLine'
import IconOnImage from '../atoms/IconOnImage'
import Header from '../molecules/Header'
import { useRouter } from 'next/router'

interface Props {
  profileImage: string | null
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
  snsInfos: SnsInfo[]
  content: string
}

const ProfileTemplate: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const [registerSnsInfo] = useMutation(REGISTER_SNSINFO)
  const [deregisterSnsInfo] = useMutation(DEREGISTER_SNSINFO)
  const [updateAccountInfo] = useMutation(UPDATE_ACCOUNT_INFO, {
    onCompleted: () => {
      router.back()
    },
  })

  const [blurRightText, setBlurRightText] = useState<boolean>(true)
  const [inputValues, setInputValues] = useState({
    nickName: props.nickName === null ? '' : props.nickName,
    content: props.content === null ? '' : props.content,
    instagramId: props.snsInfos[0] === undefined ? '' : props.snsInfos[0].snsId,
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
  const onSave = async () => {
    await deregisterSnsInfo({
      variables: {
        snsType: 'Instagram',
      },
    })
    await registerSnsInfo({
      variables: {
        snsId: inputValues.instagramId,
        url: `https://instagram.com/${inputValues.instagramId}`,
        snsType: 'Instagram',
      },
    })
    updateAccountInfo({
      variables: {
        nickname: inputValues.nickName,
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
        rightText={'??????'}
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
        <IntroTitle>??????</IntroTitle>
        <IntroInput
          id="nickName"
          onChange={onChangeInput}
          value={inputValues.nickName}
          placeholder="????????? ??????????????????!"
        />
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>??????</IntroTitle>
        <IntroInput
          id="content"
          onChange={onChangeInput}
          value={inputValues.content}
          placeholder="???????????? ??????????????????!"
        />
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>?????????</IntroTitle>
        <IntroInput
          id="instagramId"
          placeholder="??????????????? ???????????? ??????????????????!"
          value={inputValues.instagramId}
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
      <Footer>
        <DefaultLine containerStyle={{ maxWidth: 500 }} />
        <FooterText onClick={props.onClickLogout}>????????????</FooterText>
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
  align-items: center;
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
  width: 100%;
  margin-left: 26px;
  font-style: normal;
  font-weight: normal;
  font-size: 0.9rem;
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
