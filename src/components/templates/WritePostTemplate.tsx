import React, { FC, useState } from 'react'
import styled from 'styled-components'
import WriteQACard from '../organisms/WriteQACard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
import CardLabel from '../atoms/CardLabel'
import OptionAlarmField, { OptionType } from '../molecules/OptionAlarmField'
import { IMAGES } from '../../constants/images'
import { SVGS } from '../../constants/svgs'
interface Props {
  emoticons?: Array<string>
  TempType: 'Q' | 'A' | 'OX'
  isWithSticker: boolean
  optionActiveState?: OptionType
}

const WritePostTemplate: FC<Props> = (props) => {
  const [backColor, setBackColor] = useState('#67D585')
  const [optionActiveState, setOptionActiveState] = useState({
    Temp: false,
    Forever: false,
  })

  return (
    <TempContainer>
      <Header>
        <img src={IMAGES.icon_32_close} alt="closeIcon" />
        <span>저장</span>
      </Header>
      <MainContainer>
        <WriteQACard
          backColor={backColor}
          isWithSticker={props.isWithSticker}
        />
      </MainContainer>
      <BottomContainer>
        {props.TempType === 'Q' ? (
          <OptionContainer buttonActive={optionActiveState}>
            <OptionAlarmField optionType={optionActiveState} />
            <div className="LabelContainer">
              <button className="tempBtn">
                <CardLabel text="secret 24" active={optionActiveState.Temp} />
              </button>
              <button className="foreverBtn">
                <PrivateCardLabel
                  text="Bong-in"
                  active={optionActiveState.Forever}
                />
              </button>
            </div>
          </OptionContainer>
        ) : null}
        <Footer>
          <BackColorList>
            <BackColorButton color="#FF823D" />
            <BackColorButton color="#67D585" />
            <BackColorButton color="#6799FE" />
            <BackColorButton color="#F1D75F" />
            <BackColorButton color="#CC4349" />
          </BackColorList>
          {props.TempType === 'OX' ? null : (
            <button className="stickerButton">
              <img src={SVGS.icon_32_emoji_wh} alt="emoji_icon" />
            </button>
          )}
        </Footer>
      </BottomContainer>
    </TempContainer>
  )
}

export default WritePostTemplate

interface ButtonProps {
  color: string
}
interface OptionProps {
  buttonActive: OptionType
}
const TempContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 770px) {
    height: none;
  }
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  img {
    height: 24px;
  }
`
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  @media screen and (max-width: 770px) {
    padding: 20px 0;
  }
`

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OptionContainer = styled.div<OptionProps>`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 375px) {
    width: 100%;
  }
  .LabelContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
    .tempBtn {
      width: 48%;
      ${(props) =>
        props.buttonActive.Temp &&
        `border: 2px solid rgba(255, 255, 255, 0.5);`}
    }
    .foreverBtn {
      width: 47%;
      ${(props) =>
        props.buttonActive.Forever &&
        `border: 2px solid rgba(255, 255, 255, 0.5);`}
    }
  }
`

const Footer = styled.div`
  width: 90%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 375px) {
    width: 100%;
  }
`

const BackColorList = styled.div`
  width: 70%;
`

const BackColorButton = styled.button<ButtonProps>`
  background: ${(props) => props.color};
  border-radius: 30px;
  width: 26px;
  height: 26px;
  margin-right: 10px;
`
