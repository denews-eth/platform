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
									<label for="preview_image_upload">e. g. Image, Audio, Video</label>
									<input data-name="#preview_image_upload" @change="previewImage()" id="preview_image_upload" name="preview_image_upload" class="sign__file-upload" type="file" ref="preview_image_upload" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg">
								</div>
							</div>
							<div class="col-12">
								<img :src="preview_image" id="preview_img" v-if="preview_image.length > 0 " alt="Preview image" style="background-image: linear-gradient(45deg, #1a171f, transparent);height:250px; width:100%;object-fit:contain;overflow:hidden">
								<button class="sign__btn mx-auto mt-4" style="background:#282835;width:200px" v-if="preview_image.length>0" @click="removeImage()">Annulla</button>
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
									<label class="sign__label" for="intro">Intro</label>
									<textarea id="intro" name="intro" class="sign__textarea" placeholder="Article abstract or introduction" maxlength="255" style="height:115px" v-model="intro"></textarea>
								</div>
							</div>

							<div class="col-12">
								<div class="sign__group">
									<label class="sign__label" for="description">Description</label>
									<textarea id="description" name="description" class="sign__textarea" placeholder="e. g. 'After purchasing you will able to recived...'" style="height:250px" maxlength="3000" v-model="description"></textarea>
								</div>
							</div>

							<!-- <div class="col-12 col-md-4">
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
							</div> -->

							<!-- <div class="col-12">
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
							</div> -->

							<div class="col-12 col-xl-3">
								<button type="button" class="sign__btn" @click="createArticle()">Create item <i class="fa fa-spinner ml-2" v-if="loading"></i> </button>
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
	.fa-spinner {
		animation: loading 1s ease-out infinite;
	}
	@keyframes loading {
		from{transform:rotateZ(0)}
		to{transform: rotateZ(360deg);}
	}
</style>
<script>
import AuthorDetails from '../components/AuthorDetails.vue'

import abi from '@/abi/abi.json'

import axios from 'axios'
import Web3 from 'web3'


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
			intro: '',
			description: '',
			tags: [],
			tag: '',
			keyE: false,
			loading: false,
			preview_image: ''
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
        else {
					location.href = '/'
					this.twitter = false
				}
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

			this.loading = true

			let formData = new FormData();
			formData.append("media", document.getElementById('preview_image_upload').files[0]);
			formData.append("title", this.title);
			formData.append("body", this.description);
			formData.append("tag", JSON.stringify(this.tags.join()));
			formData.append("intro", this.intro);
			formData.append("author", this.user.screen_name);
			let res = await axios.post('/articles/nft',  formData)
			console.log(res.data)

			if(res.data.error == true) return
			else {
				let web3 = new Web3(Web3.givenProvider);
				let myContract = new web3.eth.Contract(abi, process.env.VUE_APP_CONTRACT_ADDRESS, {
						from: this.account,
						gasPrice: web3.eth.gas_price
				});
				let awa = await myContract.methods.mintNFT(res.data.nft.ipfs).send({from: this.account})
				console.log(awa.events.Transfer.returnValues.tokenId)
				let awa2 = await myContract.methods.returnTokenIdByHash(res.data.nft.ipfs).call()
				console.log(awa2)
				this.loading = false
			}
		},
		previewImage() {
			setTimeout(() => {
				this.preview_image =  URL.createObjectURL(document.getElementById('preview_image_upload').files[0])
			}, 500)			
		},
    removeImage() {
      document.getElementById('preview_image_upload').value = ''
      this.preview_image = ''
    },
	},
	async mounted() {
		const connected = localStorage.getItem("connected");
    if (connected !== null) {
      this.account = connected;
    } else {
      window.location.href = "/";
    }
		if(localStorage.getItem('verified') === "false" || localStorage.getItem('verified') === null || localStorage.getItem('oauth_token') === null) {
			location.href = "/"
		}
		else {
			this.twitterLogin()
		}
	}
}
</script>