<template>
<main class="main">
  <div class="container">
    <div class="row row--grid">

      <!-- title -->
      <div class="col-12 col-lg-10 col-xl-9 mx-auto">
        <div class="main__title main__title--page">
          <h1>Verify your profile</h1>
        </div>
      </div>
      <!-- end title -->
    </div>

    <div class="row row--grid">
      <div class="col-12 col-lg-12 col-xl-9 mx-auto">
        <form class="sign__form sign__form--contacts" @submit.prevent="false">
          <div class="row">
            <div class="col-7 mx-auto col-md-3">
              <div class="mb-3" style="height:200px;">
                <div class="sign__file" style="height:100%">
                  <label for="profile_image_url" class="pl-5 pr-4" v-show="preview_image.length == 0" style="height:100%">Upload your profile image (400x400) <i class="fa fa-upload mx-2"></i></label>
                  <input data-name="#profile_image_url" v-show="preview_image.length == 0" @change="previewImage()" id="profile_image_url" name="profile_image_url" class="sign__file-upload" type="file" ref="preview_image_upload" accept=".png,.jpg,.jpeg">
                  <img :src="preview_image" id="preview_img" v-show="preview_image.length > 0" alt="Preview image" style="margin:0;background-image: linear-gradient(45deg, #1a171f, transparent);height:100%; width:100%;object-fit:cover;overflow:hidden">
                  <button id="closeImg" v-show="preview_image.length > 0" @click="removeImage()"><i class="fa fa-times"></i></button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-9">
              <div class="mb-3" style="height:200px;">
                <div class="sign__file" style="height:100%">
                  <label for="profile_banner" class="p-5" v-show="profile_banner.length == 0" style="height:100%">Upload your profile image (1500x500) <i class="fa fa-upload mx-2"></i></label>
                  <input data-name="#profile_banner" v-show="profile_banner.length == 0" @change="bannerImage()" id="profile_banner" name="profile_banner" class="sign__file-upload" type="file" ref="preview_image_upload" accept=".png,.jpg,.jpeg">
                  <img :src="profile_banner" id="preview_img" v-show="profile_banner.length > 0" alt="Preview image" style="margin:0;background-image: linear-gradient(45deg, #1a171f, transparent);height:100%; width:100%;object-fit:cover;overflow:hidden">
                  <button id="closeImg" v-show="profile_banner.length > 0" @click="removeBannerImage()"><i class="fa fa-times"></i></button>
                </div>
              </div>             
            </div>

            <div class="col-12 col-md-6">
              <div class="sign__group">
                <input type="text" name="name" class="sign__input" :style="(errors.name) ? 'border-color:#bd251a;' : ''" placeholder="Name" v-model="user.name">
                <p style="color:#ce312b;" v-if="errors.name">The name is required</p>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="sign__group">
                <input type="text" name="surname" class="sign__input" :style="(errors.surname) ? 'border-color:#bd251a;' : ''" placeholder="Last Name" v-model="user.surname">
                <p style="color:#ce312b;" v-if="errors.surname">The surname is required</p>
              </div>
            </div>

            <div class="col-12 col-md-7">
              <div class="sign__group">
                <input type="text" name="email" class="sign__input" :style="(errors.email) ? 'border-color:#bd251a;' : ''" placeholder="Email" v-model="user.email">
                <p style="color:#ce312b;" v-if="errors.email">The email is required</p>
              </div>
            </div>

            <div class="col-12 col-md-5">
              <div class="sign__group">
                <input type="date" name="birth_date" class="sign__input" :style="(errors.birth_date) ? 'border-color:#bd251a;' : ''" placeholder="Birth Date" v-model="user.birth_date">
                <p style="color:#ce312b;" v-if="errors.birth_date">The birth date is required</p>
              </div>
            </div>

            <div class="col-12 col-md-5">
              <div class="sign__group">
                <input type="text" name="linkedin_profile_url" class="sign__input" :style="(errors.linkedin_profile_url) ? 'border-color:#bd251a;' : ''" placeholder="Linkedin profile Link" v-model="user.linkedin_profile_url">
                <p style="color:#ce312b;" v-if="errors.linkedin_profile_url">The Linkedin profile link is required</p>
              </div>
            </div>

            <div class="col-12 col-md-7">
              <div class="sign__group">
                <input type="text" name="codice_fiscale" class="sign__input" :style="(errors.codice_fiscale) ? 'border-color:#bd251a;' : ''" placeholder="Codice fiscale" v-model="user.codice_fiscale">
                <p style="color:#ce312b;" v-if="errors.codice_fiscale">The Codice fiscale is required</p>
              </div>
            </div>

            <div class="col-12">
              <div class="sign__group">
                <textarea name="description" class="sign__textarea" :style="(errors.description) ? 'border-color:#bd251a;' : ''" placeholder="Your Bio" v-model="user.description"></textarea>
                <p style="color:#ce312b;" v-if="errors.description">The description is required</p>
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

