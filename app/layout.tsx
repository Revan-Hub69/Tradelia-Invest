import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { ASSISTANT_ID } from "./openai";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tradelia Invest",
  description: "La piattaforma per investimenti e strategie con AI",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {ASSISTANT_ID ? children : <Warnings />}
      </body>
    </html>
  );
}
