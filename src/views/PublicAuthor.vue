<template>
  <main class="main">
    <div
      class="main__author"
      data-bg="img/bg/bg.png"
      style="background: url('/img/bg/bg.png') center center / cover no-repeat"
    ></div>
    <div class="container">
      <div class="row row--grid">
        <div class="col-12 col-xl-3">
          <AuthorDetails :user="user" :twitter="true"></AuthorDetails>
        </div>

        <div class="col-12 col-xl-9">

          <div class="profile">
            <!-- tabs nav -->
            <ul
              class="nav nav-tabs profile__tabs"
              id="profile__tabs"
              role="tablist"
            >
              <li class="nav-item" @click="selected = 'saved'">
                <a
                  :class="(selected=='saved')? 'nav-link active' : 'nav-link'"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                  style="cursor:pointer"
                  >Saved</a
                >
              </li>

              <li class="nav-item" @click="selected = 'created'">
                <a
                  :class="(selected=='created')? 'nav-link active' : 'nav-link'"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="tab-2"
                  aria-selected="false"
                  style="cursor:pointer"
                  >Created</a
                >
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="tab-3"
                  aria-selected="false"
                  style="cursor:pointer"
                  >My Activity</a
                >
              </li>
            </ul>
            <!-- end tabs nav -->
          </div>

   

          <!-- content tabs -->
          <div class="tab-content">

            <div class="tab-pane fade show active" id="tab-1" role="tabpanel" v-show="selected=='saved'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articlesSaved" :key="article.tokenId">
                  <ArticlePreview :article="article" v-on:article_saved="editProfile(article.hash, (user.articles_saved.indexOf(article.hash)!=-1))" :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
                </div>
                <div v-show="articlesSaved.length == 0" style="text-align:center; margin:20px auto;">
                  <h3 style="color:lightgray">There are no saved articles</h3>
                  <button class="author__follow" style="background:rgb(58 22 162);width:250px;height:50px" @click="() => $router.push({name:'Explore'})">Go to collection</button>                  
                </div>
              </div>
              <Paginator v-if="articlesSaved.length > 3"></Paginator>
            </div>

            <div class="tab-pane fade show active" id="tab-2" role="tabpanel" v-show="selected=='created'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articles" :key="article.tokenId">
                  <ArticlePreview :article="article" v-on:article_saved="editProfile(article.hash, (user.articles_saved.indexOf(article.hash)!=-1))" :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
                </div>
                <div v-show="articles.length == 0" style="text-align:center; margin:20px auto;">
                  <h3 style="color:lightgray">You have not created any articles yet</h3>
                  <button class="author__follow" style="background:rgb(58 22 162);width:250px;height:50px; margin:0 auto" @click="() => $router.push({name:'Create'})">Create a new one</button>                  
                </div>
              </div>
              <Paginator v-if="articles.length > 3"></Paginator>
            </div>

            <div class="tab-pane fade" id="tab-3" role="tabpanel">
              <div class="row">
                <!-- content -->
                <div class="col-12">
                  <div class="row row--grid">
                    <div class="col-12">
                      <Activity></Activity>
                    </div>
                  </div>

                  <div class="row row--grid">
                    <div class="col-12">
                      <button
                        class="main__load"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapsemore1"
                        aria-expanded="false"
                        aria-controls="collapsemore1"
                      >
                        Load more
                      </button>
                    </div>
                  </div>
                  <!-- end collapse -->
                </div>
                <!-- end content -->
              </div>
            </div>
          </div>
          <!-- end content tabs -->
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import AuthorDetails from "@/components/AuthorDetails.vue";
import ArticlePreview from "@/components/ArticlePreview.vue";
import Paginator from "@/components/Paginator.vue";
import Activity from "@/components/Activity.vue";

import axios from 'axios'

export default {
  name: "Author",
  data() {
    return {
      account: "",
      verified: false,
      twitter: false,
      user: {articlesSaved:[]},
      oauth_token: '',
      articles: [],
      articlesSaved: [],
      selected: 'saved'
    };
  },
  props: ['screen_name'],
  components: {
    AuthorDetails,
    ArticlePreview,
    Paginator,
    Activity,
  },
  methods: {
    async getArticles() {
      let res = await axios.post('/articles/search', {author:this.user.screen_name} )
      this.articles = res.data
      let res2 = await axios.post('/articles/saved', {hash: this.user.articles_saved } )
      this.articlesSaved = res2.data
    },
    async editProfile(hash, saved) {
      if(this.oauth_token !== '') {
        if(saved == true) {
          this.user.articles_saved[this.user.articles_saved.indexOf(hash)] = undefined
          let i = 0;
          let temp = this.user.articles_saved
          this.user.articles_saved = []
          temp.forEach(el => {
            if(el != null) {
              this.user.articles_saved[i] = temp[i]
              i++
            }
          });
          
          let res = await axios.post('/users/edit', {
            oauth_token: this.oauth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
        }
        else {
          this.user.articles_saved.push(hash)
          let res = await axios.post('/users/edit', {
            oauth_token: this.oauth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
        }
      }
      else {
        this.$router.push({ name: 'Author'})
      }
    }
  },
  async mounted() {
    const app = this;
    const connected = localStorage.getItem("connected");
    if (connected !== null) {
      app.account = connected;
    } else {
      window.location.href = "/";
    }
    if(localStorage.verified === "true") {
      this.verified = true
    }
    if(this.screen_name != undefined && this.screen_name != '') {
      let res = await axios.get('/users/profile/'+this.screen_name)
      this.user = res.data
      console.log(this.user)
    }
    await this.getArticles()
    if(localStorage.getItem('oauth_token') !== null) this.oauth_token = localStorage.getItem('oauth_token')
    console.log(this.articles)
    console.log(this.articlesSaved)
  },
};
</script>