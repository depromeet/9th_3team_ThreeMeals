import * as React from 'react'
import { storiesOf } from '@storybook/react'
import WriteQACard from '../../components/organisms/WriteQACard'

storiesOf('organisms/WriteQACard', module).add('OXFeed', () => {
  return <WriteQACard isWithSticker={false} backColor="#FF823D" />
})

storiesOf('organisms/WriteQACard', module).add('Q&AFeed', () => {
  return <WriteQACard isWithSticker={true} backColor="#6799FE" />
})
