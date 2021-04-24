import * as React from 'react'
import styled from 'styled-components'

interface Props {
  label: string
  placeholder: string
  onChange: (text: string) => void
}

const TextField: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <Input
        placeholder={props.placeholder}
        onChange={(e) => {
          props.onChange(e.target.value)
        }}
      />
    </Container>
  )
}
export default TextField

const Container = styled.div`
  display: flex;
`
const Label = styled.div`
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  height: 25px;
  line-height: 25px;
`
const Input = styled.input`
  font-size: 16px;
  line-height: 19px;
  margin-left: 24px;
  &:focus {
    outline: none;
  }
`
