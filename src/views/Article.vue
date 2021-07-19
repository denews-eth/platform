<template>
<div class="container">
  <div class="row row--grid">
    <Breadcrumb :links="[{link:'/', name:'Home', active:false}, {link:'/article/'+article._id, name:'Article', active:true}]"></Breadcrumb>
    <ArticleBlog :article="article"></ArticleBlog>
    <ArticleSidebar v-if="false"></ArticleSidebar>
    <div class="col-12 col-xl-12">
      <Comments></Comments>
    </div>
  </div>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import ArticleBlog from '@/components/ArticleBlog.vue'
import ArticleSidebar from '@/components/ArticleSidebar.vue'
import Comments from '../components/Comments.vue'

import axios from 'axios'

export default {
  name:"Article",
  components: {
    Breadcrumb,
    ArticleBlog,
    ArticleSidebar,
    Comments
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
      console.log(res.data)
    }
  },
  async mounted() {
    await this.getArticles()
  }
}
</script>