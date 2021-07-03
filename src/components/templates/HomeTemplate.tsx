import React, { FC, useMemo, useState } from 'react'
import Header from '../molecules/Header'
import { HOME_ICONS, IMAGES } from '../../constants/images'
import styled from 'styled-components'
import CrossedTapesLabel from '../atoms/CrossedTapesLabel'
import KakaoButton from '../atoms/KakaoButton'
import HomeTextCard from '../molecules/HomeTextCard'
interface Props {
  isProfile: boolean
  randomIndex: number
  profileImage?: string
}

const HomeTemplate: FC<Props> = (props) => {
  return (
    <AppContainer>
      <Header
        isProfile={props.isProfile}
        profileImage={props.profileImage}
        rightIcon={IMAGES.icon_24_drawer}
      />
      <MainContainer>
        <CharIconContainer>
          <HomeIcon src={HOME_ICONS[props.randomIndex]} />
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
      <ImageIconContainer>
        <img src={IMAGES.img_homebox} alt="homebox" className="image" />
        <div className="iconBackground">?</div>
      </ImageIconContainer>
      <HomeTextCardContainer>
        <HomeTextCard text="내 첫인상은 어땠어?" />
        <HomeTextCard text="지금 여자친구 있어?" />
        <HomeTextCard text="요즘 좋아하는 노래 뭐야?" />
        <HomeTextCard
          text="<- 귀여운 남자 \n 시크한 남자 ->"
          textStyle={{ flexDirection: 'column' }}
        />
        <HomeTextCard text="나랑 영화보러 갈래?" />
      </HomeTextCardContainer>
    </AppContainer>
  )
}

export default HomeTemplate

const AppContainer = styled.div`
  max-width: 500px;
  width: 100%;
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
  height: 100px;
  font-size: 50px;
  margin-bottom: 10px;
`
const HomeIcon = styled.img`
  width: 100px;
  height: 100px;
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
    @media screen and (max-width: 320px) {
      font-size: 20px;
    }
  }
  .text2 {
    font-weight: 200;
    font-size: 17px;
    .emphasis {
      font-weight: bold;
    }
    @media screen and (max-width: 320px) {
      font-size: 15px;
    }
  }
`

const StyledText = styled.div``

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
  @media screen and (max-width: 320px) {
    font-size: 15px;
  }
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
    @media screen and (min-width: 450px) {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 320px) {
      width: 80px;
    }
  }
  .downText {
    color: #ff833d;
    font-weight: 200;
    letter-spacing: -0.04em;
    @media screen and (max-width: 320px) {
      font-size: 15px;
    }
  }
  @media screen and (min-width: 450px) {
    height: calc(55% - 205px);
  }
  @media screen and (max-width: 320px) {
    height: calc(55% - 150px);
  }
`
const ImageIconContainer = styled.div`
  width: 100%;
  .image {
    width: 100%;
    margin-top: 50px;
  }
  .iconBackground {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${IMAGES.icon_floating}) no-repeat;
    color: #67d585;
    font-weight: bold;
    height: 180px;
    background-position: center;
    font-size: 25px;
    background-size: 90px;
  }
`
const HomeTextCardContainer = styled.div`
  width: 100%;
  justify-content: center;
  padding: 10px;
`
