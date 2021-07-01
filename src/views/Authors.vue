<template>
<div class="container">
			<div class="row row--grid">
				<!-- breadcrumb -->
				<div class="col-12">
					<ul class="breadcrumb">
						<li class="breadcrumb__item"><a href="index.html">Home</a></li>
						<li class="breadcrumb__item breadcrumb__item--active">Authors</li>
					</ul>
				</div>
				<!-- end breadcrumb -->

				<!-- title -->
				<div class="col-12">
					<div class="main__title main__title--page">
						<h1>Authors</h1>
					</div>
				</div>
				<!-- end title -->

				<!-- filter -->
				<div class="col-12">
					<div class="main__filter">
						<form action="#" class="main__filter-search">
							<input type="text" placeholder="Search for a creator…">
							<button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg></button>
						</form>

						<div class="main__filter-wrap">
							<select class="main__select select2-hidden-accessible" name="status" data-select2-id="1" tabindex="-1" aria-hidden="true">
								<option value="rating" data-select2-id="3">By rating</option>
								<option value="views">By views</option>
								<option value="popularity">By popularity</option>
							</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style="width: 95px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-status-ar-container"><span class="select2-selection__rendered" id="select2-status-ar-container" role="textbox" aria-readonly="true" title="By rating">By rating</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>

							<select class="main__select select2-hidden-accessible" name="authors" data-select2-id="4" tabindex="-1" aria-hidden="true">
								<option value="0" data-select2-id="6">All Authors</option>
								<option value="1">Verified only</option>
							</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="5" style="width: 90px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-authors-m8-container"><span class="select2-selection__rendered" id="select2-authors-m8-container" role="textbox" aria-readonly="true" title="All Authors">All Authors</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
						</div>
					</div>
				</div>
				<!-- end filter -->
			</div>

			<!-- authors -->
			<div class="row row--grid">
				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover author__cover--bg" data-bg="img/bg/bg-small.png" style="background: url(&quot;img/bg/bg-small.png&quot;) center center / cover no-repeat;">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Adam Zapel</a></h3>
							<h3 class="author__nickname"><a href="author.html">@aaarthur</a></h3>
							<p class="author__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>3829</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar2.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Barb E. Dahl</a></h3>
							<h3 class="author__nickname"><a href="author.html">@nicky87</a></h3>
							<p class="author__text">If you are going to use a passage of Lorem Ipsum</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>4602</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover author__cover--bg" data-bg="img/bg/bg-small2.png" style="background: url(&quot;img/bg/bg-small2.png&quot;) center center / cover no-repeat;">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar3.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Biff Wellington</a></h3>
							<h3 class="author__nickname"><a href="author.html">@neo</a></h3>
							<p class="author__text">Many desktop publishing packages and web page editors now use Lorem</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>1294</p>
									<span>Followers</span>
								</div>
								<button class="author__follow author__follow--true" type="button">Unfollow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover author__cover--bg" data-bg="img/bg/bg-small3.png" style="background: url(&quot;img/bg/bg-small3.png&quot;) center center / cover no-repeat;">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar4.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Charity Case</a></h3>
							<h3 class="author__nickname"><a href="author.html">@midinh</a></h3>
							<p class="author__text">There are many variations of passages of Lorem Ipsum</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>10 845</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover"></a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar5.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Don Key</a></h3>
							<h3 class="author__nickname"><a href="author.html">@kateblank</a></h3>
							<p class="author__text">The generated Lorem Ipsum is therefore always free from repetition</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>9713</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover author__cover--bg" data-bg="img/bg/bg-small4.png" style="background: url(&quot;img/bg/bg-small4.png&quot;) center center / cover no-repeat;">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar6.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Mona Lott</a></h3>
							<h3 class="author__nickname"><a href="author.html">@fantraingle</a></h3>
							<p class="author__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>5 924</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover author__cover--bg" data-bg="img/bg/bg-small5.png" style="background: url(&quot;img/bg/bg-small5.png&quot;) center center / cover no-repeat;">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar">
								<img src="img/avatars/avatar7.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Orson Carte</a></h3>
							<h3 class="author__nickname"><a href="author.html">@sc00ty</a></h3>
							<p class="author__text">It is a long established fact that a reader will be distracted</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>11 342</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
					<div class="author">
						<a href="author.html" class="author__cover author__cover--bg" data-bg="img/bg/bg-small6.png" style="background: url(&quot;img/bg/bg-small6.png&quot;) center center / cover no-repeat;">
						</a>
						<div class="author__meta">
							<a href="author.html" class="author__avatar author__avatar--verified">
								<img src="img/avatars/avatar8.jpg" alt="">
							</a>
							<h3 class="author__name"><a href="author.html">Ray Gunn</a></h3>
							<h3 class="author__nickname"><a href="author.html">@justart</a></h3>
							<p class="author__text">All the Lorem Ipsum generators on the Internet</p>
							<div class="author__wrap">
								<div class="author__followers">
									<p>1245</p>
									<span>Followers</span>
								</div>
								<button class="author__follow" type="button">Follow</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end authors -->

			<Paginator></Paginator>
		</div>
</template>

<script>
// @ is an alias to /src
import Paginator from '@/components/Paginator.vue'

export default {
  name: 'Home',
  components: {
    Paginator,
  }
}
</script>
