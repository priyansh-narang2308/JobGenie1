import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JobGenie - AI Job Search Assistant</title>
        <meta name="description" content="AI-powered job search platform to find your perfect career match" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light">
        <main className={inter.className}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </ThemeProvider>
    </>
  )
}
