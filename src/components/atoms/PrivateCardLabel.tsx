import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  active: boolean
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
  height: 48px;
  padding: 0 31px;
  color: rgba(255, 255, 255, 0.5);
`

const PrivateCardLabel: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <span>{props.text}</span>
    </Container>
  )
}

export default PrivateCardLabel
