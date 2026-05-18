import Image from "next/image";
import Link from "next/link";
import { Github, FileText, Twitter, Linkedin } from "lucide-react";
import { TextLoopCustomVariantsTransition } from "./ui/textLoop";

export const Hero = () => {
  return (
    
    <div className="flex flex-col md:flex-row md:pb-7 pt-15 md:pt-0 p-4 overflow-x-auto items-center md:items-start">
      <div className="md:pl-3 min-w-0 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Image
        src="/profile.webp"
        alt="Avatar"
        className="w-34 h-40 md:w-40 md:h-47 p-2 rounded-2xl flex-shrink-0 mb-4 md:mb-0"
        width={150}
        height={150}
        priority
      /> 
      <div className="p-3">
        <h1 className="text-2xl md:text-4xl md:pt-4 font-bold tracking-tight text-primary">
          Siddhant A Kanawade
        </h1>
        <p className="text-sm text-secondary  md:text-base pt-4 pb-2 leading-relaxed">
          Full-stack web developer specialized in TypeScript, working with
          MERN Stack, Tailwind, Prisma ORM and many more. I thrive on solving
          problems and learning new technologies.
        </p>
        <span className="text-sm text-secondary md:text-sm mt-1 bg-neutral-100 py-1 px-2 rounded-lg inline-block">
          <TextLoopCustomVariantsTransition />
        </span>
        </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mt-4 justify-center md:justify-end">
          <Link 
            href="https://github.com/SiddhantKanawade30" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg shadow-siddhant hover:bg-neutral-100"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </Link>
          <Link 
            href="/Siddhant_Kanawade_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg shadow-siddhant hover:bg-neutral-100"
            aria-label="Resume"
          >
            <FileText size={20} />
          </Link>
          <Link 
            href="https://x.com/SiddKanawade30" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg shadow-siddhant hover:bg-neutral-100"
            aria-label="X/Twitter Profile"
          >
            <Twitter size={20} />
          </Link>
          <Link 
            href="https://linkedin.com/in/siddhant-kanawade" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg shadow-siddhant hover:bg-neutral-100"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
