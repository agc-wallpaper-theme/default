import _ from 'lodash'
const path = require('path')
const webpack = require('webpack')
const envPath = path.resolve(__dirname, '../../.env')
require('dotenv').config({ path: envPath })

const tailwindJS = path.join(__dirname, 'tailwind.js')
const permalink = {
  single: process.env.PERMALINK_SINGLE || '/:keyword_id/:image_id/:image_slug',
  user: process.env.PERMALINK_USER || '/user/:user_id'
}

module.exports = {
  mode: 'universal',
  server: {
    port: process.env.NUXT_PORT || 3000,
    host: process.env.NUXT_HOST || 'localhost'
  },
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: process.env.HTML_LANG || 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.APP_DESCRIPTION
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  css: ['~/assets/css/tailwind.css'],
  loading: {
    color: '#fff',
    height: '4px'
  },
  plugins: [
    '~/plugins/img-lazy-load.js',
    '~/plugins/numbro.js',
    { src: '~plugins/vue-cookie-law.js', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // 'bootstrap-vue/nuxt', // if you want to use bootstrap
    'nuxt-purgecss',
    'nuxt-sweetalert2'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': process.env.API_URL || '/'
  },
  purgeCSS: {
    mode: 'postcss',
    paths: [
      '~/components/**/*.vue',
      '~/layouts/**/*.vue',
      '~/pages/**/*.vue',
      '~/plugins/**/*.js'
    ]
  },
  router: {
    extendRoutes(routes) {
      _.forEach(routes, function(route, key) {
        if (route.name === 'single') {
          route.path = permalink.single
        }
        if (route.name === 'user') {
          route.path = permalink.user
        }
      })
    }
  },
  build: {
    extractCSS: false,
    postcss: {
      plugins: [
        require('tailwindcss')(tailwindJS),
        require('autoprefixer'),
        require('postcss-nesting'),
        require('postcss-preset-env')({
          stage: 0
        }),
        require('cssnano')({
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false
        })
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
