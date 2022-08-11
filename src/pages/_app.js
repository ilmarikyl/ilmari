import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps, router }) {
  const { locale } = router

  const isEnglish = locale === 'en'
  const seoName = 'Ilmari Kylliäinen'
  const seoRole = isEnglish ? 'Developer' : 'Sovelluskehittäjä'
  const seoSite = `${seoName} | ${seoRole}`
  const seoDescription = isEnglish
    ? 'The portfolio website of Ilmari Kylliäinen'
    : 'Ilmari Kylliäinen - Portfolio'
  // const siteUrl = 'https://ilmarikyl.github.io'

  const seo = {
    titleTemplate: `%s | ${seoName}`,
    defaultTitle: seoSite,
    description: seoDescription,
    openGraph: {
      title: seoName,
      description: seoDescription,
      type: 'website',
      locale: locale,
      url: 'ilmarikyl.github.io',
      site_name: seoSite,
      // TODO
      // images: [
      //   {
      //     url: `${SITE_URL}/img/og-image-${locale}.png`,
      //     width: 1201,
      //     height: 630,
      //     alt: seoSite,
      //   },
      // ],
    },
  }

  return (
    <ThemeProvider attribute="class">
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
