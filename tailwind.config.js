/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
	    "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#740E1D",
                    200: "#CA2D44",
                    300: "#740E1D",
                },
                secondary: "#FEFEE0",

                white: {
                    100: "#F1F5F9",
                    200: "#96999C",
                    300: "#494B4E",
                },

                black: "#0A0A0A",

                background: {
                    100: "#030712",
                    200: "#141623"
                }
            },
        },
    },
    plugins: [],
};