import { Container } from "../components/Container";
import { Metadata } from "next";
import { getBlogs } from "@/utils/mdx";
import { Link } from 'next-view-transitions'
import { Title } from "../components/ui/Title";
import { Subtitle } from "../components/ui/Subtitle";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Blog - Siddhant Kanawade",
  description: "Thoughts, experiences, and insights on technology and development",
};      

export default async function BlogsPage() {
  const allBlogs = await getBlogs()
  
  // Date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  const sortedBlogs = allBlogs.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );


  return (
    <div className="min-h-screen flex items-start justify-start overflow-x-auto">
      <Container className="min-h-screen p-4 pt-14 md:p-6 md:pt-20 md:pb-16">
        {/* Header Section */}
        <div className="mb-8 md:mb-16">
          <Title>
            My Blogs
          </Title>
          <Subtitle>
            Sharing insights, experiences, and learnings from my journey in technology and development.
          </Subtitle>
        </div>

        {/* Blog List */}
        {sortedBlogs.length === 0 ? (
          <div className="text-center py-8 md:py-16">
            <div className="text-4xl md:text-6xl mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">No posts yet</h3>
            <p className="text-secondary text-sm md:text-base">I&apos;m working on some great content. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {allBlogs.map((blog) => (
              <Link 
                href={`/blogs/${blog.slug}`} 
                key={blog.slug} 
                className="block group"
              >
                <article className="bg-white rounded-lg border shadow-siddhant border-gray-100 p-4 transition-all duration-200">
                  {/* Blog Image */}
                  {blog.image && (
                    <div className="mb-4">
                      <Image
                        src={blog.image} 
                        alt={blog.title}
                        width={800}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-bold text-primary group-hover:text-tertiary transition-colors line-clamp-2 leading-tight mb-3">
                    {blog.title}
                  </h2>
                  
                  {/* Description */}
                  {blog.description && (
                    <p className="text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                      {blog.description}
                    </p>
                  )}
                  
                  {/* Date */}
                  {blog.date && (
                    <div className="flex justify-start md:justify-start">
                      <span className="text-xs md:text-sm text-secondary font-medium">
                        {new Date(blog.date).toLocaleDateString("en-US", dateOptions)}
                      </span>
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center mt-8 md:mt-16 pt-4 md:pt-8">
          <p className="text-secondary text-sm md:text-base">
            Have a question or want to discuss any of these topics? 
            <Link href="/contact" className="text-primary hover:text-tertiary transition-colors ml-1">
              Let&apos;s connect!
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}