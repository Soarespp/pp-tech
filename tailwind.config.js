/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-blue-200",
    "bg-purple-200",
    "bg-sky-200",
    "bg-violet-200",
    "bg-lime-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-fuchsia-200",
    "bg-slate-200",
    "bg-teal-400",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
