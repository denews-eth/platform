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
      <ExploreFilter v-on:pushCategory="pushCategory" v-on:removeCategory="removeCategory" v-on:updateSearch="updateSearch"></ExploreFilter>
    </div>
    <div class="col-12 col-xl-9 order-xl-1">
      <div class="row row--grid">
        <!-- explore -->
        
        <div class="col-12 col-sm-6 col-lg-4" v-for="article in articles" :key="article._id">
          <ArticlePreview :article="article" :author_image="(search(article.author, users) != undefined) ? search(article.author, users).profile_image_url : ''" v-on:article_saved="editProfile(article.hash, (user.articles_saved !== undefined && user.articles_saved.indexOf(article.hash)!=-1))" :saved="(user.articles_saved !== undefined && user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
        </div>
        <div class="col-12" v-if="articles.length == 0" style="text-align:center; margin-top:50px;color:#b1b1b1;font-weight:400">
          <h4>There are no articles in this page</h4>
        </div>

        <div class="col-12">
          <!-- tabs content -->
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
              <div class="row row--grid">
                <Paginator v-on:changePage="changePage" :currentPage="currentPage" :pages="pages"></Paginator>
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
import ExploreFilter from '@/components/ExploreFilter.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

import axios from 'axios'

export default {
  name:"Explore",
  components: {
    Paginator,
    ArticlePreview,
    ExploreFilter,
    Breadcrumb
  },
  data() {
    return {
      articleSavedSuccess: false,
      oauth_token: "",
      account: "",
      user: {articles_saved:[]},
      verified: false,
      twitter: false,
      articles: [],
      users: [],
      categories: [],
      currentPage: (localStorage.getItem('page') === null) ? 1 : localStorage.getItem('page'),
      pages: 0
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
      let res = await axios.get('/articles/'+this.currentPage)
      if(res.data.error == true) return
      else {
        this.articles = res.data.articles
        this.pages = res.data.pages
        this.currentPage = res.data.current
      }
    },
    async editProfile(hash, saved) {
      if(this.account.length < 1) {
        document.querySelector('.loginModal').style.display = 'block'
        setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
        return
      }
      if(this.oauth_token !== "") {
        if(saved == true) {
          this.user.articles_saved[this.user.articles_saved.indexOf(hash)] = undefined
          let i = 0;
          let j = 0;
          let temp = this.user.articles_saved
          this.user.articles_saved = []
          temp.forEach(el => {
            if(el != null) {
              this.user.articles_saved[j] = temp[i]
              j++
            }
            i++
          });
          
          let res = await axios.post('/users/edit', {
            oauth_token: this.oauth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
          if(res.data.error==true) return
        }
        else {
          this.user.articles_saved.push(hash)
          let res = await axios.post('/users/edit', {
            oauth_token: this.oauth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
          if(res.data.error==true) return
        }
      }
      else {
        this.$router.push({ name: 'Author'})
      }
    },
    search(target, myArray){
      for (let i=0; i < myArray.length; i++) {
        if (myArray[i].screen_name === target) {
          return myArray[i];
        }
      }
    },
    async getUsers() {
      let res = await axios.get('/users') 
      this.users = res.data
    },
    pushCategory(value) {
      if(this.categories.length == 0) {
        this.currentPage = 1
      }
      this.categories.push(value)
    },
    removeCategory(value) {
      let temp = this.categories
      this.categories = []
      temp[temp.indexOf(value)] = undefined
      let i = 0
      temp.forEach( el => {
        if(el != undefined) {
          this.categories[i] = el
          i++
        }
      })
      if(this.categories.length == 0) {
        this.getArticles()
      }
    },
    async updateSearch() {
      let res = await axios.post('/articles/search/'+this.currentPage, {
        categories: this.categories
      })
      if(res.data.error != true) {
        this.articles = res.data.articles
        this.currentPage = res.data.current
        this.pages = res.data.pages
      }
    },
    async changePage(value) {
      this.currentPage = value
      if(this.categories.length > 0) {
        this.updateSearch()
      }
      else {
        this.getArticles()
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
    await this.getUsers()
  }
}
</script>