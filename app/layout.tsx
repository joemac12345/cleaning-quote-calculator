import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navigation from "./components/global-parts/Navigation";

// === CACHING CONFIG ===
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true;
export const maxDuration = 30;

// Suppress Next.js 16.2.1 manifest script tag warning (known issue #92180)
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = function(...args: any[]) {
    if (args[0]?.toString?.().includes('script tag while rendering React component')) {
      return;
    }
    originalError.apply(console, args);
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#48546A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://toptobottomcleaning.netlify.app"),
  title: "Top To Bottom Cleaning Services - Cleaning Quote Calculator",
  description: "Get your instant cleaning quote with our fast calculator",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Top To Bottom",
  },
  openGraph: {
    title: "Top To Bottom Cleaning Services - Professional Cleaning",
    description: "Get your instant cleaning quote today. Fast, easy, and transparent pricing for all your cleaning needs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top To Bottom Cleaning Services",
      },
    ],
    type: "website",
    url: "https://toptobottomcleaning.netlify.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top To Bottom Cleaning Services - Professional Cleaning",
    description: "Get your instant cleaning quote today. Fast, easy, and transparent pricing for all your cleaning needs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
      className={`${inter.variable} ${outfit.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-gray-900 font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navigation />
          <div className="max-w-[700px] mx-auto mt-2">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
