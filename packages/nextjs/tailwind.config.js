/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "MantaCareDark",	// Default: 'dark'
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        MantaCare: {
          primary: "#143146",
          "primary-content": "#ffffff",
          secondary: "#bce8eb",
          "secondary-content": "#143146",
          accent: "#b38945",
          "accent-content": "ffffff",
          neutral: "#143146",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#DAE8FF",
          "base-content": "#143146",
          info: "#306b81",
          success: "#b38945",
          warning: "#c483b0",
          error: "#c483b0",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        MantaCareDark: {
          primary: "#143146",
          "primary-content": "#F9FBFF",
          secondary: "#306b81",
          "secondary-content": "#F9FBFF",
          accent: "#b38945",
          "accent-content": "#F9FBFF",
          neutral: "#bce8eb",
          "neutral-content": "#385183",
          "base-100": "#306b81",
          "base-200": "#143146",
          "base-300": "#212638",
          "base-content": "#F9FBFF",
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#c483b0",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
