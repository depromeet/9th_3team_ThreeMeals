import * as React from 'react'
import { storiesOf } from '@storybook/react'
import DefaultLine from '../../components/atoms/DefaultLine'

storiesOf('atoms/DefaultLine', module).add('with text', () => {
  return <DefaultLine />
})
