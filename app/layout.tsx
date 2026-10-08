import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

const title = "litmus7.si is for sale";
const description = "The premium domain litmus7.si is available. Minimum bid ₹1 crore (INR).";

// og:image comes from app/opengraph-image.png (Next file convention)
export const metadata: Metadata = {
  metadataBase: new URL("https://litmus7.si"),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: "litmus7.si", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans">{children}</body>
    </html>
  );
}
