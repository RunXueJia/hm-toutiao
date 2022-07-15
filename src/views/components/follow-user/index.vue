<template>
	<van-button
		v-if="!value"
		class="follow-btn"
		type="info"
		color="#3296fa"
		round
		size="small"
		icon="plus"
		@click="FollowUserFn"
		:loading="isloadinding"
	>关注</van-button>
	<van-button
		:loading="isloadinding"
		@click="FollowUserFn"
		v-else
		class="follow-btn"
		round
		size="small"
	>已关注</van-button>
</template>

<script>
	import { FollowUserApi, ReFollowUserApi } from "@/api/article";
	export default {
		name: "FollowUser",
		props: {
			value: {
				type: Boolean,
				required: true,
			},
			aut_id: {
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
			async FollowUserFn() {
				// console.log("ok");
				this.isloadinding = true;
				if (!this.$store.getters.token) return this.$toast.fail("先登录啊");
				try {
					if (this.value) {
						await ReFollowUserApi(this.aut_id);
					} else {
						await FollowUserApi({
							target: this.aut_id,
						});
					}
					this.$toast.success(this.value ? "取关成功" : "感谢关注");
					this.$emit("input", !this.value);
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