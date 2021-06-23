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
  node: {
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
}

interface ChildrenCommentInfo {
  node: {
    id: string
    content: string
    secretType: string
    commentState: string
    createdAt: string
    updatedAt: string
    account: Account
    postId: string
    parentId: string
    profileUrl: string
  }
}

export interface ParentComments {
  getParentComments: {
    edges: ParentCommentInfo[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
}
export interface ChildrenComments {
  getChildrenComments: {
    edges: ChildrenCommentInfo[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
}

export const GET_PARENT_COMMENTS = gql`
  query getParentComments($first: Float!, $postId: String!) {
    getParentComments(first: $first, postId: $postId) {
      edges {
        node {
          id
          content
          secretType
          postId
          account {
            id
          }
          childrenCount
          createdAt
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
    $parentId: String!
    $postId: String!
  ) {
    getChildrenComments(first: $first, parentId: $parentId, postId: $postId) {
      edges {
        node {
          id
          content
          secretType
          commentState
          createdAt
          updatedAt
          account {
            id
            nickname
            profileUrl
          }
          postId
          parentId
        }
      }
    }
  }
`
