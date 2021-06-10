import { WritePostInfo } from './../localStore/writePost'
import gql from 'graphql-tag'

export type CreatePostParams = WritePostInfo

export interface CreatePostRes {
  content: string
}

export const GET_WRITE_POST_INFO = gql`
  query {
    getWritePostInfo @client
  }
`

export const CREATE_POST = gql`
  mutation createPost(
    $content: String!
    $toAccountId: String!
    $color: String!
    $secretType: String!
    $postType: String!
    $emoticons: [emoticons!]!
  ) {
    createPost(
      content: $content
      toAccountId: $toAccountId
      color: $color
      secretType: $secretType
      postType: $postType
      emoticons: $emoticons
    ) {
      content
    }
  }
`
