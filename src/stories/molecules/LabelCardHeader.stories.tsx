import * as React from 'react'
import { storiesOf } from '@storybook/react'

import LabelCardHeader from '../../components/molecules/LabelCardHeader'
import CardLabel from '../../components/atoms/CardLabel'
import PrivateCardLabel from '../../components/atoms/PrivateCardLabel'
import { action } from '@storybook/addon-actions'

storiesOf('molecules/LabelCardHeader', module).add('with Like Active', () => {
  return (
    <div style={{ width: 330 }}>
      <LabelCardHeader
        labelComponent={<CardLabel text="-13:33:33" active />}
        isLikeActive
        onClickLike={action('onClickLike')}
      />
    </div>
  )
})

storiesOf('molecules/LabelCardHeader', module).add('with Like Inactive', () => {
  return (
    <div style={{ width: 330 }}>
      <LabelCardHeader
        labelComponent={<CardLabel text="-13:33:33" active />}
        onClickLike={action('onClickLike')}
      />
    </div>
  )
})

storiesOf('molecules/LabelCardHeader', module).add('with private label', () => {
  return (
    <div style={{ width: 330 }}>
      <LabelCardHeader
        labelComponent={<PrivateCardLabel text="BONG IN" active />}
        onClickLike={action('onClickLike')}
      />
    </div>
  )
})
