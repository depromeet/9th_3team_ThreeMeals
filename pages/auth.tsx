import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../src/lib/queries/signInQueries'
import jsCookies from 'js-cookie'
const Auth: React.FC = () => {
  const router = useRouter()

  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: () => {
      console.log('success')
    },
  })

  React.useEffect(() => {
    const { code } = router.query

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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          signIn({
            variables: { accessToken: data.access_token, provider: 'Kakao' },
          })
            .then((token) => {
              jsCookies.set('token', token.data.signIn.token, { path: '/' })
              router.replace('/content')
            })
            .catch((error) => {
              console.log('error:', error)
            })
        }
      })
  }, [router, router.query, signIn])

  return null
}

export default Auth
