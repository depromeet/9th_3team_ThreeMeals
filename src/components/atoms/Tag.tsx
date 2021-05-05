import React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import NextButton from './NextButton'

interface Props {
  id?: string
  href: string
  text: string
  icon?: string
  onClickClose?: (id: string) => void
}

const Container = styled.div`
  font-family: SF Pro Display;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.02em;
  text-align: left;
  color: white;
  background-color: #242424;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  padding: 0 8px;
`
const StyledTag = styled(NextButton)`
  color: white;
`
const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  position: relative;
  top: 2.5px;
`

const CloseIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 8px;
`
const Text = styled.span`
  margin-top: 2px;
`
const Tag: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <StyledTag href={props.href}>
        <Icon src={props.icon} />
        <Text>{props.text}</Text>
      </StyledTag>
      <CloseIcon
        src={IMAGES.icon_24_close_green_wh}
        onClick={() => {
          props.onClickClose && props.id && props.onClickClose(props.id)
        }}
      />
    </Container>
  )
}

export default Tag
