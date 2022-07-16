<template>
	<div class="article-container">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="$router.back()"></van-nav-bar>
		<!-- /导航栏 -->

		<div class="main-wrap">
			<!-- 加载中 -->
			<div class="loading-wrap" v-if="isloadinding ===1">
				<van-loading color="#3296fa" vertical>加载中</van-loading>
			</div>
			<!-- /加载中 -->

			<!-- 加载完成-文章详情 -->
			<div class="article-detail" v-if="isloadinding ===2">
				<!-- 文章标题 -->
				<h1 class="article-title">{{ArticleInfo.title}}</h1>
				<!-- /文章标题 -->

				<!-- 用户信息 -->
				<van-cell class="user-info" center :border="false">
					<van-image class="avatar" slot="icon" round fit="cover" :src="ArticleInfo.aut_photo" />
					<div slot="title" class="user-name">{{ArticleInfo.aut_name}}</div>
					<div slot="label" class="publish-date">{{ArticleInfo.pubdate | getrelative}}</div>
					<!-- <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus">关注</van-button> -->
					<FollowUser v-model="ArticleInfo.is_followed" :aut_id="ArticleInfo.aut_id"></FollowUser>
				</van-cell>
				<!-- /用户信息 -->

				<!-- 文章内容 -->
				<div ref="content" class="article-content markdown-body" v-html="ArticleInfo.content"></div>
				<van-divider>正文结束</van-divider>
				<!-- 底部区域 -->
				<div class="article-bottom">
					<van-button
						@click="isCommentBox = true"
						class="comment-btn"
						type="default"
						round
						size="small"
					>写评论</van-button>
					<van-icon name="comment-o" :badge="total_count" color="#777" />
					<!-- <van-icon color="#777" name="star-o" /> -->
					<CollectArticle :is_collected.sync="ArticleInfo.is_collected" :art_id="ArticleInfo.art_id"></CollectArticle>
					<!-- <van-icon color="#777" name="good-job-o" /> -->
					<LikeArticle :attitude.sync="ArticleInfo.attitude" :art_id="ArticleInfo.art_id"></LikeArticle>
					<van-icon name="share" color="#777777"></van-icon>
				</div>
				<!-- /底部区域 -->
				<!-- 评论区 -->
				<ConmmentList
					@RePlayShow="RePlayShow"
					:list="CommentList"
					@total_count="total_count =$event"
					:sourceId="article_id"
				></ConmmentList>
				<!-- /评论区 -->
			</div>
			<!-- /加载完成-文章详情 -->

			<!-- 加载失败：404 -->
			<div class="error-wrap" v-if="isloadinding ===3">
				<van-icon name="failure" />
				<p class="text">该资源不存在或已删除！</p>
			</div>
			<!-- /加载失败：404 -->

			<!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
			<div class="error-wrap" v-if="isloadinding ===4">
				<van-icon name="failure" />
				<p class="text">内容加载失败！</p>
				<van-button class="retry-btn">点击重试</van-button>
			</div>
			<!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
		</div>
		<van-popup position="bottom" v-model="isCommentBox">
			<CommentPost @PostComment="PostComment" :target="article_id"></CommentPost>
		</van-popup>
		<van-popup position="bottom" v-model="isReplayBox" :style="{height:'100%'}">
			<CommentReply v-if="isReplayBox" :comment="ReplayComment" @close="isReplayBox =false"></CommentReply>
		</van-popup>
	</div>
</template>

<script>
	import { ImagePreview } from "vant";
	import { getArticleInfoApi } from "@/api/article";
	import ConmmentList from "@/views/atticleInfo/components/comment-list";
	import CommentPost from "@/views/atticleInfo/components/comment-post";
	import CommentReply from "@/views/atticleInfo/components/comment-replay";
	export default {
		name: "ArticleIndex",
		components: {
			ConmmentList,
			CommentPost,
			CommentReply,
		},
		props: {},
		data() {
			return {
				isloadinding: 1,
				article_id: this.$route.params.id,
				ArticleInfo: {},
				total_count: "",
				isCommentBox: false,
				CommentList: [],
				isReplayBox: false,
				ReplayComment: {},
			};
		},
		computed: {},
		watch: {},
		created() {
			this.getArticleInfo();
		},
		provide() {
			return {
				art_id: this.article_id,
			};
		},
		mounted() {},
		methods: {
			//评论回复
			RePlayShow(val) {
				this.isReplayBox = true;
				// console.log(val);
				this.ReplayComment = val;
			},
			//薪评论
			PostComment(obj) {
				this.CommentList.unshift(obj);
				this.isCommentBox = false;
				this.total_count++;
			},
			async getArticleInfo() {
				this.isloadinding = 1;
				try {
					const { data } = await getArticleInfoApi(this.article_id);
					console.log(data);
					this.ArticleInfo = data.data;
					this.isloadinding = 2;
					this.$nextTick(() => {
						const imgs = [...this.$refs.content.querySelectorAll("img")];
						// console.log(imgs);
						const imgSrcs = imgs.map((img) => img.src);
						// console.log(imgSrcs);

						//点击图片预览
						imgs.forEach((img, index) => {
							img.onclick = function () {
								ImagePreview({
									images: imgSrcs,
									startPosition: index,
								});
							};
						});
					});
				} catch (error) {
					console.log(error);
					// this.toast.fail("文章加载失败");
					if (error.response && error.response.status === 404) {
						this.isloadinding = 3;
					} else {
						this.isloadinding = 4;
					}
				}
			},
		},
	};
</script>

<style scoped lang="less">
	@import url("@/styles/github-markdown.css");
	.article-container {
		.van-nav-bar {
			background-color: #3296fa;
			/deep/ .van-icon {
				color: #fff;
			}
			/deep/.van-nav-bar__title {
				color: #fff;
			}
		}
		.main-wrap {
			position: fixed;
			left: 0;
			right: 0;
			top: 92px;
			bottom: 88px;
			overflow-y: scroll;
			background-color: #fff;
		}
		.article-detail {
			.article-title {
				font-size: 40px;
				padding: 50px 32px;
				margin: 0;
				color: #3a3a3a;
			}

			.user-info {
				padding: 0 32px;
				.avatar {
					width: 70px;
					height: 70px;
					margin-right: 17px;
				}
				.van-cell__label {
					margin-top: 0;
				}
				.user-name {
					font-size: 24px;
					color: #3a3a3a;
				}
				.publish-date {
					font-size: 23px;
					color: #b7b7b7;
				}
				.follow-btn {
					width: 170px;
					height: 58px;
				}
			}

			.article-content {
				padding: 55px 32px;
				/deep/ p {
					text-align: justify;
				}
			}
		}

		.loading-wrap {
			padding: 200px 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
		}

		.error-wrap {
			padding: 200px 32px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			.van-icon {
				font-size: 122px;
				color: #b4b4b4;
			}
			.text {
				font-size: 30px;
				color: #666666;
				margin: 33px 0 46px;
			}
			.retry-btn {
				width: 280px;
				height: 70px;
				line-height: 70px;
				border: 1px solid #c3c3c3;
				font-size: 30px;
				color: #666666;
			}
		}

		.article-bottom {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			height: 88px;
			border-top: 1px solid #d8d8d8;
			background-color: #fff;
			.comment-btn {
				width: 282px;
				height: 46px;
				border: 2px solid #eeeeee;
				font-size: 30px;
				line-height: 46px;
				color: #a7a7a7;
			}
			.van-icon {
				font-size: 40px;
				.van-info {
					font-size: 16px;
					background-color: #e22829;
				}
			}
		}
	}
</style>