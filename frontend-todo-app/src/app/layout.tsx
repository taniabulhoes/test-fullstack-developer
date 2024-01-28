import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppWrapper } from '../context';
import "../styles/styles.scss";

const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do App",
  description: "Created by Stefano Branz for Tania Bulhões FullStack test",
  icons: {
    icon: '/favicon.ico',
    href: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
