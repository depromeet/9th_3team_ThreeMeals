import React, { FC } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
const TapeLabelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & .tapeBl {
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
  }
  & .tapeGr {
    position: absolute;
    z-index: 1;
    bottom: 30px;
    width: 100%;
  }
  & .tapeYr {
    position: absolute;
    z-index: 3;
    width: 100%;
    bottom: 22px;
  }
`
const CrossedTapesLabel: FC = () => {
  return (
    <>
      <TapeLabelContainer>
        <img src={IMAGES.home_tape_bl} alt="tape_bl" className="tapeBl" />
        <img src={IMAGES.home_tape_gr} alt="tape_gr" className="tapeGr" />
        <img src={IMAGES.home_tape_yr} alt="tape_yr" className="tapeYr" />
      </TapeLabelContainer>
    </>
  )
}

export default CrossedTapesLabel
