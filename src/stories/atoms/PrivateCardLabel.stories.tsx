// src/stories/Button.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import PrivateCardLabel from '../../components/atoms/PrivateCardLabel'

storiesOf('atoms/PrivateCardLabel', module).add('with text', () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <PrivateCardLabel text={'BONG-IN'} />
    </div>
  )
})
