<template>
  <section class="row row--grid">
    <!-- explore -->
    <!-- title -->
    <div class="col-12">
      <div class="main__title">
        <h2>Explore exclusive digital assets</h2>
      </div>
    </div>
    <!-- end title -->

    <!-- tabs nav -->
    <div class="col-12">
      <ul class="nav nav-tabs main__tabs" id="main__tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1"
            aria-selected="true">All</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2"
            aria-selected="false">Art</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3"
            aria-selected="false">Photography</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4"
            aria-selected="false">Memes</a>
        </li>
      </ul>
    </div>
    <!-- end tabs nav -->

    <ArticlePreview v-for="i in 18" :key="i"></ArticlePreview>

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
  </section>
</template>

<script>

import ArticlePreview from '@/components/ArticlePreview.vue'
import Paginator from '@/components/Paginator.vue'

export default {
  name:"Explore",
  components: {
    Paginator,
    ArticlePreview
  }
}
</script>