/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js}'
    ],
    theme: {
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
                '256': '64rem',
                '200': '50rem',
            }
        },
    },
    plugins: [],
}

