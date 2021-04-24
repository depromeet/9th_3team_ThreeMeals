import * as React from 'react'
import styled, { CSSProperties } from 'styled-components'

interface Props {
  containerStyle?: CSSProperties
}

const DefaultLine: React.FC<Props> = (props: Props) => {
  return <Container style={props.containerStyle} />
}

export default DefaultLine

const Container = styled.div`
  height: 1px;
  background: #202020;
`
