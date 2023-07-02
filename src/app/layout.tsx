import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import LogoutBtn from './components/nav/LogoutBtn'
import Link from 'next/link'
import Hamburger from './components/nav/Hamburger'
import Menu from './components/nav/Menu'
import Providers from './Provider'
import DarkModeBtn from './components/nav/DarkModeBtn'
import Search from './components/nav/Search'
import SearchBtn from './components/nav/SearchBtn'
import Scene from './components/three/Scene'
import HomeBtn from './components/nav/HomeBtn'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ha0peno BLOG❤️',
  description: '하용피뇨 front-end 기술 블로그',
  icons: '../app/favicon.ico'
}

export default async function RootLayout({children,}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className='dark:bg-gray-800'>
            <div className='mx-auto border-b-2 border-gray-200 dark:border-gray-900'>
              <nav className='px-10 sm:px-15 md:px-10 xl:px-0 bg-white dark:bg-gray-800 h-[72px] flex items-center justify-between max-w-6xl mx-auto'>
                <HomeBtn />
                <div className='flex items-center space-x-2'>
                  <SearchBtn />
                  <div className='hidden sm:inline-flex'>
                    <Search />
                  </div>
                  <DarkModeBtn />
                  <div className='hidden md:flex items-center space-x-2'>
                    <Link href='/blog' className='hover:text-pink-500'>Blog</Link>
                    <a href='https://github.com/carrotpieOwO' className='hover:text-pink-500'>GitHub</a>
                    {
                      session && session.user?.name === 'carrotpieOwO' &&
                      <>
                        <LogoutBtn />
                        <Link href="/write">글쓰기</Link>
                      </>
                    }
                  </div>
                  <div className='md:hidden'>
                      <Hamburger />
                  </div>
                </div>
              </nav>
            </div>
            <div className='sm:hidden'>
              <Search />
            </div>
            <Menu />
          </header>
          {children}
          <footer className='bg-pink-50 dark:bg-gray-900 text-center py-16'>
            ha0peno • © 2023 • ha0.work
          </footer>
        </Providers>
      </body>
    </html>
  )
}
