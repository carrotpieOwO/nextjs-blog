'use client';

import axios from "axios";
import dayjs from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";


const createPost =  (data: Record<string, string>) => {
    return axios.post('/api/post/comment', data)
};

export default function MessageForm () {
    const [ name, setName ] = useState('');
    const [ content, setContent ] = useState('');
    const [ nameError, setNameError ] = useState(false);
    const [ contentError, setContentError ] = useState('');

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(createPost);

    const [ successMsg, setSuccessMsg ] = useState(false)
    
    useEffect(() => {
        if(isSuccess) setSuccessMsg(true)
        const alertTimeput = setTimeout(() => {
            setSuccessMsg(false)
        }, 2000);

        return () => clearTimeout(alertTimeput)
    }, [isSuccess]);

    const handleName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        checkName(e.target.value);
    }

    const handleContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        checkContent(e.target.value);
    }

    const checkName = (name:string) => {
        if(name.trim() === '') {
            setNameError(true);
            return true
        } else {
            setNameError(false);
            return false
        }
    }

    const checkContent = (content:string) => {
        if(content.trim() === '' ) {
            setContentError('내용을 작성해 주세요.')
            return true
        }

        if(content.trim().length > 180) {
            setContentError('180자 이내로 작성해 주세요.')
            return true
        }
        setContentError('')
        return false
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const isValidName = checkName(name);
        const isValidContent = checkContent(content);
        if( isValidName || isValidContent ) return
        
        mutate({ name, content, createdTime: dayjs().format('YYYY-MM-DDTHH:mm:ss')});
        
        setName('');
        setContent('');
    }

    return (
        <div className="flex items-center justify-start ">
            <div className="mt-10">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="relative z-0">
                        <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm  focus:border-pink-600 focus:outline-none focus:ring-0"
                            value={ name } onChange={ handleName } placeholder=" "
                        />
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pink-600 peer-focus:dark:text-pink-500">Your name</label>
                        <div className="text-pink-500 text-sm">{ nameError && '이름을 입력해 주세요.' }</div>
                    </div>
                    <div className="relative z-0 col-span-2">
                        <textarea name="message" rows={5} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm  focus:border-pink-600 focus:outline-none focus:ring-0"
                            value={ content } onChange={ handleContent } placeholder=" "
                        />
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pink-600 peer-focus:dark:text-pink-500">
                            소즁한 방명록 💌
                        </label>
                        <div className="text-pink-500 text-sm">{ contentError }</div>
                        { isError && <div> error </div> }
                        { 
                            successMsg &&
                                <div className="p-4 mt-2 mb-4 text-sm text-pink-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-pink-400" role="alert">
                                    💗 소즁한 방명록 감사합니다!
                                </div>
                        }
                    </div>
                </div>
                <button type="button" className="mt-5 w-40 h-11 rounded-md px-10 py-2 overflow-hidden relative group cursor-pointer border font-medium border-pink-500 text-pink-500 text-white"
                    onClick={ handleSubmit }
                >
                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-pink-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span className="relative flex text-pink-500 transition duration-300 group-hover:text-white ease">
                        {
                            isLoading ? 
                            <div role="status" className="mx-auto">
                                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>\
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            : 
                            <>
                                Send
                                <svg className="w-6 h-6 rotate-90 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </>
                        }
                    </span>
                </button>
            </div>
        </div>
    )
}