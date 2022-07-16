<template>
	<van-list
		:immediate-check="false"
		v-model="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad"
	>
		<CommentItem
			@RePlayShow="$emit('RePlayShow', $event)"
			v-for="item in list"
			:key="item.com_id"
			:comment="item"
		></CommentItem>
	</van-list>
</template>
<script>
	import { getCommentApi } from "@/api/comment";
	import CommentItem from "@/views/atticleInfo/components/comment-item";
	export default {
		name: "CommentList",
		components: { CommentItem },
		props: {
			type: {
				type: String,
				default: "a",
			},
			sourceId: {
				type: [String, Number],
			},
			list: {
				type: Array,
				// required: true,
				default: [],
			}, // 评论列表
		},
		data() {
			return {
				loading: false, // 上拉加载更多的 loading
				finished: false, // 是否加载结束
				offset: null, //评论数据偏移量
				limit: 10, //每页数据量
			};
		},
		created() {
			this.onLoad();
		},
		methods: {
			async onLoad() {
				const { data } = await getCommentApi({
					type: this.type,
					source: this.sourceId,
					offset: this.offset,
					limit: this.limit,
				});
				// console.log(data);
				this.loading = false;
				this.list.push(...data.data.results);
				if (data.data.results.length < this.limit) {
					this.finished = true;
				} else {
					this.offset = data.data.last_id;
				}
				this.$emit("total_count", data.data.total_count);
			},
		},
	};
</script>