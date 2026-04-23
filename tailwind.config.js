/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    green: '#099250',
                    'green-dark': '#07753F',
                    'green-light': '#ECFDF3',
                },
                ink: {
                    DEFAULT: '#1B2B3A',
                    secondary: '#4B5C6E',
                    tertiary: '#8A9BAC',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#F7F8FA',
                    border: '#E4E8EE',
                },
            },
            fontFamily: {
                display: ['FixelDisplay', 'system-ui', 'sans-serif'],
                text: ['FixelText', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
