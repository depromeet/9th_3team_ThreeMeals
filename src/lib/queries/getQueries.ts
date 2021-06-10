import { StickerInfo } from './../../types/types'
import { gql } from '@apollo/client'

export const GET_WRITE_POST_INFO = gql`
  query {
    getWritePostInfo @client
  }
`

export interface GetAllEmoticons {
  getAllEmoticons: StickerInfo[]
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
