<template>
	<view class="pb-5 main">
		<cy-navbar>
			<view class="t-size-30">AI单词速记</view>
		</cy-navbar>
		<view class="px-4">
			<view class="head" v-if="false">
				<view class="headItem">
					<view class="headItem-title">
						<image src="../../static/temporary/icon1.png" mode="widthFix"></image>
						已学单词
					</view>
					<view class="headItem-num">
						20/260
					</view>
					<view class="headItem-hit">
						（今天/累计)
					</view>
				</view>
				<view class="headItem">
					<view class="headItem-title">
						<image src="../../static/temporary/icon2.png" mode="widthFix"></image>
						超越挑战者
					</view>
					<view class="headItem-num">
						80%/60%
					</view>
					<view class="headItem-hit">
						（今天/累计)
					</view>
				</view>
			</view>
			<view class="search-box">
				<image src="../../static/temporary/icon3.png" mode=""></image>
				AI查单词
			</view>
			<view class="item-box px-3 py-3">
				<view class="item-box-title">
					<view class="item-box-titleLeft"></view>
					词汇速记
				</view>
				<view class="">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
	
	.item-box{
		background: #fff;
		border-radius: 10rpx;
	}

	.item-box-titleLeft {
		width: 7rpx;
		border-radius: 2rpx;
		background: #3A73D9;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.item-box-title {
		font-size: 30rpx;
		display: flex;
		align-items: center;
	}
</style>