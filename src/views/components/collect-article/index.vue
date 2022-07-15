<template>
	<van-loading size="20" v-if="isloadinding" />

	<van-icon
		v-else
		@click="CollectArticleFn"
		:color="is_collected ? '#000': '#777' "
		:name="is_collected? 'star':'star-o'"
	/>
</template>

<script>
	import { CollectArticleApi, ReCollectArticleApi } from "@/api/article";
	export default {
		name: "CollectArticle",
		props: {
			is_collected: {
				type: Boolean,
				required: true,
			},
			art_id: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				isloadinding: false,
			};
		},

		mounted() {},

		methods: {
			async CollectArticleFn() {
				// console.log("ok");
				this.isloadinding = true;
				if (!this.$store.getters.token) return this.$toast.fail("先登录啊");
				try {
					if (this.is_collected) {
						await ReCollectArticleApi(this.art_id);
					} else {
						await CollectArticleApi({
							target: this.art_id,
						});
					}
					this.$toast.success(this.is_collected ? "取消收藏成功" : "感谢收藏");
					this.$emit("update:is_collected", !this.is_collected);
				} catch (error) {
					this.$toast.fail("关注状态更新失败");
				}
				this.isloadinding = false;
			},
		},
	};
</script>

<style scoped>
</style>