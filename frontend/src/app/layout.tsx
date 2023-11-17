import { getCssText, globalCss } from '@/styles'
import { globalStyles } from '@/styles/global'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Template from './template'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo List Tabia Bulhões',
  description: 'A melhor TodoList do Brasil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-body`}>
        <Template>{children}</Template>
      </body>
    </html>
  )
}
