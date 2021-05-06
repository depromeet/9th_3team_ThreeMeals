import React, { FC } from 'react'
import styled from 'styled-components'
import { SVGS } from '../../constants/svgs'
const Button = styled.button`
  min-width: 327px;
  /* width: 50%; */
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #fee500;
  background: #ffe812;
  font-family: 'Apple SD Gothic Neo';
  font-weight: 700;
  cursor: pointer;
`

const KakaoButton: FC = () => {
  return (
    <Button
      onClick={() => {
        window.Kakao.Auth.authorize({
          redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth`,
        })
      }}
    >
      <img src={SVGS.icon_24_kakao} alt="Balloon" />
      <span>카카오 로그인</span>
    </Button>
  )
}

export default KakaoButton
