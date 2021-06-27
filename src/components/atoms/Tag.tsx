import React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  id?: string
  text: string
  url: string
  icon?: string
  onClickClose?: (id: string) => void
  isNonClose?: boolean
  external?: boolean
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
`

const IconContainer = styled.div`
  margin-top: 4px;
  margin-right: 2px;
  position: relative;
  color: #ffffffb2;
  float: left;
`
const Icon = styled.img`
  width: 16px;
  height: 16px;
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
      <IconContainer>{props.icon && <Icon src={props.icon} />}</IconContainer>
      <StyledTag
        text={props.url}
        onCopy={() => {
          window.alert('클립보드에 복사되었습니다.')
        }}
      >
        <Text style={{ paddingRight: props.icon ? '8px' : '2px' }}>
          {props.text}
        </Text>
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
