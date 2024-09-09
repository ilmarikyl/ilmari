/* eslint-disable import/extensions */
/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../../lib/gtag'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: false,
                });
            `,
          }}
        />
      </Head>
      <body className="bg-gradient-to-br from-light-bg-start to-light-bg-end font-Poppins dark:prose-dark dark:bg-gradient-to-br dark:from-dark-bg-start dark:to-dark-bg-end">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
