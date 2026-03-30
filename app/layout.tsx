import type { Metadata } from "next";
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import LanguageProvider from "@/context/LanguageContext";

 
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

export const metadata: Metadata = {
  metadataBase: new URL("https://dotmg.eu"),
  title: {
    default: "DOT Media Group — Digital Agency",
    template: "%s | DOT Media Group",
  },
  description:
    "DOT Media Group is a digital agency specializing in video production, branding, and digital marketing. We help brands tell their story through compelling visuals.",
  keywords: [
    "digital agency moldova",
    "agentie de marketing moldova",
    "video production",
    "branding",
    "digital marketing",
    "DOT Media Group",
  ],
  authors: [{ name: "DOT Media Group" }],
  creator: "DOT Media Group",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ro_RO",
    url: "https://dotmg.eu",
    siteName: "DOT Media Group",
    title: "DOT Media Group — Creative Agency",
    description:
      "Creative agency specializing in video production, branding, and digital marketing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOT Media Group — Creative Agency",
    description:
      "Creative agency specializing in video production, branding, and digital marketing.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dotmg.eu",
  },
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
        <ThemeProvider>
          <LanguageProvider>
            <LoadingProvider overlay={<LoadingOverlay />}>
              {children}
            </LoadingProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-7HZK1WW9JQ" />
    </html>
  );
}
