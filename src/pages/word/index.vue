<template>
	<view class="pb-5 main">
		<cy-navbar :showBack="true">
			<view class="t-size-30">AI单词速记</view>
		</cy-navbar>
		<view class="px-4">
			<view class="search-box">
				<image :src="imageBaseUrl + '/word/icon3.png'" mode=""></image>
				AI查单词
			</view>
			<view class="item-box px-3 py-3">
				<view class="item-box-title">
					<view class="item-box-titleLeft">
						<view class="item-box-titleLeft-icon"></view>
						词汇速记
					</view>
				</view>
				<view class="item-box-list">
					<view class="item-box-listItem item-box-l"
						:style="{ backgroundImage: 'url(' + imageBaseUrl + '/word/back1.png)' }"
						@click="toNav('/pages/word/class?id=0')">
						<view class="item-box-listItem-text">
							教材词汇速记
						</view>
						<image class="item-box-listItem-img" :src="imageBaseUrl + '/word/5-21-05.png'" mode="widthFix">
						</image>
						<view class="item-box-listItem-icon">
							<image :src="imageBaseUrl + '/word/icon4.png'" mode=""></image>
						</view>
					</view>
					<view class="item-box-listItem item-box-r"
						:style="{ backgroundImage: 'url(' + imageBaseUrl + '/word/back2.png)' }"
						@click="toNav('/pages/word/class?id=1')">
						<view class="item-box-listItem-text">
							考纲词汇速记
						</view>
						<image class="item-box-listItem-imgs" :src="imageBaseUrl + '/word/5-21-07.png'" mode="widthFix">
						</image>
						<view class="item-box-listItem-icon">
							<image :src="imageBaseUrl + '/word/icon4.png'" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item-boxBottom" :style="{ backgroundImage: 'url(' + imageBaseUrl + '/word/back.png)' }">
					<view class="item-boxBottom-content">
						<view class="item-boxBottom-contentLeft">
							<view class="item-boxBottom-contentLeft-title">
								提高记忆力，助您一臂之力
							</view>
							<view class="item-boxBottom-contentLeft-bottom">
								<image :src="imageBaseUrl + '/word/5-21-10.png'" mode=""></image>点击立即拍照取词
							</view>
						</view>
						<view class="item-boxBottom-contentRight">
							<image :src="imageBaseUrl + '/word/5-21-09.png'" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="item-box px-3 py-3 mt-4">
				<view class="item-box-title">
					<view class="item-box-titleLeft">
						<view class="item-box-titleLeft-icon"></view>
						专题词汇
					</view>
					<view class="item-box-titleRight">
						<view class="item-box-titleRight-icon" @click="reduce()" v-if="getData.pageNo != 1">
							<image :src="imageBaseUrl + '/word/leftIcon.png'" mode=""></image>
						</view>
						<view class="item-box-titleRight-icon ml-3" @click="plus()" v-if="getData.pageNo != typePages">
							<image :src="imageBaseUrl + '/word/rightIcon.png'" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item-box-select">
					<view class="item-box-selectItem" v-for="(item,i) in typeData" :key="item.id">
						<view class="item-box-selectItem-head">
							<image :src="item.unitImage" mode="heightFix"></image>
						</view>
						<view class="item-box-selectItem-name">
							{{item.unitName}}
						</view>
						<view class="item-box-selectItem-text">
							{{item.wordNums}}个单词
						</view>
						<view class="item-box-selectItem-textB">
							挑战次数：{{item.challengeNums}}次
						</view>
					</view>
				</view>
			</view>
		</view>
		<wordTab></wordTab>
	</view>
</template>

