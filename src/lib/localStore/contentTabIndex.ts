import { makeVar } from '@apollo/client'

export const curTabIdx = makeVar<number>(0)

export const updateCurTabIdx = (TabIdx: number) => {
  curTabIdx(TabIdx)
}
