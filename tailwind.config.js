/** @type {import('tailwindcss').Config} */

import { breakpoints } from "./src/lib/utils"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: `${breakpoints.mobile}px`,
        // => @media (min-width: 800px) { ... }
        desktop: `${breakpoints.tablet}px`,
        // => @media (min-width: 1024px) { ... }
      },
      fontFamily: {
        manrope: "var(--font-manrope)",
      },
    },
  },
  plugins: [],
}
