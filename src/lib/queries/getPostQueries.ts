import { BackColor } from './../../types/types'
import { gql } from '@apollo/client'

export interface getPostParams {
  first: number
  accountId?: string
}
export interface getPostByIdParams {
  postId: string | string[] | undefined
}

export interface getMyNewPostCountParams {
  postType?: string
}

interface getPostEdges {
  node: {
    id: string
    content: string
    postType: string
    postState: string
    color: BackColor
    secretType: string
    createdAt: string
    updatedAt: string
    commentsCount: number
    fromAccount: {
      id: string
      nickname: string
    }
    toAccount: {
      id: string
    }
    likedPosts: {
      id: string
      createAt: string
    }[]
    usedEmoticons: {
      id: string
      position: {
        positionX: number
        positionY: number
      }
      fileUrl: string
    }[]
    comments: {
      id: string
      content: string
      secretType: string
      commentState: string
      createdAt: string
      updatedAt: string
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
export interface getPostById {
  getPost: {
    id: string
    content: string
    postType: string
    postState: string
    color: BackColor
    secretType: string
    createdAt: string
    updatedAt: string
    commentsCount: number
    fromAccount: {
      id: string
    }
    toAccount: {
      id: string
    }
    likedPosts: {
      id: string
      createAt: string
    }
    usedEmoticons: {
      id: string
      position: {
        positionX: number
        positionY: number
      }
      fileUrl: string
    }[]
    comments: {
      id: string
      content: string
      secretType: string
      commentState: string
      createdAt: string
      updatedAt: string
    }[]
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
          postState
          color
          secretType
          createdAt
          updatedAt
          commentsCount
          fromAccount {
            id
            nickname
          }
          toAccount {
            id
          }
          likedPosts {
            id
            createdAt
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
          comments {
            id
            content
            secretType
            commentState
            createdAt
            updatedAt
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

export const GET_POST_BY_ID = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      id
      content
      postType
      postState
      color
      secretType
      createdAt
      updatedAt
      commentsCount
      fromAccount {
        id
      }
      toAccount {
        id
      }
      # likedPosts {
      #   id
      #   createdAt
      # },
      usedEmoticons {
        id
        position {
          positionX
          positionY
        }
        fileUrl
        name
      }
      comments {
        id
        content
        secretType
        commentState
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      commentsCount
    }
  }
`
