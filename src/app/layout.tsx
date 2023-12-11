import { inter, RFDewi } from "@/lib/fonts";
import "../styles/globals.css";

export const metadata = {
  title: "Тысяча лет вместе",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.className} ${RFDewi.variable}`}>
      <body>{children}</body>
    </html>
  );
}
