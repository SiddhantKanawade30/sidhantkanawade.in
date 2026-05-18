import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path'

type BlogFrontmatter = {
    title:string;
    description:string;
    image:string;
    date:string;
}

export const getBlogContent = async (slug: string) => {
    try{
        const singleBlog = await fs.readFile(
            path.join(process.cwd(), "src/data", `${slug}.mdx`),
            "utf-8"
        );
        if(!singleBlog) {
            return null
        }
        const {content,frontmatter} = await compileMDX<BlogFrontmatter>({
            source:singleBlog,
            options:{parseFrontmatter:true}
        })

        return {
            content,
            frontmatter
        }
    
    } catch (error) {   
        console.error(`Error reading blog file: ${error}`)
        return null
    }


}



export const getBlogs = async () => {
    const files = await fs.readdir(path.join(process.cwd(), "src/data"))
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const allBlogs = await Promise.all(mdxFiles.map(async (file) => {
        const slug = file.replace(".mdx", "")
        const frontmatter = await getBlogFrontmatter(slug)
        return {
            slug,
            ...frontmatter
        }
    }))
    return allBlogs
}



export const getBlogFrontmatter = async (slug:string) => {
    const singleBlog = await fs.readFile(
        path.join(process.cwd(), "src/data", `${slug}.mdx`),
        "utf-8"
    )
    const {frontmatter} = await compileMDX<BlogFrontmatter>({
        source:singleBlog,
        options:{parseFrontmatter:true}
    })
    return frontmatter
}

export const getAllBlogSlugs = async () => {
    const files = await fs.readdir(path.join(process.cwd(), "src/data"));
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""));
  };
  