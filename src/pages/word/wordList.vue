<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor"></cy-navbar>
		<view class="content">
			<view class="title">
				{{allData.unitFullName}}
			</view>
			<view class="list">
				<view class="listItem" v-for="(item,i) in allData.wordLessonDictList" :key="item.id">
					<view class="listItem-l">
						<u-icon name="volume-up" size="36" color="rgba(24, 99, 229, 1)"></u-icon>
					</view>
					<view class="listItem-c">
						<view class="listItem-cTitle">
							<view class="listItem-cTitle-word">
								{{item.wordEn}}
							</view>
							<view class="listItem-cTitle-definition">
								['aepl']
							</view>
						</view>
						<view class="listItem-cContent">
							<view class="listItem-cContent-item" v-for="(item,i) in 2">
								[n.] 苹果
							</view>
						</view>
					</view>
					<view class="listItem-r" @click="toNav('/pages/word/definition?wordEn='+item.wordEn)">
						词汇讲解
					</view>
				</view>
			</view>
			<view class="button" @click="toNav('/pages/word/set')">
				立即挑战
			</view>
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import {
		wordList
	} from "@/api/word";
	export default {
		mixins: [MyMixin],
		data() {
			return {
				id: 0,
				backColor: 'transparent',
				data: {
					unitId: 0
				},
				allData:{
					
				}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.data.unitId=e.unitId
			this.getWord()
			
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#fff'
			} else {
				this.backColor = 'transparent'
			}
		},
		methods: {
			async getWord(){
				let data = await wordList(this.data);
				this.allData=data.data.result
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
	.nav-icon,
	.nav-slot,
	.nav-btn {
		color: black !important;
	}

	.main {
		background: linear-gradient(180deg, #DEF0FF 0%, #F7FCFF 100%);
		padding-bottom: 200rpx;
	}

	.content {
		padding: 30rpx 55rpx;
	}

	.list {
		margin-top: 40rpx;
	}

	.listItem {
		background: #fff;
		display: flex;
		padding: 20rpx 40rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}

	.listItem-c {
		margin-left: 25rpx;
		flex: 1;
	}

	.listItem-cTitle {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.listItem-cTitle-word {
		font-weight: 600;
	}

	.listItem-cTitle-definition {
		margin-left: 20rpx;
		color: rgba(109, 109, 109, 1);
		font-size: 22rpx;
	}

	.listItem-cContent-item {
		color: rgba(109, 109, 109, 1);
		font-size: 22rpx;
		margin-bottom: 2rpx;
	}
	.listItem-r{
		background: #F7A751;
		border-radius: 50rpx;
		color: #fff;
		font-size: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding:0 20rpx;
	}
	.listItem-l{
		position: relative;
		top: 4rpx;
	}
	.button{
		position: fixed;
		bottom: 70rpx;
		width: 206rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #5692F9 0%, #1863E5 100%);
		border-radius: 50rpx;
		color: #fff;
		line-height: 80rpx;
		text-align: center;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 26rpx
	}
</style>