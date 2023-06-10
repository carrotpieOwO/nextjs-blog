'use client'

import useNavStore from "@/util/store/nav";
import { useEffect } from "react"

export default function Hamburger() {
    const { nav, setNav } = useNavStore();

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="block cursor-pointer">
            <div className="space-y-2 " onClick={() => setNav(!nav)}>
                <span className="block w-8 h-0.5 bg-black animate-pulse"></span>
                <span className="block w-8 h-0.5  bg-black animate-pulse"></span>
                <span className="block w-8 h-0.5  bg-black animate-pulse"></span>
            </div>
        </div>
    )
}