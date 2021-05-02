import * as React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'

interface Props {
  profileImage?: string
  leftIcon?: string
  centerText?: string
  rightIcon?: string
  rightSecondIcon?: string
  rightText?: string

  onClickLeft?: () => void
  onClickRight?: () => void
  onClickSecondRight?: () => void
}

const Header: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Container>
        <ContentLeft>
          {props.profileImage && (
            <ProfileContainer onClick={props.onClickLeft}>
              <ProfileImage src={props.profileImage} />
              <ProfileReviseImage src={IMAGES.btn_20_revise} />
            </ProfileContainer>
          )}
          {props.leftIcon && (
            <LeftIcon src={props.leftIcon} onClick={props.onClickLeft} />
          )}
        </ContentLeft>
        <ContentCenter>
          {props.centerText && <CenterText>{props.centerText}</CenterText>}
        </ContentCenter>
        <ContentRight>
          {props.rightSecondIcon && (
            <RightSecondIcon
              src={props.rightSecondIcon}
              onClick={props.onClickSecondRight}
            />
          )}
          {props.rightIcon ? (
            <RightIcon src={props.rightIcon} onClick={props.onClickRight} />
          ) : (
            <>{props.rightText && <RightText>{props.rightText}</RightText>}</>
          )}
        </ContentRight>
      </Container>
    </>
  )
}
export default Header

const Container = styled.div`
  display: flex;
  height: 64px;
  flex-direction: row;
  align-self: 'stretch';
  background-color: #191919;
  padding-left: 24px;
  padding-right: 24px;
`

const ContentLeft = styled.div`
  flex: 1;
  align-self: center;
`

const ProfileContainer = styled.span`
  cursor: pointer;
`
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
const ProfileReviseImage = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
  right: 12px;
`
const LeftIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`

const ContentCenter = styled.div`
  flex: 1;
  align-self: center;
  text-align: center;
`

const CenterText = styled.div`
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
`
const ContentRight = styled.div`
  flex: 1;
  align-self: center;
  flex-direction: row;
  text-align: right;
`
const RightIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`

const RightSecondIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
`
const RightText = styled.div`
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;
  text-align: end;
  color: #ffffff;
  cursor: pointer;
`
