import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

/**
 * Posts API
 */

export function getPostsDirectory(lang) {
  return join(process.cwd(), `/data/_posts-${lang}`)
}

export function getPostSlugs(lang) {
  return fs.readdirSync(getPostsDirectory(lang))
}

export function getPostBySlug(slug, lang) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(getPostsDirectory(lang), `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { slug: realSlug, frontmatter: data, content }
}

export function getAllPosts(lang) {
  const slugs = getPostSlugs(lang)
  const posts = slugs.map(slug => getPostBySlug(slug, lang))

  return posts
}
