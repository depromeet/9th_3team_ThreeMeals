import React, { FC, PropsWithChildren } from 'react'
import styled, { CSSProperties } from 'styled-components'
interface Props {
  backColor: string
  style?: CSSProperties
}
interface StyledProps {
  backColor: string
}
const Container = styled.div<StyledProps>`
  height: 360px;
  width: 327px;
  border-radius: 24px;
  background: ${(props) => props.backColor};
  position: relative;
`

const CardContainer: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Container backColor={props.backColor} style={props.style}>
      {props.children}
    </Container>
  )
}

export default CardContainer
