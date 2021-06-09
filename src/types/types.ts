import Konva from 'konva'

/*
오렌지 - #FF823D
그린 - #67D585
블루 - #6799FE
옐로우 - #F1D75F
레드 - #CC4349
*/
export type BackColor =
  | '#6799FE'
  | '#67D585'
  | '#FF823D'
  | '#CC4349'
  | '#F1D75F'

export interface StickerInfo {
  fileUrl: string
  width?: 140 | number
  positions?: Konva.Vector2d | null
}
