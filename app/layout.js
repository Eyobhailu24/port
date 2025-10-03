import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: "Eyob's Portfolio",
  description:
    'Portfolio of Eyob H, MERN stack developer specializing in full-stack web apps.',
  icons: {
    icon: '/Portfolio.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
