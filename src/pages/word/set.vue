<template>
	<view class="main">
		<cy-navbar :showBack="true">
			<view class="t-size-30">学习设置</view>
		</cy-navbar>
		<view class="list px-5 py-3">
			<view class="listItem">
				<view class="listItem-title">
					单词释义
				</view>
				<view class="listItem-list">
					<view class="listItem-listButton" :class="setData.show?'listItem-listButton-select':''"
						@click="setData.show=true">
						显示
					</view>
					<view class="listItem-listButton" :class="!setData.show?'listItem-listButton-select':''"
						@click="setData.show=false">
						不显示
					</view>
				</view>
			</view>
			<view class="listItem">
				<view class="listItem-title">
					朗读次数
				</view>
				<view class="listItem-list">
					<view class="listItem-listButton" :class="setData.num==3?'listItem-listButton-select':''"
						@click="setData.num=3">
						3次
					</view>
					<view class="listItem-listButton" :class="setData.num==2?'listItem-listButton-select':''"
						@click="setData.num=2">
						2次
					</view>
					<view class="listItem-listButton" :class="setData.num==1?'listItem-listButton-select':''"
						@click="setData.num=1">
						1次
					</view>
				</view>
			</view>
			<view class="listItem">
				<view class="listItem-title">
					题目类型
				</view>
				<view class="listItem-list">
					<view class="listItem-listButton listItem-listButton-select">
						单词拼写
					</view>
				</view>
			</view>
			<view class="listItem">
				<view class="listItem-title">
					输入方式
				</view>
				<view class="listItem-list">
					<view class="listItem-listButton listItem-listButton-select">
						键盘
					</view>
				</view>
			</view>
		</view>
		<view class="button">
			<view class="button-l">
				取消
			</view>
			<view class="button-r" @click="toLearning()">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import {
		reviewStart
	} from "@/api/word";
  import {challengeStart} from "../../api/word";
	export default {
		mixins: [MyMixin],
		data() {
			return {
				setData: {
					show: true,
					num: 3
				},
				data:{
					lessonId:0
				},
				title:'',
        pageType: ""
			}
		},
		onLoad(e){
			this.data.lessonId=e.id
			if(e.title){
				this.title=e.title
			}
      if (e.pageType) {
        this.pageType = e.pageType
      }
		},
		methods: {
			async toLearning() {
				uni.setStorageSync('setData', this.setData);
				let data = {};
        if (this.pageType === "chanllenge") {
          data = await challengeStart({
            bookId: this.data.lessonId
          });
        } else {
          data = await reviewStart(this.data);
        }
				var urls='/pages/word/dictation?id='+data.data.result.id+'&lessonId='+data.data.result.lessonId+'&title='+(this.title?this.title:'')+ '&pageType=' + this.pageType
				this.toNav(urls)
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
	.listItem-title {
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}

	.listItem {
		margin-bottom: 40rpx;
	}

	.listItem-list {
		display: flex;
		flex-wrap: wrap;
	}

	.listItem-listButton {
		border-radius: 10rpx;
		width: 178rpx;
		height: 73rpx;
		line-height: 73rpx;
		border: 2rpx solid #AEAEAE;
		text-align: center;
		margin-right: 48rpx;
		margin-bottom: 20rpx;
	}

	.listItem-listButton:nth-child(3n) {
		margin-right: 0;
	}

	.listItem-listButton-select {
		background: #E5F1FF;
		border: 2rpx solid #1863E5;
	}

	.button {
		position: fixed;
		bottom: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.button-l {
		color: rgba(19, 89, 209, 1);
		border: 2rpx solid rgba(19, 89, 209, 1);
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 150rpx;
		margin-right: 50rpx;
	}

	.button-r {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 150rpx;
		color: #fff;
		background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
	}
</style>
