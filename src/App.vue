<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	// import { mapGetters, mapMutations } from "vuex";
	// import { getUserInfo } from "@/api/User";

	export default {
		name: "App",
		computed: {
			// ...mapGetters(["token"]),
		},
		data() {
			return {};
		},
		created() {
			// this.initData();
		},
		mounted() {},

		methods: {
			// ...mapMutations(["setUser"]),
			// async initData() {
			// 	try {
			// 		await getUserInfo();
			// 		console.log("登录状态正常");
			// 	} catch (error) {
			// 		this.setUser({});
			// 		console.log("登录状态异常");
			// 	}
			// },
		},
	};
</script>
<style scoped lang="less">
</style>
