import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HomePage from '../../components/pages/HomePage'

storiesOf('page/Home', module).add('homePage', () => {
  return <HomePage />
})
