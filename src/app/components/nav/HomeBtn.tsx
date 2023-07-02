import Link from "next/link";

export default function HomeBtn () {
    return (
        <Link href="/" className="relative inline-flex items-center justify-start px-6 py-1 overflow-hidden font-medium transition-all bg-white dark:bg-gray-800 rounded hover:bg-white group">
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-pink-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black dark:text-pink-200 transition-colors duration-300 ease-in-out group-hover:text-white">
                HYPN
            </span>
            <span className="ml-1 animate-waving-hand">👋🏻</span>
        </Link>
    )
}