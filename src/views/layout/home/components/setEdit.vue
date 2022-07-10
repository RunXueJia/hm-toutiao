<template>
	<div class="channel-edit">
		<van-cell :border="false">
			<div slot="title" class="title-text">我的频道</div>
			<van-button
				@click="setChannel"
				class="edit-btn"
				type="danger"
				plain
				round
				size="mini"
			>{{changing? '完成': '编辑'}}</van-button>
		</van-cell>
		<van-grid class="my-grid" :gutter="10">
			<van-grid-item
				@click="delChanner(obj)"
				v-for="obj in userChannels"
				:key="obj.id"
				class="grid-item"
			>
				<van-icon v-show="changing && obj.name !== '推荐'" slot="icon" name="clear"></van-icon>
				<span
					:class="{active : obj.id === userChannels[activeIndex].id}"
					class="text"
					slot="text"
				>{{obj.name}}</span>
			</van-grid-item>
		</van-grid>

		<!-- 频道推荐 -->
		<van-cell :border="false">
			<div slot="title" class="title-text">频道推荐</div>
		</van-cell>
		<van-grid class="recommend-grid" :gutter="10" clickable>
			<van-grid-item
				v-for="obj in hotChannels"
				:key="obj.id"
				class="grid-item"
				icon="plus"
				:text="obj.name"
				@click="addUserChannel(obj)"
			/>
		</van-grid>
		<!-- /频道推荐 -->
	</div>
</template>

<script>
	import { getAllChannelsApi } from "@/api/home";
	export default {
		name: "ChannelEdit",
		components: {},
		props: {
			userChannels: {
				type: Array,
				requied: true,
			},
			activeIndex: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {
				changing: false,
				AllChannels: [],
				// hotChannels: [],
			};
		},
		computed: {
			hotChannels() {
				return this.AllChannels.filter(
					(fa) => !this.userChannels.find((son) => son.id === fa.id)
				);
			},
		},
		watch: {},
		created() {
			this.initData();
		},
		mounted() {},
		methods: {
			//初始化
			async initData() {
				try {
					const { data } = await getAllChannelsApi();
					// console.log(data);
					this.AllChannels = data.data.channels;
					console.log(this.AllChannels);
				} catch (error) {}
			},
			//添加用户频道
			addUserChannel(obj) {
				if (this.changing) this.userChannels.push(obj);
			},
			//保存用户频道
			setChannel() {
				this.changing = !this.changing;
			},
			//删除用户频道
			delChanner(obj) {
				if (!this.changing || obj.name === "推荐") return;
				this.userChannels.splice(
					this.userChannels.findIndex((item) => item.id === obj.id),
					1
				);
			},
		},
	};
</script>

<style scoped lang="less">
	.channel-edit {
		padding: 85px 0;
		.title-text {
			font-size: 32px;
			color: #333333;
		}

		.edit-btn {
			width: 104px;
			height: 48px;
			font-size: 26px;
			color: #f85959;
			border: 1px solid #f85959;
		}

		/deep/ .grid-item {
			width: 160px;
			height: 86px;
			.van-grid-item__content {
				white-space: nowrap;
				background-color: #f4f5f6;
				.van-grid-item__text,
				.text {
					font-size: 28px;
					color: #222;
					margin-top: 0;
				}
				.active {
					color: red;
				}
				.van-grid-item__icon-wrapper {
					position: unset;
				}
			}
		}

		/deep/ .my-grid {
			.grid-item {
				.van-icon-clear {
					position: absolute;
					right: -10px;
					top: -10px;
					font-size: 30px;
					color: #cacaca;
					z-index: 2;
				}
			}
		}

		/deep/ .recommend-grid {
			.grid-item {
				.van-grid-item__content {
					flex-direction: row;
					.van-icon-plus {
						font-size: 28px;
						margin-right: 6px;
					}
				}
			}
		}
	}
</style>