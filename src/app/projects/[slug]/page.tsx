import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/app/components/Container"
import { Link as LinkIcon } from "lucide-react"
import GithubIcon from "@public/github-icon.svg"
import { projectImages } from "@/app/components/projects/projectImages"
import projectsData from "@/data/projects.json"

export async function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }))
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((project) => project.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <Container>
      <div className="pt-10 pb-16">
        <Link
          href="/projects"
          className="text-sm font-medium text-primary hover:text-primary/90"
        >
          ← Back to projects
        </Link>

        <div className="mt-6 overflow-hidden bg-white rounded-xl">
          {project.link ? (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-72 md:h-[32rem] w-full overflow-hidden"
            >
              <Image
                src={projectImages[project.image]}
                alt={project.name}
                fill
                className="object-cover transition duration-300 ease-in-out hover:scale-[1.01]"
              />
            </Link>
          ) : (
            <div className="relative h-72 md:h-[32rem] w-full overflow-hidden">
              <Image
                src={projectImages[project.image]}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                  {project.name}
                </h1>
                <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl">
                  {project.shortDescription}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-slate-950 transition hover:border-slate-300 hover:bg-neutral-50"
                  >
                    <LinkIcon className="h-4 w-4" />
                    
                  </Link>
                )}

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-slate-950 transition hover:border-slate-300 hover:bg-neutral-50"
                  >
                    <Image
                      src={GithubIcon}
                      alt="GitHub"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm md:text-base text-secondary leading-relaxed">
              {project.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
