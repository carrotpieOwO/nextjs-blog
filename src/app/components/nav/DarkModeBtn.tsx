"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function DarkModeBtn() {
    const [mounted, setMounted] = useState(false)
    const { systemTheme, theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const isComment = document.querySelector('iframe.utterances-frame');
        if (isComment) {
            const utterancesTheme = theme === 'light' ? "github-light" : "photon-dark" ;
            const utterancesEl = document.querySelector('iframe.utterances-frame') as HTMLIFrameElement;

            (
                utterancesEl?.contentWindow?.postMessage(
                { type: "set-theme", theme: utterancesTheme },
                "https://utteranc.es/"
            )
            )
        }
    }, [systemTheme, theme])

    if (!mounted) {
        return null
    }

    const currentTheme = theme === "system" ? systemTheme : theme


    return (
        <div>
            <button 
                title="toggleTheme"
                className="w-10 h-5 mr-2 sm:mr-0 rounded-full bg-pink-100 dark:bg-white flex items-center transition duration-300 focus:outline-none shadow"
                onClick={() => {
                    setTheme( currentTheme === 'dark' ? 'light' : 'dark')
                }}
            >
                {
                    currentTheme === 'dark' ? 
                        <div
                            className="w-6 h-6 relative rounded-full transition duration-500 transform bg-gray-700 -translate-x-2 p-1 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                        </div>   
                    :
                        <div
                        className="w-6 h-6 relative rounded-full transition duration-500 transform bg-pink-500 translate-x-full p-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>  
                       
                }
            </button>
        </div>
    )
}