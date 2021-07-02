<template>
<div class="container">
  <div class="row row--grid">
    <!-- breadcrumb -->
    <Breadcrumb></Breadcrumb>
    <!-- end breadcrumb -->

    <!-- title -->
    <div class="col-12">
      <div class="main__title main__title--page">
        <h1>Explore exclusive digital assets</h1>
      </div>
    </div>
    <!-- end title -->
  </div>
  <div class="row">
    <div class="col-12 col-xl-3 order-xl-2">
      <Filter></Filter>
    </div>
    <div class="col-12 col-xl-9 order-xl-1">
      <div class="row row--grid">
        <!-- explore -->
        
        <div class="col-12 col-sm-6 col-lg-4" v-for="i in 18" :key="i">
          <ArticlePreview :link="'/article'"></ArticlePreview>
        </div>

        <div class="col-12">
          <!-- tabs content -->
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
              <div class="row row--grid">
                <Paginator></Paginator>
              </div>
            </div>
          </div>
        </div>
        <!-- end explore -->
      </div>
    </div>
  </div>
</div>

</template>

<script>

import ArticlePreview from '@/components/ArticlePreview.vue'
import Paginator from '@/components/Paginator.vue'
import Filter from '@/components/Filter.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name:"Explore",
  components: {
    Paginator,
    ArticlePreview,
    Filter,
    Breadcrumb
  }
}
</script>