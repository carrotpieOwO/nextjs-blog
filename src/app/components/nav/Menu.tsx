'use client';
import { useAuthRoute } from "@/util/hooks/useAuthRoute";
import useNavStore from "@/util/store/nav"
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

export default function Menu () {
    const { nav } = useNavStore();
    const { isAdmin } = useAuthRoute();
    
    return (
        <div className={`w-full ${nav ? 'py-10 gap-5' : 'h-0'} overflow-hidden fixed z-10 bg-white dark:bg-gray-800 grid mx-auto justify-center text-center items-center transition-all duration-200`}>
            {
                isAdmin &&
                <>
                    <LogoutBtn />
                    <Link href="/write">글쓰기</Link>
                </>
            }
            <a href='https://github.com/carrotpieOwO'>gitHub</a>
        </div>
    )
}