<template>
	<view class="main">
		<cy-navbar :showBack="false" :bgColor="backColor">
			<view class="t-size-30">抗遗忘复习</view>
		</cy-navbar>
		<view class="head">
			<view class="headLeft">
				<view class="headLeft-icon"></view>单词复习列表
			</view>
			<view class="headRight">
				<text>艾宾浩斯遗忘曲线</text><u-icon name="question-circle-fill"></u-icon>
			</view>
		</view>
		<view class="list">
			<view class="listItem">
				<view class="listItem-title">
					今天
				</view>
				<view class="listItem-content">
					<view class="listItem-contentBook">
						<view class="listItem-contentBook-top">
							<view class="listItem-contentBook-topTitle">
								人教版 初中英语 （八年级上）
							</view>
							<view class="listItem-contentBook-topDate">
								2024-03-27 17:08:00
							</view>
						</view>
						<view class="listItem-contentBook-bottom">
							<view class="listItem-contentBook-bottomL">
								Unit1
							</view>
							<view class="listItem-contentBook-bottomC">
								<text>正确（16）</text>/<text class="listItem-contentBook-bottomC-no">错误（0）</text>
							</view>
							<view class="listItem-contentBook-bottomR">
								<div class="progress" style="--progress: 80%; --last: 0%;" data-progress="80%"></div>

								<!-- <view class="listItem-contentBook-bottomR-icon" ></view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<wordTab :type="1"></wordTab>
	</view>
</template>

<script>
	import luanqingProgressbar from '@/pages/word/components/luanqing-progressbar/luanqing-progressbar.vue'
	import wordTab from '@/pages/word/components/word-tabbar/index.vue'
	export default {
		components: {
			wordTab
		},
		data() {
			return {

			}
		},
		onShow() {},
		methods: {

		}
	}
</script>

<style>
	.nav-icon,
	.nav-slot,
	.nav-btn {
		color: black !important;
	}

	.main {
		background: linear-gradient(180deg, #ECF6FF 0%, #F7FCFF 100%);
		min-height: 100vh;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
	}

	.headLeft {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #3D3D3D;
	}

	.headRight {
		color: #8A8A8A;
		font-size: 24rpx;
	}

	.headRight text {
		margin-right: 16rpx;
	}

	.headLeft-icon {
		width: 8rpx;
		height: 30rpx;
		border-radius: 2rpx;
		background: #3A73D9;
		margin-right: 10rpx;
	}

	.u-progress-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.u-progress-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #fb9126;
	}

	.u-progress-info {
		font-size: 28rpx;
		padding-left: 16rpx;
		letter-spacing: 2rpx
	}

	.list {
		padding: 40rpx;
		padding-top: 20rpx;
	}

	.listItem {
		background: #fff;
	}

	.listItem-title {
		color: #8A8A8A;
		font-size: 24rpx;
		padding: 20rpx 40rpx;
	}

	.listItem-content {
		border-top: 2rpx solid #ECF6FF;
		padding: 30rpx;
	}

	.listItem-contentBook {
		background: #EFF6FF;
		border-radius: 10rpx;
		padding: 10rpx 30rpx 20rpx 30rpx;
	}

	.listItem-contentBook-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		margin-bottom: 26rpx;
	}

	.listItem-contentBook-topTitle {
		color: #1863E5;
	}

	.listItem-contentBook-topDate {
		color: #8A8A8A;
	}

	.listItem-contentBook-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.listItem-contentBook-bottomL {
		color: #3D3D3D;
		font-weight: 600;
		font-size: 36rpx;
	}

	.listItem-contentBook-bottomC {
		font-size: 24rpx;
		color: #8A8A8A;
	}

	.listItem-contentBook-bottomC text {
		color: #24A800;
	}

	.listItem-contentBook-bottomC-no {
		color: #DC0C0C;
	}

	.listItem-contentBook-bottomR {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		/* background-color: red; */
		border-radius: 50%;
		border: 4rpx solid;
		border-color: #D8D8D8;
		position: relative;
	}

	.listItem-contentBook-bottomR-icon {
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		/* background-color: red; */
		border-radius: 50%;
		border: 4rpx solid;
		border-color: #1964E5;
		left: -4rpx;
		top: -4rpx;
	}

	/* .progress {
		width: 90px;
		height: 90px;
		background: conic-gradient(#F06D6D var(--progress), #f1f1f1 var(--last));
		border-radius: 50%;
		position: relative;

		&::before {
			content: attr(data-progress);
			position: absolute;
			inset: 10px;
			background-color: #fff;
			width: 70px;
			height: 70px;
			text-align: center;
			line-height: 70px;
			border-radius: 50%;
			font-size: 18px;

		}
	}

	.progress[data-progress^="0"] {
		--start-angle: calc(360deg * (var(--progress) / 100));
	} */
</style>