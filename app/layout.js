
// import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["100", "400", "500", "600", "700"],
//   variable: "--font-inter",
// });

export const metadata = {
  title: "SmartRUGA | Smart Ranch Management for African Farmers",
  description:
    "SmartRUGA helps ranch owners and staff manage livestock, health records, staff coordination, and inventory — all in one platform built for African ranching operations.",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={` antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
