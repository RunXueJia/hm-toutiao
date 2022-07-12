<template>
	<div class="articleList-spc">
		<van-pull-refresh success-text="刷新成功" v-model="refreshing" @refresh="onRefresh">
			<van-list
				:error.sync="error"
				error-text="请求失败，点击重新加载"
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<articleItem v-for="(item ,index) in list" :key="index" :item="item"></articleItem>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import { getArticleListApi } from "@/api/home";
	import articleItem from "./articleItem.vue";
	export default {
		name: "ArticleList",
		components: {
			articleItem,
		},
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
				error: false,
				refreshing: false,
				isLoading: false,
			};
		},

		mounted() {},

		methods: {
			//获取文章列表
			async getList(flag) {
				try {
					const { data } = await getArticleListApi({
						channel_id: this.channel.id,
						timestamp: flag ? this.timestamp : +new Date(),
					});
					// console.log(daa);
					//测试加载错误
					// if (Math.random() * 10 > 5) JSON.parse("aaa");
					if (flag) {
						this.list = [...this.list, ...data.data.results];
					} else {
						this.list = [...data.data.results, ...this.list];
					}

					this.loading = false;
					if (data.data.results.length < 10) {
						this.finished = true;
					} else {
						if (flag) this.timestamp = data.data.pre_timestamp;
					}
				} catch (error) {
					this.loading = false;
					this.error = true;
				}
			},
			onLoad() {
				this.getList(true);
			},
			//下拉刷新
			async onRefresh() {
				// 清空列表数据
				this.list = [];
				this.finished = false;
				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				this.getList();
				this.isLoading = false;
				this.refreshing = false;
			},
		},
	};
</script>

<style lang="less" scoped>
</style>