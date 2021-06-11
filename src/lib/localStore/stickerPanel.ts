import { makeVar } from '@apollo/client'

export interface StickerPanelPropsInfo {
  imgUrl?: string
  width?: number
  clickedSticker?: boolean
  closeDeleteBtn?: boolean
  emoticonId?: string
}

const addToPanelVar = makeVar<StickerPanelPropsInfo>({
  imgUrl: '',
  width: 0,
  clickedSticker: false,
  closeDeleteBtn: false,
  emoticonId: '',
})

export const addToPanel = (info: StickerPanelPropsInfo) => {
  const curPanelInfo = addToPanelVar()
  const infoArr = Object.entries(info)
  const newValueArr = infoArr.filter((info) => info[1] !== undefined)
  if (newValueArr.length > 1) {
    addToPanelVar({
      ...curPanelInfo,
      [newValueArr[0][0]]: newValueArr[0][1],
      [newValueArr[1][0]]: newValueArr[1][1],
      [newValueArr[2][0]]: newValueArr[2][1],
    })
  } else {
    addToPanelVar({
      ...curPanelInfo,
      [newValueArr[0][0]]: newValueArr[0][1],
    })
  }
}

export default addToPanelVar
