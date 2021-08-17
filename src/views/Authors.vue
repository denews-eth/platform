<template>
<div class="container">
	<div class="row row--grid">

		<Breadcrumb></Breadcrumb>

		<!-- filter -->
		<div class="col-12">
			<div class="main__filter">
				<form action="#" class="main__filter-search">
					<input type="text" placeholder="Search for a creator…">
					<button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z">
							</path>
						</svg></button>
				</form>

				<div class="main__filter-wrap">
					<select class="main__select select2-hidden-accessible" name="status" data-select2-id="1" tabindex="-1"
						aria-hidden="true">
						<option value="rating" data-select2-id="3">By rating</option>
						<option value="views">By views</option>
						<option value="popularity">By popularity</option>
					</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2"
						style="width: 95px;"><span class="selection"><span class="select2-selection select2-selection--single"
								role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false"
								aria-labelledby="select2-status-ar-container"><span class="select2-selection__rendered"
									id="select2-status-ar-container" role="textbox" aria-readonly="true" title="By rating">By
									rating</span><span class="select2-selection__arrow" role="presentation"><b
										role="presentation"></b></span></span></span><span class="dropdown-wrapper"
							aria-hidden="true"></span></span>

					<select class="main__select select2-hidden-accessible" name="authors" data-select2-id="4" tabindex="-1"
						aria-hidden="true">
						<option value="0" data-select2-id="6">All Authors</option>
						<option value="1">Verified only</option>
					</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="5"
						style="width: 90px;"><span class="selection"><span class="select2-selection select2-selection--single"
								role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false"
								aria-labelledby="select2-authors-m8-container"><span class="select2-selection__rendered"
									id="select2-authors-m8-container" role="textbox" aria-readonly="true" title="All Authors">All
									Authors</span><span class="select2-selection__arrow" role="presentation"><b
										role="presentation"></b></span></span></span><span class="dropdown-wrapper"
							aria-hidden="true"></span></span>
				</div>
			</div>
		</div>
		<!-- end filter -->

		<!-- title -->
		<div class="col-12">
			<div class="main__title main__title--page">
				<h1>Authors</h1>
			</div>
		</div>
		<!-- end title -->

	</div>
	<div class="row row--grid">
		<AuthorPreview v-for="author in authors" :key="author.id" :author="author"
			:followed="(Object.keys(user).length > 1) ? (user.screen_name != author.screen_name) ? (user.followed_authors.indexOf(author.screen_name) != -1 && user.followed_authors[user.followed_authors.indexOf(author.screen_name)] != null) ? true : false : 'invalid' : false"
			v-on:follow="follow(author.screen_name)" v-on:unfollow="unfollow(author.screen_name)"></AuthorPreview>
		<div class="col-12" v-if="authors.length == 0"
			style="text-align:center; margin-top:60px;color:#b1b1b1;font-weight:400">
			<h3>There are no authors in this page</h3>
		</div>
	</div>


	<Paginator v-on:changePage="changePage" :currentPage="currentPage" :pages="pages"></Paginator>
</div>
</template>

<script>
// @ is an alias to /src
import Paginator from '@/components/Paginator.vue'
import AuthorPreview from '@/components/AuthorPreview.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
		Breadcrumb,
    Paginator,
		AuthorPreview,
  },
	data() {
		return {
			authors: [],
			twitter: false,
			account: '',
			oauth_token: '',
			user: {},
			currentPage: 1,
			pages:0
		}
	},
	methods: {
		async getAuthors() {
			let res = await axios.get('/users/'+this.currentPage)
			if(res.data.error != true) {
				this.currentPage = res.data.current
				this.pages = res.data.pages
				this.authors = res.data.users
			}
		},
		async twitterLogin() {
      if(localStorage.getItem('oauth_token') === null) {
        this.twitter = false
      }
      else {
        this.oauth_token = localStorage.oauth_token
        let res = await axios.post('/twitter/validate', {oauth_token: this.oauth_token })
        this.user = res.data.user
        this.twitter = true
      }
    },
		async follow(author) {
			if(Object.keys(this.user).length > 1) {
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
					this.user.followed_authors.push(author)
					this.authors[this.authors.findIndex((el) => el.screen_name==author)].followers++
				}
			}
			else {
				document.querySelector('.loginModal').style.display = 'block'
        setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
			}
			return
		},
		async unfollow(author) {
			if(Object.keys(this.user).length > 1) {
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
					this.user.followed_authors[this.user.followed_authors.findIndex((el) => el==author)] = null
					let temp = this.user.followed_authors
					this.user.followed_authors = []
					let j=0
					for(let i=0; i< temp.length; i++) {
						if(temp[i] != null) {
							this.user.followed_authors[j] = temp[i]
							j++
						}
						i++
					}
					this.authors[this.authors.findIndex((el) => el.screen_name==author)].followers--
				}
			}
			else {
				document.querySelector('.loginModal').style.display = 'block'
        setTimeout(() => document.querySelector('.loginModal').style.display = 'none', 2500)
			}
			return
		},
		async changePage(value) {
			this.currentPage = value
			this.getAuthors()
		}
	},
	async mounted() {
    const connected = localStorage.getItem("connected");
    if (connected !== null) {
      this.account = connected;
    } else {
      window.location.href = "/";
    }
    if(localStorage.getItem('oauth_token') !== null) {
      this.oauth_token = localStorage.getItem('oauth_token')
    }
    if(localStorage.verified === "true") {
      this.verified = true
    }
    await this.twitterLogin()
		await this.getAuthors()
	}
}
</script>
