<template>
	<div>
		<van-nav-bar title="登陆" left-arrow @click-left="onClickLeft" />
	</div>
</template>

<script>
	import { Toast } from "vant";
	export default {
		name: "HmToutiaoIndex",

		data() {
			return {};
		},

		mounted() {},

		methods: {
			onClickLeft() {
				// Toast("返回");
				this.$router.go(-1);
			},
		},
	};
</script>

<style lang="less" scoped>
</style>