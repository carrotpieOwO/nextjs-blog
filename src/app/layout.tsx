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
                <Link className='flex items-center' href="/">하용피뇨</Link>
                <div className='flex items-center space-x-2'>
                  <SearchBtn />
                  <div className='hidden sm:inline-flex'>
                    <Search />
                  </div>
                  <DarkModeBtn />
                  <div className='hidden md:flex items-center space-x-1'>
                    <a href='https://github.com/carrotpieOwO'>gitHub</a>
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
          <Scene />
          {children}
        </Providers>
      </body>
    </html>
  )
}
