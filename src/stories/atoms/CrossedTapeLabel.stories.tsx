import * as React from 'react'
import { storiesOf } from '@storybook/react'
import CrossedTapesLabel from '../../components/atoms/CrossedTapesLabel'

storiesOf('atoms/CrossedTapesLabel', module).add('with text', () => {
  return (
    <div style={{ width: '500px', height: '270px' }}>
      <CrossedTapesLabel />
    </div>
  )
})
