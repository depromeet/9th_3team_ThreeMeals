import * as React from 'react'
import { storiesOf } from '@storybook/react'
import CrossedTapesLabel from '../../components/atoms/CrossedTapesLabel'

storiesOf('atoms/CrossedTapesLabel', module).add('with text', () => {
  return <CrossedTapesLabel />
})
