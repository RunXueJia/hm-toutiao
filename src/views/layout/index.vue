<template>
	<div>
		<!-- <h1>layout</h1> -->
		<router-view></router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/home" icon-prefix="toutiao" icon="shouye">首页</van-tabbar-item>
			<van-tabbar-item replace to="/qa" icon-prefix="toutiao" icon="wenda">问答</van-tabbar-item>
			<van-tabbar-item replace to="/video" icon-prefix="toutiao" icon="shipin">视频</van-tabbar-item>
			<van-tabbar-item replace to="/my" icon-prefix="toutiao" icon="wode">{{token ? '我的' : '未登陆'}}</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import { getUserInfo } from "@/api/User";

	export default {
		name: "layout",
		computed: {
			...mapGetters(["token"]),
		},
		data() {
			return {};
		},
		created() {
			this.initData();
		},
		mounted() {},

		methods: {
			...mapMutations(["setUser"]),
			async initData() {
				try {
					await getUserInfo();
				} catch (error) {
					this.setUser({});
				}
			},
		},
	};
</script>

<style lang="less" scoped>
</style>