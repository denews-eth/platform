<template>
<div class="home home--hero">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="hero owl-carousel owl-loaded" id="hero">
          <div class="owl-stage-outer owl-height" style="height: 460px;">
            <div class="owl-stage"
              style="transform: translate3d(-5320px, 0px, 0px); transition: all 0.6s ease 0s; width: 9310px;">
              <div class="owl-item" style="width: 1300px; margin-right: 30px;">
                <div class="hero__slide" data-bg="img/home/slide1.jpg"
                  style="background: url(&quot;img/home/slide3.jpg&quot;) center center / cover no-repeat;">
                  <h2 class="hero__title">Unitok – NFT Marketplace 111111111111111<br>HTML Template</h2>
                  <p class="hero__text">Digital marketplace for crypto collectibles and non-fungible tokens. <br>Buy,
                    sell, and discover exclusive digital assets.</p>
                  <div class="hero__btns">
                    <a href="explore.html" class="hero__btn hero__btn--clr">Explore</a>
                    <a href="signin.html" class="hero__btn">Create</a>
                  </div>
                </div>
              </div>
              <div class="owl-item active" style="width: 1300px; margin-right: 30px;">
                <div class="hero__slide" data-bg="img/home/slide2.jpg"
                  style="background: url(&quot;img/home/slide2.jpg&quot;) center center / cover no-repeat;">
                  <h2 class="hero__title">Discover, collect, and sell 222222222222<br>extraordinary NFTs</h2>
                  <p class="hero__text">Securely buy and sell unique digital collectibles. <br>Lowest transaction costs
                    across all NFT markets guaranteed.</p>
                  <div class="hero__btns">
                    <a href="explore.html" class="hero__btn hero__btn--clr">Explore</a>
                    <a href="signin.html" class="hero__btn">Create</a>
                  </div>
                </div>
              </div>
              <div class="owl-item" style="width: 1300px; margin-right: 30px;">
                <div class="hero__slide" data-bg="img/home/slide3.jpg"
                  style="background: url(&quot;img/home/slide3.jpg&quot;) center center / cover no-repeat;">
                  <h2 class="hero__title">Unitok – NFT Marketplace 33333333333<br>HTML Template</h2>
                  <p class="hero__text">Digital marketplace for crypto collectibles and non-fungible tokens. <br>Buy,
                    sell, and discover exclusive digital assets.</p>
                  <div class="hero__btns">
                    <a href="explore.html" class="hero__btn hero__btn--clr">Explore</a>
                    <a href="signin.html" class="hero__btn">Create</a>
                  </div>
                </div>
              </div>
              <!-- <div class="owl-item cloned" style="width: 1300px; margin-right: 30px;">
                <div class="hero__slide" data-bg="img/home/slide3.jpg"
                  style="background: url(&quot;img/home/slide3.jpg&quot;) center center / cover no-repeat;">
                  <h2 class="hero__title">Unitok – NFT Marketplace 33333333333<br>HTML Template</h2>
                  <p class="hero__text">Digital marketplace for crypto collectibles and non-fungible tokens. <br>Buy,
                    sell, and discover exclusive digital assets.</p>
                  <div class="hero__btns">
                    <a href="explore.html" class="hero__btn hero__btn--clr">Explore</a>
                    <a href="signin.html" class="hero__btn">Create</a>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>

        <button class="main__nav main__nav--hero main__nav--prev" data-nav="#hero" type="button"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z">
            </path>
          </svg></button>
        <button class="main__nav main__nav--hero main__nav--next" data-nav="#hero" type="button"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z">
            </path>
          </svg></button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'Carousel',
  data() {
    return {
      show:false
    }
  },
  mounted() {
    setTimeout(() => this.show = true, 1000)
  }

}
</script>