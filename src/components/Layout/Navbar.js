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
    <Link
      href={href}
      className={`group rounded-lg p-2 transition duration-300 hover:text-light-primary-hl dark:hover:text-dark-primary-hl ${
        contentShowing ? 'text-light-primary-hl dark:text-dark-primary-hl' : ''
      }`}
      onClick={closeMenu}
    >
      <span className="flex justify-center">{t(locKey)}</span>
      <span
        className={`hidden h-0.5 bg-light-primary-hl dark:bg-dark-primary-hl md:block ${
          contentShowing
            ? 'max-w-full'
            : 'max-w-0 transition-all duration-500 group-hover:max-w-full'
        }`}
      />
    </Link>
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
    <nav ref={menuRef} className="w-full">
      {/* Top bar with logo and controls */}
      <div className="mx-auto flex items-center justify-between px-4 text-lg md:px-8 lg:max-w-7xl">
        <div className="py-5 md:py-10">
          <Link href="/">
            <Icon big name="logo" />
          </Link>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-3 md:hidden">
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

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-x-10 md:flex lg:gap-x-20">
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
          <LangButton />
          <button
            type="button"
            onClick={() => setTheme(DarkModeActive ? 'light' : 'dark')}
          >
            {loaded && DarkModeActive ? (
              <Icon name="sun" hoverGrow big themeIcon="sun" />
            ) : (
              <Icon name="moon" hoverGrow big themeIcon="moon" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (expandable - in document flow) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          hamburgerMenuOpen ? 'max-h-[300px]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col items-center gap-4 pb-4">
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
