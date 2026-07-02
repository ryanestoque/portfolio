import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";
import CustomCursor from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { PreloaderProvider } from "@/components/ui/PreloaderProvider";
import Preloader from "@/components/ui/Preloader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const clashDisplay = localFont({
  src: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
});

export const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: {
    default: "Ryan Estoque | Full Stack Developer",
    template: "%s | Ryan Estoque",
  },
  description:
    "Ryan Estoque is a Full Stack Developer specializing in Next.js, React, and TypeScript. Explore his case studies and experiences.",
  keywords: [
    "Ryan Estoque",
    "Ryan Christopher Estoque",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer Davao City, Philippines"
  ],
  authors: [{ name: "Ryan Estoque" }],
  metadataBase: new URL("https://ryanestoque.dev"),
  openGraph: {
    title: "Ryan Estoque - Full Stack Developer",
    description:
      "Ryan Estoque is a Full Stack Developer specializing in Next.js, React, and TypeScript. Explore his case studies and experiences.",
    type: "website",
    url: "https://ryanestoque.dev",
    images: ["/images/open-graph/ryan-portfolio-og-image.png"],
    siteName: "Ryan Estoque",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Estoque - Full Stack Developer",
    description:
      "Ryan Estoque is a Full Stack Developer from Davao City, Philippines, specializing in Next.js, React, and TypeScript. Explore his case studies and experiences.",
    images: ["/images/open-graph/ryan-portfolio-og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Estoque",
    alternateName: "Ryan Christopher Estoque",
    url: "https://ryanestoque.dev",
    jobTitle: "Full Stack Developer",
    knowsAbout: ["Next.js", "React", "TypeScript", "Full Stack Development", "Web Development"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Davao City",
      addressCountry: "PH",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ryan Estoque",
    url: "https://ryanestoque.dev",
    description:
      "Ryan Estoque is a Full Stack Developer specializing in Next.js, React, and TypeScript.",
  },
];

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
