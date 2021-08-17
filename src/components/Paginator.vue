<template>
<!-- paginator -->
<div class="row row--grid">
  <div class="col-12">
    <div class="paginator">
      <span class="paginator__pages">{{currentPage}} from {{pages}}</span>

      <ul class="paginator__list" style="color:#bdbdbd">
        <li>
          <a v-if="currentPage <= 1" class="disabled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z">
              </path>
            </svg>
          </a>
          <a @click="$emit('changePage', currentPage-1)" v-if="currentPage > 1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z">
              </path>
            </svg>
          </a>
        </li>
        <li class="active"><a @click="$emit('changePage', currentPage)" v-html="currentPage"></a></li>
        <li><a @click="$emit('changePage', currentPage+1)" v-html="currentPage + 1"></a></li>
        <li><a @click="$emit('changePage', currentPage+2)" v-html="currentPage + 2"></a></li>
        <li><a @click="$emit('changePage', currentPage+3)" v-html="currentPage + 3"></a></li>
        <li>
          <a @click="$emit('changePage', currentPage+1)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z">
              </path>
            </svg></a>
        </li>
      </ul>
    </div>
  </div>
</div>
<!-- end paginator -->
</template>

<script>
export default {
  name:"Paginator",
  props: [
    'currentPage',
    'pages'
  ]
}
</script>

<style lang="css" scoped>
  ul li a{
    cursor: pointer;
  }
  .disabled {
    opacity: .6;
  }
  .disabled:hover {color:#bdbdbd!important}
  .disabled:hover svg {fill: #bdbdbd!important}
</style>