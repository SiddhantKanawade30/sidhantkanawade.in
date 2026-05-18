"use client"
import { Link } from 'next-view-transitions'
import { Container } from "../Container"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { useState } from "react"
import { playClickSound } from "@/utils/sound"

export const Navbar = () => {
    const [hovered, setHovered] = useState<number | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState<boolean>(false)

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

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
                className="md:hidden rounded-lg flex items-center justify-between px-4 py-2 fixed inset-x-0 mx-auto top-0 max-w-full z-50 bg-white"
            >
                <div className="flex items-center space-x-2">
                    <Link href="/" onClick={() => { closeMenu(); playClickSound(); }}>
                        <div className="hover:bg-neutral-100 px-3 py-2 rounded-md transition-colors duration-200 font-medium">
                            Home
                        </div>
                    </Link>
                    
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
                </div>

                {/* Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
                    aria-label="Toggle navigation menu"
                >
                    <motion.span
                        animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 6 : 0,
                        }}
                        className="block w-5 h-0.5 bg-gray-800 rounded transition-all duration-300"
                    />
                    <motion.span
                        animate={{
                            opacity: isMenuOpen ? 0 : 1,
                        }}
                        className="block w-5 h-0.5 bg-gray-800 rounded transition-all duration-300"
                    />
                    <motion.span
                        animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? -6 : 0,
                        }}
                        className="block w-5 h-0.5 bg-gray-800 rounded transition-all duration-300"
                    />
                </button>
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    y: isMenuOpen ? 0 : -20,
                    pointerEvents: isMenuOpen ? "auto" : "none",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className=" md:hidden fixed top-16 inset-x-0 mx-4 bg-white rounded-lg shadow-lg z-40 overflow-hidden"
                style={{
                    boxShadow: "var(--shadow-siddhant, 0 10px 40px rgba(0, 0, 0, 0.1))",
                }}
            >
                <div className="py-2">
                    {navItems.map((item, idx) => (
                        <Link
                            href={item.href}
                            key={idx}
                            className="block px-4 py-3 text-sm hover:bg-neutral-100 transition-colors duration-200 border-b border-neutral-100 last:border-b-0"
                            onClick={() => { closeMenu(); playClickSound(); }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="md:hidden fixed inset-0 backdrop-blur-sm bg-white/10 z-30"
                    onClick={closeMenu}
                />
            )}
        </Container>
    )
}