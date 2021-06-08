import { gql } from '@apollo/client'

export interface getPostParams {
  first: number
  accountId?: string
}
export interface postCount {
  count: number
  postType: string
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
    fromAccount: {
      id: string
    }
    usedEmoticons: {
      id: string
      positionX: number
      positionY: number
      emoticon: {
        id: string
        fileUrl: string
      }
    }[]
  }
  cursor: string
}

export interface getPost {
  getMyNewPostCount: {
    postCount: postCount[]
  }
  getPosts: {
    edges: getPostEdges[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
}

export const GET_POST = gql`
  query {
    getMyNewPostCount(postType: Answer) {
      postCount {
        count
        postType
      }
    }
    getPosts(first: 10, accountId: "5") {
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
            positionX
            positionY
            emoticon {
              id
              fileUrl
            }
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
