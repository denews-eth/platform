<template>
<div class="col-12 col-xl-4">
  <div class="asset__info">
    <div class="asset__desc">
      <h2>Descriptions</h2>
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
        some form, by injected humour.</p>
    </div>

    <ul class="asset__authors">
      <li>
        <span>Creator</span>
        <div class="asset__author asset__author--verified">
          <img src="img/avatars/avatar5.jpg" alt="">
          <a href="author.html">@midinh</a>
        </div>
      </li>
      <li>
        <span>Collection</span>
        <div class="asset__author ">
          <img src="img/avatars/avatar9.jpg" alt="">
          <a href="collection.html">The Meta Key</a>
        </div>
      </li>
    </ul>

    <!-- tabs -->
    <ul class="nav nav-tabs asset__tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1"
          aria-selected="true">History</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2"
          aria-selected="false">Bids</a>
      </li>


      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3"
          aria-selected="false">Details</a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
        <div class="asset__actions asset__actions--scroll" id="asset__actions--scroll" data-scrollbar="true"
          tabindex="-1" style="overflow: hidden; outline: none;">
          <div class="scroll-content">
            <div class="asset__action asset__action--verified">
              <img src="img/avatars/avatar10.jpg" alt="">
              <p>Bid placed for <b>11.00 ETH</b> 4 hours ago <br>by <a href="author.html">@erikkk</a></p>
            </div>

            <div class="asset__action asset__action--verified">
              <img src="img/avatars/avatar4.jpg" alt="">
              <p>Bid placed for <b>10.00 ETH</b> 5 hours ago <br>by <a href="author.html">@johndoe</a></p>
            </div>

            <div class="asset__action asset__action--verified">
              <img src="img/avatars/avatar6.jpg" alt="">
              <p>Bid placed for <b>2.508 ETH</b> 5 hours ago <br>by <a href="author.html">@n1ckname</a></p>
            </div>

            <div class="asset__action asset__action--verified">
              <img src="img/avatars/avatar4.jpg" alt="">
              <p>Bid placed for <b>2.2799 ETH</b> 6 hours ago <br>by <a href="author.html">@johndoe</a></p>
            </div>

            <div class="asset__action asset__action--verified">
              <img src="img/avatars/avatar5.jpg" alt="">
              <p>Put on sale for <b>0.55 ETH</b> 1 days ago <br>by <a href="author.html">@midinh</a></p>
            </div>
          </div>
          <div class="scrollbar-track scrollbar-track-x show" style="display: none;">
            <div class="scrollbar-thumb scrollbar-thumb-x" style="width: 360px; transform: translate3d(0px, 0px, 0px);">
            </div>
          </div>
          <div class="scrollbar-track scrollbar-track-y show" style="display: block;">
            <div class="scrollbar-thumb scrollbar-thumb-y"
              style="height: 101.407px; transform: translate3d(0px, 0px, 0px);"></div>
          </div>
        </div>
      </div>

      <div class="tab-pane fade" id="tab-2" role="tabpanel">
        <div class="asset__actions">
          <div class="asset__action asset__action--verified">
            <img src="img/avatars/avatar10.jpg" alt="">
            <p>Bid placed for <b>11.00 ETH</b> 4 hours ago <br>by <a href="author.html">@erikkk</a></p>
          </div>

          <div class="asset__action asset__action--verified">
            <img src="img/avatars/avatar4.jpg" alt="">
            <p>Bid placed for <b>10.00 ETH</b> 5 hours ago <br>by <a href="author.html">@johndoe</a></p>
          </div>

          <div class="asset__action asset__action--verified">
            <img src="img/avatars/avatar6.jpg" alt="">
            <p>Bid placed for <b>2.508 ETH</b> 5 hours ago <br>by <a href="author.html">@n1ckname</a></p>
          </div>
        </div>
      </div>

      <div class="tab-pane fade" id="tab-3" role="tabpanel">
        <ul class="asset__authors asset__authors--tab">
          <li>
            <span>Owner</span>
            <div class="asset__author asset__author--verified">
              <img src="img/avatars/avatar5.jpg" alt="">
              <a href="author.html">@midinh</a>
            </div>
          </li>
          <li>
            <span>Year created</span>
            <p>2021</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- end tabs -->

    <div class="asset__wrap">
      <div class="asset__timer">
        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M18.3,8.59l.91-.9a1,1,0,0,0-1.42-1.42l-.9.91a8,8,0,0,0-9.79,0l-.91-.92A1,1,0,0,0,4.77,7.69l.92.91A7.92,7.92,0,0,0,4,13.5,8,8,0,1,0,18.3,8.59ZM12,19.5a6,6,0,1,1,6-6A6,6,0,0,1,12,19.5Zm-2-15h4a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2Zm3,6a1,1,0,0,0-2,0v1.89a1.5,1.5,0,1,0,2,0Z">
            </path>
          </svg> Auction ends in</span>
        <div class="asset__clock">516 days 15:04:32</div>
      </div>

      <div class="asset__price">
        <span>Minimum bid</span>
        <span>0.2 ETH</span>
      </div>
    </div>

    <!-- actions -->
    <div class="asset__btns">
      <a href="#modal-bid" class="asset__btn asset__btn--full asset__btn--clr open-modal">Place a bid</a>
    </div>
    <!-- end actions -->
  </div>
</div>
</template>

<script>
export default {
  name:"ArticleSidebar"
}
</script>