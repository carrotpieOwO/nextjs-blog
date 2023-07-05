import { Metadata } from "next"
import Scene from "../components/three/Scene"

export const metadata:Metadata = {
    title: {
        template: '%s :: ha0peno❤️',
        default: 'ha0peno❤️'
    },
    description: '하용피뇨 front-end 기술 블로그',
    openGraph: {
        title: {
            template: '%s :: ha0peno❤️',
            default: 'ha0peno❤️'
        },
    }
}

export default function BlogLayout({ children, params }: {
    children: React.ReactNode
    params: {
      tag: string
      item: string
    }
  }) {
    return (
        <>
            {children}
            <Scene page='blog' />
        </>
    )
  }