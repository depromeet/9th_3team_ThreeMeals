import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import DefaultInput from '../../components/atoms/DefaultInput'

storiesOf('atoms/DefaultInput', module).add('with text', () => {
  return (
    <DefaultInput
      placeholder={'댓글을 입력하세요.'}
      onChange={action('onChange')}
      containerStyle={{
        width: '343px',
        height: '48px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    />
  )
})
