import Link from "next/link";

interface Prop {
    url: string
    text: string
}
export default function TagBtn ({ url, text }:Prop) {
    return (
        <Link href={ url } className="relative inline-block px-2 py-1 group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-pink-400 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-pink-400 group-hover:bg-pink-400 rounded-md"></span>
            <span className="relative text-xs text-pink-500 group-hover:text-white">{ text }</span>
        </Link>
        // <Link href={ url } className="relative rounded px-2 py-0.5 overflow-hidden group bg-pink-400 hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-300 transition-all ease-out duration-300 shadow-md">
        //     <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        //     <span className="relative text-sm">{ text }</span>
        // </Link>
        // <Link href={ url } className="rounded relative inline-flex group items-center justify-center px-2.5 py-1 m-1 cursor-pointer border-b-4 border-l-2 active:border-pink-400 active:shadow-none shadow-lg bg-gradient-to-tr from-pink-400 to-pink-200 border-pink-500 text-white">
        //     <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
        //     <span className="relative font-normal text-sm">{ text }</span>
        // </Link>
        // <Link href={ url } className="rounded-md px-1.5 mx-1 overflow-hidden relative group cursor-pointer border font-medium border-pink-400 text-pink-600 text-white">
        //     <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-pink-400 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        //     <span className="relative text-pink-400 text-sm transition duration-300 group-hover:text-white ease">{ text }</span>
        // </Link>
    )
}