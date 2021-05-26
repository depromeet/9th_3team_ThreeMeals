import * as React from 'react'
import { storiesOf } from '@storybook/react'
import OthersContentTemplate from '../../components/templates/OthersContentTemplate'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'

storiesOf('templates/Content', module).add('OthersContentTemplate', () => {
  return (
    <AppContainer>
      <OthersContentTemplate profileImage={IMAGES.background} />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
