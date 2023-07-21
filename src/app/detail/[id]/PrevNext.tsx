import Link from "next/link";

interface Prop {
    url: string
    content: string
    direction: 'right' | 'left'
}
export default function PrevNext({ url, content, direction }:Prop) {
    return (
        <Link href={url} className={`relative inline-flex items-center justify-start min-w-[300px] w-full md:w-fit py-3 overflow-hidden font-semibold text-pink-400 transition-all duration-150 ease-in-out rounded-lg shadow-md
            ${ direction === 'left' ? 'pl-12 pr-4 hover:pl-6 hover:pr-10 mr-auto' : 'pl-4 pr-12 hover:pl-10 hover:pr-6 ml-auto' } bg-white dark:bg-gray-600 group`}>
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-pink-400 group-hover:h-full"></span>
            {
                direction === 'left' ?
                <span className={`absolute left-0 pl-4 duration-200 ease-out group-hover:-translate-x-12`}>
                     <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5l-7 7m0 0l7 7m-7-7h18"></path>
                    </svg>
                </span>
                :
                <span className={`absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12`}>
                {
                    direction === 'right' &&
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                }
                </span>
            }
            {
                direction === 'right' ?
                <span className={`absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200`}>
                {
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                }
                </span>
                :
                <span className={`absolute right-0 pr-2.5 translate-x-12 group-hover:translate-x-0 ease-out duration-200`}>
                    {
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5l-7 7m0 0l7 7m-7-7h18"></path>
                        </svg>
                    }
                </span>
            }
            <span className={`relative w-full ${direction === 'left' ? 'text-right' : 'text-left'} transition-colors duration-200 ease-in-out group-hover:text-white`}>{ content }</span>
        </Link>
    )
}