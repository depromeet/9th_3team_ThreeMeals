import { gql } from '@apollo/client'

interface Account {
  id: string
  nickname: string
  providerId: string
  status: string
  image: string
  content: string
  profileUrl: string
  createdAt: string
  updatedAt: string
}

interface ParentCommentInfo {
  id: string
  content: string
  secretType: string
  commentState: string
  createdAt: string
  updatedAt: string
  account: Account
  postId: string
  childrenCount: number
  parentId: string
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
  }
}

interface ChildrenCommentInfo {
  id: string
  content: string
  secretType: string
  commentState: string
  createdAt: string
  updatedAt: string
  account: Account
  postId: string
  parentId: string
}

export type ParentComments = ParentCommentInfo[]
export type ChildrenComments = ChildrenCommentInfo[]

export const GET_PARENT_COMMENTS = gql`
  query getParentComments($first: Float!, $postId: String!) {
    getParentComments(first: $first, postId: $postId) {
      edges {
        node {
          id
          content
          secretType
          account {
            id
          }
          childrenCount
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
export const GET_CHILDREN_COMMENTS = gql`
  query getChildrenComments(
    $first: Float!
    $after: string
    $postId: string!
    $parentId: string!
  ) {
    getChildrenComments(
      first: $first
      after: $after
      postId: $postId
      parentId: $parentId
    ) {
      edges {
        node {
          id
          content
          secretType
          commentState
          createdAt
          updatedAt
          account
          postId
          parentId
        }
      }
    }
  }
`
