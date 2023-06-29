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
          <header>
            <div className='mx-auto border-b-2 border-gray-200 dark:border-gray-900'>
              <nav className='flex justify-between px-10 py-7 bg-white dark:bg-gray-800'>
                <Link className='flex items-center' href="/">하용피뇨</Link>
                <div className='flex items-center space-x-1'>
                  <Search />
                  <DarkModeBtn />
                  <a href='https://github.com/carrotpieOwO'>gitHub</a>
                  <div className='hidden md:flex items-center space-x-1'>
                    {
                      session && session.user?.name === 'carrotpieOwO' &&
                      <>
                        <LogoutBtn />
                        <Link href="/write">글쓰기</Link>
                      </>
                    }
                  </div>
                  <div className='md:hidden'>
                  {
                      session && session.user?.name === 'carrotpieOwO' &&
                      <Hamburger />
                    }
                  </div>
                </div>
              </nav>
            </div>
            <Menu />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
