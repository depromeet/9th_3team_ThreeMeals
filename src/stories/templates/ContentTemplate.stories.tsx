import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ContentTemplate from '../../components/templates/ContentTemplate'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'

storiesOf('templates/Content', module).add('ContentTemplate', () => {
  return (
    <AppContainer>
      <ContentTemplate profileImage={IMAGES.background} isProfile={false} />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
