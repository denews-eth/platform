<template>
  <main class="main">
    <div
      class="main__author"
      data-bg="img/bg/bg.png"
      style="background: url('img/bg/bg.png') center center / cover no-repeat"
    ></div>
    <div class="container">
      <div class="row row--grid">
        <div class="col-12 col-xl-3">
          <AuthorDetails :twitter="twitter" :account="account" :user="user"></AuthorDetails>
        </div>

        <div class="col-12 col-xl-9">
          <!-- Profile verified -->
          <div class="profile p-3" v-if="!verified">
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
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tab-1"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                  >On Sale</a
                >
              </li>

              <li class="nav-item">
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
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tab-1"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                  >On Sale</a
                >
              </li>

              <li class="nav-item">
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
            <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
              <div class="row row--grid">
                <div class="col-12 col-sm-6 col-lg-4">
                  <ArticlePreview></ArticlePreview>
                </div>
              </div>
              <Paginator></Paginator>
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
      user: {}
    };
  },
  props: ['oauth_token'],
  components: {
    AuthorDetails,
    ArticlePreview,
    Paginator,
    Activity,
  },
  methods: {
    async twitterLogin() {
      if(localStorage.oauth_token === undefined || localStorage.oauth_token === "") {
        if(this.oauth_token != undefined) {
          localStorage.oauth_token = this.oauth_token
          this.twitter = true
          let res = await axios.post('/twitter/validate', {oauth_token: this.oauth_token})
          this.user = res.data.user
        }
        else this.twitter = false
      }
      else {
        let res = await axios.post('/twitter/validate', {oauth_token: localStorage.oauth_token})
        this.user = res.data.user
        this.twitter = true
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
    await this.twitterLogin()
    
  },
};
</script>