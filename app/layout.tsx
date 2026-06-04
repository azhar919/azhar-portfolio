import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";

const SITE_URL = "https://azhar-portfolio-gold.vercel.app";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Elegant high-contrast serif — used for the hero monogram
const cormorant = Cormorant({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
});

// African Bank's brand typeface — used only inside the AB design-system showcase
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


const TITLE = "Azhar Mohamed — Product Designer";
const DESCRIPTION = "Design focused on building intuitive systems, workflows, and interfaces that put people first.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["UX Designer", "UI Designer", "Product Designer", "Design Operations", "Johannesburg", "Azhar Mohamed"],
  authors: [{ name: "Azhar Mohamed" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Azhar Mohamed",
    type: "website",
    locale: "en_ZA",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Azhar Mohamed — Product Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-screen antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
