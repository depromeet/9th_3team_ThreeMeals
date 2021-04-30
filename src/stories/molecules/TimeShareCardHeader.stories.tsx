import * as React from 'react'
import { storiesOf } from '@storybook/react'

import TimeShareCardHeader from '../../components/molecules/TimeShareCardHeader'

storiesOf('molecules/TimeShareCardHeader', module).add('with default', () => {
  return (
    <div style={{ width: 330 }}>
      <TimeShareCardHeader />
    </div>
  )
})
