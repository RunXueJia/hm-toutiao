<template>
	<div class="articleList-spc">
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="item in list" :key="item.id" :title="item.title" />
		</van-list>
	</div>
</template>

<script>
	import { getArticleListApi } from "@/api/home";
	export default {
		name: "ArticleList",
		props: {
			channel: {
				type: Object,
				require: true,
			},
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				timestamp: +new Date(),
			};
		},

		mounted() {},

		methods: {
			async onLoad() {
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				// 加载状态结束
				// 数据全部加载完成
				// console.log(+new Date());
				try {
					const { data } = await getArticleListApi({
						channel_id: this.channel.id,
						timestamp: this.timestamp,
					});
					console.log(data);
					this.list = [...this.list, ...data.data.results];
					this.loading = false;
					if (data.data.results.length < 10) {
						this.finished = true;
					} else {
						this.timestamp = data.data.pre_timestamp;
					}
				} catch (error) {}
			},
		},
	};
</script>

<style lang="less" scoped>
</style>