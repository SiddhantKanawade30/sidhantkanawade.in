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

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((project) => project.slug === slug)

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
              className="block relative h-72 md:w-[52rem] md:h-[25rem] w-full overflow-hidden mx-auto"
            >
              <Image
                src={projectImages[project.image]}
                alt={project.name}
                className="object-cover transition duration-300 ease-in-out hover:brightness-95 rounded-2xl shadow-siddhant"
              />
            </Link>
          ) : (
            <div className="relative h-72 md:w-[52rem] md:h-[23rem] w-full overflow-hidden mx-auto">
              <Image
                src={projectImages[project.image]}
                alt={project.name}
                fill
                className="object-cover rounded-2xl shadow-siddhant"
              />
            </div>
          )}

          <div className="p-6 md:p-6">
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
