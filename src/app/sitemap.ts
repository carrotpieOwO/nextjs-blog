import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ha0.work',
      lastModified: new Date(),
    },
    {
      url: 'https://ha0.work/blog',
      lastModified: new Date(),
    },
    {
        url: 'https://ha0.work/blog/tags/',
        lastModified: new Date(),
    },
    {
        url: 'https://ha0.work/blog/search/',
        lastModified: new Date(),
    },
    {
      url: 'https://ha0.work/detail/',
      lastModified: new Date(),
    },
  ]
}