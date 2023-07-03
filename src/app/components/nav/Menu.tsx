'use client';

import { useAuthRoute } from "@/hooks/useAuthRoute";
import useScrollPosition from "@/hooks/useScrollPosition";
import useNavStore from "@/util/store/nav"
import Link from "next/link";
import { useEffect } from "react";
import LogoutBtn from "./LogoutBtn";

export default function Menu () {
    const { nav, setNav } = useNavStore();
    const { isAdmin } = useAuthRoute();
    const { scrollPosition } = useScrollPosition();
    
    useEffect(() => {
        if ( scrollPosition > 0 && nav ) {
            setNav(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    const handleClick = () => {
        setNav(false);
    }

    return (
        <div className={`w-full ${nav ? 'py-10 gap-5' : 'h-0'} overflow-hidden fixed z-10 bg-white dark:bg-gray-800 grid mx-auto justify-center text-center items-center transition-all duration-200`}>
            {
                isAdmin &&
                <>
                    <LogoutBtn />
                    <Link href="/write" onClick={ handleClick }>글쓰기</Link>
                </>
            }
            <Link href='/blog' className='hover:text-pink-500' onClick={ handleClick }>Blog</Link>
            <a href='https://github.com/carrotpieOwO' className="hover:text-pink-500" onClick={ handleClick }>GitHub</a>
        </div>
    )
}