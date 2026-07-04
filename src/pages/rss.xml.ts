import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export const prerender = true

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft)

  return rss({
    title: 'Angus Hawkings',
    description:
      'Writing from Angus Hawkings on deployment infrastructure, product, and the modern web.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  })
}