<script>
	import wordTab from '@/components/word-tabbar/index.vue'
	import MyMixin from "@/utils/MyMixin";
	import {
		listByBookType
	} from "@/api/word";
	export default {
		mixins: [MyMixin],
		components: {
			wordTab
		},
		data() {
			return {
				typeData: [],
				typePages: 0,
				getData: {
					bookType: 101,
					pageNo: 1,
					pageSize: 3
				}
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			toNav(urls) {
				uni.navigateTo({
					url: urls
				})
			},
			async getList() {
				let data = await listByBookType(this.getData);
				this.typeData = data.data.result.records
				this.typePages = data.data.result.pages
			},
			plus() {
				if (this.getData.pageNo != this.typePages) {
					this.getData.pageNo = this.getData.pageNo++
					console.log(this.getData.pageNo++)
					this.getList()
				}
			},
			reduce() {
				if (this.getData.pageNo != 1) {
					this.getData.pageNo = this.getData.pageNo--
					console.log(this.getData.pageNo--)
					this.getList()
				}
			}
		}
	}
</script>

<style>
	.main {
		background: linear-gradient(180deg, #E9F5FF 0%, #F9FCFF 100%);
		min-height: 100vh;
	}

	.headItem-title {
		display: flex;
		color: #3A73D9;
		font-size: 24rpx;
		align-items: center;
		margin-top: 40rpx;
	}

	.headItem-title image {
		width: 30rpx;
		margin-right: 8rpx;
	}

	.search-box {
		background: #fff;
		height: 70rpx;
		line-height: 70rpx;
		color: #8A8A8A;
		border-radius: 60rpx;
		padding: 0 50rpx;
		display: flex;
		align-items: center;
		margin: 30rpx 0 40rpx 0;
		font-size: 24rpx
	}

	.search-box image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 30rpx;
	}

	.item-box {
		background: #fff;
		border-radius: 10rpx;
	}

	.item-box-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-box-titleLeft-icon {
		width: 7rpx;
		border-radius: 2rpx;
		background: #3A73D9;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.item-box-titleLeft {
		font-size: 30rpx;
		display: flex;
		align-items: center;
	}

	.item-box-titleRight {
		display: flex;
	}

	.item-box-titleRight-icon image {
		width: 33rpx;
		height: 33rpx;
		border-radius: 50%;
	}

	.item-box-l .item-box-listItem-text {
		background: linear-gradient(180deg, #D73C00 0%, #E97C52 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.item-box-list {
		display: flex;
		justify-content: space-between;
	}

	.item-box-listItem {
		width: 294rpx;
		height: 204rpx;
		padding: 25rpx;
		margin: 20rpx 0;
		background-size: 100% 100%;
		position: relative;
	}

	.item-box-listItem-icon image {
		width: 43rpx;
		height: 43rpx;
		position: absolute;
		left: 25rpx;
		bottom: 32rpx;
	}

	.bottomTab {
		position: fixed;
		bottom: 0;
		background: #fff;
		height: 150rpx;
		width: 100%;
	}

	.item-box-listItem-img {
		width: 120rpx;
		position: absolute;
		right: 15rpx;
		bottom: 20rpx;
	}

	.item-box-listItem-imgs {
		width: 120rpx;
		position: absolute;
		right: 15rpx;
		bottom: 20rpx;
	}

	.item-boxBottom {
		position: relative;
		height: 141rpx;
		border-radius: 10rpx;
		width: 100%;
		background-size: 100% 100%;
	}

	.item-boxBottom-content {
		display: flex;
		padding: 25rpx;
	}

	.item-boxBottom-contentLeft-title {
		font-weight: 600;
		color: #fff;
	}

	.item-boxBottom-contentLeft-bottom {
		background: #fff;
		border-radius: 26rpx;
		padding: 4rpx 30rpx;
		display: flex;
		align-items: center;
		color: #1863E5;
		font-size: 20rpx;
		width: 260rpx;
		left: 0;
		right: 0;
		margin: auto;
		margin-top: 26rpx;
	}

	.item-boxBottom-contentRight image {
		width: 172rpx;
		height: 124rpx;
		position: absolute;
		right: 30rpx;
		top: 10rpx;
	}

	.item-boxBottom-contentLeft-bottom image {
		width: 20rpx;
		height: 19rpx;
		margin-right: 10rpx;
	}

	.item-box-selectItem-head image {
		height: 127rpx;
		margin-top: 20rpx;
	}

	.item-box-selectItem-head {
		padding: 20rpx;
	}

	.item-box-selectItem {
		width: 202rpx;
	}

	.item-box-select {
		display: flex;
		justify-content: space-around;
	}

	.item-box-selectItem-text {
		font-size: 20rpx;
		color: #3A73D9;
	}

	.item-box-selectItem-textB {
		font-size: 20rpx;
		color: #8A8A8A;
	}

	.item-box-selectItem-name {
		font-size: 26rpx;
		margin-bottom: 6rpx;
	}
</style>