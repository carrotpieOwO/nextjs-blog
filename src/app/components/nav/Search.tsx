'use client';

import useNavStore from "@/util/store/nav";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";

export default function Search() {
    const [ value, setValue ] = useState('');
    const { openSearch, setOpenSearch } = useNavStore();
    const ref = useRef(null);

    useEffect(() => {
        setValue('');
        if (openSearch && ref.current) {
            (ref.current as HTMLElement).focus();
        }

    }, [openSearch])

    const router = useRouter();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (value.trim() === '') {
            router.push(`/`);    
        } else {
            router.push(`/search/${value}`);
        }
        setValue('');
    }

    return (
        <>
            <div className={`px-3 sm:px-0 sm:mr-3 sm:mx-auto bg-pink-50 dark:bg-gray-900 
                sm:dark:bg-transparent sm:bg-white ${openSearch? 'py-3 sm:py-0' : 'py-0'}`}
            >
                <form onSubmit={ handleSubmit } className={`relative ${openSearch ? 'h-8' : 'h-0'}`}>
                    <input className={`sm:bg-gray-200 rounded-3xl text-sm focus:outline-none placeholder-gray-500 sm:text-gray-900 ${openSearch ? 'inline w-full px-5 pr-10 h-8': 'w-0 h-0'}`}
                        ref={ref}
                        type="text" name="search" placeholder="Search" 
                        value={ value }
                        onChange={ (e) => setValue(e.target.value )}
                    />
                    <button type="button" className={`absolute right-5 py-0.5 sm:dark:text-gray-900 ${openSearch ? 'inline' : 'hidden'}`} onClick={ ()=> setOpenSearch(false) }>
                        <svg className="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form>
            </div> 
        </>
    )
}