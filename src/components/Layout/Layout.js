import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="container flex min-h-screen flex-col">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="flex grow flex-col">{children}</main>
      <Footer />
    </div>
  )
}
