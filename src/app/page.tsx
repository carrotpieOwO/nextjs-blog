import Scene from "./components/three/Scene";
export const revalidate = 60; // 60초 단위로 캐싱, 페이지단위로 캐싱가능

export default async function Home() {
  return (
    <main className="min-h-[calc(100vh-227px)] py-10 px-4 sm:p-10 md:p-20 lg:p-30 bg-pink-50 dark:bg-gray-900 transition-colors duration-300 ease-out">
      <div className="text-center">
        <div className="text-5xl font-extrabold mb-4">ha0peno</div>
        <p className="text-center text-gray-600">~살아남기 위한 고군분투를 기록하다~</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[calc(100vh-550px)] items-center bg-white dark:bg-gray-800 rounded-lg my-10">
        <Scene page="home" />
        <div className="px-10 py-10">
          <h4 className="text-xl font-semibold">About</h4>
          <div className="px-1 sm:px-10 py-7 text-gray-700 dark:text-gray-300 text-sm sm:text-lg">
            <div className="flex items-center">
              <p>안녕하세요.</p><span className="ml-1 animate-waving-hand">👋🏻</span>
            </div>
            <p>프론트엔드 개발자 <span className="text-green-800 font-semibold">하용피뇨🫑</span>입니다.</p><br/>
            <p>개발 시 겪었던 문제사항들이나, </p>
            <p>공부했던 것들을 기록하기 위한 블로그입니다.</p><br/>
            <span>
              본블로그는
              <code className="bg-pink-100 py-0.5 px-2 rounded-md text-pink-500 text-sm mr-1">Next.js</code>
              <code className="bg-pink-100 py-0.5 px-2 rounded-md text-pink-500 text-sm mr-1">React</code>
              <code className="bg-pink-100 py-0.5 px-2 rounded-md text-pink-500 text-sm mr-1">Typescript</code>
              로 제작되었습니다.
            </span>
            <p>제 블로그가 유익하셨다면, 아래 메시지로 응원을 남겨주세요! </p><br/>
            <div className="flex gap-2">
              <a className="text-sm text-gray-500 transition hover:text-gray-600" target="_blank" rel="noopener noreferrer" href="mailto:xxhayoxx@naver.com">
                <span className="sr-only">mail</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-current text-gray-700 hover:text-pink-500 dark:text-gray-200 dark:hover:text-pink-400 h-6 w-6">
                  <path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z"></path><path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z"></path>
                  </svg>
              </a>
              <a className="text-sm text-gray-500 transition hover:text-gray-600" target="_blank" rel="noopener noreferrer" href="https://github.com/carrotpieOwO">
                <span className="sr-only">github</span>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700 hover:text-pink-500 dark:text-gray-200 dark:hover:text-pink-400 h-6 w-6">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
              </a>
            </div>
          </div>
          <h4 className="text-xl font-semibold mt-20">Message</h4>
          <div className="flex items-center w-full 2xl:w-2/3 mt-5">
            <textarea rows={1} className="block ml-1 sm:ml-10 mr-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="Your message..."></textarea>
            <button type="submit" className="inline-flex justify-center p-2 text-pink-600 rounded-full cursor-pointer hover:bg-pink-100 dark:text-pink-500 dark:hover:bg-gray-600">
              <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
