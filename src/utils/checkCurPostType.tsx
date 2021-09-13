const checkCurPostType = (currentTabIdx: number) => {
  switch (currentTabIdx) {
    case 0:
      return 'Ask'
    case 1:
      return 'Answer'
    case 2:
      return 'Quiz'
    default:
      return undefined
  }
}

export default checkCurPostType
