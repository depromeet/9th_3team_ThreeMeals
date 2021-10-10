import React, { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'

import HomeTemplate from '../templates/HomeTemplate'
const AppContainer = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  overflow: auto;
`
const HomePage: VFC = () => {
  const [randomIndex, setRandomIndex] = useState<number>(0)

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * 12))
  }, [])
  return (
    <AppContainer>
      <HomeTemplate isProfile={false} randomIndex={randomIndex} />
    </AppContainer>
  )
}

export default HomePage
