// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
      head: {
          link: [
              { href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css", rel: "stylesheet" }
          ],
      }
  },
  runtimeConfig: {
    public: {
      // apiURL: "http://localhost:8000/",
      apiURL: "https://bestedu.uz/",
    }
  }
})
