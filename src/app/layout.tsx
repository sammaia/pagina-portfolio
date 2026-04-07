import type { Metadata } from "next";
import { Orbitron, Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Samantha Maia Saldanha | Full-Stack Developer",
  description:
    "Full-stack developer building web, mobile, and AI-powered products. Based in Toronto, ON.",
  openGraph: {
    title: "Samantha Maia Saldanha | Full-Stack Developer",
    description:
      "Full-stack developer building web, mobile, and AI-powered products.",
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
      className={`${orbitron.variable} ${outfit.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full noise">{children}</body>
    </html>
  );
}
