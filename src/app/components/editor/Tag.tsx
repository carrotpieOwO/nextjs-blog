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
            <div className="flex gap-3">
                {
                    tags &&
                    tags.map((tag, index) => 
                        <div key={tag} className="background-black">
                            {tag}
                            <span onClick={() => deleteTag(tag)}>x</span>
                        </div>
                    )
                }
            </div>
        </>
    )
}