import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "400", // You can add additional weights like "500", "600", etc.
});

export const metadata = {
  title: "My Strata Management System", // Your custom title
  description: "Manage your strata system with ease.", // Your custom description
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}