'use client';

import React from "react";

interface Prop {
    handleClick: () => void
    children: React.ReactNode
}

export default function ErrorBtn ({ handleClick, children }: Prop) {
    return (
        <button onClick={() => handleClick()} className="relative px-5 py-3 overflow-hidden font-medium text-pink-600 dark:text-gray-600 bg-pink-100 dark:bg-gray-100 border border-pink-100 dark:border-gray-100 rounded-lg shadow-inner group">
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-pink-600 dark:border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-pink-600 dark:border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-pink-600 dark:bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-pink-600 dark:bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-pink-600 dark:bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">{ children }</span>
        </button>
    )
}