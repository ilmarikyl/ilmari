import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { getPostBySlug, getAllPosts } from '../../lib/posts-api'
import Layout from '../components/Layout'
import Stack from '../components/Stack'
import MDXContentWrapper from '../components/MDXContentWrapper'
import SkillProgress from '../components/SkillProgress'
import ProjectsSection from '../components/ProjectsSection'
import { H1, H2, H3, P, A, LI } from '../components/MDXComponents'

// TODO
// import Error404 from '../../components/Layout/Error404'

function PostPage({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) return 'ei löydy.'

  return (
    <Layout>
      <MDXRemote
        {...post.content}
        components={{
          Stack,
          SkillProgress,
          ProjectsSection,
          h1: H1,
          h2: H2,
          h3: H3,
          p: P,
          a: A,
          li: LI,
          wrapper: MDXContentWrapper,
        }}
      />
    </Layout>
  )
}

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug(params.slug, locale)
  const { slug, frontmatter, content } = post
  const { title } = frontmatter
  const serializedContent = await serialize(content)

  return {
    props: {
      post: {
        slug,
        title,
        content: serializedContent,
      },
    },
    revalidate: true,
  }
}

export async function getStaticPaths() {
  const enPosts = getAllPosts('en')
  const fiPosts = getAllPosts('fi')

  const enPaths = enPosts.map(post => ({
    params: { slug: post.slug },
    locale: 'en',
  }))

  const fiPaths = fiPosts.map(post => ({
    params: { slug: post.slug },
    locale: 'fi',
  }))

  return {
    paths: enPaths.concat(fiPaths),
    fallback: false,
  }
}

export default PostPage
