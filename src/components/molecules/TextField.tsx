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
      <div>{props.label}</div>
      <input
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
