// src/stories/Button.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextField from '../../components/molecules/TextField'

storiesOf('molecules/TextField', module).add('with text', () => {
  return (
    <>
      <TextField
        label="이름"
        placeholder="이름을 작성해주세요!"
        onChange={action('onChange')}
      />
      <TextField
        label="소개"
        placeholder="소개글을 작성해주세요!"
        onChange={action('onChange')}
      />
    </>
  )
})
