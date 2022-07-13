<template>
	<div class="search-result">
		<van-list
			:error.sync="error"
			error-text="请求失败，点击重新加载"
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
		</van-list>
	</div>
</template>

<script>
	import { getSearchrResApi } from "@/api/search";
	export default {
		name: "SearchResult",
		components: {},
		props: {
			searctText: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				page: 1,
				per_page: 10,
				error: false,
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			async onLoad() {
				try {
					const { data } = await getSearchrResApi({
						page: this.page,
						per_page: this.per_page,
						q: this.searctText,
					});
					this.page++;
					this.list = [...this.list, ...data.data.results];
					this.loading = false;
					if (data.data.results.length < this.per_page) this.finished = true;
				} catch (error) {
					this.error = true;
					this.loading = false;
				}
			},
		},
	};
</script>

<style scoped lang="less"></style>