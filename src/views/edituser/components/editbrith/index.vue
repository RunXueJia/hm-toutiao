<template>
	<van-datetime-picker
		v-model="currentDate"
		type="date"
		title="选择年月日"
		:min-date="minDate"
		:max-date="maxDate"
		@cancel="$emit('close')"
		@confirm="EditBrithFn"
	/>
</template>

<script>
	import { EditUserProfileApi } from "@/api/edit";
	import { TimeToString } from "@/utils/day";
	export default {
		name: "EditBrith",
		props: {
			UserBrith: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				minDate: new Date(1921, 12, 1),
				maxDate: new Date(),
				currentDate: new Date(this.UserBrith),
			};
		},

		mounted() {},

		methods: {
			async EditBrithFn(value) {
				// console.log(value);
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");

				try {
					const { data } = await EditUserProfileApi({
						birthday: TimeToString(value),
					});
					this.$toast.success("修改成功");
					this.$emit("update:UserBrith", TimeToString(value));
					this.$emit("close");
				} catch (error) {
					this.$toast.fail("修改失败");
				}
			},
		},
	};
</script>

<style lang="less" scoped>
</style>