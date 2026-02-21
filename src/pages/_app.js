/* eslint-disable import/extensions */
import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import * as gtag from '../../lib/gtag'

function MyApp({ Component, pageProps, router }) {
  const { locale } = router

  const isEnglish = locale === 'en'
  const seoName = 'Ilmari Kylliäinen'
  const seoRole = isEnglish ? 'Developer' : 'Sovelluskehittäjä'
  const seoSite = `${seoName} | ${seoRole}`
  const seoDescription = isEnglish
    ? 'The portfolio website of Ilmari Kylliäinen'
    : 'Ilmari Kylliäinen - Portfolio'
  const siteUrl = 'https://ilmarikyl.github.io'

  const gtagRouter = useRouter()

  useEffect(() => {
    const handleRouteChange = url => gtag.pageview(url)
    gtagRouter.events.on('routeChangeComplete', handleRouteChange)
    return () => gtagRouter.events.off('routeChangeComplete', handleRouteChange)
  }, [gtagRouter.events])

  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>{seoSite}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoName} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={seoSite} />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
