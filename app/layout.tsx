import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "เสี่ยงเซียมซีไขปริศนา",
  description: "เกมเซียมซีออนไลน์ ไขปริศนาเพื่อเปิดคำทำนายและข้อคิดประจำวัน",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17100b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
