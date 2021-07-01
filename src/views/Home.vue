<template>
  <div>
    <Carousel></Carousel>
    <div class="container">
      <Explore></Explore>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import Explore from '@/components/Explore.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Explore
  }
}
</script>
