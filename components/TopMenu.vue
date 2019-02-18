<template>
  <div class="bg-teal-dark border-b-4 border-teal">
    <nav class="container mx-auto flex items-center justify-between flex-wrap p-4">
      <div class="sm:m-auto md:m-0 md:mr-10">
        <nuxt-link to="/" class="flex items-center no-underline text-white">
          <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
            ></path>
          </svg>
          <span class="font-bold text-xl">{{ siteTitle }}</span>
        </nuxt-link>
      </div>
      <div class="w-full hidden md:flex md:items-center md:w-auto md:float-right">
        <div class="text-sm md:flex-grow">
          <nuxt-link
            to="/signin"
            class="block mt-4 md:inline-block md:mt-0 text-white no-underline hover:text-teal-lighter mr-4"
          >Signin</nuxt-link>
          <nuxt-link
            to="/signup"
            class="block mt-4 md:inline-block md:mt-0 text-white no-underline hover:text-teal-lighter mr-4"
          >Signup</nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    siteTitle() {
      return this.$store.state.site.title
    }
  }
}
</script>
