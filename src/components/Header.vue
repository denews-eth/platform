<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo" style="cursor:pointer">
        <a
          style="font-weight: bold; color: #fff; font-size: 30px"
          v-on:click="$router.push({ name: 'Home' })"
        >
          deNews
        </a>
      </div>

      <form @submit.prevent="false" class="header__search">
        <input
          type="text"
          placeholder="Search items, collections, and creators"
          v-model="query"
          @keyup.space="search()"
          @keyup.enter="search()"
        />
        <div class="results" v-if="results.length > 0">
          <i class="fa fa-spinner mx-auto" v-if="loading"></i>
          <div v-for="el in results" :key="el" class="result" @click="() => $router.push({name:'Article', params: {hash:el.hash}})">
            <img :src="el.image" style="max-width:90px;object-fit:contain" class="ml-0 p-1">
            <div class="p-2" v-html="el.name"></div>
          </div>
        </div>
        <button type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
            ></path>
          </svg>
        </button>
        <button type="button" class="close" @click="removeResults()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
            ></path>
          </svg>
        </button>
      </form>

      <div class="header__menu">
        <ul class="header__nav">
          <li class="header__nav-item">
            <a
              class="header__nav-link"
              v-on:click="$router.push({ name:'Home' })"
              role="button"
              >Home
            </a>
          </li>
          <li class="header__nav-item">
            <a
              class="header__nav-link"
              v-on:click="$router.push({ name: 'Explore'})"
              role="button"
              >Explore
            </a>
          </li>
          <li class="header__nav-item">
            <a
              class="header__nav-link"
              v-on:click="$router.push({ name:'Authors' })"
              role="button"
              >Authors
            </a>
          </li>
          <li class="header__nav-item">
            <a
              class="header__nav-link"
              role="button"
              id="dropdownMenu"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >Community
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
                /></svg
            ></a>
            <ul
              class="dropdown-menu header__nav-menu"
              aria-labelledby="dropdownMenu"
            >
              <li>
                <a
                  class="header__nav-link"
                  v-on:click="$router.push({ name:'AboutUs' })"
                  role="button"
                  >How does it work?</a
                >
              </li>
              <li>
                <a
                  class="header__nav-link"
                  role="button"
                  v-on:click="$router.push({ name:'HelpCenter' })"
                  >Help center</a
                >
              </li>
              <li>
                <a
                  class="header__nav-link"
                  v-on:click="$router.push({ name: 'Contacts' })"
                  role="button"
                  >Contacts</a
                >
              </li>
              <li>
                <a
                  class="header__nav-link"
                  v-on:click="$router.push({ name:'PrivacyPolicy' })"
                  role="button"
                  >Privacy Policy</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="header__actions">
        <div class="header__action header__action--search">
          <button class="header__action-btn" type="button" @click="showResults()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
              ></path>
            </svg>
          </button>
        </div>

        <div class="header__action header__action--profile" v-if="account">
          <a
            class="header__profile-btn header__profile-btn--verified"
            role="button"
            id="dropdownMenuProfile"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img :src="user.profile_image_url" alt="" />
            <div>
              <p
                style="overflow: hidden; width: 150px; text-overflow: ellipsis"
                v-if="!twitter"
              >
                {{ account }}
              </p>
              <p
                style="overflow: hidden; width: 150px; text-overflow: ellipsis"
                v-if="twitter"
              >
                {{ user.screen_name }}
              </p>
              <span>{{ balance }} {{ ticker }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
          </a>

          <ul
            class="dropdown-menu header__profile-menu"
            aria-labelledby="dropdownMenuProfile"
          >
            <li>
              <a  v-on:click="$router.push({ name:'Author' })"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"
                  ></path>
                </svg>
                <span>Profile</span></a
              >
            </li>
            <li>
              <a  v-on:click="$router.push({ name:'Author', params: {section:'activity'} })"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M3.71,16.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21,1,1,0,0,0-.21.33,1,1,0,0,0,.21,1.09,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1,1,0,0,0,.21-1.09A1,1,0,0,0,3.71,16.29ZM7,8H21a1,1,0,0,0,0-2H7A1,1,0,0,0,7,8ZM3.71,11.29a1,1,0,0,0-1.09-.21,1.15,1.15,0,0,0-.33.21,1,1,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1,1,0,0,0,3.71,11.29ZM21,11H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2ZM3.71,6.29a1,1,0,0,0-.33-.21,1,1,0,0,0-1.09.21,1.15,1.15,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21,1,1,0,0,0,1.09-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1.15,1.15,0,0,0,3.71,6.29ZM21,16H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                  ></path>
                </svg>
                <span>Activity</span></a
              >
            </li>
            <li>
              <a  v-on:click="$router.push({ path: '/create' })"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z"
                  ></path>
                </svg>
                <span>Create</span></a
              >
            </li>
            <li>
              <a  v-on:click="$router.push({ path: '/author' })"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z"
                  ></path>
                </svg>
                <span>Settings</span></a
              >
            </li>
            <li v-on:click="$emit('disconnect', true)">
              <a 
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"
                  ></path>
                </svg>
                <span>Sign out</span></a
              >
            </li>
          </ul>
        </div>

        <div class="header__action header__action--signin" v-if="!account">
          <a
            class="header__action-btn header__action-btn--signin"
            role="button"
          >
            <span v-on:click="$emit('connect', true)"
              >Sign in with Metamask</span
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <button class="header__btn" type="button">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>
<style lang="css" scoped>
  .dropdown-menu a {
    color:#bdbcc7!important;
    cursor:pointer;
  }
  .dropdown-menu a:hover {
    color:#eeedfd!important;
    cursor:pointer;
  }
  .results {background:#222227;display:flex;flex-direction:column;border-radius:0 0 12px 12px; color:white; padding:40px 10px 10px 10px; height:230px; position:absolute; left:0; right:0; margin-top:248px}
  .result {margin:4px 0;display:flex;cursor: pointer; justify-content:start;background: #1d1d21;border-radius: 12px;padding: 5px 10px; transition: all .2s;}
  .result:hover {background: #3b3b42;}
  @media(max-width:767px) {
    .results {width: 84vw;
    margin-left: 4vw;}
  }
</style>

<script>
import axios from 'axios'
export default {
  props: ["account", "balance", "ticker", "user", "twitter"],
  name: "Header",
  data() {
    return {
      query: '',
      results: [],
      loading: false
    }
  },
  methods: {
    async search() {
      if(this.query.length > 3) {
        this.loading = true
        let res = await axios.post('/articles/search', {query: this.query})
        this.results = res.data
        this.loading = false
      }
      return
    },
    showResults() {
      document.querySelector('.results').style.display = 'inherit'
    },
    removeResults() {
      document.querySelector('.results').style.display = 'none'
    }
  }
};
</script>