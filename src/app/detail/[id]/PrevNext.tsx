import Link from "next/link";

interface Prop {
    url: string
    content: string
    direction: 'right' | 'left'
}
export default function PrevNext({ url, content, direction }:Prop) {
    return (
        <Link href={url} className={`relative inline-flex items-center justify-start w-64 py-3 overflow-hidden font-semibold text-pink-400 transition-all duration-150 ease-in-out rounded
            ${ direction === 'left' ? 'pl-12 pr-4 hover:pl-6 hover:pr-10' : 'pl-4 pr-12 hover:pl-10 hover:pr-6' } bg-gray-50 group`}>
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
        // <Link href={url} className="relative w-96 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden transition duration-300 ease-out border border-pink-500 rounded-md shadow group">
        //     <span className={`absolute inset-0 flex items-center justify-center w-full h-full duration-300  bg-pink-400
        //         ${direction === 'right' ? '-translate-x-full' : 'translate-x-full'}
        //         group-hover:${ direction === 'right' ? 'translate-x-0 ' : 'translate-x-0'} ease`}
        //     >
        //         {
        //             direction === 'left' ? 
        //             <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        //                 <path fill="#fff" d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/>
        //             </svg>
        //             :
        //             <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        //                 <path fill="#fff" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/>
        //             </svg>
        //         }
                
        //     </span>
        //     <span className={`absolute flex items-center justify-center w-full h-full text-pink-500 transition-all duration-300 transform 
        //         group-hover:${ direction === 'right' ? 'translate-x-full' : 'translate-x-full'} ease`}
        //     >
        //             { content }
        //     </span>
        //     <span className="relative invisible">{ content }</span>
        // </Link>
    )
}