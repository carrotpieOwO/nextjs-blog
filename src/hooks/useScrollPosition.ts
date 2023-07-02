import { useState, useEffect } from 'react';

// blog detail 페이지에서 toc컴포넌트에 필요한 scroll관련 hook
export default function useScrollPosition() {
  const [ scrollPosition, setScrollPosition ] = useState<number>(0);
  const [ isScrolling, setIsScrolling ] = useState(false);
  let timeoutId:any = null;
  
  useEffect(() => {
    // scroll 이벤트를 등록하여 현재 스크롤 위치를 업데이트한다. 
    
    const handleScroll = () => {
        setIsScrolling(true);
        const position = window.scrollY;
        setScrollPosition(position);
        
        clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, 200); // 200ms 이후에 스크롤이 멈춘 것으로 판단
        
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToEl = (id:string) => {
    // 전달받은 id값으로 스크롤을 이동시킨다. 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollPosition, scrollToEl, isScrolling };
}