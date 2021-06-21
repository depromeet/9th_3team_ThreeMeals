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
  read: string
  notificationType: string
  relatedPost: {
    id: string
    postType: string
    content: string
  }
  otherAccount: {
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
