import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["cyrillic"],
});

export const RFDewi = localFont({
  src: "../../public/fonts/RFDewi-Bold.woff2",
  weight: "700",
  variable: "--font-rfdewi",
});
