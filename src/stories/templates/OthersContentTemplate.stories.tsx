import * as React from 'react'
import { storiesOf } from '@storybook/react'
import OthersContentTemplate from '../../components/templates/OthersContentTemplate'
import { IMAGES } from '../../constants/images'

storiesOf('templates/Content', module).add('OthersContentTemplate', () => {
  return <OthersContentTemplate profileImage={IMAGES.background} />
})
