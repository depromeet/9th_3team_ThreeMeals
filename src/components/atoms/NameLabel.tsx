import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.span`
  display: inline-flex;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 24px;
  position: relative;
  padding: 4px;
  padding-right: 12px;

  span {
    font-size: 17px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.02em;
    margin-left: 9px;
  }

  img {
    border-radius: 50%;
  }
`

interface Props {
  profileUrl?: string
  text: string
}

const NameLabel: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <Image
        priority={true}
        src={props.profileUrl || 'https://www.fillmurray.com/50/50'}
        width={32}
        height={32}
      />
      <span>{props.text}</span>
    </Container>
  )
}

export default NameLabel
