<template>
	<div class="user-profile">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
		<!-- /导航栏 -->

		<!-- 个人信息 -->
		<van-cell @click="$refs.ImgInp.click()" class="avatar-cell" title="头像" is-link center>
			<input ref="ImgInp" type="file" hidden @change="ChoseImg" />
			<van-image class="avatar" round fit="cover" :src="UserProfile.photo" />
		</van-cell>
		<van-cell @click="isEditName=true" title="昵称" :value="UserProfile.name" is-link />
		<van-cell @click="isEditSex=true" title="性别" :value="UserProfile.gender ? '女':'男'" is-link />
		<van-cell @click="isEditBrith=true" title="生日" :value="UserProfile.birthday" is-link />
		<!-- /个人信息 -->
		<!-- 弹出框区域 -->
		<van-popup position="bottom" :style="{height:'100%'}" v-model="isEditPhoto">
			<EditPhoto
				@close="isEditPhoto=false"
				v-if="isEditPhoto"
				@upImgUrl="UserProfile.photo = $event"
				:ImgUrl="ImgUrl"
			></EditPhoto>
		</van-popup>
		<van-popup position="bottom" :style="{height:'50%'}" v-model="isEditName">
			<EditName v-if="isEditName" :UserName.sync="UserProfile.name" @close="isEditName=false"></EditName>
		</van-popup>
		<van-popup position="bottom" :style="{height:'50%'}" v-model="isEditSex">
			<EditSex :sex.sync="UserProfile.gender" v-if="isEditSex" @close="isEditSex=false"></EditSex>
		</van-popup>
		<van-popup position="bottom" :style="{height:'50%'}" v-model="isEditBrith">
			<EditBrith :UserBrith.sync="UserProfile.birthday" v-if="isEditBrith" @close="isEditBrith=false"></EditBrith>
		</van-popup>
		<!-- /弹出框区域 -->
	</div>
</template>

<script>
	import EditName from "./components/editname";
	import EditSex from "./components/editsex";
	import EditBrith from "./components/editbrith";
	import EditPhoto from "./components/editphoto";
	import { getUserProfileApi } from "@/api/edit";
	export default {
		name: "UserProfile",
		components: { EditPhoto, EditName, EditSex, EditBrith },
		props: {},
		data() {
			return {
				UserProfile: {},
				isEditPhoto: false,
				isEditName: false,
				isEditSex: false,
				isEditBrith: false,
				ImgFile: "",
				ImgUrl: "",
			};
		},
		computed: {},
		watch: {},
		created() {
			this.getUserProfileFn();
		},
		mounted() {},
		methods: {
			async getUserProfileFn() {
				if (!this.$store.getters.token) return this.$toast.fail("请先登录");
				try {
					const { data } = await getUserProfileApi();
					this.UserProfile = data.data;
				} catch (error) {}
			},
			ChoseImg() {
				// console.log(this.$refs.ImgInp.files);
				this.ImgUrl = URL.createObjectURL(this.$refs.ImgInp.files[0]);
				// console.log(ImgUrl);
				this.$refs.ImgInp.value = null;
				this.isEditPhoto = true;
			},
		},
	};
</script>

<style scoped lang="less">
	.user-profile {
		.avatar-cell {
			.van-cell__value {
				display: flex;
				flex-direction: row-reverse;
			}
			.avatar {
				width: 60px;
				height: 60px;
			}
		}
		.van-popup {
			background-color: #f5f7f9;
		}
	}
</style>