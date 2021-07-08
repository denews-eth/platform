<template>
	<!-- breadcrumb -->
	<div class="col-12">
		<ul class="breadcrumb">
			<li :class="(link.active) ? 'breadcrumb__item breadcrumb__item--active' : 'breadcrumb__item'" v-for="link in links" :key="link.link"><a :href="link.link" v-html="link.name"></a></li>
		</ul>
	</div>
	<!-- end breadcrumb -->
</template>

<script>
export default {
  name: "Breadcrumb",
	props: ['links']
}
</script>