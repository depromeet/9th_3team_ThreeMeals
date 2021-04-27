import React, { FC } from 'react'
import styled from 'styled-components'
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
        <img src="/home_tape_bl.png" alt="tape_bl" className="tapeBl" />
        <img src="/home_tape_gr.png" alt="tape_gr" className="tapeGr" />
        <img src="/home_tape_yr.png" alt="tape_yr" className="tapeYr" />
      </TapeLabelContainer>
    </>
  )
}

export default CrossedTapesLabel
