import { useRouter } from 'next/router'
import React, { VFC } from 'react'
import styled from 'styled-components'

import HomeTemplate from '../templates/HomeTemplate'
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const HomePage: VFC = () => {
  const router = useRouter()

  React.useEffect(() => {
    document.cookie = `token=fooBar; path=/`
  }, [])

  return (
    <AppContainer>
      <HomeTemplate isProfile={false} />
      <button
        style={{
          background: 'white',
        }}
        onClick={() => {
          router.push('/profile')
        }}
      >
        프로필로!!!
      </button>
    </AppContainer>
  )
}

export default HomePage
