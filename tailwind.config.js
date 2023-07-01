/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'main': 'url("/images/sailor-monn-wallpaper-preview.jpg")'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              backgroundColor: theme("colors.pink.100"),
              padding: "2px",
              color: "#DD1144",
              fontWeight: "400",
              "border-radius": "0.25rem"
            },
            blockquote: {
              p: {
                overflow: 'auto'
              }
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    
  ],
}

