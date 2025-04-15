"use client"

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Hero from '@/components/Hero'
import About from '@/components/About'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const getIndicatorPosition = (section) => {
    switch(section) {
      case 'hero': return '10%';
      case 'summary': return '30%';
      case 'projects': return '50%';
      case 'skills': return '70%';
      case 'contact': return '90%';
      default: return '10%';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = document.querySelectorAll('section[id]');
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/portfolio-favicon.svg" type="image/svg+xml" />
        <script src="https://unpkg.com/@progress/kendo-licensing/dist/index.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              KendoLicensing.setScriptKey("141j044b041h541j4i1d542e581e4i1i4g260i2k0f2e0c2g0a2f0830082i0g4g114f06470620082e46540e2g0f2e0f1d0g1k142106283k51455b3d5k3d5b45554651083008260427044e425b445h2d402j0e330d370d5b30602b4a2512461j612057470d512k5c0d37114i4a0j1f3d244a0c3c1j13531a1i40503c4j2i195i02391b33054i0f311k4f264h1a424j1k31095h29490f2g45153k4h22310i6017470d5b1033274202361k34143f5i0147083b0c4k055002440f2g3h0a450j20044d133j2e464k2g421a5c155a1b0g370947191i581d5b2k5f1k5j284j243826452j5c14552a4j24133i30540k5c1d4g124a2d311k5a21342a410d38253c0c4c115b18404e255i131j4i0c3e2d5h243e60265a0454093i1a5a0g5i125j2b4b26450k3k151k570a47511f4a2j3a0455055930424i420f47263b063j2b3e00402938095a1d410c4i052c5g2j53490j3518234g0d5h0j582c4626512j08591j5k0h5h29452c4b053313572055211a37225c01472c4g0c340026003e143h1i5230401e532e4b214g295k124519434e22371g0g3a1e4d0931241926424h395j09341g37104d1k381d4f294028385c17431i51253e2k522a5c3d114e2d5k0k5k2d3404280029434j0d4f42135d285g2a3e1h3805610i521d54155j1h54412336043e25382c40064f01370c492119482j52073j1b46274i3i0k3f5j2418482j582f3k265a2i0c42184g07551d114h1h0h49215j0c4c2c3h1e46235e241161284c0f2j362j5j04331j4a0i1g332b4g05311d115g0d5015442a59203d144d264h1244175e30591h0h49025520171k3804315g3f1c103h2h035103361f311c3627005f113f02372907320527360e425523183g1b360h3h2g0e5i27572c3i015a05610c3g1b5h1058135406311g5k104g0g1d0f5g2g540a4h092i4g422h4k1d4c0i201a3a003d23561a38245j0g4j3i4d0j521g4916225i174h394h26025h194i1e404f16504b0d2k5g0h315g3d1444082g3k305b2h582a074g0g4c043a1h4k0i51464f43145414370c3c2g3j213f0f5d345517523a0k3a");
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Header setActiveSection={setActiveSection} />
        <div className={`main-container ${sidebarCollapsed ? 'sidebar-hidden' : ''}`}>
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            onToggle={handleSidebarToggle}
          />
          <div className="vertical-scroll-line">
            <div 
              className="scroll-indicator" 
              style={{ top: getIndicatorPosition(activeSection) }}
            ></div>
          </div>
          <main className="content">
            <section id="hero">
              <Hero />
            </section>
            <section id="summary">
              <About />
            </section>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

