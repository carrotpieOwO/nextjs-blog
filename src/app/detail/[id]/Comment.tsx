'use client';

import { useTheme } from "next-themes";
import React, { useEffect } from "react"

const COMMENTS_ID = 'comments-container';

export default function Comment() {
    const { theme } = useTheme();
    const utterancesTheme = theme === 'light' ? "github-light" : "photon-dark" ;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', "carrotpieOwO/ha0peno-comment");
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', utterancesTheme);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        const comments = document.getElementById(COMMENTS_ID);
        if (comments) comments.appendChild(script);

        return () => {
            const comments = document.getElementById(COMMENTS_ID);
            if (comments) comments.innerHTML = '';
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
      <div id={COMMENTS_ID} />
  );
};