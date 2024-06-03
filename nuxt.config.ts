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
          // meta: [
          //   { "http-equiv": "content-security-policy", content: "upgrade-insecure-requests" }
          // ]
      }
  },
  runtimeConfig: {
    public: {
      apiURL: "https://bestedu.uz/"
    }
  }
})
