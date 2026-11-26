import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishal V — Full-stack developer",
  description:
    "Vishal V — full-stack developer and cybersecurity student in Bengaluru. Projects in distributed systems, microservices and security tooling.",
  openGraph: {
    title: "Vishal V — Full-stack developer",
    description: "Projects, skills and contact for Vishal V.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0c0c0f", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
