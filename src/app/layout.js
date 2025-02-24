import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomHeader } from "@/components";
import { LoginProvider } from "@/context/Login";
import { MercadoProvider } from "@/context/mercado";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Financeiro Thech",
  description: "projeto para controle financeiro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-black">
        <LoginProvider>
          <MercadoProvider>
            <CustomHeader>{children}</CustomHeader>
          </MercadoProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
