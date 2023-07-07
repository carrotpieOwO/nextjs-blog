'use client'

import { useRouter } from "next/navigation"
import img from "@/loadingImg.png"
import Image from "next/image";
import ErrorBtn from "./components/common/ErrorBtn";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    console.log('error', error)
    const router = useRouter();
    return (
        <>
            <main className="w-screen h-[calc(100vh-226px)] bg-pink-50 dark:bg-gray-900 flex flex-col justify-center items-center gap-3">
                <p className="text-3xl font-semibold">에러가 나버림.......ㅠㅠ</p>
                <Image src={img} alt="loading" width={700}/>
               <div className="flex gap-3">
                    <ErrorBtn handleClick={() => reset()}>새로고치면 될지도?!</ErrorBtn>
                    <ErrorBtn handleClick={() => router.back()}>안되면 뒤롱ㅠㅠ</ErrorBtn>
               </div>
            </main>
        </>
    )
}