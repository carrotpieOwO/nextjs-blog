/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': 'url("/images/sailor-monn-wallpaper-preview.jpg")'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "pre code::before": {
              "padding-left": "unset"
            },
            "pre code::after": {
              "padding-right": "unset"
            },
            // "pre": {
            //   backgroundColor: theme("colors.pink.100"),
            //   color:  theme("colors.slate.600")
            // },
            code: {
              backgroundColor: theme("colors.pink.100"),
              color: "#DD1144",
              fontWeight: "400",
              "border-radius": "0.25rem"
            },
            "code::before": {
              content: '""',
              "padding-left": "0.25rem"
            },
            "code::after": {
              content: '""',
              "padding-right": "0.25rem"
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

