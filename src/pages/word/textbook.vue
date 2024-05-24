<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30" v-if="id==0">教材词汇速记</view>
			<view class="t-size-30" v-if="id==1">考纲词汇速记</view>
		</cy-navbar>
		<view class="py-2 px-4">
			<view class="head">
				<view class="headL">
					<image :src="bookData.bookImage" mode=""></image>
				</view>
				<view class="headR">
					<view class="headR-title">
						{{bookData.bookSecondType_dictText}}
					</view>
					<view class="headR-name">
						{{bookData.bookName}}
					</view>
					<view class="headR-num">
						共{{bookData.wordNums}}个单词
					</view>
					<view class="headR-line">
						<view class="headR-lineText">
							学习进度35%
						</view>
						<u-line-progress active-color="#2979ff" :percent="70" height="16"
							:show-percent="false"></u-line-progress>
					</view>
				</view>
			</view>
			<view class="addtask" v-if="id==1" @click="show=true">
				<u-icon name="plus" size="30"></u-icon><text>新建任务</text>
			</view>
			<view class="list">
				<view class="listItem" :class="item.lessonReviewStatus==0?'listItemOn':''" v-for="(item,i) in list"
					:key="item.id" @click="toNav('/pages/word/wordList?unitId='+item.id+'&id='+id)">
					<image class="listItem-img"
						:src="imageBaseUrl + (item.lessonReviewStatus==0?'/word/5-21-24.png':'/word/5-21-23.png')"
						mode="widthFix"></image>
					<view class="listItem-name">
						{{item.unitName||item.lessonName}}
					</view>
					<view class="listItem-right">
						<view class="listItem-rightTop" v-if="item.challengeNums">
							挑战人数：<text style="font-weight: 600;">{{item.challengeNums}}</text>
						</view>
						<view class="listItem-rightBottom">
							单词数：{{item.wordNums}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14">
			<view class="popupTitle">
				新建学习任务设置
			</view>
			<view class="popupSelect">
				<view class="popupSelect-title">
					单词数量
				</view>
				<view class="popupSelect-list">
					<view class="popupSelect-listItem" v-for="(item,i) in wordNumData" :key="item.value" @click="selectNum=i"
						:class="selectNum==i?'popupSelect-listItem-select':''">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="popupButton">
				<view class="popupButton-l" @click="show=false">
					取消
				</view>
				<view class="popupButton-r" @click="show=false">
					确认
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import {
		unitList,
		lessonList,
		wordNum
	} from "@/api/word";
	export default {
		mixins: [MyMixin],
		data() {
			return {
				id: 0,
				backColor: 'transparent',
				show: false,
				selectNum: 0,
				data: {
					bookId: 0,
				},
				list: [],
				bookData: {},
				wordNumData:[]
			}
		},
		onLoad(e) {
			this.id = e.id
			this.data.bookId = e.bookId
			this.getUnit()
			this.bookData = uni.getStorageSync('bookData');
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#fff'
			} else {
				this.backColor = 'transparent'
			}
		},
		methods: {
			async getUnit() {
				if (this.id == 0) {
					let data = await unitList(this.data);
					this.list = data.data.result
				} else if (this.id == 1) {
					let data = await lessonList(this.data);
					this.list = data.data.result
					let res = await wordNum();
					this.wordNumData=res.data.result
				}
			},
			toNav(urls) {
				uni.navigateTo({
					url: urls
				})
			}
		}
	}
</script>

<style>
	.main {
		background: linear-gradient(180deg, #DFF0FF 0%, #F0F7FD 10%, #FFFFFF 26%);
	}

	.head {
		display: flex;
		margin-bottom: 50rpx;
		padding: 30rpx;
		padding-bottom: 0;
	}

	.headL image {
		width: 180rpx;
		height: 214rpx;
		margin-right: 30rpx;
	}

	.headR-title {
		color: #F75A6C;
		margin: 10rpx 0;
		font-weight: 600;
	}

	.headR-name {
		font-size: 30rpx;
		margin-bottom: 6rpx;
		font-weight: 600;
	}

	.headR-num {
		font-size: 20rpx;
		color: #8A8A8A;
	}

	.headR-lineText {
		font-size: 20rpx;
		color: #3A73D9;
		margin-top: 22rpx;
	}

	.listItem {
		display: flex;
		background: linear-gradient(138deg, #EDFFE8 33%, #FFFFFF 68%);
		width: 100%;
		padding: 16rpx 30rpx;
		align-items: center;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 2rpx rgba(58, 115, 217, 0.3);
	}

	.listItem-right {
		padding-right: 20rpx;
	}

	.listItem-rightTop {
		font-size: 22rpx;
		color: #DC710E;
	}

	.listItem-rightBottom {
		font-size: 22rpx;
		margin-top: 10rpx;
	}

	.listItem-name {
		font-size: 35rpx;
		flex: 1;
		font-weight: 600;
	}

	.listItem-img {
		width: 42rpx;
		margin-right: 30rpx;
	}

	.listItemOn {
		background: linear-gradient(138deg, #F6F6F6 33%, #FFFFFF 68%);
	}

	.addtask {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
		border-radius: 10rpx;
		height: 70rpx;
		margin-bottom: 40rpx;
	}

	.addtask text {
		margin-left: 10rpx;
	}

	.nav-icon,
	.nav-slot,
	.nav-btn {
		color: black !important;
	}

	.popupTitle {
		text-align: center;
		margin: 50rpx 0;
		font-weight: 600;
	}

	.popupSelect {
		padding: 0 60rpx;
	}

	.popupSelect-title {
		font-size: 26rpx;
	}

	.popupSelect-list {
		display: flex;
		margin-top: 20rpx;
		flex-wrap: wrap;
	}

	.popupSelect-listItem {
		font-size: 26rpx;
		background: #f4f4f4;
		width: 178rpx;
		height: 73rpx;
		margin-right: 48rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		text-align: center;
		line-height: 73rpx;
	}

	.popupSelect-listItem:nth-child(3n) {
		margin-right: 0;
	}

	.popupButton {
		margin-top: 103rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 65rpx;
	}

	.popupButton-l {
		border: 2rpx solid rgba(19, 89, 209, 1);
		width: 200rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(19, 89, 209, 1);
		border-radius: 80rpx;
		margin-right: 50rpx;
	}

	.popupButton-r {
		width: 200rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 80rpx;
		background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
	}

	.popupSelect-listItem-select {
		background: #E5F1FF;
		border: 2rpx solid #1863E5;
	}
</style>