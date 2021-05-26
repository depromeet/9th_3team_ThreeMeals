import React, { FC, useState } from 'react'
import styled from 'styled-components'
import WriteQACard from '../organisms/WriteQACard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
import CardLabel from '../atoms/CardLabel'
import OptionAlarmField, { OptionType } from '../molecules/OptionAlarmField'
import { IMAGES } from '../../constants/images'
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
      {props.TempType === 'Q' ? (
        <OptionContainer>
          <OptionAlarmField optionType={optionActiveState} />
          <CardLabel text="secret 24" active={optionActiveState.Temp} />
          <PrivateCardLabel text="Bong-in" active={optionActiveState.Forever} />
        </OptionContainer>
      ) : null}
      <Footer>
        <BackColorList>
          <BackColorButton />
          <BackColorButton />
          <BackColorButton />
          <BackColorButton />
          <BackColorButton />
        </BackColorList>
        {props.TempType === 'OX' ? null : (
          <button className="stickerButton">
            <img />
          </button>
        )}
      </Footer>
    </TempContainer>
  )
}

export default WritePostTemplate

const TempContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: 100vh;
  position: relative;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60px;
`
const MainContainer = styled.div`
  width: 100%;
`

const OptionContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`

const BackColorList = styled.div``

const BackColorButton = styled.button``
