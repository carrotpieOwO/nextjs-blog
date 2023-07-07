'use client'
import Image from "next/image";
import img from "@/loadingImg.png"
import Link from "next/link";

export default function notFount() {
    return (
        <main className="w-screen h-[calc(100vh-226px)] bg-pink-50 dark:bg-gray-900 flex flex-col justify-center items-center gap-3">
            <p className="text-6xl font-semibold">404</p>
            <Image src={img} alt="loading" width={700}/>
            <Link href="/" className="relative inline-flex items-center justify-center px-9 py-3 overflow-hidden font-mono font-medium tracking-tighter text-gray-600 bg-gray-300 rounded-lg group">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-pink-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-600"></span>
                <span className="relative">Home!</span>
            </Link>
        </main>
    )
}