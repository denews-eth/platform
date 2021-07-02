<template>
<div class="container">
  <div class="row row--grid">
    <Breadcrumb></Breadcrumb>
    <ArticleBlog></ArticleBlog>
    <ArticleSidebar></ArticleSidebar>
    <div class="col-12 col-xl-8">
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

export default {
  name:"Article",
  components: {
    Breadcrumb,
    ArticleBlog,
    ArticleSidebar,
    Comments
  }
}
</script>