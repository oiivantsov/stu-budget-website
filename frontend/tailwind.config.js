module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your file structure
  ],
  theme: {
    extend: {
      spacing: {
        '40': '10rem', // Add custom spacing value for 10rem
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode with the 'class' strategy
};