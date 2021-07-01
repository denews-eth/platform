<template>
  <main class="main">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </main>
</template>
<style lang="css">
  html, body { width: 100vw !important; height: 100vh!important; margin: 0!important; padding:0!important; overflow-x: hidden;}
</style>
<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
