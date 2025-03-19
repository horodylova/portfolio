"use client"

import { useState } from 'react';
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header setActiveSection={setActiveSection} />
        <div className="main-container">
          <Sidebar setActiveSection={setActiveSection} />
          <main className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
