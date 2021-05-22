import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ProfileTemplate from '../../components/templates/ProfileTemplate'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'

storiesOf('templates/Profile', module).add('ProfileTemplate', () => {
  return (
    <AppContainer>
      <ProfileTemplate profileImage={IMAGES.background} previewImage={null} />
    </AppContainer>
  )
})
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
