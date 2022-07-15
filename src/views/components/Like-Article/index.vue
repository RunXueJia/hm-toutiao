<template>
	<van-loading size="20" v-if="isloadinding" />
	<van-icon
		v-else
		@click="CollectArticleFn"
		:color="attitude === 1 ? '#000': '#777' "
		:name="attitude === 1 ? 'good-job':'good-job-o'"
	/>
</template>

<script>
	import { LikeArticleApi, ReLikeArticleApi } from "@/api/article";
	export default {
		name: "LikeArticle",
		props: {
			attitude: {
				type: [Number, String],
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
					if (this.attitude) {
						await ReLikeArticleApi(this.art_id);
					} else {
						await LikeArticleApi({
							target: this.art_id,
						});
					}
					this.$toast.success(this.attitude ? "取消点赞成功" : "感谢点赞");
					this.$emit("update:attitude", this.attitude === 1 ? 0 : 1);
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