import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      init: "0px",
      xsm: "375px",
      sm: "393px",
      md: "768px",
      lg: "1280px",
      xlg: "1600px",
    },
    extend: {
      screens: {
        "fine-pointer": {
          raw: "(pointer: fine)",
        },
      },
    },
    colors: {
      white: "#ffffff",
      blackText: "#282828",
      blackHeading: "#101010",
      grayDark: "#212626",
      grayMiddle: "#CDCDCD",
      grayReg: "#B0B0B0",
      greenAccent: "#03E477",
      greenSoft: "#2EF896",
      redAccent: "#FF5151",
      redSoft: "#FF9898",
      transparent: "transparent",
    },
  },
  plugins: [],
};
export default config;
