import React from 'react'
import ProjectCard from './ProjectCard'
import projects from '../../data/projects'

const ProjectsSection = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
