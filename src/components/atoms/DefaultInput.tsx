import * as React from 'react'
import styled, { CSSProperties } from 'styled-components'

interface Props {
  containerStyle?: CSSProperties
  placeholder: string
  onChange: (text: string) => void
}

const DefaultInput: React.FC<Props> = (props: Props) => {
  return (
    <Container
      style={props.containerStyle}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange(e.target.value)
      }}
    />
  )
}

export default DefaultInput

const Container = styled.input`
  border-radius: 10px;
  font-size: 16px;
  line-height: 20px;
  background: #f8f8f8;
  border: 0px;
  outline: none;
  border-radius: 24px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    /* color: #110111; */
  }
`
