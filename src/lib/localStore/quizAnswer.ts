import { makeVar } from '@apollo/client'

interface QuizDataInfo {
  id: number
  content: string
}

export type QuizData = QuizDataInfo[]

const handleQuizDataVar = makeVar<QuizData>([])

export const addQuizData = (quizData: QuizDataInfo[]) => {
  handleQuizDataVar(quizData)
}

export const handleQuizData = (curDataId: number, prevData?: QuizDataInfo) => {
  const curQuizData = [...handleQuizDataVar()]
  const pickedDataIdx = curQuizData.findIndex((data) => data.id === curDataId)
  if (prevData !== undefined) {
    console.log('idx:-1')
    curQuizData.splice(pickedDataIdx + 1, 0, prevData)
    handleQuizDataVar(curQuizData)
  } else {
    console.log('idx:true', pickedDataIdx, prevData)
    curQuizData.splice(pickedDataIdx, 1)
    handleQuizDataVar(curQuizData)
  }
}

export default handleQuizDataVar
