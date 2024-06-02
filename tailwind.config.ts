import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      fontFamily: {
        limelight: ['Limelight', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'custom-dark': '#1F191B',
        'custom-light': '#473F3F',
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(to right, #1F191B, #473F3F)',
      }),
    },
  },
  plugins: [],
};
export default config;
