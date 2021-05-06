import * as React from 'react'
import { storiesOf } from '@storybook/react'
import CommentCount from '../../components/atoms/CommentCount'

storiesOf('atoms/CommentCount', module).add('with text', () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <CommentCount count={40} />
    </div>
  )
})
