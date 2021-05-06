import React from 'react'
import styled from 'styled-components'
import NextButton from './NextButton'

interface Props {
  href: string
  text: string
  icon?: React.ReactNode
}

const StyledTag = styled(NextButton)`
  font-size: 15px;
  letter-spacing: -0.02em;
  text-align: left;
  color: white;
  background-color: #242424;
  border-radius: 11px;
  padding: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  color: #ffffffb2;
`

const Tag: React.FunctionComponent<Props> = (props) => {
  return (
    <StyledTag href={props.href}>
      {props.icon}
      {props.text}
    </StyledTag>
  )
}

export default Tag
