'use client'
import Image from "next/image"
import img from "@/loadingImg.png"

export default async function Loading() {
    return (
        <>
            <main className="w-screen h-[calc(100vh-226px)] bg-pink-50 dark:bg-gray-900 flex flex-col justify-center items-center">
                <p className="mb-1 text-3xl font-semibold">페이지 그리는 즁...</p>
                <Image src={img} alt="loading" width={700}/>
            </main>
        </>
    )
}