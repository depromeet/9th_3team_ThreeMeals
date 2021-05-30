import React, { VFC, useState } from 'react'
import WritePostTemplate from '../templates/WritePostTemplate'
import { useRouter } from 'next/router'
import { BackColor } from '../../types/types'

const WritePostPage: VFC = () => {
  const router = useRouter()
  const query = router.query
  const [backColor, setBackColor] = useState<BackColor>('#67D585')
  const [optionActiveState, setOptionActiveState] = useState({
    Temp: false,
    Forever: false,
  })
  return (
    <div>
      <WritePostTemplate
        TempType={query?.name !== undefined ? query.name : 'null'}
        optionActiveState={optionActiveState}
        backColor={backColor}
      />
    </div>
  )
}

export default WritePostPage
