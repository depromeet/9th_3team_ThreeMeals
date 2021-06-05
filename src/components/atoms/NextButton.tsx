import React from 'react'
import Link from 'next/link'

interface Props {
  href: string
  className?: string
  external?: boolean
}

const NextButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a
        className={props.className}
        target={props.external ? '_blank' : '_self'}
      >
        {props.children}
      </a>
    </Link>
  )
}

export default NextButton
