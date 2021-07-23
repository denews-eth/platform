<template>
<div class="container">
  <div class="row row--grid">
    <Breadcrumb :links="[{link:'/', name:'Home', active:false}, {link:'/article/'+article._id, name:'Article', active:true}]"></Breadcrumb>
    <ArticleBlog :article="article"></ArticleBlog>
    <ArticleSidebar v-if="false"></ArticleSidebar>
    
  </div>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import ArticleBlog from '@/components/ArticleBlog.vue'
import ArticleSidebar from '@/components/ArticleSidebar.vue'

import axios from 'axios'

export default {
  name:"Article",
  components: {
    Breadcrumb,
    ArticleBlog,
    ArticleSidebar
  },
  watch: {
    '$route' (to) {
      this.hash = to.params.hash
      this.getArticles()
    }
  },
  data() {
    return {
      article: {}
    }
  },
  props: ['hash'],
  methods: {
    async getArticles() {
      let res = await axios.get('/articles/'+this.hash)
      this.article = res.data
    }
  },
  async mounted() {
    await this.getArticles()
  }
}
</script>