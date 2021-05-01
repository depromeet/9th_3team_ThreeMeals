import React, { FC } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
const TapeLabelContainer = styled.div`
  position: absolute;
  min-height: 195px;
  min-width: 375px;
  & .tapeBl {
    position: absolute;
    z-index: 2;
    bottom: 0;
  }
  & .tapeGr {
    position: absolute;
    z-index: 1;
    bottom: 30px;
  }
  & .tapeYr {
    position: absolute;
    z-index: 3;
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
