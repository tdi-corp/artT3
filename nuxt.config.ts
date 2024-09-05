// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: "relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900"
      }
    }
  },


  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: 'https://jsonplaceholder.typicode.com/posts'
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  tailwindcss: {
    cssPath: ['~/assets/css/main.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    // exposeConfig: {
    //   level: 2
    // },
    // config: {},
    // viewer: true,
  }  
})