"use client"
import { Link } from 'next-view-transitions'
import { Container } from "../Container"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { playClickSound } from "@/utils/sound"

export const Navbar = () => {
    const [hovered, setHovered] = useState<number | null>(null)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const pathname = usePathname()

    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 100], [0, 10])
    const width = useTransform(scrollY, [0, 100], ["100%", "55%"])

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof latest === 'number' && latest > 100) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    })

    const navItems = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
        {
            label: "Projects", 
            href: "/projects"
        },
        {
            label: "Blogs",
            href: "/blogs"
        }
    ]

    return (
        <Container>
            {/* Desktop Navbar */}
            <motion.nav
                style={{
                    boxShadow: scrolled ? "var(--shadow-siddhant)" : "none",
                    width,
                    y,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="hidden md:flex items-center text-secondary justify-between px-4 lg:px-6 py-2 fixed inset-x-0 mx-auto top-0 max-w-4xl z-50 rounded-full bg-white/70 backdrop-blur-sm"
            >
                <div className="flex items-center space-x-1">
                    
                    {navItems.map((item, idx) => (
                        <Link
                            href={item.href}
                            key={idx}
                            className="relative px-3 py-2 text-sm hover:text-primary transition-colors duration-200"
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => playClickSound()}
                        >
                            {hovered === idx && (
                                <motion.span
                                    layoutId="hovered-span"
                                    className="absolute inset-0 h-full w-full rounded-md bg-neutral-100"
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    ))}
                </div>
                
                {/* Theme Toggle */}
                {/* <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md hover:bg-neutral-100 transition-colors duration-200"
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <Sun size={18} className="text-secondary" />
                    ) : (
                        <Moon size={18} className="text-secondary" />
                    )}
                </button> */}
            </motion.nav>

            {/* Mobile Navbar */}
            <motion.nav
                style={{
                    boxShadow: scrolled ? "var(--shadow-siddhant)" : "none",
                    y,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="md:hidden fixed inset-x-4 mx-auto bottom-4 max-w-md z-50 rounded-full border border-neutral-200/50 bg-white/80 backdrop-blur-md shadow-lg"
            >
                <div className="flex items-center justify-between px-2 py-3">
                    {navItems.map((item, idx) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        return (
                            <Link
                                href={item.href}
                                key={idx}
                                className="flex-1 flex justify-center"
                                onClick={() => playClickSound()}
                            >
                                <motion.div
                                    className="px-4 py-2 rounded-full text-sm font-medium"
                                    animate={{
                                        backgroundColor: isActive ? "#000000" : "transparent",
                                        color: isActive ? "#ffffff" : "#374151",
                                        scale: isActive ? 1 : 0.95,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                    whileHover={{
                                        backgroundColor: !isActive ? "#f3f4f6" : "#000000",
                                    }}
                                >
                                    {item.label}
                                </motion.div>
                            </Link>
                        )
                    })}
                </div>
            </motion.nav>
        </Container>
    )
}