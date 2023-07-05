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
import HomeBtn from './components/nav/HomeBtn'
import ReactQueryProvider from './ReactQueryProvider'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: {
    template: '%s :: ha0peno❤️',
    default: 'ha0peno❤️'
  },
  description: '하용피뇨 front-end 기술 블로그',
  icons: '../app/favicon.ico',
  generator: 'Next.js',
  applicationName: 'ha0peno',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'front-end', 'front', 'web', 'developer', '기술블로그', '블로그', 'blog'],
  authors: { name: 'ha0peno', url: 'https://ha0.work' },
  creator: 'ha0penp',
  publisher: 'ha0peno',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: {
      template: '%s :: ha0peno❤️',
      default: 'ha0peno❤️'
    },
    description: '하용피뇨 front-end 기술 블로그',
    url: 'https://ha0.work',
    siteName: 'ha0peno',
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    type: 'website',
  },
}


export default async function RootLayout({children,}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <meta name="google-site-verification" content="aqC8RjvcEAuRUmytJpYNa0P1hZsJkxAi74fJXN0xFgc" />
      <body className={inter.className}>
        <Providers>
          <ReactQueryProvider>
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
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  )
}
