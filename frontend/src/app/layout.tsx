import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MentorMind | AI Mentorship With Durable Memory",
  description: "MentorMind is a private AI mentor that remembers goals, projects, feedback, and progress so professional growth compounds over time.",
  keywords: ["AI mentor", "professional growth", "career development", "AI coaching", "memory"],
  openGraph: {
    title: "MentorMind | AI Mentorship With Durable Memory",
    description: "A private AI mentor that remembers goals, projects, feedback, and progress so professional growth compounds over time.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
