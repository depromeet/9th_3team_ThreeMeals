import * as React from 'react'
import { storiesOf } from '@storybook/react'
import IconOnImage from '../../components/atoms/IconOnImage'
import { IMAGES } from '../../constants/images'

storiesOf('atoms/IconOnImage', module).add('with text', () => {
  return (
    <IconOnImage
      image={IMAGES.background}
      icon={IMAGES.icon_20_camera}
      imageStyle={{ width: 88, height: 88 }}
      iconStyle={{ width: 20, height: 20 }}
    />
  )
})
