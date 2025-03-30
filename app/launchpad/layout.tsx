import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/ui/home/common/Header";
import Head from "next/head";
import localFont from 'next/font/local';
import Menu from "@/app/ui/launchpad/menu";

const myFont = localFont({
  src: './ppneuemontreal-book.otf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AI Agent",
  description: "Artela tech stack is best suited for fully onchain AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={myFont.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} /> */}
      </Head>
      <main className="relative sm:overflow-hidden min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-col sm:flex-row">
          <Menu />
          {children}
        </div>
      </main>
    </div>
  );
}