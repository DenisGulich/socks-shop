<template>
  <div class="page-wrapper">
    <TheHeader />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/layout/header/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>
