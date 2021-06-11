import { StickerInfo } from './../../types/types'
import { gql } from '@apollo/client'

export const GET_WRITE_POST_INFO = gql`
  query {
    getWritePostInfo @client
  }
`

export interface GetEmoticonInfo {
  id: string
  position: {
    positionX: number
    positionY: number
  }
  fileUrl: string
}

export interface GetAllEmoticons {
  getAllEmoticons: GetEmoticonInfo[]
}

export const GET_ALL_EMOTICONS = gql`
  query {
    getAllEmoticons {
      id
      fileUrl
      name
    }
  }
`
