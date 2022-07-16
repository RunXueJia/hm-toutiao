<template>
	<div class="comment-post">
		<van-field
			class="post-field"
			v-model.trim="message"
			rows="2"
			autosize
			type="textarea"
			maxlength="50"
			placeholder="请输入留言"
			show-word-limit
		/>
		<van-button :disabled="!message.length" @click="AddCommentFn" class="post-btn">发布</van-button>
	</div>
</template>

<script>
	import { AddCommentApi } from "@/api/comment";
	export default {
		name: "CommentPost",
		data() {
			return {
				message: "",
			};
		},
		props: {
			target: {
				type: [Number, String],
				required: true,
			},
			type: {
				type: String,
				default: "a",
			},
		},
		inject: ["art_id"],
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			async AddCommentFn() {
				if (!this.$store.getters.token) return this.$toast("要先登录");

				try {
					const { data } = await AddCommentApi({
						target: this.target,
						content: this.message,
						art_id: this.type === "a" ? null : this.art_id,
					});
					this.$emit("PostComment", data.data.new_obj);
					this.$toast.success("发布成功");
					this.message = "";
				} catch (error) {
					console.log(error);
					this.$toast.fail("发布失败");
				}
			},
		},
	};
</script>

<style scoped lang="less">
	.comment-post {
		display: flex;
		align-items: center;
		padding: 32px 0 32px 32px;
		.post-field {
			background-color: #f5f7f9;
		}
		.post-btn {
			width: 150px;
			border: none;
			padding: 0;
			color: #6ba3d8;
			&::before {
				display: none;
			}
		}
	}
</style>