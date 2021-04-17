import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
