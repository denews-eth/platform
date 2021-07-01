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
	</div>
	<div class="row row--grid">
		<Author v-for="i in 8" :key="i"></Author>
	</div>


	<Paginator></Paginator>
</div>
</template>

<script>
// @ is an alias to /src
import Paginator from '@/components/Paginator.vue'
import Author from '@/components/Author.vue'

export default {
  name: 'Home',
  components: {
    Paginator,
		Author
  }
}
</script>
