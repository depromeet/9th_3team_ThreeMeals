// src/stories/Button.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Tag from '../../components/atoms/Tag'

storiesOf('atoms/Tag', module).add('with text', () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Tag text="figma.com" href="https://google.com" />
    </div>
  )
})
