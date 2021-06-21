import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HomeTemplate from '../../components/templates/HomeTemplate'
import styled from 'styled-components'

storiesOf('templates/Home', module).add('homeTemplate', () => {
  return (
    <AppContainer>
      <HomeTemplate isProfile={false} randomIndex={0} />
    </AppContainer>
  )
})
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
