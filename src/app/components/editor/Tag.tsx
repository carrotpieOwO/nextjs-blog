'use client';

import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
    tags: string[]
    setTags: Dispatch<SetStateAction<string[]>>;
}

export default function Tag ({ tags, setTags }: Props) {
    const [ input, setInput ] = useState('');

    const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const tag = input.replace(/[\s,]+/g, "");
      
        
        if (key === ',') {
          e.preventDefault();
          !tags.includes(tag) && tag.length && setTags(prevState => [...prevState, tag]);
          setInput('');
        }
    };

    const deleteTag = (tag:string) => {
        setTags(tags.filter(t => t !== tag))
    }

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Tags</label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onKeyUp={handleKeyup}
                value={input}
                onChange={(e) => setInput(e.target.value)} 
            />
            <div className="flex gap-3 my-2">
                {
                    tags &&
                    tags.map((tag, index) => 
                        <span key={tag} className={`bg-pink-100 py-2 px-2 text-pink-600 text-xs font-medium mr-2 rounded flex items-center`}>
                            {tag}
                            <svg className="h-3 w-3 text-black ml-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                                onClick={() => deleteTag(tag)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    )
                }
            </div>
        </>
    )
}