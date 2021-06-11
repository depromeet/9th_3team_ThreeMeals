import { makeVar } from '@apollo/client'

interface QuizDataInfo {
  id: string
  content: string
}

export type QuizData = QuizDataInfo[]

const handleQuizDataVar = makeVar<QuizData>([])

export const addQuizData = (quizData: QuizDataInfo[]) => {
  handleQuizDataVar(quizData)
}

export const handleQuizData = (prevData?: QuizDataInfo) => {
  const curQuizData = [...handleQuizDataVar()]
  if (prevData !== undefined) {
    curQuizData.push(prevData)
    handleQuizDataVar(curQuizData)
  } else {
    curQuizData.splice(-1, 1)
    handleQuizDataVar(curQuizData)
  }
}

export default handleQuizDataVar
