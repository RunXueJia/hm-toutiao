<template>
	<div class="search-suggestion">
		<van-cell v-for="(obj ,index ) in list" :key="index" icon="search">
			<template #title>
				<span v-html="renderStr(obj)"></span>
			</template>
		</van-cell>
	</div>
</template>

<script>
	import { getSearchSugApi } from "@/api/search.js";
	export default {
		name: "SearchSuggestion",
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
				timer: null,
			};
		},
		computed: {},
		watch: {
			searctText: {
				deep: true,
				immediate: true,
				handler(str) {
					if (!this.timer) {
						this.getSearchSug(str);
						this.timer = 1;
						return;
					}
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						this.getSearchSug(str);
					}, 700);
				},
			},
		},
		created() {
			// this.getSearchSug();
		},
		mounted() {},
		methods: {
			//获取搜索推荐
			async getSearchSug(str) {
				try {
					const { data } = await getSearchSugApi({
						q: str,
					});
					if (data.data.options.length === 1 && !data.data.options[0])
						return (this.list = []);
					this.list = data.data.options;
				} catch (error) {
					console.log(error);
				}
			},
			//
			renderStr(str) {
				const reg = new RegExp(this.searctText, "gi");
				const res = str.replace(
					reg,
					`<span style="color : red">${this.searctText}</span>`
				);
				return res;
			},
		},
	};
</script>

<style scoped lang="less"></style>
