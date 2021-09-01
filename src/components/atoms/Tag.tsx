import React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Link from 'next/link'
import { SVGS } from '../../constants/svgs'

interface Props {
  id?: string
  text?: string
  url?: string
  icon?: string
  onClickClose?: (id: string) => void
  isNonClose?: boolean
  external?: boolean
  type: 'sns' | 'profileUrl'
  snsId?: string
  snsUrl?: string
}

const Container = styled.div`
  font-family: SF Pro Display;
  background-color: #242424;
  border-radius: 11px;
  padding: 0 0.6rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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
  margin-left: 3px;
  float: left;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
`

const SnsLinkText = styled.a`
  margin-top: 3px;
  float: left;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  gap: 0.3rem;
`
const InstaIcon = styled.img`
  aspect-ratio: 1/1;
  width: 1.2rem;
  margin-bottom: 3px;
`

const Tag: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      {props.type === 'profileUrl' && props.url ? (
        <>
          <IconContainer>
            {props.icon && <Icon src={props.icon} />}
          </IconContainer>
          <StyledTag
            text={props.url}
            onCopy={() => {
              window.alert(
                '프로필 링크가 복사되었습니다. \n링크를 공유해보세요!'
              )
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
        </>
      ) : (
        props.type === 'sns' && (
          <IconContainer>
            {props.snsUrl && (
              <Link passHref href={props.snsUrl}>
                <SnsLinkText>
                  <InstaIcon src={SVGS.icon_16_insta_wh} />
                  {props.snsId}
                </SnsLinkText>
              </Link>
            )}
          </IconContainer>
        )
      )}
    </Container>
  )
}

export default Tag
