'use client';

import useScrollPosition from "@/hooks/useScrollPosition";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



interface Prop {
    type: 'pageUp' | 'back'
}
export default function NavigateBtn ({ type }: Prop) {
    const router = useRouter();
    const { scrollPosition } = useScrollPosition();
    const [ displayBtn, setDisplayBtn ] = useState(false);

    useEffect(() => {
        if(scrollPosition > 500) {
            setDisplayBtn(true)
        } else {
            setDisplayBtn(false)
        }
    }, [scrollPosition])

    const handleClick = () => {
        if(type === 'pageUp') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            router.back();
        }
    }

    return (
        <>
            {
                <button className={`relative ${ displayBtn ? 'opacity-100' : 'opacity-0'} hidden sm:inline-flex items-center justify-center px-4 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 shadow-lg rounded-3xl group transition-opacity duration-300`}
                    onClick={ handleClick }
                >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-pink-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span className="absolute inset-0 w-full h-full rounded-3xl opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                    <span className="relative">
                        {
                            type === 'pageUp' ?
                            <svg aria-hidden="true" className="w-4 h-4 transform -rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            :
                            <svg aria-hidden="true" className="w-4 h-4 transform -rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            
                        }
                    </span>
                </button>
            }
        </>

    )
}