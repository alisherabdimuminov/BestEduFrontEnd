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
              { href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css", rel: "stylesheet" },
              { rel: "icon", type: "image/png", href: "./android-chrome-192x192.png" },
              { rel: "icon", type: "image/png", href: "./android-chrome-512x512.png" },
              { rel: "icon", type: "image/png", href: "./apple-touch-icon.png" },
              { rel: "icon", type: "image/png", href: "./favicon-16x16.png" },
              { rel: "manifest", href: "./favicon-32x32.png" },
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
