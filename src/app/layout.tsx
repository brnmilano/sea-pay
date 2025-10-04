import { ReactNode } from "react";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import "@/styles/globals.scss";
import { geistMono, geistSans } from "@/fonts/fonts";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="main-layout">
          <main className="content">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
