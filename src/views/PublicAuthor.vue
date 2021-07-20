<template>
  <main class="main">
    <div class="main__author"
      :style="(user.profile_background_image_url == null) ? 'background: url(/img/bg/bg.png) center center / cover no-repeat' : 'background: url('+user.profile_background_image_url+') center center / cover no-repeat'">
    </div>
    <div class="container">
      <div class="row row--grid">
        <div class="col-12 col-xl-3">
          <AuthorDetails 
            :user="user"
            :followed="(Object.keys(loggedUser).length > 1) ? (loggedUser.screen_name != user.screen_name) ? (loggedUser.followed_authors.indexOf(user.screen_name) != -1 && loggedUser.followed_authors[loggedUser.followed_authors.indexOf(user.screen_name)] != null) ? true : false : 'invalid' : false"
            :twitter="true" 
            v-on:follow="follow(user.screen_name)" 
            v-on:unfollow="unfollow(user.screen_name)">
          </AuthorDetails>
        </div>

        <div class="col-12 col-xl-9">

          <div class="profile">
            <!-- tabs nav -->
            <ul class="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
              <li class="nav-item" @click="selected = 'created'">
                <a :class="(selected=='created')? 'nav-link active' : 'nav-link'" data-toggle="tab" role="tab"
                  aria-controls="tab-1" aria-selected="true" style="cursor:pointer">Created</a>
              </li>

              <li class="nav-item" @click="selected = 'saved'">
                <a :class="(selected=='saved')? 'nav-link active' : 'nav-link'" data-toggle="tab" role="tab"
                  aria-controls="tab-2" aria-selected="false" style="cursor:pointer">Saved</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" role="tab" aria-controls="tab-3" aria-selected="false"
                  style="cursor:pointer">My Activity</a>
              </li>
            </ul>
            <!-- end tabs nav -->
          </div>



          <!-- content tabs -->
          <div class="tab-content">

            <div class="tab-pane fade show active" id="tab-1" role="tabpanel" v-show="selected=='created'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articles" :key="article.tokenId">
                  <ArticlePreview :article="article" :author_image="(search(article.author, users) != undefined) ? search(article.author, users).profile_image_url : ''"
                    v-on:article_saved="editProfile(article, (user.articles_saved.indexOf(article.hash)!=-1))"
                    :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
                </div>
                <div v-show="articles.length == 0" style="text-align:center; margin:20px auto;">
                  <h3 style="color:lightgray">You have not created any articles yet</h3>
                  <button class="author__follow"
                    style="background:rgb(58 22 162);width:250px;height:50px; margin:0 auto"
                    @click="() => $router.push({name:'Create'})">Create a new one</button>
                </div>
              </div>
              <Paginator v-if="articles.length > 3"></Paginator>
            </div>

            <div class="tab-pane fade show active" id="tab-2" role="tabpanel" v-show="selected=='saved'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articlesSaved" :key="article.tokenId">
                  <ArticlePreview :article="article" :author_image="(search(article.author, users) != undefined) ? search(article.author, users).profile_image_url : ''"
                    v-on:article_saved="editProfile(article, (user.articles_saved.indexOf(article.hash)!=-1))"
                    :saved="(user.articles_saved.indexOf(article.hash)!=-1) ? true : false"></ArticlePreview>
                </div>
                <div v-show="articlesSaved.length == 0" style="text-align:center; margin:20px auto;">
                  <h3 style="color:lightgray">There are no saved articles</h3>
                  <button class="author__follow" style="background:rgb(58 22 162);width:250px;height:50px"
                    @click="() => $router.push({name:'Explore'})">Go to collection</button>
                </div>
              </div>
              <Paginator v-if="articlesSaved.length > 3"></Paginator>
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
                      <button class="main__load" type="button" data-toggle="collapse" data-target="#collapsemore1"
                        aria-expanded="false" aria-controls="collapsemore1">
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
  name: "PublicAuthor",
  data() {
    return {
      account: "",
      verified: false,
      twitter: false,
      user: {articles_saved:[]},
      oauth_token: '',
      articles: [],
      articlesSaved: [],
      selected: 'created',
      users: [],
      loggedUser: {}
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
      let res = await axios.post('/articles/search', {query:this.user.screen_name} )
      this.articles = res.data
      let res2 = await axios.post('/articles/saved', {hash: this.user.articles_saved } )
      this.articlesSaved = res2.data
    },
    async editProfile(article, saved) {
      if(this.account.length < 1) {
        document.querySelector('.loginModal').style.display = 'block'
        setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
        return
      }
      if(this.oauth_token !== "") {
        if(saved == true) {
          this.user.articles_saved[this.user.articles_saved.indexOf(article.hash)] = undefined
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
          else {
            //Remove from render elements
            this.articlesSaved[this.articlesSaved.findIndex( ({ hash }) => hash === article.hash )] = undefined
            let i2 = 0;
            let j2 = 0;
            let temp2 = this.articlesSaved
            this.articlesSaved = []
            temp2.forEach(el => {
              if(el != null) {
                this.articlesSaved[j2] = temp2[i2]
                j2++
              }
              i2++
            });
          }
        }
        else {
          this.user.articles_saved.push(article.hash)
          this.articlesSaved.push(article)
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
    async follow(author) {
			if(Object.keys(this.loggedUser).length > 1) {
				let res = await axios.post('/users/follow', {
					oauth_token: this.oauth_token,
					address: this.account,
					author: author
				})
				if(res.data.error == true) {
					document.querySelector('.loginModal').style.display = 'block'
					document.querySelector('.loginModal h3').innerText = res.data.message
					setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
				}
				else {
					this.loggedUser.followed_authors.push(author)
          this.user.followers++
				}
			}
			else {
				document.querySelector('.loginModal').style.display = 'block'
        setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
			}
			return
		},
		async unfollow(author) {
			if(Object.keys(this.loggedUser).length > 1) {
				let res = await axios.post('/users/unfollow', {
					oauth_token: this.oauth_token,
					address: this.account,
					author: author
				})
				if(res.data.error == true) {
					document.querySelector('.loginModal').style.display = 'block'
					document.querySelector('.loginModal h3').innerText = res.data.message
					setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
				}
				else {
					this.loggedUser.followed_authors[this.loggedUser.followed_authors.findIndex((el) => el==author)] = null
          let temp = this.loggedUser.followed_authors
					this.loggedUser.followed_authors = []
					let j=0
					for(let i=0; i< temp.length; i++) {
						if(temp[i] != null) {
							this.loggedUser.followed_authors[j] = temp[i]
							j++
						}
						i++
					}
					this.user.followers--
				}
			}
			else {
				document.querySelector('.loginModal').style.display = 'block'
        setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
			}
			return
		},
    search(target, myArray){
      for (let i=0; i < myArray.length; i++) {
        if (myArray[i].screen_name === target) {
          return myArray[i];
        }
      }
    },
    async twitterLogin() {
      if(localStorage.getItem('oauth_token') === null) {
        if(this.oauth_token != undefined) {
          this.auth_token = this.oauth_token
          this.twitter = true
          let res = await axios.post('/twitter/validate', {oauth_token: this.oauth_token})
          if(res.data.error == true) 
            return
          else 
            this.loggedUser = res.data.user
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
        if(res.data.error == true) 
          return
        else {
          this.loggedUser = res.data.user
          this.twitter = true
        }
      }
    },
    async getUsers() {
      let res = await axios.get('/users') 
      this.users = res.data
    }
  },
  watch: {
    '$route' (to) {
      if(to.params.screen_name != undefined && to.params.screen_name != '') {
        axios.get('/users/profile/'+to.params.screen_name)
        .then(res => {
          //User not found
          if(res.data.error == true) 
            this.$router.push({name:"PageNotFound", params: {catchAll: 'user-not-found'}})
          //User found
          else
            this.user = res.data
        })
      }
    }
  },
  async mounted() {
    const app = this;
    const connected = localStorage.getItem("connected");
    if (connected !== null) {
      app.account = connected;
    } 
    if(localStorage.verified === "true") {
      this.verified = true
    }
    if(this.screen_name != undefined && this.screen_name != '') {
      let res = await axios.get('/users/profile/'+this.screen_name)
      this.user = res.data
      //User not found
      if(res.data.error == true) this.$router.push({name:"PageNotFound", params: {catchAll: 'user-not-found'}})
    }
    await this.twitterLogin()
    this.getArticles()
    if(localStorage.getItem('oauth_token') !== null) this.oauth_token = localStorage.getItem('oauth_token')
    this.getUsers()
  },
};
</script>