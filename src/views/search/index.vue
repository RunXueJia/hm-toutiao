<template>
	<div id="search-spc">
		<form action="/" class="search-form">
			<van-search
				@search="onSearch"
				v-model.trim="searctText"
				shape="round"
				background="#3296fa"
				placeholder="请输入搜索关键词"
				show-action
			/>
		</form>
		<searchResult v-if="isResShow"></searchResult>
		<searchSug :searctText="searctText" v-else-if="searctText"></searchSug>
		<searchHistory v-else></searchHistory>
	</div>
</template>

<script>
	import searchHistory from "./components/search-history";
	import searchResult from "./components/search-result.vue";
	import searchSug from "./components/searc-sug.vue";
	export default {
		name: "search",
		components: {
			searchHistory,
			searchResult,
			searchSug,
		},
		data() {
			return {
				searctText: "",
				isResShow: false,
			};
		},

		mounted() {},

		methods: {
			onSearch() {
				if (!this.searctText) return;
				console.log(this.searctText);
			},
		},
	};
</script>

<style lang="less" scoped>
	#search-spc {
		padding-top: 108px;
		.van-search__action {
			color: #fff;
		}
		.search-form {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;
		}
	}
</style>