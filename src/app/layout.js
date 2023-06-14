import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer';
import Provider from "../components/Provider";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beyond Pages',
  description: 'Bloggin Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
