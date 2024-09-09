import React from 'react'
import technologies from '../../data/technologies'

const TechnologyIcon = ({ tech }) => {
  const { icon: Icon, color } = technologies[tech]
  return (
    <span
      className="group relative mx-1 my-1 inline-flex items-center"
      title={tech}
    >
      <Icon className="h-5 w-5" style={{ color }} />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {tech}
      </span>
    </span>
  )
}

export default TechnologyIcon
