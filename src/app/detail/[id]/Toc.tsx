'use client';
export default function Toc({ htmlString }: {htmlString: string}) {
    //const htmlString = "<h1>제목 1</h1><h2>소제목 1</h2><h2>소제목 2</h2><h3>세부 제목 1</h3><h1>제목 2</h1>";
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3");

    const toc:any[] = [];
    headings.forEach((heading) => {
        const text = heading.textContent;
        const level = parseInt(heading.tagName.substring(1), 10);
        toc.push({ text, level });
    });

    toc.forEach((item: any) => {
        const { text, level } = item;
        const indent = "  ".repeat(level - 1);
        console.log(`${indent}${text}`);
    });

    return (
        <>
        </>
    )
}