import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'
import Layout from '../components/Layout/Layout'
import BackgroundAnimation from '../components/BackgroundAnimation'

function formatTitle(title) {
  return title.replaceAll(' ', '\u00A0').replaceAll('-', '\u2011') // to non-breaking variants
}

const PortraitImage = ({ t }) => (
  <div className="relative mt-2 flex h-[150px] w-[150px] items-center justify-center self-center md:mt-0 md:h-[250px] md:w-[250px]">
    <Image
      src="/images/self_portrait_drawing_dark2.webp"
      alt={t('portrait-image-alt')}
      fill
      // sizes="(max-width: 768px) 150px, 250px"
      sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
      className="rounded-full backdrop-blur-xs dark:backdrop-blur-md"
      priority
    />
  </div>
)

const TextSection = ({ t }) => (
  <div className="flex flex-col justify-center">
    <h1 className="text-center font-Montserrat text-4xl backdrop-blur-xs dark:backdrop-blur-md md:text-left md:text-5xl">
      Ilmari Kylliäinen
    </h1>
    <span className="mt-5 max-w-[360px] self-center text-center backdrop-blur-xs dark:backdrop-blur-md md:self-start md:text-left">
      {formatTitle(t('software-developer'))},{' '}
      {formatTitle(t('language-technologist'))},{' '}
      {formatTitle(t('ma-lang-tech'))}
    </span>
  </div>
)

const MoreInfoBtn = ({ t }) => (
  <span className="mb-2 mt-8 self-center md:mb-0 md:mt-14">
    <Link
      href="/about"
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-500 to-red-600 p-0.5 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-gradient-to-br dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 dark:focus:ring-green-800"
    >
      <span className="relative flex items-center rounded-md px-5 py-2.5 transition-all duration-200 ease-in-out group-hover:bg-opacity-0">
        <span className="mr-2">{t('btn-more-about')}</span>
        <MdArrowForward className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
      </span>
    </Link>
  </span>
)

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <BackgroundAnimation />
      <Layout>
        <section className="flex grow items-center justify-center">
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center gap-8">
              <PortraitImage t={t} />
              <TextSection t={t} />
            </div>
            <MoreInfoBtn t={t} />
          </div>
        </section>
      </Layout>
    </>
  )
}
