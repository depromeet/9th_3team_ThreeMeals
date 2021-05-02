import { useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import DefaultLine from '../atoms/DefaultLine'
import IconOnImage from '../atoms/IconOnImage'
import Tag from '../atoms/Tag'
import Header from '../molecules/Header'

interface Props {
  onClickLeft?: () => void
  onClickRight?: () => void
  onClickLogout?: () => void
}

const ProfileTemplate: React.FC<Props> = (props: Props) => {
  const [blurRightText, setBlurRightText] = useState<boolean>(true)

  setTimeout(() => {
    setBlurRightText(false)
  }, 1000)
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
        image={IMAGES.background}
        icon={IMAGES.icon_20_camera}
        imageStyle={{ width: 88, height: 88 }}
        iconStyle={{ width: 20, height: 20 }}
      />
      <IntroContainer style={{ marginTop: 40 }}>
        <IntroTitle>이름</IntroTitle>
        <IntroDesc placeholder={'김덕배'} />
      </IntroContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <IntroContainer>
        <IntroTitle>소개</IntroTitle>
        <IntroDesc placeholder={'소개글을 작성해주세요!'} />
      </IntroContainer>

      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />

      <TagContainer>
        <Tag
          icon={IMAGES.icon_16_insta_wh}
          text={'Add Instgram'}
          href="https://google.com"
        />
      </TagContainer>
      <DefaultLine containerStyle={{ marginTop: 16, marginBottom: 16 }} />
      <TagContainer>
        <Tag
          icon={IMAGES.share_16}
          text={'figma.com/duck-bae'}
          href="https://google.com"
        />
      </TagContainer>
      <Footer>
        <DefaultLine />
        <FooterText onClick={props.onClickLogout}>로그아웃</FooterText>
      </Footer>
    </Container>
  )
}

export default ProfileTemplate

const Container = styled.div`
  display: block;
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
const IntroDesc = styled.input`
  margin-left: 24px;
  background: #191919;
  border: none;
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

  color: #ff5050;
  margin-top: 23px;
`
