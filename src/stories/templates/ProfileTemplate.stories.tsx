import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ProfileTemplate from '../../components/templates/ProfileTemplate'
import { IMAGES } from '../../constants/images'

storiesOf('templates/Profile', module).add('ProfileTemplate', () => {
  return (
    <ProfileTemplate profileImage={IMAGES.background} previewImage={null} />
  )
})
