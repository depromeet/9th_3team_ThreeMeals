import Avatar from 'boring-avatars'
import React, { FC } from 'react'

interface Props {
  size: string
}

const avatarNamesArr = [
  'Mary Roebling',
  'Margaret Brent',
  'Katharine Graham',
  'Rosa Parks',
  'Christa McAuliffe',
  'Jovita Idár',
  'Lyda Conley',
  'Elizabeth Cady',
  'Jane Addams',
  'Florence Chadwick',
]

const EmptyProfileImg: FC<Props> = ({ size }) => {
  const avatarProps = {
    size: `${size}`,
    name: avatarNamesArr[Math.floor(Math.random() * 10)],
    variant: 'beam' as
      | 'marble'
      | 'beam'
      | 'pixel'
      | 'sunset'
      | 'ring'
      | 'bauhaus'
      | undefined,
    colors: ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  }
  return <Avatar {...avatarProps} />
}

export default React.memo(EmptyProfileImg)
