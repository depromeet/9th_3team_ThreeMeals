import React, { FC } from 'react'
import WritePostTemplate from '../templates/WritePostTemplate'
import { useRouter } from 'next/router'
interface Props {}

const WritePostPage: FC<Props> = (props) => {
  const params = useRouter

  return (
    <div>
      <WritePostTemplate TempType={} isWithSticker={} optionActiveState={} />
    </div>
  )
}

export default WritePostPage
