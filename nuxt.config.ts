// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    ssr: false,

	css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    runtimeConfig: {
        public: {
            DATABASE_URL: process.env.DATABASE_URL,
        },
    },

    app: {
        head: {
          meta: [
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1'
            }
          ]
        }
      }
});
