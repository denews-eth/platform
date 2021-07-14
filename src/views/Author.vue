<template>
  <main class="main">
    <div
      class="main__author"
      :style="(user.profile_background_image_url == null) ? 'background: url(/img/bg/bg.png) center center / cover no-repeat' : 'background: url('+user.profile_background_image_url+') center center / cover no-repeat'"
    ></div>
    <div class="container">
      <div class="row row--grid">
        <div class="col-12 col-xl-3">
          <AuthorDetails :twitter="twitter" :account="account" :user="user"></AuthorDetails>
        </div>

        <div class="col-12 col-xl-9">
          <!-- Profile verified -->
          <div class="profile p-3" v-if="!verified && twitter">
            <div class="row justify-content-center">
              <p class="mt-2 mr-3" style="color:#dedede">Profilo non verificato!</p>
              <a class="author__follow" style="background:#9e550b" href="/verify">Verifica</a>
            </div>
          </div>
          <div class="profile" v-if="twitter">
            <!-- tabs nav -->
            <ul
              class="nav nav-tabs profile__tabs"
              id="profile__tabs"
              role="tablist"
            >
              <li class="nav-item" @click="selected = 'saved'">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tab-1"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                  >Saved</a
                >
              </li>

              <li class="nav-item" @click="selected = 'created'">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#tab-2"
                  role="tab"
                  aria-controls="tab-2"
                  aria-selected="false"
                  >Created</a
                >
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#tab-3"
                  role="tab"
                  aria-controls="tab-3"
                  aria-selected="false"
                  >My Activity</a
                >
              </li>
            </ul>
            <!-- end tabs nav -->
          </div>

          <!-- Profile NOT verified-->
          <div class="profile" v-if="!twitter" id="ProfileNotVerified">
            <!-- tabs nav -->
            <ul
              class="nav nav-tabs profile__tabs"
              id="profile__tabs"
              role="tablist"
            >
              <li class="nav-item" @click="selected = 'saved'">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tab-1"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                  >Saved</a
                >
              </li>

              <li class="nav-item" @click="selected = 'created'">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#tab-2"
                  role="tab"
                  aria-controls="tab-2"
                  aria-selected="false"
                  >Created</a
                >
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#tab-3"
                  role="tab"
                  aria-controls="tab-3"
                  aria-selected="false"
                  >My Activity</a
                >
              </li>
            </ul>
            <!-- end tabs nav -->
          </div>

          <!-- content tabs -->
          <div class="tab-content" v-if="twitter">

            <div class="tab-pane fade show active" id="tab-1" role="tabpanel" v-show="selected=='saved'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articlesSaved" :key="article.hash">
                  <ArticlePreview :article="article" :author_image="search(article.author, users).profile_image_url" v-on:article_saved="editProfile(article.hash, (user.articles_saved.indexOf(article.hash)!=-1))" :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
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
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articles" :key="article.hash">
                  <ArticlePreview :article="article" :author_image="search(article.author, users).profile_image_url" v-on:article_saved="editProfile(article.hash, (user.articles_saved.indexOf(article.hash)!=-1))" :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
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
          <div class="tab-content row flex-column" v-if="!twitter">
            <div class="mx-auto">
              <h2 style="text-align:center; color:#cccccc; margin:20px 0 15px 0;">Profilo non verificato</h2>
              <a class="author__follow" type="button" style="padding:15px; margin:0 auto; width:200px" href="http://localhost:3000/twitter/login">Accedi con Twitter</a>
            </div>
          </div>
          <!-- end content tabs -->
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped>
  #ProfileNotVerified {overflow:hidden;}
  #ProfileNotVerified ul::after{content: ''; position: absolute; top: 0;bottom: 0; right: 0; left: 0; background: rgb(22 21 26 / 67%); z-index: 1;}

</style>

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
      auth_token: '',
      articles: [],
      articlesSaved: [],
      selected: 'saved',
      users: []
    };
  },
  props: ['oauth_token', 'screen_name'],
  components: {
    AuthorDetails,
    ArticlePreview,
    Paginator,
    Activity,
  },
  methods: {
    async twitterLogin() {
      if(localStorage.getItem('oauth_token') === null) {
        if(this.oauth_token != undefined) {
          this.auth_token = this.oauth_token
          this.twitter = true
          let res = await axios.post('/twitter/validate', {oauth_token: this.oauth_token})
          this.user = res.data.user
        }
        else {
          this.twitter = false
          localStorage.removeItem('oauth_token')
          localStorage.removeItem('verified')
          this.verified = false
        }
      }
      else {
        this.auth_token = localStorage.oauth_token
        let res = await axios.post('/twitter/validate', {oauth_token: this.auth_token})
        this.user = res.data.user
        this.twitter = true
      }
    },
    async getArticles() {
      let res = await axios.post('/articles/search', {author:this.user.screen_name} )
      this.articles = res.data
      let res2 = await axios.post('/articles/saved', {hash: this.user.articles_saved } )
      this.articlesSaved = res2.data
    },
    async editProfile(hash, saved) {
      console.log(hash)
      console.log(saved)
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
            oauth_token: this.auth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
          console.log(this.user.articles_saved)
          console.log(res.data)
        }
        else {
          this.user.articles_saved.push(hash)
          let res = await axios.post('/users/edit', {
            oauth_token: this.auth_token,
            address: this.account,
            articles_saved: this.user.articles_saved
          })
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
    await this.twitterLogin()
    await this.getUsers()
    if(this.twitter) await this.getArticles()
    
  },
};
</script>