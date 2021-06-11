import { BackColor, StickerInfo } from './../../types/types'
import { makeVar } from '@apollo/client'

export interface WritePostInfo {
  content?: string
  toAccountId?: string
  color?: BackColor
  secretType?: string
  postType?: string
  emoticons?: StickerInfo[]
}

const writePostInfoVar = makeVar<WritePostInfo | null>(null)

export const addToWritePostInfo = (info: WritePostInfo) => {
  const curPostInfo = writePostInfoVar()
  const infoArr = Object.entries(info)
  const newValueArr = infoArr.filter((info) => info[1] !== undefined)
  if (newValueArr.length > 1) {
    writePostInfoVar({
      ...curPostInfo,
      [newValueArr[0][0]]: newValueArr[0][1],
      [newValueArr[1][0]]: newValueArr[1][1],
      [newValueArr[2][0]]: newValueArr[2][1],
      [newValueArr[3][0]]: newValueArr[3][1],
    })
  } else {
    writePostInfoVar({
      ...curPostInfo,
      [newValueArr[0][0]]: newValueArr[0][1],
    })
  }
}

export default writePostInfoVar
