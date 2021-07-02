<template>
<main class="main">
		<div class="main__author" data-bg="img/bg/bg.png" style="background: url(&quot;img/bg/bg.png&quot;) center center / cover no-repeat;"></div>
		<div class="container">
			<div class="row row--grid">
				<div class="col-12 col-xl-3">
          <AuthorDetails></AuthorDetails>
				</div>

				<div class="col-12 col-xl-9">
					<div class="profile">
						<!-- tabs nav -->
						<ul class="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
							<li class="nav-item">
								<a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">On Sale</a>
							</li>

							<li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Created</a>
							</li>

							<li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">My Activity</a>
							</li>

							<li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">Settings</a>
							</li>
						</ul>
						<!-- end tabs nav -->
					</div>

					<!-- content tabs -->
					<div class="tab-content">
						<div class="tab-pane fade show active" id="tab-1" role="tabpanel">
							<div class="row row--grid">
								<div class="col-12 col-sm-6 col-lg-4">
									<ArticlePreview></ArticlePreview>
								</div>
							</div>
              <Paginator></Paginator>
						</div>

						<div class="tab-pane fade" id="tab-3" role="tabpanel">
							<div class="row">

								<!-- content -->
								<div class="col-12">
									<div class="row row--grid">
										<div class="col-12">
                      <Activity></Activity>
										</div>
									</div>

									<div class="row row--grid">
										<div class="col-12">
											<button class="main__load" type="button" data-toggle="collapse" data-target="#collapsemore1" aria-expanded="false" aria-controls="collapsemore1">Load more</button>
										</div>
									</div>
									<!-- end collapse -->
								</div>
								<!-- end content -->
							</div>
						</div>

						<div class="tab-pane fade" id="tab-4" role="tabpanel">
							<div class="row row--grid">
								<!-- details form -->
								<div class="col-12 col-lg-6">
									<form action="#" class="sign__form sign__form--profile">
										<div class="row">
											<div class="col-12">
												<h4 class="sign__title">Profile details</h4>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="username">Login</label>
													<input id="username" type="text" name="username" class="sign__input" placeholder="User123">
												</div>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="email">Email</label>
													<input id="email" type="text" name="email" class="sign__input" placeholder="email@email.com">
												</div>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="firstname">First name</label>
													<input id="firstname" type="text" name="firstname" class="sign__input" placeholder="John">
												</div>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="lastname">Last name</label>
													<input id="lastname" type="text" name="lastname" class="sign__input" placeholder="Doe">
												</div>
											</div>

											<div class="col-12">
												<button class="sign__btn" type="button">Save</button>
											</div>
										</div>
									</form>
								</div>
								<!-- end details form -->

								<!-- password form -->
								<div class="col-12 col-lg-6">
									<form action="#" class="sign__form sign__form--profile">
										<div class="row">
											<div class="col-12">
												<h4 class="sign__title">Change password</h4>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="oldpass">Old password</label>
													<input id="oldpass" type="password" name="oldpass" class="sign__input">
												</div>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="newpass">New password</label>
													<input id="newpass" type="password" name="newpass" class="sign__input">
												</div>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="confirmpass">Confirm new password</label>
													<input id="confirmpass" type="password" name="confirmpass" class="sign__input">
												</div>
											</div>

											<div class="col-12 col-md-6 col-lg-12 col-xl-6">
												<div class="sign__group">
													<label class="sign__label" for="select">Select</label>
													<select name="select" id="select" class="sign__select">
														<option value="0">Option</option>
														<option value="1">Option 2</option>
														<option value="2">Option 3</option>
														<option value="3">Option 4</option>
													</select>
												</div>
											</div>

											<div class="col-12">
												<button class="sign__btn" type="button">Change</button>
											</div>
										</div>
									</form>
								</div>
								<!-- end password form -->
							</div>
						</div>
					</div>
					<!-- end content tabs -->
				</div>
			</div>	
		</div>
	</main>
</template>

<script>
import AuthorDetails from '@/components/AuthorDetails.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Paginator from '@/components/Paginator.vue'
import Activity from '@/components/Activity.vue'

export default {
  name:"Author",
  components: {
    AuthorDetails,
    ArticlePreview,
    Paginator,
    Activity
  },
}
</script>