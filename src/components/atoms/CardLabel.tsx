import React from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'

interface Props {
  text: string
}

const Container = styled.span`
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
  font-size: 19px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: 0.04em;
  color: white;
  height: 48px;
  padding: 0 12px;
  img {
    margin-right: 8px;
  }
`

const CardLabel: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <img src={SVGS.time_wh}></img>
      <span>{props.text}</span>
    </Container>
  )
}

export default CardLabel
