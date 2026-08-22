import type { Metadata } from "next";
import { BgmProvider } from "@/components/BgmProvider";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "SONG QUIZ",
  description: "음악을 듣고 제목을 맞히는 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <BgmProvider>
          {children}
        </BgmProvider>
      </body>
    </html>
  );
}