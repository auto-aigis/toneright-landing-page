import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToneRight - Professional Tone Analysis",
  description: "Sound exactly how you mean to",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
