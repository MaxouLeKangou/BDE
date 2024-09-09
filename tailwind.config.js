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
        fontSize: {
            "sm": ".625rem",
            "base": ".75rem",
            "lg": ".875rem",
            "xl": "1rem",
            "2xl": "1.25rem",
            "3xl": "1.625rem",
        },
        dropShadow: {
            'button': '10px 0px 20px 0px #FFFFFF',
        },
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
            fontFamily: {
                poppins_light: ["Poppins-Light", "sans-serif"],
                poppins: ["Poppins-Regular", "sans-serif"],
                poppins_semibold: ["Poppins-SemiBold", "sans-serif"],
                poppins_extrabold: ["Poppins-ExtraBold", "sans-serif"],

            },
        },
    },
    plugins: [],
};
