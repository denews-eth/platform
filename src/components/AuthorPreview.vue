<template>
<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
  <div class="author"><router-link :to="{name:'PublicAuthor', params: {screen_name:author.screen_name}}" class="author__cover author__cover--bg" data-bg="img/bg/bg-small.png"
      :style="'background: url(&quot;'+author.profile_image_url+'&quot;) center center / cover no-repeat;'"></router-link>
    <div class="author__meta"><router-link :to="{name:'PublicAuthor', params: {screen_name:author.screen_name}}" class="author__avatar author__avatar--verified"><img
          :src="author.profile_image_url" alt=""></router-link>
      <h3 class="author__name"><router-link :to="{name:'PublicAuthor', params: {screen_name:author.screen_name}}">{{author.name}} {{author.surname}}</router-link></h3>
      <h3 class="author__nickname"><router-link :to="{name:'PublicAuthor', params: {screen_name:author.screen_name}}">{{author.screen_name}}</router-link></h3>
      <p class="author__text">{{author.description}}</p>
      <div class="author__wrap">
        <div class="author__followers">
          <p v-html="author.followers"></p><span>Followers</span>
        </div>
        <button class="author__follow" type="button" @click="$emit('follow')" v-if="!followed && followed != 'invalid'">Follow</button>
        <button class="author__follow" style="color:#999" type="button" @click="$emit('unfollow')" v-if="followed && followed != 'invalid'">Followed <i class="fa fa-check ml-1"></i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:"AuthorPreview",
  props: ['author', 'followed']
}
</script>