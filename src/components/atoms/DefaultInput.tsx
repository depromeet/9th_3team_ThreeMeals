import * as React from 'react'
import styled, { CSSProperties } from 'styled-components'

interface Props {
  containerStyle?: CSSProperties
  placeholder: string
  onChange: (text: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

const DefaultInput: React.FC<Props> = (props: Props) => {
  return (
    <Container
      style={props.containerStyle}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange(e.target.value)
      }}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
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
  padding-left: 5%;
  padding-right: 5%;
  &:focus {
    outline: none;
  }
  ::placeholder {
    /* color: #110111; */
  }
`
