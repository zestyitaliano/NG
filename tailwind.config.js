/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Syne', 'sans-serif'],
            },
            colors: {
                primary: '#1982c4',
                secondary: {
                    yellow: '#ffca3a',
                    red: '#ff595e',
                },
                offwhite: '#efefef',
            },
            borderRadius: {
                'none': '0',
                'sm': '0',
                DEFAULT: '0',
                'md': '0',
                'lg': '0',
                'xl': '0',
                '2xl': '0',
                '3xl': '0',
                'full': '0',
            }
        },
    },
    plugins: [],
}
