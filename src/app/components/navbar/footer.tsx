import { Container } from "../Container"
import { Twitter ,Linkedin , Github , Mail } from 'lucide-react';
import Link from "next/link";   
import UmamiAnalytics from "../umamiAnalytics";   

export const Footer = () => {

const links = [
    {
        Icon: <Linkedin />,
        href: "https://www.linkedin.com/in/siddhant-kanawade/"
    },
    {
        Icon: <Github />,
        href: "https://github.com/SiddhantKanawade30"
    },
    {
        Icon: <Twitter />,
        href: "https://x.com/SiddKanawade30"
    },
    {
        Icon: <Mail />,
        href: "mailto:kanawadesiddhant30@gmail.com"
    }
];


    return (
        <Container >
            <div className="flex flex-col sm:flex-row justify-between items-center border-t-2 border-neutral-100 pt-4 mb-20 md:mb-0 -mx-4 text-secondary hover:text-primary transition-colors px-5 gap-4">
                <div className="cursor-pointer text-xs md:text-sm text-center sm:text-left">
                    Built with love by Siddhant A Kanawade
                </div>
                <UmamiAnalytics />
                <div className="flex gap-4 text-secondary">
                    {links.map((link) => (
                        <Link href={link.href} key={link.href} target="_blank">
                            <div className="hover:text-primary transition-colors">
                                {link.Icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    )
}