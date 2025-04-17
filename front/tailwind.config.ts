import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["var(--font-fredoka)"],
        poppins: ["var(--font-poppins)"],
        quicksand: ["var(--font-quicksand)"],
      },
    },
  },
  plugins: [],
};
export default config; 