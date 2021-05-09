import * as React from 'react'
import { storiesOf } from '@storybook/react'
import AlarmContentField from '../../components/molecules/AlarmContentField'

storiesOf('molecules/AlarmContentField', module).add('with default', () => {
  return (
    <div style={{ width: '400px', padding: '10px' }}>
      <AlarmContentField
        content="12개의 새로운 카드가 작성되었습니다."
        contentType="김덕배님의 물어봐"
        time="10분전"
      />
    </div>
  )
})
