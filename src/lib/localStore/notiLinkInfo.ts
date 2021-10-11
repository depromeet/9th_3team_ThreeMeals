import { makeVar } from '@apollo/client'

export const linkedPostId = makeVar<string | undefined>('')

export const updateLinkedPostId = (postId: string | undefined) => {
  linkedPostId(postId)
}
