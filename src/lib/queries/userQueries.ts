import { gql } from '@apollo/client'
import { SnsInfo } from './meQueries'

export interface getAccountInfo {
  getAccountInfo: {
    id: string
    nickname: string
    status: string
    image: string
    content: string
    profileUrl: string
    snsInfos: SnsInfo[]
  }
}

export const GET_ACCOUNT_INFO = gql`
  query getAccountInfo($accountId: String!) {
    getAccountInfo(accountId: $accountId) {
      id
      nickname
      status
      image
      content
      profileUrl
      snsInfos {
        url
        snsType
        snsId
      }
    }
  }
`
