import Header from '@/components/Header'

export const metadata = {
  title: "Svitlana horodylova - Portfolio",
  description: "Web developer's portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <footer>
        </footer>
      </body>
    </html>
  );
}
