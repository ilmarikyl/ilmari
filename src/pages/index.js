import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import BackgroundAnimation from '../components/BackgroundAnimation'

function formatTitle(title) {
  return title.replaceAll(' ', '\u00A0').replaceAll('-', '\u2011') // to non-breaking variants
}

const PortraitImage = ({ t }) => (
  <div className="relative mt-2 flex h-[150px] w-[150px] items-center justify-center self-center md:mt-0 md:h-[250px] md:w-[250px]">
    <Image
      src="/images/self_portrait.png"
      alt={t('portrait-image-alt')}
      layout="fill"
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
  <span className="mt-8 mb-2 self-center md:mt-14 md:mb-0">
    <button
      type="button"
      className="block scale-100 rounded-xl bg-[hsl(350,89%,60%)] py-2 px-4 text-white duration-300 hover:scale-[1.05] hover:bg-red-600 dark:bg-indigo-500 dark:hover:bg-blue-600"
    >
      <Link href="/about">
        <a>{t('btn-more-about')}</a>
      </Link>
    </button>
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
