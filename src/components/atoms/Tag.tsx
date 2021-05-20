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
  isNonClose?: boolean
}

const Container = styled.div`
  font-family: SF Pro Display;
`
const StyledTag = styled(NextButton)`
  font-size: 15px;
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
const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  position: relative;
  color: #ffffffb2;
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
        {!props.isNonClose && (
          <CloseIcon
            src={IMAGES.icon_24_close_green_wh}
            onClick={() => {
              props.onClickClose && props.id && props.onClickClose(props.id)
            }}
          />
        )}
      </StyledTag>
    </Container>
  )
}

export default Tag
