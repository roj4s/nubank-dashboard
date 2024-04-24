import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ExpensesContextProvider } from "./context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nubank Dashboard",
  description:
    "A simple app to visualize expense reports from Nubank csv export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ExpensesContextProvider>{children}</ExpensesContextProvider>
      </body>
    </html>
  );
}
