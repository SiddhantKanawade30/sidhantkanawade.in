import Image from "next/image"
import NextLink from "next/link"
import { Link as LinkIcon } from "lucide-react"
import GithubIcon from "@public/github-icon.svg"
import { projectImages } from "./projectImages"

interface ProjectCardProps {
  project: {
    slug: string
    name: string
    shortDescription: string
    description: string[]
    image: string
    link: string | null
    github: string | null
    layout: string
  }
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className=" bg-white/80 shadow-sm border border-neutral-200 rounded-2xl overflow-hidden">
      <NextLink href={`/projects/${project.slug}`} className="group block">
        <div className="relative h-56 md:h-54 border-b border-neutral-200 w-full overflow-hidden rounded-2xl">
          <Image
            src={projectImages[project.image]}
            alt={project.name}
            fill
            className="object-cover rounded-2xl transition duration-300 ease-in-out shadow-siddhant group-hover:brightness-95"
          />
        </div>

        <div className="p-3">
          <h2 className="text-xl font-semibold text-slate-950 mb-3 transition-colors group-hover:text-primary">
            {project.name}
          </h2>

          <p className="text-sm md:text-base text-secondary leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </NextLink>

      <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-4">
        <NextLink
          href={`/projects/${project.slug}`}
          className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
        >
          View details
        </NextLink>

        <div className="flex items-center gap-3">
          {project.link && (
            <NextLink
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-slate-950 transition-colors"
            >
              <LinkIcon className="w-5 h-5" />
            </NextLink>
          )}

          {project.github && (
            <NextLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-slate-950 transition-colors"
            >
              <Image
                src={GithubIcon}
                alt="GitHub"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </NextLink>
          )}
        </div>
      </div>
    </div>
  )
}
