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