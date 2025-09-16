import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowin - Daily Habit Tracker",
  description: "Track your daily activities like exercise, hydration, and healthy habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
