import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

const isExternalLink = href => href.startsWith('http') || href.startsWith('www')

const CustomLink = ({ href, children }) => {
  const external = isExternalLink(href)
  return (
    <a
      href={href}
      className="text-light-primary-hl transition-colors duration-200 hover:text-light-primary-hl/80 dark:text-dark-primary-hl dark:hover:text-dark-primary-hl/80"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
      {external && <FaExternalLinkAlt className="ml-1 inline-block text-xs" />}
    </a>
  )
}

export default CustomLink
