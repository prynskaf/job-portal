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
      
        <main className="">
        <Navbar />
        <ReduxProvider>
        {children}
        </ReduxProvider>
        <Toaster position="bottom-left" richColors />
        <Footer/>
        </main>
      </body>
    </html>
  );
}
