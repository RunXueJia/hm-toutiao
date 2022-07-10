<template>
	<div class="login-contanier">
		<!-- 标题 -->
		<van-nav-bar title="登陆" left-arrow @click-left="onClickLeft" />
		<!-- 登陆表单 -->
		<van-form ref="from" @submit="onSubmit">
			<van-field
				v-model.trim="user.mobile"
				type="number"
				icon-prefix="toutiao"
				maxlength="11"
				left-icon="shouji"
				name="mobile"
				placeholder="请输入手机号"
				:rules="rules.mobile"
			></van-field>
			<van-field
				maxlength="6"
				v-model.trim="user.code"
				type="number"
				icon-prefix="toutiao"
				left-icon="yanzhengma"
				name="code"
				placeholder="验证码"
				:rules="rules.code"
			>
				<template #button>
					<van-button @click="send" native-type="button" type="primary">
						<span v-if="showCount">获取验证码</span>
						<van-count-down @change="finsh" v-else :time="5000" format=" ss 秒重新获取" />
					</van-button>
					<!-- <van-button native-type="button" type="primary">获取验证码</van-button> -->
				</template>
			</van-field>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import { sendSms, loginIn } from "@/api/login.js";
	import { mapMutations } from "vuex";
	export default {
		name: "HmToutiaoIndex",

		data() {
			return {
				showCount: true,
				user: {
					mobile: "",
					code: "",
				},

				rules: {
					mobile: [
						{ required: true, message: "请输入手机号" },
						{
							pattern:
								/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
							message: "手机号不正确",
						},
					],
					code: [
						{ required: true, message: "请填写验证码" },
						{ pattern: /\d{6}/, message: "验证码不正确" },
					],
				},
			};
		},
		mounted() {},

		methods: {
			...mapMutations(["setUser"]),
			onClickLeft() {
				// Toast("返回");
				this.$router.go(-1);
			},
			async onSubmit() {
				// const res = await loginIn(this.user);
				// console.log(res);
				this.$toast.loading({
					message: "登陆中",
					forbidClick: true,
					duration: 0,
				});
				try {
					const { data } = await loginIn(this.user);
					console.log(data);
					this.$toast.success("登录成功");
					//数据存到vuex和本地
					this.setUser(data.data);
					const url = this.$route.query.url;
					// console.log(url);
					if (url) return this.$router.replace(url);
					this.$router.replace("/my");
				} catch (error) {
					// console.log(error);
					this.$toast(error.response.data.message);
				}
				this.$toast.clear();
			},
			//发送验证码
			async send() {
				try {
					await this.$refs.from.validate("mobile");
				} catch (err) {
					// console.log(err);
					return;
				}
				this.showCount = false;
				try {
					const res = await sendSms(this.user.mobile);
					// console.log(res);
					this.$toast.success("发送成功");
				} catch (error) {
					// console.log(error.response.data.message);
					this.$toast(error.response.data.message);
				}
			},
			//倒计时结束
			finsh(time) {
				// console.log(time);
				const { seconds } = time;
				if (!seconds) return (this.showCount = true);
			},
		},
	};
</script>

<style lang="less" scoped >
	.login-contanier {
		.van-nav-bar {
			background-color: pink;
			/deep/ .van-icon-arrow-left {
				color: #fff;
			}
			/deep/ .van-nav-bar__title {
				color: #fff;
			}
		}
		/deep/.toutiao-yanzhengma:before {
			line-height: 88px;
		}
		/deep/ .van-button--info {
			background-color: pink;
			border: pink;
		}
		/deep/ .van-button--round {
			border-radius: 0;
		}
		/deep/ .van-count-down {
			color: #fff;
		}
	}
</style>