import { gql } from '@apollo/client'

export interface getPostParams {
  first: number
  accountId?: string
}
export interface getMyNewPostCountParams {
  postType?: string
}

interface getPostEdges {
  node: {
    id: string
    content: string
    postType: string
    secretType: string
    createdAt: string
    updatedAt: string
    commentsCount: number
    color: string
    fromAccount: {
      id: string
    }
    usedEmoticons: {
      id: string
      position: {
        positionX: number
        positionY: number
      }
      fileUrl: string
    }[]
  }
  cursor: string
}

export interface postCount {
  count: number
  postType: string
}

export interface getMyNewPostCount {
  getMyNewPostCount: {
    postCount: postCount[]
  }
}
export interface getPost {
  getPosts: {
    edges: getPostEdges[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
}
export const GET_MY_NEW_POST_COUNT = gql`
  query GetMyNewPostCount($postType: PostType!) {
    getMyNewPostCount(postType: $postType) {
      postCount {
        count
        postType
      }
    }
  }
`

export const GET_POST = gql`
  query getPosts($first: Float!, $accountId: String!) {
    getPosts(first: $first, accountId: $accountId) {
      edges {
        node {
          id
          content
          postType
          secretType
          fromAccount {
            id
          }
          usedEmoticons {
            id
            position {
              positionX
              positionY
            }
            fileUrl
            name
          }
          createdAt
          updatedAt
          commentsCount
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
