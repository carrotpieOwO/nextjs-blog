'use client'
import { signOut } from 'next-auth/react';


export default function LogoutBtn() {
   return (
    <a onClick={() => signOut()}>로그아웃</a>
   )
}