import * as React from 'react'
import { storiesOf } from '@storybook/react'

import QuizCardHeader from '../../components/molecules/QuizCardHeader'

storiesOf('molecules/QuizCardHeader', module).add('with Like Active', () => {
  return (
    <div style={{ width: 330 }}>
      <QuizCardHeader color="blue" isLikeActive />
    </div>
  )
})
