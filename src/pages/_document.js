import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className=" bg-gradient-to-br from-light-bg-start to-light-bg-end font-Poppins dark:prose-dark dark:bg-gradient-to-br dark:from-dark-bg-start dark:to-dark-bg-end">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
