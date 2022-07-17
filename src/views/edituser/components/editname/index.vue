<template>
	<div class="update-name">
		<!-- 导航栏 -->
		<van-nav-bar
			title="设置昵称"
			left-text="取消"
			right-text="完成"
			@click-left="$emit('close')"
			@click-right="EditNameFn"
		/>
		<!-- /导航栏 -->
		<!-- 输入框 -->
		<div class="field-wrap">
			<van-field
				v-model.trim="message"
				rows="2"
				autosize
				type="textarea"
				maxlength="7"
				placeholder="请输入昵称"
				show-word-limit
			/>
		</div>
		<!-- /输入框 -->
	</div>
</template>

<script>
	import { EditUserProfileApi } from "@/api/edit";
	export default {
		name: "UpdateName",
		components: {},
		props: {
			UserName: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				message: this.UserName,
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			async EditNameFn() {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				try {
					const { data } = await EditUserProfileApi({
						name: this.message,
					});
					this.$toast.success("修改成功");
					this.$emit("update:UserName", this.message);
					this.$emit("close");
				} catch (error) {
					this.$toast.fail("修改失败");
				}
			},
		},
	};
</script>

<style scoped lang="less">
	.field-wrap {
		padding: 20px;
	}
</style>