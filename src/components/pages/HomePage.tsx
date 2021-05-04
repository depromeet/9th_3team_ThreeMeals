import React, { VFC } from 'react'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import HomeTemplate from '../templates/HomeTemplate'
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const HomePage: VFC = () => {
  return (
    <AppContainer>
      <HomeTemplate isProfile={true} profileImage={IMAGES.background} />
    </AppContainer>
  )
}

export default HomePage
