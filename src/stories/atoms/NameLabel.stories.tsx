import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NameLabel from '../../components/atoms/NameLabel'

storiesOf('atoms/NameLabel', module).add('with text', () => {
  return <NameLabel text={'secret 24'} />
})
