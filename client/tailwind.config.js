/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,html}"], // Ensure paths include your project files
    theme: {
      extend: {
        colors: {
          primary: "#014D48", // Deep Teal
          accent: "#FA8649", // Vibrant Orange
          background: "#FFE5D5", // Soft Peach
          dark: "#001C27", // Dark Navy
          white: "#FFFFFF", // White
        },
      },
    },
    plugins: [],
  };
  