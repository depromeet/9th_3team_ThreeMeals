import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ProfileEditTemplate from '../../components/templates/ProfileEditTemplate'
import styled from 'styled-components'

storiesOf('templates/ProfileEdit', module).add('ProfileEditTemplate', () => {
  return (
    <AppContainer>
      <ProfileEditTemplate />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
