"use client"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "./Container"
import { Badge } from "./ui/Badge"
import Blogito from "@public/Blogito.png"
import TestimonialsLo from "@public/testimonialslo.png"
import SecureVault from "@public/securevault.jpg"
import FitKaka from "@public/fitkaka.webp"
import Syncoo from "@public/syncoo.webp"
import CanvasBoard from "@public/canvas.webp"
// import GithubIcon from "@public/github-icon.svg"


export const Projects = () => {

    const projects = [
        {
            title: "Fit Kaka",
            slug: "fit-kaka",
            src: FitKaka,
            description: "AI nutrition assistant for tracking calories, proteins, and meal insights via WhatsApp by image and text upload.",
            href: "https://fit-kaka.vercel.app",
            github: "https://github.com/SiddhantKanawade30/fit-kaka"
        },
        {
            title: "TestimonialsLo",
            slug: "testimonialslo",
            src: TestimonialsLo,
            description: "A platform that helps businesses, freelancers, startups gather and manage customer video, text testimonials.",
            href: "https://testimonialslo.siddhantkanawade.in",
            github: "https://github.com/SiddhantKanawade30/testimonialslo-backend"
        },
        {
            title: "Canvas Board (developing)",
            slug: "canvas-board",
            src: CanvasBoard,
            description: "Real-time collaborative whiteboard for sketching, brainstorming, and shared design sessions.",
            href: null,
            github: "https://github.com/SiddhantKanawade30/canvas-board"
        },
        {
            title: "Syncoo (developing)",
            slug: "syncoo",
            src: Syncoo,
            description: "A modern project management platform for issue tracking, dashboards, and team workflows.",
            href: "https://syncoo.vercel.app/",
            github: "https://github.com/SiddhantKanawade30/synco"
        },
        {
            title: "Secure Vault",
            slug: "secure-vault",
            src: SecureVault,
            description: "A secure password manager using cryptography, helping users store and manage their passwords securely.",
            href: "https://secure-vault-delta.vercel.app/",
            github: "https://github.com/SiddhantKanawade30/SecureVault"
        },
        {
            title: "Blogito",
            slug: "blogito",
            src: Blogito,
            description: "A blog website to share experiences and learnings. Built with React, Tailwind CSS and javascript.",
            href: "https://blogito.vercel.app/",
            github: "https://github.com/SiddhantKanawade30/blogito-backend"
        }
    ]


    return (
        <Container>
        <div className="pt-5 -mx-4 px-4 border-2 border-neutral-100 pb-10 overflow-x-auto">

            <Badge>I&apos;m fond of building things</Badge>

            <div className="pl-5 md:pl-2 grid grid-cols-1 items-center md:grid-cols-3 gap-5 p-2 mt-3 min-w-0"> 
                {
                    projects.map((project, idx) => (
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" , y:10 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" , y:0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 , ease : "easeInOut" }}
                            key={project.title}>
                                <motion.div className="w-80 min-h-55 md:w-67 shadow-siddhant rounded-2xl md:transition-shadow md:duration-[500ms] min-w-0"
                                transition={{ duration: 0.3, ease : "easeInOut" }}
                                >
                                    <div className="relative h-44 md:h-34 border border-neutral-200 rounded-xl overflow-hidden">
                                        <Link href={`/projects/${project.slug}`} className="block h-full w-full">
                                            <Image
                                                src={project.src}
                                                alt={project.title}
                                                fill
                                                className="rounded-xl object-cover transition duration-200 hover:scale-[1.01]"
                                                priority
                                            />
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-between pr-2">
                                        <h2 className="text-primary text-lg font-bold mt-2 pl-2 tracking-tight">
                                            {project.title}
                                        </h2>
                                        {/* {project.github && (
                                            <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                                                <Image src={GithubIcon} alt="GitHub" width={20} height={20} className="w-5 h-5" />
                                            </Link>
                                        )} */}
                                    </div>
                                    <p className="text-secondary text-sm pt-2 pb-5 pl-2 tracking-tight leading-relaxed">
                                        {project.description}
                                    </p>
                                </motion.div>
                        </motion.div> 
                    ))
                }

            </div>
        </div>
        </Container>
    )
}