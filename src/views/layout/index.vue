<template>
	<div>
		<h1>layout</h1>
		<router-view></router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/home" icon-prefix="toutiao" icon="shouye">首页</van-tabbar-item>
			<van-tabbar-item replace to="/qa" icon-prefix="toutiao" icon="wenda">问答</van-tabbar-item>
			<van-tabbar-item replace to="/video" icon-prefix="toutiao" icon="shipin">视频</van-tabbar-item>
			<van-tabbar-item replace to="/my" icon-prefix="toutiao" icon="wode">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		name: "HmToutiaoIndex",

		data() {
			return {};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="less" scoped>
</style>