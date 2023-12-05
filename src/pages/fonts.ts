import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["cyrillic"],
});

export const RFDewi = localFont({
  src: "./RFDewi-Bold.woff2",
  weight: "700",
});
