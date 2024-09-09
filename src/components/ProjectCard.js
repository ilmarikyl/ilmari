import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa'
import MarkdownDescription from './MarkdownDescription'
import TechnologyIcon from './TechnologyIcon'

const ProjectCard = ({ project }) => {
  const { t } = useTranslation('projects')
  const [showDetails, setShowDetails] = useState(false)
  const [height, setHeight] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (showDetails) {
      setHeight(contentRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [showDetails])

  // Gradient color are set in a bit hacky ways because in Tailwind,
  // arbitrary values cannot be computed from dynamic values:
  // https://v2.tailwindcss.com/docs/just-in-time-mode

  // Use the project's dark gradient start color or fall back to a default
  const darkGradientStart = project.darkGradientStart || '#0b1528'

  // Style object to hold our custom property
  const cardStyle = {
    '--dark-from': darkGradientStart,
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-light-bg-start to-light-bg-end shadow-lg dark:from-[var(--dark-from)] dark:to-dark-bg-end"
      style={cardStyle}
    >
      <div className="relative h-48">
        <Image
          src={project.image}
          alt={t(`${project.key}.title`)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transform object-contain p-6 transition duration-500 ease-in-out hover:scale-105 md:p-4"
        />
      </div>
      <div className="flex flex-grow flex-col p-6 pt-2">
        <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
          {t(`${project.key}.title`)}
        </h3>
        <div className="mb-4 flex-grow text-sm text-gray-600 dark:text-gray-300">
          <MarkdownDescription description={t(`${project.key}.description`)} />
        </div>
        <hr className="mb-4 border-gray-400 dark:border-gray-600" />
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-wrap">
            {project.technologies.map(tech => (
              <TechnologyIcon key={tech} tech={tech} />
            ))}
          </div>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              className="inline-flex items-center rounded bg-light-primary-hl px-2 py-1 text-xs font-bold text-white transition duration-300 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('view-live')}
              <FaExternalLinkAlt className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
        <hr className="mb-4 border-gray-400 dark:border-gray-600" />
        <div className="flex items-center justify-between">
          <Link
            href={project.sourceUrl}
            className="inline-flex items-center rounded bg-gray-600 px-4 py-2 text-xs font-bold text-white transition duration-300 hover:bg-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('view-source')}
            <FaExternalLinkAlt className="ml-2 h-3 w-3" />
          </Link>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center rounded bg-gray-600 px-4 py-2 text-xs font-bold text-white transition duration-300 hover:bg-gray-700"
            aria-expanded={showDetails}
            aria-controls={`details-${project.key}`}
            type="button"
          >
            {showDetails ? t('less-info') : t('more-info')}
            {showDetails ? (
              <FaChevronUp className="ml-2" />
            ) : (
              <FaChevronDown className="ml-2" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden transition-[height] duration-300 ease-in-out"
          style={{ height: `${height}px` }}
        >
          <div
            ref={contentRef}
            id={`details-${project.key}`}
            className="mt-2 rounded p-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <MarkdownDescription
              description={t(`${project.key}.detailedInfo`)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
