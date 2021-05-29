import React from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'

interface Props {
  text: string
  active: boolean
}
interface ContainerProps {
  active: boolean
}
const Container = styled.span<ContainerProps>`
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
  font-size: 19px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: 0.04em;
  height: 48px;
  padding: 0 12px;
  ${({ active }) =>
    active ? `color:white;` : `color:rgba(255, 255, 255, 0.5);`}
  img {
    margin-right: 8px;
  }
`

const CardLabel: React.FunctionComponent<Props> = (props) => {
  return (
    <Container active={props.active}>
      {props.active ? (
        <img src={SVGS.time_wh}></img>
      ) : (
        <img src={SVGS.icon_time_trans}></img>
      )}
      <span>{props.text}</span>
    </Container>
  )
}

export default CardLabel
