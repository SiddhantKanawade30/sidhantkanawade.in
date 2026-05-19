
import { Link } from 'next-view-transitions'
import { getBlogs } from "@/utils/mdx";
import { Container } from './Container';
import { Badge } from './ui/Badge';

export const LandingBlogs = async () => {
    const allBlogs = await getBlogs()

    const latestBlogs = [...allBlogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  
  // Date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  return (
    <div className='p-2 pt-5 pb-10 overflow-x-auto'>
      <div className='px-2'>
        <Badge>Things I&apos;ve shared so far...</Badge>
        </div>
    <div className="flex items-start justify-start pt-3 min-w-0">
        
      <Container className="min-w-0">
        {/* Blog List */}
        {latestBlogs.length === 0 ? (
          <div className="text-center">
            <div className="text-4xl md:text-6xl mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">No posts yet</h3>
            <p className="text-secondary text-sm md:text-base">I&apos;m working on some great content. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 md:space-y-6">
              {latestBlogs.map((blog) => (
                <Link 
                  href={`/blogs/${blog.slug}`} 
                  key={blog.slug} 
                  className="block group"
                >
                  <article className="bg-white rounded-lg p-4 md:p-6  transition-all duration-200">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                      {/* Left Side - Title and Description */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-3 group-hover:text-tertiary transition-colors leading-tight">
                          {blog.title}
                        </h2>
                        
                        {blog.description && (
                          <p className="text-secondary text-sm leading-relaxed line-clamp-2">
                            {blog.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Right Side - Date */}
                      <div className="md:text-right md:min-w-[120px]">
                        {blog.date && (
                          <span className="text-xs md:text-sm text-secondary font-medium">
                            {new Date(blog.date).toLocaleDateString("en-US", dateOptions)}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            {allBlogs.length > 3 && (
              <div className="mt-8 flex justify-center">
                <Link 
                  href="/blogs" 
                  className="px-6 py-2 rounded-full border border-gray-200 text-sm font-medium text-primary hover:bg-gray-50 transition-colors shadow-sm"
                >
                  View More Blogs
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
    </div>
    )
}