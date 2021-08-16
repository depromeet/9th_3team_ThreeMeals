import dayjs from 'dayjs'

export const timeDiffCalc = (dateFuture: any, dateNow: any): string => {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400)
  diffInMilliSeconds -= days * 86400

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24
  diffInMilliSeconds -= hours * 3600

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60
  diffInMilliSeconds -= minutes * 60

  let difference = ''
  if (days > 0) {
    difference += days === 1 ? `${days}일 ` : `${days}일 `
  }

  difference += hours === 0 || hours === 1 ? `${hours}시간 ` : `${hours}시간 `

  difference +=
    minutes === 0 || hours === 1 ? `${minutes}분전` : `${minutes}분전`

  return difference
}

export const hourDiffCalc = (dateFuture: any, dateNow: any): number => {
  const milliseconds = Math.abs(dateFuture - dateNow)
  const hours = Math.floor(milliseconds / 36e5)

  return hours
}

export const dateDiffToTimer = (a: any, b: any) => {
  let diff = Math.abs(a - b)

  const ms = diff % 1000
  diff = (diff - ms) / 1000
  const s = diff % 60
  diff = (diff - s) / 60
  const m = diff % 60
  diff = (diff - m) / 60
  const h = diff

  const ss = s <= 9 && s >= 0 ? `0${s}` : s
  const mm = m <= 9 && m >= 0 ? `0${m}` : m
  const hh = h <= 9 && h >= 0 ? `0${h}` : h

  return hh + ':' + mm + ':' + ss
}

export const feedFormat = (date: any, dateNow: any): string => {
  let diffInMilliSeconds = Math.abs(date - dateNow) / 1000

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400)
  diffInMilliSeconds -= days * 86400

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24
  diffInMilliSeconds -= hours * 3600

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60
  diffInMilliSeconds -= minutes * 60

  if (days > 0 && days < 4) {
    return `${days}일전`
  } else if (days === 0 && hours > 0) {
    return `${hours}시간 전`
  } else if (hours === 0 && minutes > 0) {
    return `${minutes}분전`
  }

  return dayjs(date).format('YYYY.MM.DD') || '-13:33:33'
}
