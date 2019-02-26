<template>
  <section role="main">
    <div class="bg-teal-lighter py-10 md:py-20">
      <div class="container mx-auto text-center mb-4">
        <h1 class="mb-2 text-5xl font-black">{{ siteTitle }}</h1>
        <p>{{ siteDescription }}</p>
      </div>
    </div>
    <div class="bg-grey-lightest py-10 md:py-20 border-t-4 border-b-4 border-teal">
      <div class="container mx-auto text-center mb-4">
        <div v-if="terms.length" class="w-full text-center mb-10">
          <h2 class="w-auto py-2 text-4xl mb-4 font-extrabold font-serif">TRENDING</h2>
          <ul class="list-reset lg:flex lg:flex-wrap lg:items-center lg:justify-center">
            <li v-for="term in terms" :key="term.slug" class="mb-2">
              <nuxt-link
                :to="{ name: 'single', params: termUrlParams(term.slug, term.id) }"
                :class="randomTagClass()"
              >{{ termHashtag(term.query) }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-white py-10 md:py-20">
      <div class="container mx-auto py-10">
        <h3 class="text-3xl mb-2 font-bold text-center font-mono">RECENT VIEWED IMAGES</h3>
        <p class="text-center mb-10 text-xl">Check this recent viewed images in this site below.</p>
        <ImagesList :images="images" :keyword="keyword" />
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import ImagesList from '~/components/ImagesList'
import _ from 'lodash'

export default {
  components: {
    ImagesList
  },
  middleware: 'index',
  head() {
    return {
      title: this.siteTitle
    }
  },
  computed: {
    ...mapState({
      keyword: 'keyword',
      siteTitle: 'site.title',
      terms: 'terms'
    }),
    images() {
      return this.keyword.results || []
    },
    siteTitle() {
      return this.$store.state.site.title
    },
    siteDescription() {
      return this.$store.state.site.description
    }
  },
  methods: {
    termUrlParams(slug, id) {
      return {
        keyword_slug: slug,
        image_slug: 'top',
        image_id: id
      }
    },
    termHashtag(string) {
      return '#' + _.upperFirst(_.camelCase(string))
    },
    randomTagClass() {
      const colors = [
        'red-dark',
        'red-darker',
        'red-darkest',
        'green-darker',
        'green-darkest',
        'teal-dark',
        'teal-darker',
        'teal-darkest',
        'blue-darker',
        'blue-darkest',
        'indigo',
        'indigo-dark',
        'indigo-darker',
        'indigo-darkest',
        'purple',
        'purple-dark',
        'purple-darker',
        'purple-darkest',
        'pink-dark',
        'pink-darker',
        'pink-darkest'
      ]
      const size = [
        'text-xs',
        'text-sm',
        'md:text-base',
        'md:text-lg',
        'md:text-lg lg:text-xl',
        'md:text-lg lg:text-2xl',
        'md:text-lg xl:text-3xl',
        'md:text-lg xl:text-4xl'
      ]
      return [
        'font-bold',
        'm-1',
        'no-underline',
        'text-' + _.sample(colors),
        _.sample(size)
      ]
    }
  }
}
</script>
