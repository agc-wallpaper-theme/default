<template>
  <div v-if="keyword && images" v-lazy-container="{ selector: 'img' }" class="masonry mt-4">
    <template v-for="img in uniqueImages">
      <div :key="img.id" class="brick sm:block">
        <nuxt-link
          :to="{ name: 'single', params: { keyword_slug: keyword.slug, image_id: img.id, image_slug: img.slug } }"
        >
          <img
            :data-src="img.image_url"
            :data-error="img.thumbnail"
            :alt="img.title"
            class="w-full lg:rounded-lg md:rounded"
          >
        </nuxt-link>
      </div>
    </template>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  props: {
    keyword: {
      type: Object,
      default: () => ({})
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    uniqueImages() {
      return _.uniqBy(this.images, 'id')
    }
  }
}
</script>
