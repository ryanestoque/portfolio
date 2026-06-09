import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";
import CustomCursor from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export const clashDisplay = localFont({
  src: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
});

export const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Ryan Estoque - Full Stack Developer",
  description:
    "3rd Year BSIT Student and Full Stack Developer specializing in modern web applications, UI/UX design, and backend architecture. Building digital experiences that merge aesthetics with engineering precision.",
  keywords: [
    "Ryan Estoque",
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ryan Estoque" }],
  openGraph: {
    title: "Ryan Estoque - Frontend Developer",
    description:
      "Building digital experiences that merge aesthetics with engineering precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
