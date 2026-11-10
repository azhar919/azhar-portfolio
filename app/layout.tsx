import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Cormorant, Montserrat, Arimo } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
import CustomCursor from "@/components/CustomCursor";

const SITE_URL = "https://azhar-portfolio-gold.vercel.app";

// One typeface for the whole portfolio UI — Inter, across the full weight range
// so hierarchy comes from weight + size + tracking, not a second family.
// (Cormorant stays as the italic serif accent; Montserrat/Arimo are scoped to
// the client design-system showcases only.)
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Display face for headings only — a grotesque with more character than Inter.
// Variable (200–800) with the optical-size axis, so big headlines get the
// tighter display cut automatically.
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
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

// Helvetica-metric fallback — used in the Life Healthcare DS components so they
// render like Helvetica Neue on any OS (not Arial).
const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" style={{ viewTransitionName: "root" }} className={`${inter.variable} ${bricolage.variable} ${cormorant.variable} ${montserrat.variable} ${arimo.variable}`}>
      <head>
        {/* Apply the saved theme before first paint (no flash). Dark is the default. */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}` }} />
      </head>
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <MotionProvider>
          {children}
        </MotionProvider>
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}
