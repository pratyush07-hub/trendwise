import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "flowbite-react";
import { NextAuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrendWise",
  description: "Next.js 15 site with Flowbite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
