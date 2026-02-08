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

export const jakartaFont = localFont({
  src: "../public/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-jakarta",
  display: "swap",
});

export const frauncesFont = localFont({
  src: "../public/fonts/Fraunces.ttf",
  variable: "--font-fraunces",
  display: "swap",
});

export const frauncesItalicFont = localFont({
  src: "../public/fonts/Fraunces-Italic.ttf",
  variable: "--font-fraunces-italic",
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
        className={`${mainFont.variable} ${secondaryFont.variable} ${jakartaFont.variable} ${frauncesFont.variable} ${frauncesItalicFont.variable} antialiased bg-black overflow-x-hidden`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
