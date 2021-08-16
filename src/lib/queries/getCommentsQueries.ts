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
interface LikeComment {
  id: string
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
    likedComments: LikeComment[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
}

export interface ChildrenCommentInfo {
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
    image: string
    likedComments: LikeComment[]
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
          likedComments {
            id
          }
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
          likedComments {
            id
          }
          createdAt
          updatedAt
          account {
            id
            nickname
            image
          }
          postId
          parentId
        }
      }
    }
  }
`
