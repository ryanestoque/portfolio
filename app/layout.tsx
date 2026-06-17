import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";
import CustomCursor from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { PreloaderProvider } from "@/components/ui/PreloaderProvider";
import Preloader from "@/components/ui/Preloader";

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
    "A Full stack developer driven by necessity to create functional and beautiful digital explorations.",
  keywords: [
    "Ryan Estoque",
    "Ryan Christopher Estoque",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer Davao City, Philippines"
  ],
  authors: [{ name: "Ryan Estoque" }],
  metadataBase: new URL("https://ryanestoque.me"),
  openGraph: {
    title: "Ryan Estoque - Full Stack Developer",
    description:
      "A Full stack developer driven by necessity to create functional and beautiful digital explorations.",
    type: "website",
    images: ["/images/open-graph/og-image.png"],
    siteName: "Ryan Estoque",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreloaderProvider>
            <Preloader />
            <CustomCursor />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

