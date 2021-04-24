// src/stories/Button.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import CardLabel from '../../components/atoms/CardLabel'

storiesOf('atoms/CardLabel', module).add('with text', () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <CardLabel text={'secret 24'} />
    </div>
  )
})

storiesOf('atoms/CardLabel', module).add('with time', () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <CardLabel text={new Date().toISOString()} />
    </div>
  )
})
