import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
