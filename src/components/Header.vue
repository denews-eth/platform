<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <a href="/">
          <img src="img/logo.svg" alt="">
        </a>
      </div>

      <form action="#" class="header__search">
        <input type="text" placeholder="Search items, collections, and creators">
        <button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z">
            </path>
          </svg></button>
        <button type="button" class="close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z">
            </path>
          </svg></button>
      </form>

      <div class="header__menu">
        <ul class="header__nav">
          <li class="header__nav-item">
            <a class="header__nav-link" href="/" role="button">Home
            </a>
          </li>
          <li class="header__nav-item">
            <a class="header__nav-link" href="/explore" role="button">Explore
            </a>
          </li>
          <li class="header__nav-item">
            <a class="header__nav-link" href="/authors" role="button">Authors
            </a>
          </li>
          <li class="header__nav-item">
            <a class="header__nav-link" href="#" role="button" id="dropdownMenu" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">Community <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"/></svg></a>
            <ul class="dropdown-menu header__nav-menu" aria-labelledby="dropdownMenu">
              <li><a class="header__nav-link" href="/how-does-it-work" role="button">How does it work?</a></li>
              <li><a class="header__nav-link" href="/help-center" role="button">Help center</a></li>
              <li><a class="header__nav-link" href="/contacts" role="button">Contacts</a></li>
              <li><a class="header__nav-link" href="/privacy-policy" role="button">Privacy Policy</a></li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="header__actions">
        <div class="header__action header__action--search">
          <button class="header__action-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z">
              </path>
            </svg></button>
        </div>

        <div class="header__action header__action--signin">
          <a class="header__action-btn header__action-btn--signin" href="signin.html">
            <span>Sign in</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z">
              </path>
            </svg>
          </a>
        </div>
      </div>

      <button class="header__btn" type="button">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>
<script>
  export default {
    name: "Header",
  }
</script>