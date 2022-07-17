<template>
	<van-picker
		title="标题"
		show-toolbar
		:columns="columns"
		@confirm="onConfirm"
		@cancel="onCancel"
		@change="onChange"
		:default-index="sex"
	/>
</template>

<script>
	import { EditUserProfileApi } from "@/api/edit";

	export default {
		name: "EditSex",
		props: {
			sex: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				columns: ["男", "女"],
			};
		},
		methods: {
			async onConfirm(value, index) {
				// Toast(`当前值：${value}, 当前索引：${index}`);

				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				try {
					const { data } = await EditUserProfileApi({
						gender: index,
					});
					this.$toast.success("修改成功");
					this.$emit("update:sex", index);
					this.$emit("close");
				} catch (error) {
					this.$toast.fail("修改失败");
				}
			},

			onChange(picker, value, index) {
				// Toast(`当前值：${value}, 当前索引：${index}`);
			},
			onCancel() {
				// Toast("取消");
			},
		},
	};
</script>

<style lang="less" scoped>
</style>