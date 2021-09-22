import React, { FC } from 'react'
import Header from '../molecules/Header'
import { HOME_ICONS, IMAGES } from '../../constants/images'
import styled from 'styled-components'
import CrossedTapesLabel from '../atoms/CrossedTapesLabel'
import KakaoButton from '../atoms/KakaoButton'
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
          <HomeTextIconContainer>
            <HomeTextIcon src={IMAGES.icon_home_text} />
          </HomeTextIconContainer>
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
        <BundleContainer>
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
          </BottomContainer>
        </BundleContainer>
      </MainContainer>
    </AppContainer>
  )
}

export default HomeTemplate

const AppContainer = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  color: #ffffff;
`
const MainContainer = styled.div`
  width: 100%;
  height: calc(100% - 64px);
`
const CharIconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  font-size: 50px;
  margin-bottom: 10px;
  @media screen and (max-width: 375px) {
    height: 100px;
  }
`
const HomeIcon = styled.img`
  width: 100px;
  height: 100px;
`
const HomeTextIconContainer = styled.div`
  position: absolute;
  width: 70px;
  height: 50px;
  bottom: 0;
  margin-left: 10px;
`

const HomeTextIcon = styled.img`
  width: 100%;
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

const StyledText = styled.div`
  @media screen and (max-width: 375px) {
    .text1 {
      font-size: 1rem;
    }
    .text2 {
      font-size: 1.2rem;
    }
  }
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
// char 150 (max - 375): 100 margin:10px   +    tapes 170 (min - 450): 215  (max - 320) 150   +    10%   //
const BundleContainer = styled.div`
  width: 100%;
  height: calc(90% - 375px);
  @media screen and (max-width: 375px) {
    height: calc(90% - 280px);
    font-size: 0.8rem;
  }
  @media screen and (max-width: 320px) {
    height: calc(90% - 260px);
  }
`

const TextContainer = styled.div`
  width: 100%;
  height: 70%;
  font-size: 18px;
  @media screen and (max-width: 320px) {
    height: 60%;
    font-size: 0.8rem;
  }
  .text1 {
    opacity: 0.6;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    line-height: 35px;
    height: 60%;
    @media screen and (max-width: 320px) {
      line-height: 30px;
    }
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
  height: 30%;
  align-items: center;
  bottom: 0;
  .kakao {
    width: 100%;
    padding: 0 30px;
  }
  @media screen and (max-width: 320px) {
    height: 40%;
  }
`
