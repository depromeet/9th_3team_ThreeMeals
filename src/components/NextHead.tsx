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
      <meta
        name="naver-site-verification"
        content="4480351dcb07dd333511739e6a42ad4b0eddaff7"
      />

      <meta name="NaverBot" content="All" />
      <meta name="NaverBot" content="index,follow" />
      <meta name="Yeti" content="All" />
      <meta name="Yeti" content="index,follow" />
    </Head>
  )
}

export default NextHead
