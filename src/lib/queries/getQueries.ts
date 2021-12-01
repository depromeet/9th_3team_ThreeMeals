import { AccountResType } from './meQueries'
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

export interface GetNotification {
  id: string
  createdAt: string
  updatedAt: string
  read: boolean
  notificationType: string
  relatedPost: {
    id: string
    postType: 'Ask' | 'Quiz' | 'Answer'
    content: string
  }
  otherAccount: {
    id: string
    nickname: string
  }
}

export interface GetAllNotification {
  getNotifications: GetNotification[]
}

export interface getUnreadNotiCount {
  getUnreadNotiCount: {
    count: number
  }
}

export interface getFavorite {
  id: string
  account: AccountResType
  favoriteAccount: AccountResType
  createdAt: string
  updatedAt: string
}

export interface getFavorites {
  getFavorites: getFavorite[]
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

export const GET_NOTIFICATIONS = gql`
  query {
    getNotifications {
      id
      createdAt
      updatedAt
      read
      notificationType
      relatedPost {
        id
        postType
        content
      }
      otherAccount {
        id
        nickname
      }
    }
  }
`
export const GET_UNREAD_NOTI_COUNT = gql`
  query {
    getUnreadNotiCount {
      count
    }
  }
`
export const GET_FAVORITES = gql`
  query {
    getFavorites {
      id

      favoriteAccount {
        id
        nickname
        image
      }
    }
  }
`
