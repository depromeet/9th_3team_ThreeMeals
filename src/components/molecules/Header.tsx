import * as React from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { slide as Menu } from 'react-burger-menu'
import { useRouter } from 'next/router'
import Link from 'next/link'
import EmptyProfileImg from '../atoms/EmptyProfileImg'
interface Props {
  isProfile?: boolean
  isLogin?: boolean
  profileImage?: string | null
  myProfileImage?: string
  leftIcon?: string
  centerText?: string
  rightIcon?: string
  rightSecondIcon?: string
  rightText?: string
  blurRightText?: boolean
  isOthersContent?: boolean
  onClickLeft?: () => void
  onClickRight?: () => void
  onClickSecondRight?: () => void
  onClickHowToUse?: () => void
  onClickContect?: () => void
}

const Header: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const router = useRouter()
  const { onClickRight } = props

  const onClickRightBtn = React.useCallback(() => {
    setIsOpen(true)
    onClickRight && onClickRight()
  }, [onClickRight])

  const onClickExit = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const onClickMyFeed = React.useCallback(() => {
    if (props.isLogin) {
      router.push('/content')
    } else {
      window.Kakao.Auth.authorize({
        redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth`,
      })
    }
  }, [props.isLogin, router])

  return (
    <>
      <Container>
        <ContentLeft>
          {props.isProfile && (
            <ProfileContainer onClick={props.onClickLeft}>
              {props.profileImage === null ? (
                <EmptyProfileImg size="3rem" />
              ) : (
                <ProfileImage src={props.profileImage} />
              )}
              {!props.isOthersContent && (
                <ProfileReviseImage src={IMAGES.btn_20_revise} />
              )}
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
            <>
              <RightIcon src={props.rightIcon} onClick={onClickRightBtn} />
              <BurgerMenu
                right={true}
                width={331}
                customBurgerIcon={false}
                onClose={onClickExit}
                isOpen={isOpen}
                noOverlay
              >
                {!props.isOthersContent && props.profileImage && (
                  <BurgerProfileImage src={props.profileImage} />
                )}
                {props.isOthersContent && props.myProfileImage && (
                  <BurgerProfileImage src={props.myProfileImage} />
                )}
                <BurgerContent>
                  <BurgerText
                    style={{ marginBottom: '4rem' }}
                    onClick={onClickMyFeed}
                  >
                    {props.isLogin ? 'My feed' : 'Log in'}
                  </BurgerText>
                  <Link
                    href="https://hush-it.notion.site/Hush-1e3de882b5d544b8b30c9913635c1474"
                    passHref
                  >
                    <BurgerLink>How to use</BurgerLink>
                  </Link>
                </BurgerContent>
                {props.isLogin && (
                  <BurgerSmallText onClick={() => router.push('/contactUs')}>
                    contact us
                  </BurgerSmallText>
                )}
                <BurgerExitContent onClick={props.onClickContect}>
                  <BurgerExitIcon
                    src={IMAGES.icon_24_close_wh}
                    onClick={onClickExit}
                  />
                </BurgerExitContent>
              </BurgerMenu>
            </>
          ) : (
            <>
              {props.rightText && (
                <RightText
                  onClick={!props.blurRightText ? onClickRightBtn : undefined}
                  style={{
                    opacity: props.blurRightText === true ? 0.5 : 1,
                  }}
                >
                  {props.rightText}
                </RightText>
              )}
            </>
          )}
        </ContentRight>
      </Container>
    </>
  )
}
export default React.memo(Header)

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
  top: 0;
`
const RightIcon = styled.img`
  width: 24px !important;
  height: 24px !important;
  cursor: pointer;
`

const RightSecondIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
`
const RightText = styled.span`
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;
  text-align: end;
  color: #ffffff;
  cursor: pointer;
`

const BurgerMenu = styled(Menu)`
  backdrop-filter: blur(18px);
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 16px;
    height: 16px;
    left: 36px;
    top: 36px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    top: 56px !important;
    right: 24px !important;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
    height: 16px !important;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  &.bm-menu-wrap {
    position: fixed;
    height: 100%;
    top: 0;
  }

  /* General sidebar styles */
  .bm-menu {
    padding: 0 1.5em 0;
    font-size: 1.15em;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
  }
`

const BurgerProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 56px;
  left: 24px;
  &:focus {
    outline: none;
  }
`

const BurgerContent = styled.div`
  height: 100%;

  @media only screen and (max-height: 568px) {
    padding-top: 48%;
  }
  @media only screen and (min-height: 568px) {
    padding-top: 70%;
  }
  &:focus {
    outline: none;
  }
`

const BurgerText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  /* identical to box height, or 125% */

  text-align: center;
  letter-spacing: -0.04em;

  color: #ffffff;
  cursor: pointer;
`

const BurgerLink = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  /* identical to box height, or 125% */

  text-align: center;
  letter-spacing: -0.04em;

  color: #ffffff; ;
`

const BurgerSmallText = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  text-align: center;
  letter-spacing: -0.04em;

  color: #ffffff;
  cursor: pointer;
  position: relative;
  @media only screen and (max-height: 568px) {
    bottom: 120px;
  }
  @media only screen and (min-height: 568px) {
    bottom: 168px;
  }
  &:focus {
    outline: none;
  }
`

const BurgerExitContent = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media only screen and (max-height: 568px) {
    bottom: 80px;
  }
  @media only screen and (min-height: 568px) {
    bottom: 89px;
  }

  &:focus {
    outline: none;
  }
`
const BurgerExitIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`
