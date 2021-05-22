import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ProfilePage from '../../components/pages/ProfilePage'

storiesOf('page/Profile', module).add('ProfilePage', () => {
  return <ProfilePage />
})
