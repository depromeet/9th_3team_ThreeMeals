import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import DefaultLine from '../atoms/DefaultLine'
import IconOnImage from '../atoms/IconOnImage'
import Tag from '../atoms/Tag'
import Header from '../molecules/Header'

interface Props {
  profileImage: string
  previewImage: string | ArrayBuffer | null
  fileInput?: MutableRefObject<HTMLInputElement | null>
  nickName: string
  onChangeImage?: (e: any) => void
  onClickIcon?: () => void
  onClickLeft?: () => void
  onClickRight?: () => void
  onClickIntro?: () => void
  onClickLogout?: () => void
}

const ProfileTemplate: React.FC<Props> = (props: Props) => {
  const [blurRightText, setBlurRightText] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setBlurRightText(false)
    }, 1000)
  }, [])

  const onClickClose = useCallback((id: string) => {
    console.log('id:', id)
  }, [])

  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        rightText={'저장'}
        onClickLeft={props.onClickLeft}
        onClickRight={props.onClickRight}
        blurRightText={blurRightText}
      />
      <IconOnImage
        containerStyle={{
          marginTop: 24,
          justifyContent: 'center',
          marginLeft: '2rem',
        }}
        image={props.previewImage || IMAGES.background}
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
        <IntroDesc>{props.nickName}</IntroDesc>
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>소개</IntroTitle>
        <IntroDesc onClick={props.onClickIntro}>
          {'소개글을 작성해주세요!'}
        </IntroDesc>
      </IntroContainer>

      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />

      <TagContainer>
        <Tag
          id={'1'}
          icon={IMAGES.icon_16_insta_wh}
          text={'Add Instgram'}
          href="https://google.com"
          onClickClose={onClickClose}
        />
      </TagContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <TagContainer>
        <Tag
          id={'2'}
          icon={IMAGES.share_16}
          text={'figma.com/duck-bae'}
          href="https://google.com"
          onClickClose={onClickClose}
        />
      </TagContainer>
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

  color: #ffffff;
`
const IntroDesc = styled.span`
  margin-left: 24px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;

  color: #ffffff;

  opacity: 0.3;
`

const TagContainer = styled.div`
  margin-left: 75px;
  display: flex;
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
