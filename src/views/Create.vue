<template>
<main class="main">
		<div class="main__author" data-bg="img/bg/bg.png" style="background: url(&quot;img/bg/bg.png&quot;) center center / cover no-repeat;"></div>
		<div class="container">
			<div class="row row--grid">
        <div class="col-12 col-xl-3">
				  <AuthorDetails :user="user" :account="account" :twitter="twitter"></AuthorDetails>
        </div>
				
				<div class="col-12 col-xl-9">
					<!-- title -->
					<div class="main__title main__title--create">
						<h2>Create collectible item</h2>
					</div>
					<!-- end title -->

					<!-- create form -->
					<form @submit.prevent="createArticle()" class="sign__form sign__form--create">
						<div class="row">
							<div class="col-12">
								<h4 class="sign__title">Upload file</h4>
							</div>

							<div class="col-12">
								<div class="sign__file">
									<label for="file_upload">e. g. Image, Audio, Video</label>
									<input data-name="#file_upload" id="file_upload" name="file_upload" class="sign__file-upload" type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg">
								</div>
							</div>
							<div class="col-12">
								<h4 class="sign__title">Upload Preview image</h4>
							</div>

							<div class="col-12">
								<div class="sign__file">
									<label for="preview_image_upload">e. g. Image, Audio, Video</label>
									<input data-name="#preview_image_upload" id="preview_image_upload" name="preview_image_upload" class="sign__file-upload" type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg">
								</div>
							</div>
							<div class="col-12">
								<h4 class="sign__title">Item details</h4>
							</div>

							<div class="col-12">
								<div class="sign__group">
									<label class="sign__label" for="itemname">Item name</label>
									<input id="itemname" type="text" name="itemname" class="sign__input" placeholder="e. g. 'Crypto Heart'" v-model="title">
								</div>
							</div>

							<div class="col-12">
								<div class="sign__group">
									<label class="sign__label" for="tag">Tags</label>
									<div class="row">
										<div class="flyTag" v-for="el in tags" :key="el">{{el}}</div>
									</div>
									<input type="text" id="tag" name="tag" class="sign__input" placeholder="e. g. 'Documentary, ...'" v-model="tag" @keyup="toTag($event)">
								</div>
							</div>

							<div class="col-12">
								<div class="sign__group">
									<label class="sign__label" for="description">Description</label>
									<textarea id="description" name="description" class="sign__textarea" placeholder="e. g. 'After purchasing you will able to recived...'" v-model="description"></textarea>
								</div>
							</div>

							<div class="col-12 col-md-4">
								<div class="sign__group">
									<label class="sign__label" for="royalties">Royalties</label>
									<select id="royalties" name="royalties" class="sign__select">
										<option value="1">5%</option>
										<option value="2">10%</option>
										<option value="3">20%</option>
									</select>
								</div>
							</div>

							<div class="col-12 col-md-4">
								<div class="sign__group">
									<label class="sign__label" for="size">Size</label>
									<input id="size" type="text" name="size" class="sign__input" placeholder="e. g. Size">
								</div>
							</div>

							<div class="col-12 col-md-4">
								<div class="sign__group">
									<label class="sign__label" for="propertie">Propertie</label>
									<input id="propertie" type="text" name="propertie" class="sign__input" placeholder="Subject">
								</div>
							</div>

							<div class="col-12">
								<div class="sign__group sign__group--row">
									<ul class="sign__radio sign__radio--single">
										<li>
											<input id="type1" type="radio" name="type" checked="">
											<label for="type1">Put on sale</label>
										</li>
										<li>
											<input id="type2" type="radio" name="type">
											<label for="type2">Instant sale price</label>
										</li>
										<li>
											<input id="type3" type="radio" name="type">
											<label for="type3">Unlock one purchased</label>
										</li>
									</ul>
								</div>
							</div>

							<div class="col-12 col-xl-3">
								<button type="button" class="sign__btn" @click="createArticle()">Create item</button>
							</div>
						</div>
					</form>
					<!-- end create form -->
				</div>
			</div>
		</div>
	</main>
</template>
<style lang="css" scoped>
	.flyTag {
		padding: 8px 10px;
    margin: 5px 0 10px 20px;	
		border: 1px solid #393840;
		color:white;
		border-radius:4px;
		background: #1a181f;
	}
</style>
<script>
import AuthorDetails from '../components/AuthorDetails.vue'

import axios from 'axios'

export default {
  components: { AuthorDetails },
  name:"Create",
	data() {
		return {
			user: {},
			oauth_token: "",
			account: "",
			twitter :false,
			title: '',
			description: '',
			tags: [],
			tag: '',
			keyE: false
		}
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
    },
		toTag(e) {
			if(e.key == ',') {
				this.keyE = true
			}
			if(e.key == ' ' && this.keyE == true) {
				(this.tag.split(', ')[0].replace(/\s/g, '').replace(/[^\w\s]/gi, '').length > 0) ? this.tags.push(this.tag.split(', ')[0].replace(/\s/g, '').replace(/[^\w\s]/gi, '')) : this.tag = ''
				this.tag = ''
				this.keyE = false
			}
			if(e.key == 'Backspace' && this.tag=='') {
				this.tags.pop()
			}
		},
		async createArticle() {
			let formData = new FormData();
			formData.append("media", document.querySelector('#file_upload').files[0]);
			formData.append("title", this.title);
			formData.append("body", this.dscription);
			formData.append("tag", JSON.stringify(this.tags.join()));
			formData.append("intro", "TEst");
			let res = await axios.post('/articles/nft',  formData)
			console.log(res.data)
		}
	},
	async mounted() {
		const connected = localStorage.getItem("connected");
    if (connected !== null) {
      this.account = connected;
    } else {
      window.location.href = "/";
    }
		if(localStorage.getItem('verified') === "false" || localStorage.getItem('verified') === null) {
			location.href = "/"
		}
		else {
			this.twitterLogin()
		}
	}
}
</script>