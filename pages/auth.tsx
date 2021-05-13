import React from 'react'
import { useRouter } from 'next/router'

const Auth: React.FC = () => {
  const rotuer = useRouter()
  const [isLogined, setIsLogined] = React.useState(false)

  React.useEffect(() => {
    const { code } = rotuer.query

    if (!code) return

    const bodyData = {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
      redirect_uri: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth`,
      code,
    }
    const queryStringBody = Object.keys(bodyData)
      .map((k) => encodeURIComponent(k) + '=' + encodeURI(bodyData[k]))
      .join('&')

    fetch(`https://kauth.kakao.com/oauth/token?${queryStringBody}`, {
      method: 'POST',
      //   headers: kakaoHeader,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem('kakao_token', data.access_token)
        if (data.access_token) {
          setIsLogined(true)
        }
      })
  }, [rotuer.query])

  return (
    <div>
      {isLogined && '로그인 되었습니다!'}
      {!isLogined && '로그인 중입니다!!'}
    </div>
  )
}

export default Auth