::-moz-calendar-picker-indicator {
    filter: invert(1);
}
::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

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
import axios from 'axios'

export default {
  name:"Verify",
  data() {
    return {
      user: {},
      account: "",
      auth_token: "",
      editSuccess: false,
      loading: false,
      errors: {
        name:false,
        surname:false,
        email:false,
        birth_date:false,
        description:false,
        codice_fiscale: false,
        linkedin_profile_url: false
      },
      preview_image: '',
      profile_banner: ''
    }
  },
  props: ['oauth_token'],
  methods: {
    async twitterLogin() {
      const app = this
      if(localStorage.oauth_token === undefined || localStorage.oauth_token === "") {
        if(app.oauth_token !== undefined) {
          localStorage.oauth_token = app.oauth_token
          let res = await axios.post('/twitter/validate', {oauth_token: app.oauth_token})
          app.user = res.data.user
        }
        //else location.href = '/'
      }
      else {
        app.auth_token = localStorage.oauth_token
        let res = await axios.post('/twitter/validate', {oauth_token: app.auth_token})
        app.user = res.data.user
      }
    },
    async editProfile() {
      if(!this.user.name || this.user.name == "") {
        this.errors.name = true
      }else this.errors.name = false

      if(!this.user.surname || this.user.surname == "") {
        this.errors.surname = true
      }else this.errors.surname = false

      if(!this.user.email || this.user.email == "") {
        this.errors.email = true
      }else this.errors.email = false

      if(!this.user.birth_date || this.user.birth_date == "") {
        this.errors.birth_date = true
      }else this.errors.birth_date = false

      if(!this.user.linkedin_profile_url || this.user.linkedin_profile_url == "") {
        this.errors.linkedin_profile_url = true
      }else this.errors.linkedin_profile_url = false

      if(!this.user.codice_fiscale || this.user.codice_fiscale == "") {
        this.errors.codice_fiscale = true
      }else this.errors.codice_fiscale = false 

      if(!this.user.description || this.user.description == "") {
        this.errors.description = true
      }else this.errors.decription = false

      if(!this.user.name || this.user.name == "" || !this.user.surname || this.user.surname == "" || !this.user.email || this.user.email == "" || !this.user.birth_date || this.user.birth_date == "" || !this.user.description || this.user.description == "" || !this.user.codice_fiscale || this.user.codice_fiscale == "" || !this.user.linkedin_profile_url || this.user.linkedin_profile_url == "") {
        return
      }
      this.loading = true
      this.$refs.editBtn.setAttribute('disabled', 'disabled')
      let formData = new FormData();
      formData.append("oauth_token", this.auth_token);
      formData.append("address", this.account);
      if(document.getElementById('profile_image_url').files[0] != null) {
        formData.append("images", document.getElementById('profile_image_url').files[0], 'profile_img');
      }
      if(document.getElementById('profile_banner').files[0] != null) {
        formData.append("images", document.getElementById('profile_banner').files[0], 'profile_banner_img');
      }
			formData.append("name", this.user.name);
			formData.append("description", this.user.description);
			formData.append("birth_date", this.user.birth_date);
			formData.append("linkedin_profile_url", this.user.linkedin_profile_url);
			formData.append("codice_fiscale", this.user.codice_fiscale);
      formData.append("surname", this.user.surname);
      formData.append("email", this.user.email);
        let res = await axios.post('/users/edit', formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})  
      if(res.data.error == true) {
        this.loading = false
        this.$refs.editBtn.removeAttribute('disabled')
        this.editSuccess = false
        setTimeout(() => {this.$refs.times.classList.add('fadeCheck')}, 200)
        return
      }
      else {
        this.loading = false
        this.$refs.editBtn.removeAttribute('disabled')
        this.editSuccess = true
        localStorage.setItem('verified', "true")
        setTimeout(() => {this.$refs.check.classList.add('fadeCheck')}, 200)
        setTimeout(() => {location.href = '/'}, 2000)
      }
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
    }
  },
  async mounted() {
    let connected = localStorage.connected

    if ( connected !== null) {
      this.account = connected;
      if(localStorage.getItem('verified') === "true") {
            //location.href = '/'
      }
    } else {
      location.href = "/";
    }

    await this.twitterLogin()
  }
}
</script>