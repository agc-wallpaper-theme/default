<template>
  <section class="content">
    <div class="container page-content">
      <h2>Signup</h2>
      <p>Availability: <strong>Currently closed to new users</strong></p>
      <p>This platform is not currently accepting new users. If you are very interesting to join our platform, please email us on <strong>admin@web.com</strong>, we will include you to our list. and will email you when the service re-opened.</p>
      <p>If you are existing user, <nuxt-link to="/signin">signin here</nuxt-link></p>
      <p>Thank you.</p>
    </div>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: 'Signup'
    }
  }
}
</script>
