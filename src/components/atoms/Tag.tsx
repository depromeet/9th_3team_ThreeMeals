import React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
  background-color: #242424;
  border-radius: 11px;
  padding: 0 8px;
  padding-bottom: 2px;
`
const StyledTag = styled(CopyToClipboard)`
  font-size: 15px;
  letter-spacing: -0.02em;
  text-align: left;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  padding-right: 8px;
`
const Icon = styled.img`
  margin-top: 4px;
  width: 16px;
  height: 16px;
  margin-right: 2px;
  position: relative;
  color: #ffffffb2;
  float: left;
`

const CloseIcon = styled.img`
  position: relative;
  top: 5px;
  width: 14px;
  height: 14px;
`
const Text = styled.span`
  margin-top: 2px;
  float: left;
  cursor: pointer;
`
const Tag: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <Icon src={props.icon} />
      <StyledTag text={props.text}>
        <Text>{props.text}</Text>
      </StyledTag>
      {!props.isNonClose && (
        <CloseIcon
          src={IMAGES.icon_24_close_green_wh}
          onClick={() => {
            props.onClickClose && props.id && props.onClickClose(props.id)
          }}
        />
      )}
    </Container>
  )
}

export default Tag
