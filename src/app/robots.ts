import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/login',
    },
    sitemap: 'https://ha0.work/sitemap.xml',
  }
}