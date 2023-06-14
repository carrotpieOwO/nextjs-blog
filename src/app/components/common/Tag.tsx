import { ReactNode } from "react"

interface Props {
    type: string
    children: ReactNode
}

interface TagConfig {
    [key: string]: string
}

const tagConfig: TagConfig = {
    md: 'px-2.5 py-0.5',
    lg: 'px-3 py-1.5'
}

export default function Tag ({ type, children }: { type: string; children: ReactNode}) {
    return (
        <span className={`bg-pink-100 text-pink-600 text-xs font-medium mr-2 rounded ${tagConfig[type]}`}>
            {children}
        </span>
    )
}