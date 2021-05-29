import React, { VFC } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import HomeTemplate from '../templates/HomeTemplate'
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const HomePage: VFC = () => {
  const router = useRouter()
  return (
    <AppContainer>
      <HomeTemplate isProfile={false} />
    </AppContainer>
  )
}

export default HomePage
