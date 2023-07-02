import Scene from "../components/three/Scene"

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