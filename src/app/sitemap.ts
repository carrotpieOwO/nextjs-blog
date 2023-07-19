import { Post, Tag } from '@/util'
import { getAllPosts, getAllTags } from '@/util/sitemapPosts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts:Post[] | null = await getAllPosts()
  const tags:Tag[] | null = await getAllTags()

  return [
    {
      url: 'https://ha0.work',
      lastModified: new Date(),
    },
    {
      url: 'https://ha0.work/blog',
      lastModified: new Date(),
    },
    ...posts!.map((post) => {
      return {
        url: `https://ha0.work/detail/${post._id.toString()}`,
        lastModified: new Date(post.createdTime!),
      }
    }),
    ...tags!.map((tag) => {
      return {
        url: `https://ha0.work/blog/tag/${tag.name}`,
        lastModified: new Date(),
      }
    }),
  ]
}