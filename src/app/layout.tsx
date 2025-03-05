import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RGT Assignment",
  description: "Web front-end S/W 개발 직무 면접 전 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
