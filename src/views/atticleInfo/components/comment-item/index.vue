<template>
	<van-cell class="comment-item">
		<van-image slot="icon" class="avatar" round fit="cover" :src="comment.aut_photo" />
		<div slot="title" class="title-wrap">
			<div class="user-name">{{comment.aut_name}}</div>
			<van-button
				@click="LikeCommentFn"
				class="like-btn"
				:icon="comment.is_liking?'good-job': 'good-job-o'"
			>赞 ({{comment.like_count}})</van-button>
		</div>

		<div slot="label">
			<p class="comment-content">{{comment.content}}</p>
			<div class="bottom-info">
				<span class="comment-pubdate">{{comment.pubdate | getrelative}}</span>
				<van-button
					@click="$emit('RePlayShow',comment)"
					class="reply-btn"
					round
				>回复 {{comment.reply_count}}</van-button>
			</div>
		</div>
	</van-cell>
</template>

<script>
	import { LikeCommentApi, ReLikeCommentApi } from "@/api/comment";
	export default {
		name: "CommentItem",
		props: {
			//每行的评论信息
			comment: {
				type: Object,
				required: true,
			},
		},
		methods: {
			async LikeCommentFn() {
				if (!this.$store.getters.token) return this.$toast("要先登录");
				try {
					// console.log("ok");
					if (this.comment.is_liking) {
						const { data } = await ReLikeCommentApi(this.comment.com_id);
						this.comment.like_count--;
					} else {
						// console.log(this.comment.com_id);
						const { data } = await LikeCommentApi(this.comment.com_id);
						this.comment.like_count++;
					}
					this.$toast.success(this.comment.is_liking ? "已取消点赞" : "点赞成功");

					this.comment.is_liking = !this.comment.is_liking;
				} catch (error) {
					console.log(error);
					this.$toast.fail("操作失败");
				}
			},
		},
	};
</script>

<style scoped lang="less">
	.comment-item {
		.avatar {
			width: 72px;
			height: 72px;
			margin-right: 25px;
		}
		.title-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.user-name {
				color: #406599;
				font-size: 26px;
			}
		}
		.comment-content {
			font-size: 32px;
			color: #222222;
			word-break: break-all;
			text-align: justify;
		}
		.comment-pubdate {
			font-size: 19px;
			color: #222;
			margin-right: 25px;
		}
		.bottom-info {
			display: flex;
			align-items: center;
		}
		.reply-btn {
			width: 150px;
			height: 48px;
			line-height: 48px;
			font-size: 21px;
			color: #222;
		}
		.like-btn {
			height: 30px;
			padding: 0;
			border: none;
			font-size: 19px;
			line-height: 30px;
			margin-right: 7px;
			.van-icon {
				font-size: 30px;
			}
		}
		.liked {
			background-color: orange;
		}
	}
</style>