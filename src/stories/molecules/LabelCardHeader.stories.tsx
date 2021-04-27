import * as React from 'react'
import { storiesOf } from '@storybook/react'

import LabelCardHeader from '../../components/molecules/LabelCardHeader'

storiesOf('molecules/LabelCardHeader', module).add('with Like Active', () => {
  return <LabelCardHeader labelString="-13:23:34" isLikeActive />
})
