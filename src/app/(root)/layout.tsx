import LeftSidebar from "@/components/shared/LeftSidebar";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/shared/TobBar";

import { AppStateProvider } from "@/context";
import LayoutWrapper from "@/components/shared/MainLayoutWrapper";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bonne Affaire",
  description: "my first ecommerce website!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppStateProvider>
            <TopBar />
            <LeftSidebar />
            <main className="min-h-screen  dark:bg-dark-1 bg-light-1">
              <section className="flex items-center flex-1 pb-5 pt-28 max-md:pb-32 ">
                <LayoutWrapper>
                  <div className="px-10 ">{children}</div>
                  <div className="flex justify-center w-full py-3">
                    <p>© All Rights Reserved by ♥ BOBOBOARD</p>
                  </div>
                </LayoutWrapper>
              </section>
            </main>
          </AppStateProvider>
        </ThemeProvider>
        {/*  <Bottombar /> */}
      </body>
    </html>
  );
}
