'use client'

import useNavStore from "@/util/store/nav";
import { useEffect } from "react"

export default function Hamburger() {
    const { nav, setNav, openSearch, setOpenSearch } = useNavStore();

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setNav(false)
        }
    }

    useEffect(() => {
        if(nav && openSearch) {
            setOpenSearch(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nav])

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="block cursor-pointer">
            <div className="space-y-1.5 " onClick={() => setNav(!nav)}>
                <span className="block w-6 h-0.5 bg-black animate-pulse"></span>
                <span className="block w-6 h-0.5  bg-black animate-pulse"></span>
                <span className="block w-6 h-0.5  bg-black animate-pulse"></span>
            </div>
        </div>
    )
}