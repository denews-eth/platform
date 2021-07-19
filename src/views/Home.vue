<template>
  <div>
    <Carousel></Carousel>
    <div class="container">
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
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3" v-for="article in articles" :key="article.hash">
          <ArticlePreview :article="article" :author_image="search(article.author, users).profile_image_url" v-on:article_saved="editProfile(article.hash, (user.articles_saved.indexOf(article.hash)!=-1))" :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
        </div>

        <div class="col-12">
          <!-- tabs content -->
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
              <div class="row row--grid">
                <Paginator v-if="articles.length > 3"></Paginator>
              </div>
            </div>
          </div>
        </div>
        <!-- end explore -->
      </section>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Paginator from '@/components/Paginator.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Carousel,
    ArticlePreview,
    Paginator
  },
  data() {
    return {
      articles: [],
      user: {articles_saved:[]},
      oauth_token: '',
      twitter: false,
      users: [],
      account: ''
    }
  },
  methods: {
    async getArticles() {
      let res = await axios.get('/articles')
      if(res.data.error == true) {return}
      else this.articles = res.data
    },
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
          if(res.data.error == true) return
        }
        else {
          this.user.articles_saved.push(hash)
          let res = await axios.post('/users/edit', {
            oauth_token: this.oauth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
          if(res.data.error == true) return
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
  },
  async mounted() {
    if (localStorage.getItem("connected") !== null) {
      this.account = localStorage.getItem("connected")
    }
    await this.twitterLogin()
    await this.getArticles()
    await this.getUsers()

  }
}

</script>
