import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface UseIntersectProps {
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void
  option?: {
    threshold: number
  }
  stopFetchMore: boolean
}

const useIntersect: ({
  onIntersect,
  option,
  stopFetchMore,
}: UseIntersectProps) => [
  RefObject<HTMLDivElement | null> | null,
  Dispatch<SetStateAction<RefObject<HTMLDivElement | null> | null>>
] = ({ onIntersect, option, stopFetchMore }: UseIntersectProps) => {
  const [ref, setRef] = useState<RefObject<HTMLDivElement | null> | null>(null)
  const checkIntersect: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && !stopFetchMore) {
        onIntersect(entry, observer)
      }
    },
    [onIntersect, stopFetchMore]
  )

  useEffect(() => {
    let observer: IntersectionObserver
    if (ref && !stopFetchMore) {
      observer = new IntersectionObserver(checkIntersect, {
        ...option,
      })
      observer.observe(ref as any)
      return () => observer.unobserve(ref as any)
    }
  }, [ref, stopFetchMore])

  return [ref, setRef]
}

export default useIntersect
