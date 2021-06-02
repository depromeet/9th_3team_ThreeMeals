import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import WriteQACard from '../organisms/WriteQACard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
import CardLabel from '../atoms/CardLabel'
import OptionAlarmField, { OptionType } from '../molecules/OptionAlarmField'
import { IMAGES } from '../../constants/images'
import { SVGS } from '../../constants/svgs'
import { BackColor } from '../../types/types'
import StickersList from '../organisms/StickersList'
interface Props {
  TempType: string | string[]
  optionActiveState: OptionType
  backColor: BackColor
  openStickerList: boolean
  onClickTermType: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClickBackColor: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClickOpenStickerList: () => void
  updatePickedImgUrl: (imgUrl: string) => void
  updatePickedImgWidth: (width: number) => void
  addToPanelByClicking: () => void
  closeDeleteBtnByTouching: () => void
  onClickSaveBtn: () => void
}

const WritePostTemplate: FC<Props> = (props) => {
  const [withSticker, setWithSticker] = useState(false)
  useEffect(() => {
    if (props.TempType === 'Q' || props.TempType === 'A') {
      setWithSticker(true)
    }
  }, [props.TempType])
  return (
    <TempContainer onTouchStart={props.closeDeleteBtnByTouching}>
      <Header>
        <img src={IMAGES.icon_32_close} alt="closeIcon" />
        <span onClick={props.onClickSaveBtn}>저장</span>
      </Header>
      <MainContainer>
        <WriteQACard backColor={props.backColor} isWithSticker={withSticker} />
      </MainContainer>
      <BottomContainer>
        {props.TempType === 'Q' ? (
          <OptionContainer buttonActive={props.optionActiveState}>
            {props.optionActiveState.Forever && (
              <OptionAlarmField optionType={props.optionActiveState} />
            )}
            {props.optionActiveState.Temp && (
              <OptionAlarmField optionType={props.optionActiveState} />
            )}
            <div className="LabelContainer">
              <button
                className="tempBtn"
                onClick={props.onClickTermType}
                value="Temp"
              >
                <CardLabel
                  text="secret 24"
                  active={props.optionActiveState.Temp}
                />
              </button>
              <button
                className="foreverBtn"
                onClick={props.onClickTermType}
                value="Forever"
              >
                <PrivateCardLabel
                  text="Bong-in"
                  active={props.optionActiveState.Forever}
                />
              </button>
            </div>
          </OptionContainer>
        ) : null}
        <Footer>
          <BackColorList>
            <BackColorButton
              color="#FF823D"
              id="#FF823D"
              onClick={props.onClickBackColor}
            />
            <BackColorButton
              color="#67D585"
              id="#67D585"
              onClick={props.onClickBackColor}
            />
            <BackColorButton
              color="#6799FE"
              id="#6799FE"
              onClick={props.onClickBackColor}
            />
            <BackColorButton
              color="#F1D75F"
              id="#F1D75F"
              onClick={props.onClickBackColor}
            />
            <BackColorButton
              color="#CC4349"
              id="#CC4349"
              onClick={props.onClickBackColor}
            />
          </BackColorList>
          {props.TempType === 'OX' ? null : (
            <button
              className="stickerButton"
              onClick={props.onClickOpenStickerList}
            >
              <img src={SVGS.icon_32_emoji_wh} alt="emoji_icon" />
            </button>
          )}
        </Footer>
      </BottomContainer>
      {props.openStickerList ? (
        <StickersList
          updatePickedImgUrl={props.updatePickedImgUrl}
          updatePickedImgWidth={props.updatePickedImgWidth}
          addToPanelByClicking={props.addToPanelByClicking}
          onClickOpenStickerList={props.onClickOpenStickerList}
        />
      ) : null}
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
    padding: 20px;
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
  span {
    color: white;
    cursor: pointer;
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
