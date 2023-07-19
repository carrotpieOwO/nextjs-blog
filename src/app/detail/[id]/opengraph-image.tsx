import { Post } from '@/util'
import { ImageResponse } from 'next/server'
 
export const runtime = 'edge'
 
export const alt = 'ha0peno'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image({ params }: { params: { id: string } }) {
  const url = 'https://ha0.work/api/get/detail?id=' + params.id;
  const post:Post = await fetch(url).then((res) =>
    res.json()
  )
 
  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${post.thumbnail})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          fontSize: 100,
          fontWeight: 'bold',
          color: '#fff'
        }}
      >
        { post.title }
      </div>
    ),
    {
      ...size,
    }
  )
}