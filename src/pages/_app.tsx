import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../react-query.config'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  const { pathname } = router

  return <div className="flex">
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Landing Page</title>
          <link rel="shortcut icon" href="/logo.png" type="image/png" />
          <meta charSet="UTF-8" />
        </Head>
        <div className="bg-gray-950 w-full min-h-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c9c5cf' fill-opacity='0.21'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          <div className="bg-gray-200">
            <img src="/logo.png" className="w-32 mx-auto" />
          </div>

          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  </div>
}
