'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import useLoaded from '../../hooks/useLoaded'

import LangButton from './LangButton'
import Icon from '../UI/Icons/Icon'

const NavbarLink = ({ href, locKey, closeMenu }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const contentShowing = href === router.asPath

  return (
    <li className="w-500 group rounded-lg bg-black bg-opacity-5 p-2 transition duration-300 hover:text-light-primary-hl dark:bg-white dark:bg-opacity-5 dark:hover:text-dark-primary-hl md:bg-opacity-0 dark:md:bg-opacity-0">
      <Link href={href} passHref legacyBehavior>
        <a
          className={`w-full ${
            contentShowing
              ? 'md:text-inherit dark:md:text-inherit text-light-primary-hl dark:text-dark-primary-hl'
              : ''
          }`}
          onClick={closeMenu}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              closeMenu()
              router.push(href)
            }
          }}
          role="link"
          tabIndex="0"
        >
          <span className="flex flex-1 justify-center">{t(locKey)}</span>
          <span
            className={`hidden h-0.5 bg-light-primary-hl dark:bg-dark-primary-hl md:block ${
              contentShowing
                ? 'max-w-full'
                : 'max-w-0 transition-all duration-500 group-hover:max-w-full'
            }`}
          />
        </a>
      </Link>
    </li>
  )
}

const HamburgerButton = ({ hamburgerMenuOpen, setHamburgerMenuOpen }) => {
  const { t } = useTranslation('common')

  return (
    <button
      type="button"
      className="mr-2 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
      onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          setHamburgerMenuOpen(!hamburgerMenuOpen)
        }
      }}
      aria-expanded={hamburgerMenuOpen}
      aria-label={hamburgerMenuOpen ? t('close-menu') : t('open-menu')}
    >
      {hamburgerMenuOpen ? <Icon name="close" /> : <Icon name="hamburger" />}
    </button>
  )
}

const Navbar = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const loaded = useLoaded()
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const DarkModeActive =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const closeMenu = () => {
    setHamburgerMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="w-full">
      <div className="mx-auto justify-between px-0 text-lg md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-5 md:block md:py-10">
            <Link href="/" passHref legacyBehavior>
              <a>
                <Icon big name="logo" />
              </a>
            </Link>

            {/* MOBILE */}
            <div className="flex items-center gap-3 rounded-xl backdrop-blur-xs dark:backdrop-blur-md md:hidden">
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
        <div
          ref={menuRef}
          className={`flex-1 overflow-hidden transition-all duration-300 ease-in-out md:h-auto ${
            hamburgerMenuOpen ? 'h-[200px]' : 'h-0 md:h-auto'
          }`}
        >
          <div className="flex items-center gap-x-20 rounded-xl backdrop-blur-xs dark:backdrop-blur-md">
            <div className="flex-1 justify-self-center md:mt-0 md:block md:pb-0">
              <ul className="items-center justify-center space-y-3 text-center sm:space-x-0 md:flex md:space-x-10 md:space-y-0 lg:space-x-20">
                <NavbarLink
                  href="/about"
                  locKey="section-about-me"
                  closeMenu={closeMenu}
                />
                <NavbarLink
                  href="/works"
                  locKey="section-works"
                  closeMenu={closeMenu}
                />
                <NavbarLink
                  href="/skills"
                  locKey="section-skills"
                  closeMenu={closeMenu}
                />
              </ul>
            </div>

            {/* DESKTOP */}
            <div className="hidden items-center gap-8 md:flex">
              <LangButton />
              <button
                type="button"
                onClick={() => setTheme(DarkModeActive ? 'light' : 'dark')}
                className=""
              >
                {loaded && DarkModeActive ? (
                  <Icon name="sun" hoverGrow big themeIcon="sun" />
                ) : (
                  <Icon name="moon" hoverGrow big themeIcon="moon" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
