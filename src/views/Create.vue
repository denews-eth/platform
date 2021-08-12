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
          <AuthorDetails
            :user="user"
            :account="account"
            :twitter="twitter"
          ></AuthorDetails>
        </div>

        <div class="col-12 col-xl-9">
          <!-- title -->
          <div class="main__title main__title--create">
            <h2>Create collectible item</h2>
          </div>
          <!-- end title -->

          <!-- create form -->
          <form
            @submit.prevent="createArticle()"
            class="sign__form sign__form--create"
          >
            <div class="col-12">
              <h4 class="sign__title">Upload file</h4>
            </div>

            <div class="col-12">
              <div class="sign__file">
                <label for="preview_image_upload"
                  >e. g. Image, Audio, Video</label
                >
                <input
                  data-name="#preview_image_upload"
                  @change="previewImage()"
                  id="preview_image_upload"
                  name="preview_image_upload"
                  class="sign__file-upload"
                  type="file"
                  ref="preview_image_upload"
                  accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg"
                />
              </div>
            </div>
            <div class="col-12">
              <img
                :src="preview_image"
                id="preview_img"
                v-if="preview_image.length > 0"
                alt="Preview image"
                style="
                  background-image: linear-gradient(
                    45deg,
                    #1a171f,
                    transparent
                  );
                  height: 250px;
                  width: 100%;
                  object-fit: contain;
                  overflow: hidden;
                "
              />
              <button
                class="sign__btn mx-auto mt-4"
                style="background: #282835; width: 200px"
                v-if="preview_image.length > 0"
                @click="removeImage()"
              >
                Annulla
              </button>
            </div>

            <div class="col-12">
              <h4 class="sign__title">Item details</h4>
            </div>

            <div class="col-12">
              <div class="sign__group">
                <label class="sign__label" for="itemname">Item name</label>
                <input
                  id="itemname"
                  type="text"
                  name="itemname"
                  class="sign__input"
                  placeholder="e. g. 'Crypto Heart'"
                  v-model="title"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="sign__group">
                <label class="sign__label" for="tag">Tags</label>
                <div class="row">
                  <div class="flyTag" v-for="el in tags" :key="el">
                    {{ el }}
                  </div>
                </div>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  class="sign__input"
                  placeholder="e. g. 'Documentary, ...'"
                  v-model="tag"
                  @keyup="toTag($event)"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="sign__group">
                <label class="sign__label" for="intro">Intro</label>
                <textarea
                  id="intro"
                  name="intro"
                  class="sign__textarea"
                  placeholder="Article abstract or introduction"
                  maxlength="255"
                  style="height: 115px"
                  v-model="intro"
                ></textarea>
              </div>
            </div>

            <div class="col-12">
              <div
                class="sign__group d-flex"
                style="width: 100%; flex-direction: column"
              >
                <label class="sign__label ml-0 mr-auto" for="description"
                  >Description</label
                >
                <VueTrix v-model="description" class="col-12 trixEditor" />
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
              <button type="button" class="sign__btn" @click="createArticle()">
                Create item <i class="fa fa-spinner ml-2" v-if="loading"></i>
              </button>
            </div>
          </form>
          <!-- end create form -->
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="css">
.flyTag {
  padding: 8px 10px;
  margin: 5px 0 10px 20px;
  border: 1px solid #393840;
  color: white;
  border-radius: 4px;
  background: #1a181f;
}
.fa-spinner {
  animation: loading 1s ease-out infinite;
}
@keyframes loading {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.trixEditor * {
  border: none !important;
}
.trix-content {
  background: #222227 !important;
  color: #b2b2b7 !important;
  border-radius: 13px !important;
  height: 400px;
  padding: 15px;
}
.trix-content blockquote {
  border: 0 solid #ccc !important;
  border-left-width: 0.3em !important;
}
.trix-content pre {
  background: #1a181f;
  color: #dce04f;
}
.trix-button-group--file-tools {
  display: none !important;
}
.trix-button {
  background: #34343b !important;
  padding: 20px !important;
  margin: 3px !important;
  border-radius: 3px !important;
}
.trix-button::before {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 20px !important;
  height: 20px !important;
}
.trix-button--icon-bold::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20style%3D"fill:white"%20height%3D%2224%22%3E%3Cpath%20d%3D%22M15.6%2011.8c1-.7%201.6-1.8%201.6-2.8a4%204%200%200%200-4-4H7v14h7c2.1%200%203.7-1.7%203.7-3.8%200-1.5-.8-2.8-2.1-3.4zM10%207.5h3a1.5%201.5%200%201%201%200%203h-3v-3zm3.5%209H10v-3h3.5a1.5%201.5%200%201%201%200%203z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-italic::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20style%3D"fill:white"%20height%3D%2224%22%3E%3Cpath%20d%3D%22M10%205v3h2.2l-3.4%208H6v3h8v-3h-2.2l3.4-8H18V5h-8z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-strike::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20style%3D"fill:white"%20height%3D%2224%22%3E%3Cpath%20d%3D%22M12.73%2014l.28.14c.26.15.45.3.57.44.12.14.18.3.18.5%200%20.3-.15.56-.44.75-.3.2-.76.3-1.39.3A13.52%2013.52%200%200%201%207%2014.95v3.37a10.64%2010.64%200%200%200%204.84.88c1.26%200%202.35-.19%203.28-.56.93-.37%201.64-.9%202.14-1.57s.74-1.45.74-2.32c0-.26-.02-.51-.06-.75h-5.21zm-5.5-4c-.08-.34-.12-.7-.12-1.1%200-1.29.52-2.3%201.58-3.02%201.05-.72%202.5-1.08%204.34-1.08%201.62%200%203.28.34%204.97%201l-1.3%202.93c-1.47-.6-2.73-.9-3.8-.9-.55%200-.96.08-1.2.26-.26.17-.38.38-.38.64%200%20.27.16.52.48.74.17.12.53.3%201.05.53H7.23zM3%2013h18v-2H3v2z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-link::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20style%3D"fill:white"%20height%3D%2224%22%3E%3Cpath%20d%3D%22M9.88%2013.7a4.3%204.3%200%200%201%200-6.07l3.37-3.37a4.26%204.26%200%200%201%206.07%200%204.3%204.3%200%200%201%200%206.06l-1.96%201.72a.91.91%200%201%201-1.3-1.3l1.97-1.71a2.46%202.46%200%200%200-3.48-3.48l-3.38%203.37a2.46%202.46%200%200%200%200%203.48.91.91%200%201%201-1.3%201.3z%22%2F%3E%3Cpath%20d%3D%22M4.25%2019.46a4.3%204.3%200%200%201%200-6.07l1.93-1.9a.91.91%200%201%201%201.3%201.3l-1.93%201.9a2.46%202.46%200%200%200%203.48%203.48l3.37-3.38c.96-.96.96-2.52%200-3.48a.91.91%200%201%201%201.3-1.3%204.3%204.3%200%200%201%200%206.07l-3.38%203.38a4.26%204.26%200%200%201-6.07%200z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-heading-1::before {
  background-image: url('data:image/svg+xml,%3Csvg%20version%3D%221%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M12%209v3H9v7H6v-7H3V9h9zM8%204h14v3h-6v12h-3V7H8V4z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-quote::before {
  background-image: url('data:image/svg+xml,%3Csvg%20version%3D%221%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M6%2017h3l2-4V7H5v6h3zm8%200h3l2-4V7h-6v6h3z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-code::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20style%3D"fill:white"%20height%3D%2224%22%3E%3Cpath%20d%3D%22M18.2%2012L15%2015.2l1.4%201.4L21%2012l-4.6-4.6L15%208.8l3.2%203.2zM5.8%2012L9%208.8%207.6%207.4%203%2012l4.6%204.6L9%2015.2%205.8%2012z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-bullet-list::before {
  background-image: url('data:image/svg+xml,%3Csvg%20version%3D%221%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M4%204a2%202%200%201%200%200%204%202%202%200%200%200%200-4zm0%206a2%202%200%201%200%200%204%202%202%200%200%200%200-4zm0%206a2%202%200%201%200%200%204%202%202%200%200%200%200-4zm4%203h14v-2H8v2zm0-6h14v-2H8v2zm0-8v2h14V5H8z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-number-list::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M2%2017h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1%203h1.8L2%2013.1v.9h3v-1H3.2L5%2010.9V10H2v1zm5-6v2h14V5H7zm0%2014h14v-2H7v2zm0-6h14v-2H7v2z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-decrease-nesting-level::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M3%2019h19v-2H3v2zm7-6h12v-2H10v2zm-8.3-.3l2.8%202.9L6%2014.2%204%2012l2-2-1.4-1.5L1%2012l.7.7zM3%205v2h19V5H3z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-increase-nesting-level::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M3%2019h19v-2H3v2zm7-6h12v-2H10v2zm-6.9-1L1%2014.2l1.4%201.4L6%2012l-.7-.7-2.8-2.8L1%209.9%203.1%2012zM3%205v2h19V5H3z%22%2F%3E%3C%2Fsvg%3E') !important;
}
/*.trix-button--icon-FILE::before {background-image: url('data:image/svg+xml,<svg%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20style%3D"fill:white"%20width%3D"24"%20style%3D"fill:white"%20height%3D"24"><path%20d%3D"M16.5%206v11.5a4%204%200%201%201-8%200V5a2.5%202.5%200%200%201%205%200v10.5a1%201%200%201%201-2%200V6H10v9.5a2.5%202.5%200%200%200%205%200V5a4%204%200%201%200-8%200v12.5a5.5%205.5%200%200%200%2011%200V6h-1.5z"%2F><%2Fsvg>')!important;}*/
.trix-button--icon-undo::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M12.5%208c-2.6%200-5%201-6.9%202.6L2%207v9h9l-3.6-3.6A8%208%200%200%201%2020%2016l2.4-.8a10.5%2010.5%200%200%200-10-7.2z%22%2F%3E%3C%2Fsvg%3E') !important;
}
.trix-button--icon-redo::before {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D"fill:white"%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M18.4%2010.6a10.5%2010.5%200%200%200-16.9%204.6L4%2016a8%208%200%200%201%2012.7-3.6L13%2016h9V7l-3.6%203.6z%22%2F%3E%3C%2Fsvg%3E') !important;
}
</style>
<script>
import AuthorDetails from "../components/AuthorDetails.vue";
import VueTrix from "vue-trix";

import abi from "@/abi/abi.json";

import axios from "axios";
import Web3 from "web3";

export default {
  components: { AuthorDetails, VueTrix },
  name: "Create",
  data() {
    return {
      user: {},
      oauth_token: "",
      account: "",
      twitter: false,
      title: "",
      intro: "",
      description: "",
      tags: [],
      tag: "",
      keyE: false,
      loading: false,
      preview_image: "",
    };
  },
  methods: {
    async twitterLogin() {
      if (
        localStorage.oauth_token === undefined ||
        localStorage.oauth_token === ""
      ) {
        if (this.oauth_token != undefined) {
          localStorage.oauth_token = this.oauth_token;
          this.twitter = true;
          let res = await axios.post("/twitter/validate", {
            oauth_token: this.oauth_token,
          });
          this.user = res.data.user;
        } else {
          location.href = "/";
          this.twitter = false;
        }
      } else {
        let res = await axios.post("/twitter/validate", {
          oauth_token: localStorage.oauth_token,
        });
        this.user = res.data.user;
        this.twitter = true;
      }
    },
    toTag(e) {
      if (e.key == ",") {
        this.keyE = true;
      }
      if (e.key == " " && this.keyE == true) {
        this.tag
          .split(", ")[0]
          .replace(/\s/g, "")
          .replace(/[^\w\s]/gi, "").length > 0
          ? this.tags.push(
              this.tag
                .split(", ")[0]
                .replace(/\s/g, "")
                .replace(/[^\w\s]/gi, "")
            )
          : (this.tag = "");
        this.tag = "";
        this.keyE = false;
      }
      if (e.key == "Backspace" && this.tag == "") {
        this.tags.pop();
      }
    },
    async createArticle() {
      if(!this.loading) {
        this.loading = true;

        let formData = new FormData();
        formData.append(
          "media",
          document.getElementById("preview_image_upload").files[0]
        );
        formData.append("title", this.title);
        formData.append("body", this.description);
        formData.append("tag", JSON.stringify(this.tags.join()));
        formData.append("intro", this.intro);
        formData.append("author", this.user.screen_name);
        let res = await axios.post("/articles/nft", formData);
        console.log(res.data);

        if (res.data.error == true) return;
        else {
          let web3 = new Web3(Web3.givenProvider);
          let myContract = new web3.eth.Contract(
            abi,
            process.env.VUE_APP_CONTRACT_ADDRESS,
            {
              from: this.account,
              gasPrice: web3.eth.gas_price,
            }
          );
          let awa = await myContract.methods
            .mintNFT(res.data.nft.ipfs)
            .send({ from: this.account });
          console.log(awa.events.Transfer.returnValues.tokenId);
          let awa2 = await myContract.methods
            .returnTokenIdByHash(res.data.nft.ipfs)
            .call();
          console.log(awa2);
          this.loading = false;
          this.$router.push({ name: "Author" });
        }
      }
    },
    previewImage() {
      setTimeout(() => {
        this.preview_image = URL.createObjectURL(
          document.getElementById("preview_image_upload").files[0]
        );
      }, 500);
    },
    removeImage() {
      document.getElementById("preview_image_upload").value = "";
      this.preview_image = "";
    },
  },
  async mounted() {
    const connected = localStorage.getItem("connected");
    if (connected !== null) {
      this.account = connected;
    } else {
      window.location.href = "/";
    }
    if (
      localStorage.getItem("verified") === "false" ||
      localStorage.getItem("verified") === null ||
      localStorage.getItem("oauth_token") === null
    ) {
      location.href = "/profile";
    } else {
      this.twitterLogin();
    }
  },
};
</script>