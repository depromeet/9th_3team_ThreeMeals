import { makeVar } from '@apollo/client'

export const isLazyGetToken = makeVar<boolean>(true)

export const updateIsLazyGetToken = (state: boolean) => {
  isLazyGetToken(state)
}
