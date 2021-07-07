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
        
        <div class="col-12 col-sm-6 col-lg-4" v-for="article in articles" :key="article._id">
          <ArticlePreview :article="article" v-on:article_saved="editProfile(article._id)"></ArticlePreview>
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

import axios from 'axios'

export default {
  name:"Explore",
  components: {
    Paginator,
    ArticlePreview,
    Filter,
    Breadcrumb
  },
  data() {
    return {
      articleSavedSuccess: false,
      oauth_token: "",
      account: "",
      user: {},
      verified: false,
      twitter: false,
      articles: []
    }
  },
  methods: {
    async twitterLogin() {
      if(localStorage.getItem('oauth_token') === null) {
        this.twitter = false
      }
      else {
        this.oauth_token = localStorage.oauth_token
        let res = await axios.post('/twitter/validate', {oauth_token: this.oauth_token })
        this.user = res.data.user
        this.twitter = true
      }
    },
    async getArticles() {
      let res = await axios.get('/articles')
      if(res.data.error == true) return
      else {
        this.articles = res.data
      }
    },
    async editProfile(articleId) {
      let app = this
      console.log(app.user)
      if(this.oauth_token !== "") {
        this.user.articles_saved.push(articleId)
        let res = await axios.post('/users/edit', {
          oauth_token: this.oauth_token,
          address: this.account,
          articles_saved: (app.user.articles_saved.length <= 1) ? [articleId] : app.user.articles_saved
        })
        if(res.data.error == true) {
          this.articleSavedSuccess = false
          return
        }
        else {
          this.articleSavedSuccess = true
        }
      }
      else {
        location.href="/author"
      }
    }
  },
  async mounted() {
    const connected = localStorage.getItem("connected");
    if (connected !== null) {
      this.account = connected;
    } else {
      window.location.href = "/";
    }
    if(localStorage.getItem('oauth_token') !== null) {
      this.oauth_token = localStorage.getItem('oauth_token')
    }
    if(localStorage.verified === "true") {
      this.verified = true
    }
    await this.twitterLogin()
    await this.getArticles()
  }
}
</script>