<template>
	<div class="search-history">
		<van-cell title="搜索历史">
			<div v-if="isEdit">
				<span @click="SearchHistories.splice(0)" class="delAll">全部删除</span>
				<span @click="isEdit = false">完成</span>
			</div>

			<van-icon @click="isEdit = true" v-else name="delete" />
		</van-cell>
		<van-cell @click="search(str)" :title="str" v-for="(str,index) in SearchHistories" :key="index">
			<van-icon @click="SearchHistories.splice(index,1)" v-if="isEdit" name="close" />
		</van-cell>
	</div>
</template>

<script>
	export default {
		name: "SearchHistory",
		components: {},
		props: {
			SearchHistories: {
				type: Array,
				reqired: true,
			},
		},
		data() {
			return {
				isEdit: false,
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			search(str) {
				if (!this.isEdit) this.$emit("search", str);
			},
		},
	};
</script>

<style scoped lang="less">
	.search-history {
		.delAll {
			margin-right: 8px;
		}
	}
</style>