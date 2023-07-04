'use client';

import axios from "axios";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";

export default function MessageForm () {
    const [ name, setName ] = useState('');
    const [ mail, setMail ] = useState('');
    const [ content, setContent ] = useState('');

    const [ nameError, setNameError ] = useState(false);
    const [ mailError, setMailError ] = useState(false);
    const [ contentError, setContentError ] = useState('');

    const handleName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        checkName(e.target.value);
    }

    const handleEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value);
        checkEmail(e.target.value);
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

    const checkEmail = (mail:string) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        
        if(emailRegex.test(mail)) {
            setMailError(false)
            return false
        } else {
            setMailError(true)
            return true
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
        const isValidName = checkName(name);
        const isValidMail = checkEmail(mail);
        const isValidContent = checkContent(content);
        if( isValidName || isValidMail || isValidContent ) return
        
        const res = await axios.post('/api/post/comment', { name, mail, content, createdTime: dayjs().format('YYYY-MM-DDTHH:mm:ss')})
        .then( res => {
            console.log('res', res)
        })
        


        
        console.log(nameError, mailError, contentError)
        
    }

    return (
        <div className="flex items-center justify-start ">
            <div className="mt-10">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="relative z-0">
                        <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm  focus:border-pink-600 focus:outline-none focus:ring-0"
                            value={ name } onChange={ handleName } placeholder=" "
                        />
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pink-600 peer-focus:dark:text-pink-500">Your name</label>
                        <div className="text-pink-500 text-sm">{ nameError && '이름을 입력해주세요.' }</div>
                    </div>
                    <div className="relative z-0">
                        <input type="email" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm  focus:border-pink-600 focus:outline-none focus:ring-0"
                            value={ mail } onChange={ handleEmail } placeholder=" "
                        />
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pink-600 peer-focus:dark:text-pink-500">Your email</label>
                        <div className="text-pink-500 text-sm">{ mailError && '메일 형식을 확인해 주세요.' }</div>
                    </div>
                    <div className="relative z-0 col-span-2">
                        <textarea name="message" rows={5} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm  focus:border-pink-600 focus:outline-none focus:ring-0"
                            value={ content } onChange={ handleContent } placeholder=" "
                        />
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pink-600 peer-focus:dark:text-pink-500">
                            소즁한 방명록 💌
                        </label>
                        <div className="text-pink-500 text-sm">{ contentError }</div>
                    </div>
                </div>
                <button type="button" className="mt-5 rounded-md px-10 py-2 overflow-hidden relative group cursor-pointer border font-medium border-pink-500 text-pink-500 text-white"
                    onClick={ handleSubmit }
                >
                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-pink-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span className="relative flex gap-2 text-pink-500 transition duration-300 group-hover:text-white ease">
                        Send
                        <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    )
}