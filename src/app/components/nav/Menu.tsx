'use client';
import useNavStore from "@/util/store/nav"
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

export default function Menu () {
    const { nav } = useNavStore();

    return (
        <>
        {
            nav &&
            <div>
                <LogoutBtn />
                <Link href="/write">글쓰기</Link>
            </div>
        }
        </>
    )
}