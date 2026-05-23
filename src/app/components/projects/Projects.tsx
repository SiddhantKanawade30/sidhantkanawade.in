import { Container } from "../Container"
import { ProjectCard } from "./ProjectCard"
import projectsData from "@/data/projects.json"

export const Projects = () => {
  return (
    <Container>
      <div className="pb-10 overflow-x-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 min-w-0">
          {projectsData.map((project) => (
            <div key={project.id} className="min-w-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
