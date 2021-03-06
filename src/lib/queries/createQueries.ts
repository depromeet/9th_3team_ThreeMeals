import gql from 'graphql-tag'
import { BackColor } from '../../types/types'
import { Vector2d } from 'konva/lib/types'
import { AccountResType } from './meQueries'

interface createPostEmoticonInfo {
  emoticonId: string | undefined
  position: Vector2d | null | undefined
}

// Params types //

export interface CreatePostParams {
  content?: string
  toAccountId?: string
  color?: BackColor
  secretType?: string
  postType?: string
  emoticons?: createPostEmoticonInfo[]
}

export interface CreateCommentParams {
  postId: string
  parentId?: string
  content: string
  secretType: string
}

export interface CreateLikePostsParams {
  postId: string
}

export interface DeleteLikePostsParams {
  postId: string
}

export interface createLikeCommentParams {
  postId: string
  commentId: string
}

export interface createLikeParams {
  postId: string
}

export interface CreateFavoriteParams {
  favoriteAccountId: string
}

// response Types //

export interface CreatePostRes {
  message: string
}

export interface CreateCommentRes {
  createComment: {
    content: string
    id: string
  }
}

export interface CreatLikePostsRes {
  id: string
  createdAt: string
}

export interface createLikeRes {
  id: string
  createAt: string
}

export interface createLikeCommentRes {
  message: string
}

export interface CreateFavoriteRes {
  id: string
  account: AccountResType
  favoriteAccount: AccountResType
  createdAt: string
  updatedAt: string
}

// mutation //

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
      message
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment(
    $postId: String!
    $parentId: String
    $content: String!
    $secretType: String!
  ) {
    createComment(
      postId: $postId
      parentId: $parentId
      content: $content
      secretType: $secretType
    ) {
      content
      id
    }
  }
`

export const CREATE_LIKE = gql`
  mutation createLikePosts($postId: String!) {
    createLikePosts(postId: $postId) {
      id
      createdAt
    }
  }
`

export const CREATE_LIKE_COMMENT = gql`
  mutation createLikeComments($postId: String!, $commentId: String!) {
    createLikeComments(postId: $postId, commentId: $commentId) {
      message
    }
  }
`

export const CREATE_FAVORITE = gql`
  mutation createFavorite($favoriteAccountId: String!) {
    createFavorite(favoriteAccountId: $favoriteAccountId) {
      id
      favoriteAccount {
        id
        nickname
      }
    }
  }
`
