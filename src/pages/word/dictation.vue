<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30">词汇听写</view>
		</cy-navbar>
		<view class="title">
			<view class="titleText">
				八年级上册Unit2
			</view>
			<view class="titleSet">
				<u-icon name="setting" size="42"></u-icon>
			</view>
		</view>
		<view class="num">
			第2个/共16个
		</view>
		<view class="frequency">
			<uCircleProgressVue active-color="#2979ff" :percent="50">
				<view class="u-progress-content">
					<text class='u-progress-info'>1次</text>
				</view>
			</uCircleProgressVue>
		</view>
		<view class="hit">
			答案提示显示区
		</view>
		<view class="definition">
			['aepl]
		</view>
		<view class="word">
			苹果
		</view>
		<view class="inputWord">
			<uMessageInput :maxlength="6" mode="bottomLine" width="30" font-size="30"></uMessageInput>
		</view>
		<view class="control">
			<view class="controlItem">
				<image :src="imageBaseUrl + '/word/5-21-26.png'" mode=""></image>
				<view class="controlItem-text">
					重读
				</view>
			</view>
			<view class="controlItemC">
				<image :src="imageBaseUrl + '/word/5-21-27.png'" mode=""></image>
				<view class="controlItem-text">
					播放
				</view>
			</view>
			<view class="controlItem">
				<image :src="imageBaseUrl + '/word/play_s.png'" mode=""></image>
				<view class="controlItem-text">
					下一个
				</view>
			</view>
		</view>
		<view class="leftSidebar">
			答案提示
		</view>
		<view class="rightSidebar">
			词汇讲解
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import uCircleProgressVue from "uview-ui/components/u-circle-progress/u-circle-progress.vue"
	import uMessageInput from "uview-ui/components/u-message-input/u-message-input.vue"
	export default {
		mixins: [MyMixin],
		components: {
			uCircleProgressVue,
			uMessageInput
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#fff'
			} else {
				this.backColor = 'transparent'
			}
		},
		data() {
			return {
				backColor: 'transparent',
			}
		},
	}
</script>

<style>
	.nav-icon,
	.nav-slot,
	.nav-btn {
		color: black !important;
	}

	.main {
		min-height: 100vh;
		background: linear-gradient(180deg, #DFF0FF 0%, #F0F7FD 6%, #FFFFFF 21%);
	}

	.title {
		display: flex;
		justify-content: center;
		margin-top: 50rpx;
		position: relative;
		align-items: center;
	}

	.titleText {
		font-size: 35rpx;
		font-weight: 600;
	}

	.titleSet {
		position: absolute;
		right: 60rpx;
		color: rgba(174, 174, 174, 1);
	}

	.num {
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 60rpx;
		font-size: 30rpx;
	}

	.u-progress-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.u-progress-info {
		font-size: 30rpx;
		letter-spacing: 2rpx
	}

	.frequency {
		display: flex;
		justify-content: center;
	}

	.hit {
		margin-top: 50rpx;
		margin-bottom: 46rpx;
		color: rgba(109, 109, 109, 1);
		font-size: 24rpx;
		text-align: center;
		text-decoration: underline;
	}

	.definition {
		text-align: center;
		color: rgba(109, 109, 109, 1);
		font-size: 30rpx;
	}

	.word {
		font-size: 30rpx;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}

	.control {
		display: flex;
		justify-content: space-around;
		padding: 0 60rpx;
		align-items: center;
		margin-top: 70rpx;
	}

	.controlItem {
		text-align: center;
		color: rgba(138, 138, 138, 1);
		font-size: 24rpx;
		margin-top: 30rpx;
	}

	.controlItem image {
		width: 38rpx;
		height: 38rpx;
		margin-bottom: 16rpx;
	}

	.controlItemC {
		text-align: center;
		color: rgba(25, 100, 229, 1);
		font-size: 30rpx;
	}

	.controlItemC image {
		width: 76rpx;
		height: 76rpx;
		margin-bottom: 16rpx;
	}

	.leftSidebar {
		background: linear-gradient(180deg, #4A8CFD 0%, #1F63D7 100%);
		position: fixed;
		color: #FFFFFF;
		width: 147rpx;
		height: 73rpx;
		line-height: 73rpx;
		border-radius: 0rpx 10rpx 10rpx 0;
		font-size: 26rpx;
		text-align: center;
		left: 0;
		top: 570rpx;
	}
	.rightSidebar{
		background: linear-gradient(180deg, #FAB472 0%, #E06D25 100%);
		position: fixed;
		color: #FFFFFF;
		width: 147rpx;
		height: 73rpx;
		line-height: 73rpx;
		border-radius: 10rpx 0rpx 0rpx 10rpx;
		font-size: 26rpx;
		text-align: center;
		right: 0;
		top: 570rpx;
	}
</style>