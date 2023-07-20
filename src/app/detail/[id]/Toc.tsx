'use client';

import useScrollPosition from "@/hooks/useScrollPosition";
import { useMemo } from "react";

interface Toc {
    id: string
    text: string | null
    level: number
}
export default function Toc({ htmlString }: {htmlString: string}) {
    //const htmlString = "<h1>제목 1</h1><h2>소제목 1</h2><h2>소제목 2</h2><h3>세부 제목 1</h3><h1>제목 2</h1>";
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3");
    const { scrollPosition, scrollToEl } = useScrollPosition();

    const tocList:Toc[] = [];
    headings.forEach((heading) => {
        const text = heading.textContent;
        const level = parseInt(heading.tagName.substring(1), 10);
        const id = heading.id
        tocList.push({ id, text, level });
    });

    tocList.forEach((item: any) => {
        const { text, level } = item;
        const indent = "  ".repeat(level - 1);
    });


    const activeItemId = useMemo(() => {
        // 전달받은 headerItem의 id값으로 각 헤더의 offsetTop 값을 배열로 저장한다.
        const targetOffsets = tocList.map((item) => {
            const target =  document.getElementById(item.id);
            return target?.offsetTop ?? Infinity;
        });
        
        // offset배열에서 현재 스크롤 위치보다 offset이 큰 index를 찾는다. 👉🏻 스크롤 위치보다 아래에 있는 div찾기
        const lastIndex = targetOffsets.findIndex((offset) => offset >= scrollPosition);
      
        // 스크롤위치보다 아래에 있는 div가 없을 경우 마지막 목차를 active로 설정한다.
        if (lastIndex === -1) {
            return tocList[tocList.length - 1]?.id ?? null;
        }

        // lastIndex가 있다면, 해당 목차를 active로 설정
        return tocList[lastIndex - 1]?.id ?? tocList[0]?.id;

    }, [scrollPosition, tocList]);

    return (
        <div className="sticky top-28 p-10">
        {
            tocList.map(toc => 
                <div key={toc.id} 
                    //id={toc.id}
                    className={`cursor-pointer px-3 border-l-4 py-1 text-sm 
                        ${ activeItemId === toc.id ? 'bg-pink-100 border-pink-300 text-gray-500' : 'bg-transparent border-pink-200 dark:text-gray-200' }
                        ${toc.level === 2 ? 'pl-10' : toc.level === 3 ? 'pl-16' : 'pl-5'}`}
                    onClick={() => scrollToEl(toc.id) }
                >
                    { toc.text }
                </div>
            )
        }
        </div>
    )
}