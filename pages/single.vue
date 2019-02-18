<template>
  <div role="main">
    <div class="w-full mx-auto bg-grey-lighter">
      <div class="container mx-auto sm:max sm:py-2 md:p-2 lg:p-6">
        <div class="block bg-white w-full md:w-3/4 lg:w-1/2 mx-auto p-4 rounded">
          <h1 class="text-black font-bold text-xl capitalize">{{ image.title }}</h1>
          <div v-lazy-container="{ selector: 'img' }" class="block pt-2">
            <img
              :data-src="image.image_url"
              :data-error="image.thumbnail"
              :alt="image.title"
              :title="image.title"
              class="w-full h-auto rounded"
            >
          </div>
          <div class="w-full flex flex-wrap my-4">
            <div v-if="image.user" class="w-full md:w-1/2">
              <nuxt-link :to="{ name: 'user', params: { user_id: image.user.username } }" class="w-full flex items-center no-underline">
                <img :src="image.user.avatar" class="w-10 h-10 rounded-full mr-4" :alt="image.user.name">
                <div class="text-sm">
                  <p class="text-black leading-none"><strong>{{ image.user.name }}</strong></p>
                  <p class="text-grey-darkest">{{ image.user.followers | followersFormat }} followers</p>
                </div>
              </nuxt-link>
            </div>
            <div class="w-full md:w-1/2">
              <div class="w-auto float-right">
                <a
                  :href="image.page_url"
                  rel="noopener"
                  target="_blank"
                  class="bg-grey-light no-underline hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg
                    class="fill-current pointer-events-none text-grey-darkest w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4.9283,1 C3.6273,1 2.5713,2.054 2.5713,3.357 C2.5713,4.66 3.6273,5.714 4.9283,5.714 L14.9523,5.714 L1.6893,18.976 C0.7703,19.896 0.7703,21.389 1.6893,22.31 C2.1503,22.771 2.7533,23 3.3573,23 C3.9603,23 4.5633,22.771 5.0243,22.31 L18.2853,9.047 L18.2853,19.071 C18.2853,20.374 19.3413,21.429 20.6433,21.429 C21.9443,21.429 23.0003,20.374 23.0003,19.071 L23.0003,1 L4.9283,1 Z"
                    ></path>
                  </svg>
                  <span class="pl-2">{{ image.domain.replace('www.', '') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block w-full bg-white">
      <div class="container mx-auto rounded-lg p-4">
        <h2
          class="text-black font-bold text-xl capitalize border-b-4 border-teal-lighter py-2"
        >{{ keyword.query }}</h2>
        <div v-if="image.templates.description" class="py-4" v-html="image.templates.description"></div>
      </div>
    </div>
    <div class="block w-full mx-auto bg-grey-lighter mt-4">
      <div class="container mx-auto md:p-6">
        <h3 class="text-black capitalize text-center">More like this</h3>
        <ImagesList :images="images" :keyword="keyword" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import ImagesList from '~/components/ImagesList'

export default {
  components: {
    ImagesList
  },
  middleware: 'single',
  head() {
    return {
      title: this.image.templates.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.image.templates.seo_description
        }
      ]
    }
  },
  computed: {
    ...mapState({
      keyword: 'keyword'
    }),
    results() {
      return this.keyword.results || []
    },
    images() {
      let images = []
      if (this.imageIndex !== -1) {
        if (this.imageIndex < _.size(this.results)) {
          const after = _.slice(this.results, this.imageIndex + 1)
          images = _.concat(images, after)
        }
        if (this.imageIndex > 0) {
          const before = _.slice(this.results, 0, this.imageIndex)
          images = _.concat(images, before)
        }
      }
      return images
    },
    imageIndex() {
      const params = this.$route.params
      return _.findIndex(this.results, function(o) {
        return (
          _.isEqual(params.image_id, o.id) ||
          _.isEqual(params.image_slug, o.slug)
        )
      })
    },
    image() {
      return this.results[this.imageIndex] || false
    }
  }
}
</script>
