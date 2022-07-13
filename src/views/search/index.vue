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
				@focus="isResShow=false"
				@cancel="$router.back()"
			/>
		</form>
		<searchResult :searctText="searctText" v-if="isResShow"></searchResult>
		<searchSug @search="onSearch" :searctText="searctText" v-else-if="searctText"></searchSug>
		<searchHistory @search="onSearch" :SearchHistories="SearchHistories" v-else></searchHistory>
	</div>
</template>

<script>
	import searchHistory from "./components/search-history";
	import searchResult from "./components/search-result.vue";
	import searchSug from "./components/searc-sug.vue";
	import { getItem, setItem } from "@/utils/storage";
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
				SearchHistories: getItem("TOUTIAO-SEARCH-HISTORY") || [],
			};
		},

		mounted() {},
		watch: {
			SearchHistories: {
				deep: true,
				handler(list) {
					setItem("TOUTIAO-SEARCH-HISTORY", list);
				},
			},
		},
		methods: {
			onSearch(str) {
				if (str) this.searctText = str;
				this.isResShow = true;
				const index = this.SearchHistories.findIndex((item) => item === str);
				if (index > -1) this.SearchHistories.splice(index, 1);

				this.SearchHistories.unshift(str);
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