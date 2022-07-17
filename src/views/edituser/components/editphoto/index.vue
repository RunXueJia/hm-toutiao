<template>
	<div class="update-photo">
		<img class="img" :src="ImgUrl" ref="img" />

		<div class="toolbar">
			<div class="cancel" @click="$emit('close')">取消</div>
			<div class="confirm" @click="onConfirm">完成</div>
		</div>
	</div>
</template>

<script>
	import Cropper from "cropperjs";
	import { EditUserPhotoApi } from "@/api/edit";
	export default {
		name: "UpdatePhoto",
		components: {},
		props: {
			// 预览图片地址信息
			ImgUrl: {
				type: [String, Object],
				required: true,
			},
		},
		data() {
			return {
				cropper: null,
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {
			this.cropper = new Cropper(this.$refs.img, {
				viewMode: 1,
				dragMode: "move",
				aspectRatio: 1,
				// autoCropArea: 1,
				cropBoxMovable: false,
				cropBoxResizable: false,
				background: false,
			});
		},
		methods: {
			// 确定事件
			onConfirm() {
				this.cropper.getCroppedCanvas().toBlob(async (blob) => {
					// console.log(blob);
					const Fd = new FormData();
					Fd.append("photo", blob);
					if (!this.$store.getters.token) return this.$toast.fail("请先登录");

					try {
						const { data } = await EditUserPhotoApi(Fd);
						this.$toast.success("修改成功");
						this.$emit("upImgUrl", data.data.photo);
						this.$emit("close");
					} catch (error) {
						this.$toast.fail("修改失败");
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	@import "cropperjs/dist/cropper.css";
	.update-photo {
		background-color: #000;
		height: 100%;
		.toolbar {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			.cancel,
			.confirm {
				width: 90px;
				height: 90px;
				font-size: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
			}
		}
	}
	.img {
		display: block;
		max-width: 100%;
	}
</style>
