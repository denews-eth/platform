<template>
  <div class="author author--page">
    <div class="author__meta" v-if="twitter">
      <a href="author.html" class="author__avatar author__avatar--verified">
        <img :src="user.profile_image_url" alt="Profile image">
      </a>
      <h1 class="author__name"><a href="author.html">{{user.name}} {{user.surname}}</a></h1>
      <h2 class="author__nickname"><a href="author.html">@{{user.screen_name}}</a></h2>
      <p class="author__text">{{user.description}}</p>
      <div class="author__code">
        <input type="text" :value="account" id="author-code">
        <button type="button">
          <span>Copied</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M18,19H6a3,3,0,0,1-3-3V8A1,1,0,0,0,1,8v8a5,5,0,0,0,5,5H18a1,1,0,0,0,0-2Zm5-9.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.09,0L16.06,3H8A3,3,0,0,0,5,6v8a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V10S23,10,23,9.94ZM17,6.41,19.59,9H18a1,1,0,0,1-1-1ZM21,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V6A1,1,0,0,1,8,5h7V8a3,3,0,0,0,3,3h3Z">
            </path>
          </svg>
        </button>
      </div>
      <a href="#" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:20px; fill:lightblue;margin:10px 4px">
            <path
              d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z">
            </path>
          </svg>https://twitter.com/dfvcfdv</a>
      <div class="author__social">

        
      </div>
      <div class="author__wrap">
        <div class="author__followers">
          <p>3829</p>
          <span>Followers</span>
        </div>
        <button class="author__follow" type="button">Follow</button>
      </div>
    </div>
    <div class="author__meta" v-if="!twitter">
      <a href="author.html" class="author__avatar author__avatar--verified">
        <img src="img/avatars/avatar5.jpg" alt="">
      </a>
      <h1 class="author__name" style="overflow: hidden;text-overflow: ellipsis;"><a href="/author">{{account}}</a></h1>
      <h2 class="author__nickname"><a href="author.html"></a></h2>
      <p class="author__text">
        <a class="author__follow" type="button" style="width:100%!important" href="http://localhost:3000/twitter/login">Accedi con Twitter</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name:"Author",
  data() {
    return {
      
    }
  },
  props: ['twitter', 'account', 'user'],
}
</script>