<template>
  <div>
    <TopMenu />
    <nuxt />
    <Footer />
    <template v-if="showStatCounter">
      <no-ssr>
        <FooterNoSsr />
      </no-ssr>
    </template>
  </div>
</template>
<script>
import TopMenu from '~/components/TopMenu'
import Footer from '~/components/Footer'
import FooterNoSsr from '~/components/FooterNoSsr'
export default {
  components: {
    TopMenu,
    Footer,
    FooterNoSsr
  },
  head() {
    return {
      meta: [
        {
          hid: 'googlebot',
          name: 'googlebot',
          content: 'index,follow,imageindex'
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'all,index,follow'
        },
        {
          hid: 'googlebot-image',
          name: 'googlebot-image',
          content: 'index,follow'
        }
      ],
      changed: () => {
        this.showStatCounter = true
      }
    }
  },
  data: () => ({
    showStatCounter: true
  }),
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.showStatCounter = false
      next()
    })
  }
}
</script>
