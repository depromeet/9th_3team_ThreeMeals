import React, { FC } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import CrossedTapesLabel from '../atoms/CrossedTapesLabel'
import KakaoButton from '../atoms/KakaoButton'
interface Props {
  data?: string
  isProfile: boolean
  profileImage?: string
}

const HomeTemplate: FC<Props> = (props) => {
  return (
    <AppContainer>
      <Header
        isProfile={props.isProfile}
        profileImage={props.profileImage}
        rightIcon={IMAGES.icon_24_drawer}
        //   onClickLeft={}
        //   onClickRight={}
      />
      <MainContainer>
        <CharIconContainer>
          <span className="icon">🤫</span>
        </CharIconContainer>
        <PhraseContainer>
          <StyledText className="text1">쉿!</StyledText>
          <StyledText className="text2">
            너를 향한 <span className="emphasis">비밀</span>들
          </StyledText>
        </PhraseContainer>
        <TapesContainer>
          <CrossedTapesLabel />
        </TapesContainer>
        <TextContainer>
          <StyledText className="text1">
            <span>너에게 궁금한것</span>
            <span>너에게 말하고 싶었던 것</span>
            <span>모두 카드에 남길게요</span>
          </StyledText>
          <StyledText className="text2">
            24시간 후면 내가 누군지 알게될거야!
          </StyledText>
        </TextContainer>
        <BottomContainer>
          <div className="kakao">
            <KakaoButton />
          </div>
          <div className="arrowDownContainer">
            <img
              src={IMAGES.img_scrolldown}
              alt="downArrow"
              className="arrowIcon"
            />
            <span className="downText">Scroll down</span>
          </div>
        </BottomContainer>
      </MainContainer>
    </AppContainer>
  )
}

export default HomeTemplate

const AppContainer = styled.div`
  max-width: 500px;
  width: 100%;
  background: #191919;
  color: #ffffff;
`
const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
`

const CharIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  max-height: 80px;
  font-size: 50px;
  .icon {
    padding-top: 10px;
  }
`

const PhraseContainer = styled.div`
  width: 100%;
  height: 10%;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .text1 {
    font-weight: 800;
    font-size: 27px;
    margin-bottom: 10px;
  }
  .text2 {
    font-weight: 200;
    font-size: 17px;
    .emphasis {
      font-weight: bold;
    }
  }
`

const StyledText = styled.div`
  font-family: 'Apple SD Gothic Neo';
`

const TapesContainer = styled.div`
  width: 100%;
  height: 170px;
  position: relative;
  @media screen and (min-width: 450px) {
    height: 215px;
  }
  @media screen and (max-width: 320px) {
    height: 150px;
  }
`

const TextContainer = styled.div`
  width: 100%;
  height: 25%;
  font-size: 18px;
  .text1 {
    opacity: 0.6;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    line-height: 30px;
    height: 60%;
  }
  .text2 {
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
    font-size: 20px;
    @media screen and (max-width: 320px) {
      font-size: 18px;
    }
  }
`

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(55% - 170px);
  flex-direction: column;
  align-items: center;
  .kakao {
    width: 100%;
    /* height: 50%; */
    padding: 0 30px;
  }
  .arrowDownContainer {
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .arrowIcon {
    width: 100px;
    padding-left: 30px;
    margin-bottom: 20px;
  }
  .downText {
    color: #ff833d;
    font-weight: 200;
    letter-spacing: -0.04em;
  }
  @media screen and (min-width: 450px) {
    height: calc(55% - 205px);
  }
  @media screen and (max-width: 320px) {
    height: calc(55% - 150px);
  }
`
