import * as React from 'react'
import { storiesOf } from '@storybook/react'

import LabelCardHeader from '../../components/molecules/LabelCardHeader'
import CardLabel from '../../components/atoms/CardLabel'
import PrivateCardLabel from '../../components/atoms/PrivateCardLabel'

storiesOf('molecules/LabelCardHeader', module).add('with Like Active', () => {
  return (
    <div style={{ width: 330 }}>
      <LabelCardHeader
        labelComponent={<CardLabel text="-13:33:33" />}
        isLikeActive
      />
    </div>
  )
})

storiesOf('molecules/LabelCardHeader', module).add('with Like Inactive', () => {
  return (
    <div style={{ width: 330 }}>
      <LabelCardHeader labelComponent={<CardLabel text="-13:33:33" />} />
    </div>
  )
})

storiesOf('molecules/LabelCardHeader', module).add('with private label', () => {
  return (
    <div style={{ width: 330 }}>
      <LabelCardHeader labelComponent={<PrivateCardLabel text="BONG IN" />} />
    </div>
  )
})
