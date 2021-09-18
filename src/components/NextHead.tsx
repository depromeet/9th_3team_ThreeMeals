import { FC } from 'react'
import Head from 'next/head'

interface Props {
  title?: string
  description?: string
  image?: string
}

const NextHead: FC<Props> = ({ title, description, image }) => {
  const ogTitle = title || 'hush'
  const ogDesc = description || 'MZ세대를 위한 소통플랫폼'
  const ogImage = image || '/ogimage.png'

  return (
    <Head>
      <title>Hush</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta property="og:title" content={ogTitle} />
      <meta name="description" content={ogDesc} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:image" content={ogImage} />
      <meta
        name="google-site-verification"
        content="yaj6bnlmqVVhDCO_rvMvmNeQGaZqzoHIE7kYTngO2P8"
      />
    </Head>
  )
}

export default NextHead
