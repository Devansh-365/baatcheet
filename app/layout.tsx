import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/providers/toast-provider";
import { Analytics } from "@vercel/analytics/react";
import { ModalProvider } from "@/components/providers/modal-provider";
import { siteConfig } from "@/config";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "shadcn/ui",
    "NextAuth",
    "Prisma",
    "Vercel",
    "Tailwind",
    "Radix UI",
  ],
  authors: [
    {
      name: "Devansh-365",
      url: "https://devanshtiwari.me",
    },
  ],
  creator: "Devansh-365",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@devansh_0718",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.json`,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          <ToastProvider />
          <ModalProvider />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
