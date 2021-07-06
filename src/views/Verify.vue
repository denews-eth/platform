<template>
<main class="main">
  <div class="container">
    <div class="row row--grid">
      <Breadcrumb></Breadcrumb>

      <!-- title -->
      <div class="col-12 col-lg-10 col-xl-9 mx-auto">
        <div class="main__title main__title--page">
          <h1>Verify your profile</h1>
        </div>
      </div>
      <!-- end title -->
    </div>

    <div class="row row--grid">
      <div class="col-12 col-lg-10 col-xl-9 mx-auto">
        <form action="#" class="sign__form sign__form--contacts">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="sign__group">
                <input type="text" name="name" class="sign__input" placeholder="Name" v-model="user.name">
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="sign__group">
                <input type="text" name="surname" class="sign__input" placeholder="Last Name" v-model="user.surname">
              </div>
            </div>

            <div class="col-12 col-md-7">
              <div class="sign__group">
                <input type="text" name="email" class="sign__input" placeholder="Email" v-model="user.email">
              </div>
            </div>

            <div class="col-12 col-md-5">
              <div class="sign__group">
                <input type="date" name="birth_date" class="sign__input" placeholder="Birth Date" v-model="user.birth_date">
              </div>
            </div>

            <div class="col-12">
              <div class="sign__group">
                <textarea name="description" class="sign__textarea" placeholder="Your Bio" v-model="user.description"></textarea>
              </div>
            </div>

            <div class="col-12">
              <button type="button" class="sign__btn" style="width:200px; float:left;" @click="editProfile();" ref="editBtn">Verify Profile <i class="fa fa-spinner mx-2" v-if="loading"></i></button>
              <i 
                class="fa fa-check" 
                style="color: #54ff53;float: left;font-size: 23px; opacity: 0; margin: 20px 0; transition:.2s" ref="check" v-if="editSuccess"></i>
              <i 
                class="fa fa-times" 
                style="color: red;float: left;font-size: 23px; opacity: 0; margin: 20px 0; transition:.2s" ref="times" v-if="!editSuccess"></i>
              <a type="button" class="sign__btn" style="background:#222227;width:200px; float:left;" href="/author">Salta per adesso</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
</template>
<style lang="css" scoped>
  .fadeCheck {
    margin: 20px 10px!important;
    opacity: 1!important;
  }
  .fa-spinner {
    animation: loading 1s infinite ease-out;
  }
  @keyframes loading {
    from {transform: rotateZ(0);}
    to {transform: rotateZ(360deg);}
  }
</style>
<script>
import axios from 'axios'

export default {
  name:"Verify",
  data() {
    return {
      user: {},
      account: "",
      auth_token: "",
      editSuccess: false,
      loading: false
    }
  },
  props: ['oauth_token'],
  methods: {
    async twitterLogin() {
      const app = this
      if(localStorage.profileVerified !== undefined) {
          location.href = '/'
      }
      if(localStorage.oauth_token === undefined || localStorage.oauth_token === "") {
        if(app.oauth_token !== undefined) {
          localStorage.oauth_token = app.oauth_token
          let res = await axios.post('/twitter/validate', {oauth_token: app.oauth_token})
          app.user = res.data.user
        }
        else location.href = '/'
      }
      else {
        app.auth_token = localStorage.oauth_token
        let res = await axios.post('/twitter/validate', {oauth_token: app.auth_token})
        app.user = res.data.user
      }
    },
    async editProfile() {
      console.log(0.5)
      this.loading = true
      this.$refs.editBtn.setAttribute('disabled', 'disabled')
      let res = await axios.post('/users/edit', {
        oauth_token: this.auth_token,
        address: this.account,
        name: this.user.name,
        description: this.user.description,
        birth_date: this.user.birth_date,
        surname: this.user.surname,
        email: this.user.email
      })
      console.log(1)
      if(res.data.error == true) {
        console.log(2)
        this.loading = false
        this.$refs.editBtn.removeAttribute('disabled')
        this.editSuccess = false
        setTimeout(() => {this.$refs.times.classList.add('fadeCheck')}, 200)
        return
      }
      else {
        console.log(3)
        this.loading = false
        this.$refs.editBtn.removeAttribute('disabled')
        this.editSuccess = true
        setTimeout(() => {this.$refs.check.classList.add('fadeCheck')}, 200)
      }
    },
  },
  async mounted() {
    let connected = localStorage.connected

    if ( connected !== null) {
      this.account = connected;
    } else {
      window.location.href = "/";
    }

    await this.twitterLogin()
  }
}
</script>