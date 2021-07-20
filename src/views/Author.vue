<template>
  <main class="main">
    <div class="main__author"
      :style="(user.profile_background_image_url == null) ? 'background: url(/img/bg/bg.png) center center / cover no-repeat' : 'background: url('+user.profile_background_image_url+') center center / cover no-repeat'">
    </div>
    <div class="container">
      <div class="row row--grid">
        <div class="col-12 col-xl-3">
          <AuthorDetails :twitter="twitter" :account="account" :user="user" :followed="'invalid'"></AuthorDetails>
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
            <ul class="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
              <li class="nav-item" @click="selected = 'created'">
                <a :class="(selected=='created')? 'nav-link active' : 'nav-link'">Created</a>
              </li>

              <li class="nav-item" @click="selected = 'saved'">
                <a :class="(selected=='saved')? 'nav-link active' : 'nav-link'">Saved</a>
              </li>

              <li class="nav-item" @click="selected = 'activity'">
                <a :class="(selected=='activity')? 'nav-link active' : 'nav-link'">My Activity</a>
              </li>

              <li class="nav-item" @click="selected = 'settings'">
                <a :class="(selected=='settings')? 'nav-link active' : 'nav-link'">Settings</a>
              </li>
            </ul>
            <!-- end tabs nav -->
          </div>

          <!-- Profile NOT verified-->
          <div class="profile" v-if="!twitter" id="ProfileNotVerified">
            <!-- tabs nav -->
            <ul class="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
              <li class="nav-item" @click="selected = 'created'">
                <a :class="(selected=='created')? 'nav-link active' : 'nav-link'">Created</a>
              </li>

              <li class="nav-item" @click="selected = 'saved'">
                <a :class="(selected=='saved')? 'nav-link active' : 'nav-link'">Saved</a>
              </li>

              <li class="nav-item" @click="selected = 'activity'">
                <a :class="(selected=='activity')? 'nav-link active' : 'nav-link'">My Activity</a>
              </li>

              <li class="nav-item" @click="selected = 'settings'">
                <a :class="(selected=='settings')? 'nav-link active' : 'nav-link'">Settings</a>
              </li>
            </ul>
            <!-- end tabs nav -->
          </div>

          <!-- content tabs -->
          <div class="tab-content" v-if="twitter">

            <div :class="(selected == 'created') ? 'tab-pane fade show active' : 'tab-pane fade'"
              v-show="selected=='created'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articles" :key="article.hash">
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

            <div :class="(selected == 'saved') ? 'tab-pane fade show active' : 'tab-pane fade'"
              v-show="selected=='saved'">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4" v-for="article in articlesSaved" :key="article.hash">
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
              <Paginator v-if="articles.length > 3"></Paginator>
            </div>

            <div :class="(selected == 'activity') ? 'tab-pane fade show active' : 'tab-pane fade'"
              v-show="selected=='activity'">
              <div class="row">
                <!-- content -->
                <div class="col-12" id="lalala">
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

            <div :class="(selected == 'settings') ? 'tab-pane fade show active' : 'tab-pane fade'"
              v-show="selected=='settings'">
							<div class="row row--grid">
								<!-- details form -->
								<div class="col-12">
									<form @submit.prevent="" class="sign__form sign__form--profile">
										<div class="row">
											<div class="col-12">
												<h4 class="sign__title">Profile details</h4>
											</div>

                      <div class="col-8 mx-auto col-md-3">
                        <div class="mb-3" style="height:200px;">
                          <div class="sign__file" style="height:100%">
                            <label for="profile_image_url" class="pl-5 pr-4" v-show="preview_image.length == 0" style="height:100%">Upload your profile image (400x400) <i class="fa fa-upload mx-2"></i></label>
                            <input data-name="#profile_image_url" v-show="preview_image.length == 0" @change="previewImage()" id="profile_image_url" name="profile_image_url" class="sign__file-upload" type="file" ref="preview_image_upload" accept=".png,.jpg,.jpeg">
                            <img :src="preview_image" id="preview_img" v-show="preview_image.length > 0" alt="Preview image" style="margin:0;background-image: linear-gradient(45deg, #1a171f, transparent);height:100%; width:100%;object-fit:cover;overflow:hidden">
                            <button id="closeImg" v-show="preview_image.length > 0" @click="removeImage()"><i class="fa fa-times" style="filter:invert(.8)"></i></button>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-9">
                        <div class="mb-3" style="height:200px;">
                          <div class="sign__file" style="height:100%">
                            <label for="profile_banner" class="p-5" v-show="profile_banner.length == 0" style="height:100%">Upload your profile image (1500x500) <i class="fa fa-upload mx-2"></i></label>
                            <input data-name="#profile_banner" v-show="profile_banner.length == 0" @change="bannerImage()" id="profile_banner" name="profile_banner" class="sign__file-upload" type="file" ref="preview_image_upload" accept=".png,.jpg,.jpeg">
                            <img :src="profile_banner" id="preview_img" v-show="profile_banner.length > 0" alt="Preview image" style="margin:0;background-image: linear-gradient(45deg, #1a171f, transparent);height:100%; width:100%;object-fit:cover;overflow:hidden">
                            <button id="closeImg" v-show="profile_banner.length > 0" @click="removeBannerImage()"><i class="fa fa-times" style="filter:invert(.8)"></i></button>
                          </div>
                        </div>             
                      </div>

											<div class="col-12">
												<button class="sign__btn ml-1" type="button" ref="editBtn" @click="updateProfile()">Save <i class="fa fa-spinner ml-2" v-if="loading"></i></button>
											</div>
										</div>
									</form>
								</div>
								<!-- end details form -->
							</div>
						</div>



          </div>
          <div class="tab-content row flex-column" v-if="!twitter">
            <div class="mx-auto">
              <h2 style="text-align:center; color:#cccccc; margin:20px 0 15px 0;">Profilo non verificato</h2>
              <a class="author__follow" type="button" style="padding:15px; margin:0 auto; width:200px"
                href="http://localhost:3000/twitter/login">Accedi con Twitter</a>
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
  .nav-item {cursor:pointer}


    .fa-spinner {
    animation: loading 1s infinite ease-out;
  }
  @keyframes loading {
    from {transform: rotateZ(0);}
    to {transform: rotateZ(360deg);}
  }

  #closeImg {
    position: absolute;
    top:0;
    right:0;
    font-size: 23px;
    margin:5px 10px;
    filter: invert(1);
    cursor: pointer;
    z-index: 9;
  }
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
      user: {articles_saved:[]},
      auth_token: '',
      articles: [],
      articlesSaved: [],
      selected: 'created',
      users: [],
      preview_image: '',
      profile_banner: '',
      loading: false
    };
  },
  props: ['oauth_token', 'screen_name', 'section'],
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
      let res = await axios.post('/articles/search', {query:this.user.screen_name} )
      this.articles = res.data
      let res2 = await axios.post('/articles/saved', {hash: this.user.articles_saved } )
      this.articlesSaved = res2.data
    },
    async updateProfile() {
      this.loading = true
      this.$refs.editBtn.setAttribute('disabled', 'disabled')
      if(this.preview_image.length > 0 && this.profile_banner.length > 0) {
        let formData = new FormData();
        formData.append("oauth_token", this.auth_token);
        formData.append("address", this.account);
        if(document.getElementById('profile_image_url').files[0] != null) {
          formData.append("images", document.getElementById('profile_image_url').files[0], 'profile_img');
        }
        if(document.getElementById('profile_banner').files[0] != null) {
          formData.append("images", document.getElementById('profile_banner').files[0], 'profile_banner_img');
        }
          let res = await axios.post('/users/edit', formData, {headers: {
          'Content-Type': 'multipart/form-data'
        }})  
        if(res.data.error == true) {
          this.loading = false
          this.$refs.editBtn.removeAttribute('disabled')
        }
        else {
          this.$refs.editBtn.removeAttribute('disabled')
          this.loading = false;
          location.reload()
        }
      }
      if(this.preview_image.length > 0) {
        let formData = new FormData();
        formData.append("oauth_token", this.auth_token);
        formData.append("address", this.account);
        if(document.getElementById('profile_image_url').files[0] != null) {
          formData.append("images", document.getElementById('profile_image_url').files[0], 'profile_img');
        }
          let res = await axios.post('/users/edit', formData, {headers: {
          'Content-Type': 'multipart/form-data'
        }})  
        if(res.data.error == true) {
          this.loading = false
          this.$refs.editBtn.removeAttribute('disabled')
        }
        else {
          this.$refs.editBtn.removeAttribute('disabled')
          this.loading = false;
          location.reload()
        }
      }
      if(this.profile_banner > 0) {
        let formData = new FormData();
        formData.append("oauth_token", this.auth_token);
        formData.append("address", this.account);
        if(document.getElementById('profile_banner').files[0] != null) {
          formData.append("images", document.getElementById('profile_banner').files[0], 'profile_banner_img');
        }
          let res = await axios.post('/users/edit', formData, {headers: {
          'Content-Type': 'multipart/form-data'
        }})  
        if(res.data.error == true) {
          this.loading = false
          this.$refs.editBtn.removeAttribute('disabled')
        }
        else {
          this.$refs.editBtn.removeAttribute('disabled')
          this.loading = false;
          location.reload()
        }
      }
      this.loading = false
      return
    },
    previewImage() {
			setTimeout(() => {
				this.preview_image =  URL.createObjectURL(document.getElementById('profile_image_url').files[0])
			}, 500)			
		},
    removeImage() {
      document.getElementById('profile_image_url').value = ''
      this.preview_image = ''
    },
    bannerImage() {
      setTimeout(() => {
				this.profile_banner =  URL.createObjectURL(document.getElementById('profile_banner').files[0])
			}, 500)
    },
    removeBannerImage() {
      document.getElementById('profile_banner').value = ''
      this.profile_banner = ''      
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
            oauth_token: this.auth_token,
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
            oauth_token: this.auth_token,
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
    //Initialize section
    if(this.section != undefined) {
      if(this.section == 'activity' || this.section == 'created' || this.section == 'saved' || this.section == 'settings') {
        this.selected = this.section
      }
    }

  },
};
</script>