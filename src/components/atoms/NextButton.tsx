import React from 'react'
import Link from 'next/link'

interface Props {
  href: string
  className?: string
}

const NextButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className={props.className} target="_blank">
        {props.children}
      </a>
    </Link>
  )
}

export default NextButton
