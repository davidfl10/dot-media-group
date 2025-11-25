import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";

 
export const mainFont = localFont({
  src: "../public/fonts/Catchy-Mager-Regular.ttf",
  variable: "--font-main",
  display: "swap",
});

export const secondaryFont = localFont({
  src: "../public/fonts/alta-regular.otf",
  variable: "--font-secondary",
  display: "swap",
});

const metadata: Metadata = {
  title: "DOT Media Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} ${secondaryFont.variable} antialiased bg-black`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
