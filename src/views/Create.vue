<template>
<main class="main">
		<div class="main__author" data-bg="img/bg/bg.png" style="background: url(&quot;img/bg/bg.png&quot;) center center / cover no-repeat;"></div>
		<div class="container">
			<div class="row row--grid">
        <div class="col-12 col-xl-3">
				  <AuthorDetails></AuthorDetails>
        </div>
				
				<div class="col-12 col-xl-9">
					<!-- title -->
					<div class="main__title main__title--create">
						<h2>Create collectible item</h2>
					</div>
					<!-- end title -->

					<!-- create form -->
					<form action="#" class="sign__form sign__form--create">
						<div class="row">
							<div class="col-12">
								<h4 class="sign__title">Upload file</h4>
							</div>

							<div class="col-12">
								<div class="sign__file">
									<label id="file1" for="sign__file-upload">e. g. Image, Audio, Video</label>
									<input data-name="#file1" id="sign__file-upload" name="file" class="sign__file-upload" type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg">
								</div>
							</div>

							<div class="col-12">
								<h4 class="sign__title">Item details</h4>
							</div>

							<div class="col-12">
								<div class="sign__group">
									<label class="sign__label" for="itemname">Item name</label>
									<input id="itemname" type="text" name="itemname" class="sign__input" placeholder="e. g. 'Crypto Heart'">
								</div>
							</div>

							<div class="col-12">
								<div class="sign__group">
									<label class="sign__label" for="description">Description</label>
									<textarea id="description" name="description" class="sign__textarea" placeholder="e. g. 'After purchasing you will able to recived...'"></textarea>
								</div>
							</div>

							<div class="col-12 col-md-4">
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
							</div>

							<div class="col-12">
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
							</div>

							<div class="col-12 col-xl-3">
								<button type="button" class="sign__btn">Create item</button>
							</div>
						</div>
					</form>
					<!-- end create form -->
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import AuthorDetails from '../components/AuthorDetails.vue'

export default {
  components: { AuthorDetails },
  name:"Create"
}
</script>