import type { Metadata } from "next";
import { Inter, Poppins, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navigation from "./components/Navigation";

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
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Top To Bottom Cleaning Services - Cleaning Quote Calculator",
  description: "Get your instant cleaning quote with our fast calculator",
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
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
