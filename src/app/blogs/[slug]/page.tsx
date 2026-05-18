import { Container } from "@/app/components/Container";
import { Metadata } from "next";
import { redirect } from 'next/navigation'
import { getBlogContent, getAllBlogSlugs } from "@/utils/mdx";
import Image from "next/image";

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug)=>({slug})) 
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogContent(slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found - Siddhant Kanawade",
      description: "The requested blog post could not be found.",
    };
  }

  const { frontmatter } = blog;
  const baseUrl = "https://siddhantkanawade.in";
  const blogUrl = `${baseUrl}/blogs/${slug}`;

  return {
    title: `${frontmatter.title} - Siddhant Kanawade`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: blogUrl,
      siteName: "Siddhant's Portfolio",
      images: frontmatter.image ? [
        {
          url: frontmatter.image.startsWith('http') ? frontmatter.image : `${baseUrl}${frontmatter.image}`,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
          type: 'image/webp',
        }
      ] : [
        {
          url: `${baseUrl}/opengraph-image.webp`,
          width: 1200,
          height: 630,
          alt: "Siddhant A Kanawade Portfolio",
          type: 'image/webp',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [
        frontmatter.image.startsWith('http') ? frontmatter.image : `${baseUrl}${frontmatter.image}`
      ] : [
        `${baseUrl}/opengraph-image.webp`
      ],
    },
    alternates: {
      canonical: blogUrl,
    },
  };
}

export default async function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  
    // Try to read the blog file based on the slug
    const { slug } = await params;
    const blog = await getBlogContent(slug)

    if(!blog) {
      redirect("/blogs")
    }

    const {content} = blog;

    return (
      <div className="overflow-x-auto">
        <Container className="min-h-screen p-4 md:p-6 md:pt-20 md:pb-10">
          {/* Blog Image */}
          {blog.frontmatter.image && (
            <div className="mb-6">
              <Image
                src={blog.frontmatter.image} 
                alt={blog.frontmatter.title}
                className="w-full h-64 md:h-103 object-cover rounded-lg"
              />
            </div>
          )}
          
          <article className="blog-content prose prose-sm md:prose-base max-w-none min-w-0 mx-auto lg:min-w-3xl">
             {content}
          </article>
        </Container>
      </div>
    );
  
}