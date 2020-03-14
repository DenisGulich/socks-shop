if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else {
  require('dotenv').config()
}

export default {
  mode: 'universal',
  /*
   ** Server settings
   */
  server: {
    host: '0.0.0.0'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    css: false
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/intersection-observer-polyfill.js', ssr: false },
    { src: '~/plugins/object-fit-polyfill.js', ssr: false },
    { src: '~/plugins/vue-lazysizes.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/rigor789/vue-scrollto
    'vue-scrollto/nuxt',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // Doc: https://github.com/nuxt-community/auth-module
    '@nuxtjs/auth'
  ],
  /*
   ** SVG sprite config
   ** See https://github.com/nuxt-community/svg-sprite-module
   */
  svgSprite: {
    input: '~/assets/img/icons/'
  },
  /*
   ** Style resources
   */
  styleResources: {
    scss: [
      '~/assets/scss/abstracts/_variables.scss',
      '~/assets/scss/abstracts/_mixins.scss',
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_variables.scss',
      'bootstrap/scss/_mixins.scss'
    ]
  },
  /*
   ** Optionally import individual components
   ** See https://bootstarap-vue.js.org/docs/
   */
  bootstrapVue: {
    components: [
      'BContainer',
      'BForm',
      'BFormInput',
      'BFormGroup',
      'BFormCheckbox',
      'BFormCheckboxGroup',
      'BButton',
      'BFormRadio',
      'BFormRadioGroup',
      'BFormTextarea'
    ],
    directives: [],
    bootstrapCSS: false
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/recipes/extend.html
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/customer/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/api/customer/logout', method: 'get' },
          user: {
            url: '/api/customer/get',
            method: 'get',
            propertyName: 'data'
          }
        }
      },
      tokenRequired: true,
      tokenType: 'bearer'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    }
  },
  /*
   ** Router config
   */
  router: {
    middleware: ['i18n'],
    extendRoutes(routes, resolve) {
      const langRegExp = '([a-z]{2})'

      routes.push({
        path: `/:lang${langRegExp}?`,
        component: resolve(__dirname, 'pages/-index.vue')
      })
    }
  }
}
