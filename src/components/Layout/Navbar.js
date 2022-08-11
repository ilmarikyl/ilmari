import { useTheme } from 'next-themes'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import useLoaded from '../../hooks/useLoaded'

import LangButton from './LangButton'
import Icon from '../UI/Icons/Icon'

const NavbarLink = ({ href, locKey }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const contentShowing = href === router.asPath

  return (
    <li className="w-500 group rounded-lg bg-black bg-opacity-5  p-2 transition duration-300 hover:text-light-primary-hl dark:bg-white dark:bg-opacity-5 dark:hover:text-dark-primary-hl md:bg-opacity-0 dark:md:bg-opacity-0">
      <Link href={href}>
        <span className="w-full">
          {contentShowing ? (
            <>
              <a className="flex flex-1 justify-center">{t(locKey)}</a>
              <span className="hidden h-0.5 max-w-full bg-light-primary-hl dark:bg-dark-primary-hl md:block" />
            </>
          ) : (
            <>
              <a className="flex flex-1 justify-center">{t(locKey)}</a>
              <span className="block h-0.5 max-w-0 bg-light-primary-hl transition-all duration-500 dark:bg-dark-primary-hl md:group-hover:max-w-full" />
            </>
          )}
        </span>
      </Link>
    </li>
  )
}

const HamburgerButton = ({ hamburgerMenuOpen, setHamburgerMenuOpen }) => (
  <button
    type="button"
    className="rounded-md outline-none focus:border focus:border-gray-400"
    onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
  >
    {hamburgerMenuOpen ? <Icon name="close" /> : <Icon name="hamburger" />}
  </button>
)

const Navbar = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const loaded = useLoaded()
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)

  // eslint-disable-next-line prettier/prettier
  const DarkModeActive = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  return (
    <nav className="w-full">
      <div className="mx-auto justify-between px-4 text-lg md:flex md:items-center md:px-8 lg:max-w-7xl ">
        <div>
          <div className="flex items-center justify-between py-5 md:block md:py-10">
            <Link href="/">
              <a>
                <Icon big name="logo" />
              </a>
            </Link>
            <div className="font-rampart flex items-center gap-3 rounded-xl backdrop-blur-xs dark:backdrop-blur-md md:hidden">
              <LangButton />
              <button
                type="button"
                onClick={() => setTheme(DarkModeActive ? 'light' : 'dark')}
              >
                {loaded && DarkModeActive ? (
                  <Icon name="sun" hoverGrow themeIcon="sun" />
                ) : (
                  <Icon name="moon" hoverGrow themeIcon="moon" />
                )}
              </button>
              <HamburgerButton
                hamburgerMenuOpen={hamburgerMenuOpen}
                setHamburgerMenuOpen={setHamburgerMenuOpen}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-20 rounded-xl backdrop-blur-xs dark:backdrop-blur-md">
          <div
            className={`flex-1 justify-self-center md:mt-0 md:block md:pb-0 ${
              hamburgerMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="items-center justify-center space-y-3 text-center sm:space-x-0 md:flex md:space-x-10 md:space-y-0 lg:space-x-20">
              <NavbarLink href="/about" locKey="section-about-me" />
              <NavbarLink href="/skills" locKey="section-skills" />
              <NavbarLink href="/works" locKey="section-works" />
            </ul>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <LangButton />
            <button
              type="button"
              onClick={() => setTheme(DarkModeActive ? 'light' : 'dark')}
              className=""
            >
              {loaded && DarkModeActive ? (
                <Icon name="sun" hoverGrow themeIcon="sun" />
              ) : (
                <Icon name="moon" hoverGrow themeIcon="moon" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
