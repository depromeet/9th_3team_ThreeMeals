import React, { FC } from 'react'
import styled from 'styled-components'
import { SVGS } from '../../constants/svgs'
const Button = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #fee500;
  background: #ffe812;
  font-weight: 700;
  cursor: pointer;
  .btn-text {
    color: black;
  }
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
      <span className="btn-text">카카오 로그인</span>
    </Button>
  )
}

export default KakaoButton
