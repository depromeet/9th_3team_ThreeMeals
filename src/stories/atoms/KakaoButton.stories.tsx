import * as React from 'react'
import { storiesOf } from '@storybook/react'
import KakaoButton from '../../components/atoms/KakaoButton'

storiesOf('atoms/KakaoButton', module).add('with text', () => {
  return (
    <div style={{ width: '327px' }}>
      <KakaoButton />
    </div>
  )
})
