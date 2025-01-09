import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "utils/providers";
import AppContext from "./app-context";
import { CssBaseline } from "@mui/material"
import Nav from "comps/nav"
import { links } from "utils/routes"
import { Footer } from "comps/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stylish Greeting Cards, Made Just for You! | Bumblecard"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >        
        <main id="parent">
          <Providers>
            <AppContext options={{ key: "mui" }}>
              <CssBaseline />
              <Nav links={links}/>
              <div className="mt-[64px]">

                {children}
              </div>
              <Footer/>
            </AppContext>
          </Providers>
        </main>
      </body>
    </html>
  );
}
