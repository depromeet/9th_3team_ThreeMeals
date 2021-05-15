import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HomeTemplate from '../../components/templates/HomeTemplate'

storiesOf('templates/Home', module).add('homeTemplate', () => {
  return <HomeTemplate isProfile={false} />
})
