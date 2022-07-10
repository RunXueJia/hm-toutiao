<template>
	<div>
		<!-- <p>{{item.title}}</p> -->
		<van-cell :title="item.title" class="article-item">
			<template #default v-if="item.cover.type ===1">
				<van-image class="right-cover" fit="cover" :src="item.cover.images[0]" />
			</template>
			<template #label>
				<div v-if="item.cover.type >1" class="cover-wrap">
					<div class="cover-item" v-for="(img,idx ) in item.cover.images" :key="idx">
						<van-image class="cover-item-img" fit="cover" :src="img" />
					</div>
				</div>
				<div class="label-info-wrap">
					<span>{{item.aut_name}}</span>
					<span>{{item.comm_count}} 评论</span>
					<span>{{item.pubdate | getrelative}}</span>
				</div>
			</template>
		</van-cell>
	</div>
</template>

<script>
	export default {
		name: "ArticleItem",
		props: {
			item: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {};
		},

		mounted() {},

		methods: {
			// getrelative(time) {
			// 	return getrelativeTime(time);
			// },
		},
	};
</script>

<style lang="less" scoped>
	.article-item {
		.title {
			font-size: 32px;
			color: #3a3a3a;
		}

		.van-cell__title {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.van-cell__value {
			flex: unset;
			width: 232px;
			height: 146px;
			padding-left: 25px;
		}

		.right-cover {
			width: 100%;
			height: 146px;
		}

		.label-info-wrap span {
			font-size: 22px;
			color: #b4b4b4;
			margin-right: 25px;
		}

		.cover-wrap {
			display: flex;
			padding: 30px 0;
			.cover-item {
				flex: 1;
				height: 146px;
				&:not(:last-child) {
					padding-right: 4px;
				}
				.cover-item-img {
					width: 100%;
					height: 146px;
				}
			}
		}
	}
</style>