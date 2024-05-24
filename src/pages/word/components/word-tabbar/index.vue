<template>
	<view class="bottomTab">
		<view class="bottomTab-item">
			<image :src="imageBaseUrl + '/word/5-21-17.png'" mode="heightFix"></image>
			<view class="bottomTab-itemText">
				词汇速记
			</view>
		</view>
		<view class="bottomTab-item">
			<image :src="imageBaseUrl + '/word/5-21-20.png'" mode="heightFix"></image>
			<view class="bottomTab-itemText">
				抗遗忘复习
			</view>
		</view>
		<view class="bottomTab-item">
			<image :src="imageBaseUrl + '/word/5-21-22.png'" mode="heightFix"></image>
			<view class="bottomTab-itemText">
				疯狂挑战
			</view>
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	export default {
		mixins: [MyMixin],
	}
</script>

<style>
	.bottomTab{
		display: flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
	}
	.bottomTab-item image {
		height: 40rpx;
	}
	.bottomTab-itemText{
		font-size: 22rpx;
	}
</style>