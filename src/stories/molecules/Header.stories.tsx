// src/stories/Button.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Header from '../../components/molecules/Header'
import { IMAGES } from '../../constants/images'
import { action } from '@storybook/addon-actions'
import DefaultLine from '../../components/atoms/DefaultLine'

storiesOf('molecules/Header', module).add('with text', () => {
  return (
    <>
      <Header
        profileImage={IMAGES.background}
        rightIcon={IMAGES.icon_24_drawer}
        onClickLeft={action('onClickLeft')}
        onClickRight={action('onClickRight')}
        onClickSecondRight={action('onClickSecondRight')}
      />
      <DefaultLine containerStyle={{ height: 10, backgroundColor: 'white' }} />
      <Header
        // profileImage={IMAGES.background}
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        rightSecondIcon={IMAGES.icon_24_alram2_wh}
        onClickLeft={action('onClickLeft')}
        onClickRight={action('onClickRight')}
        onClickSecondRight={action('onClickSecondRight')}
      />
      <DefaultLine containerStyle={{ height: 10, backgroundColor: 'white' }} />
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        centerText={'Hello'}
        rightText={'Hello'}
        onClickLeft={action('onClickLeft')}
        onClickRight={action('onClickRight')}
        onClickSecondRight={action('onClickSecondRight')}
      />
    </>
  )
})
