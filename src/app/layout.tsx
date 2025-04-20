import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "sonner";
import ReduxProvider from "./Components/Providers/ReduxProvider";


export const metadata: Metadata = {
  title: "Always Apply",
  description: "Find your dream job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ReduxProvider>
        <main className="">
        <Navbar />
        {children}
        <Toaster position="bottom-left" richColors />
        <Footer/>
        </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
