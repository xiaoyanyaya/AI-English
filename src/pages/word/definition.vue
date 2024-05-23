<template>
	<view class="main pb-5" :style="{ backgroundImage: 'url(' + imageBaseUrl + '/word/5-22-01.png)' }">
		<cy-navbar :showBack="true" :bgColor="backColor">
		</cy-navbar>
		<view class="head">
			<view class="headTitle">
				{{allData.wordEn}}
				<view class="headTitle-bar"></view>
			</view>
			<view class="headAudio">
				<view class="headAudio-box">
					<text>英</text>
					<text class="headAudio-boxC">['{{allData.symbolUk}}]</text>
					<image :src="imageBaseUrl+'/word/5-21-31.png'" mode=""></image>
				</view>
			</view>
			<view class="headText">
				<view class="headText-item">
					{{allData.wordCn}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="tab">
				<view class="tabItem" @click="tab=0" :class="tab==0?'tabItem-select':''">
					AI单词讲解
					<image v-if="tab==0" :src="imageBaseUrl+'/word/5-21-32.png'" mode=""></image>
				</view>
				<view class="tabItem" @click="tab=1" :class="tab==1?'tabItem-select':''">
					AI记词技巧
					<image v-if="tab==1" :src="imageBaseUrl+'/word/5-21-32.png'" mode=""></image>
				</view>
			</view>
			<view class="contentText" v-if="tab==1">
				<view class="contentText-item" v-if="allData.wordAiSkill">
					<view class="contentText-itemTitle">
						中文谐音
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						{{allData.wordAiSkill}}
					</view>
				</view>
				<view class="contentText-item" v-if="false">
					<view class="contentText-itemTitle">
						词根词缀
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						比较级：superior
					</view>
					<view class="contentText-itemText">
						比较级：superior
					</view>
				</view>
			</view>
			<view class="contentText" v-if="tab==0">
				<view class="contentText-item" v-if="allData.wordFormat">
					<view class="contentText-itemTitle">
						词形词态
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						{{allData.wordFormat}}
					</view>
				</view>
				<view class="contentText-item"  v-if="allData.wordSentence">
					<view class="contentText-itemTitle">
						例句
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						{{allData.wordSentence}}
					</view>
				</view>
				<view class="contentText-item" v-if="allData.wordPhrase">
					<view class="contentText-itemTitle">
						短语词组
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						{{allData.wordPhrase}}
					</view>
				</view>
				<view class="contentText-item" v-if="allData.wordSynonym">
					<view class="contentText-itemTitle">
						同义词
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						{{allData.wordSynonym}}
					</view>
				</view>
				<view class="contentText-item" v-if="allData.wordCognate">
					<view class="contentText-itemTitle">
						同根词
						<view class="contentText-itemTitle-bar"></view>
					</view>
					<view class="contentText-itemText">
						{{allData.wordCognate}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import {
		wordEn
	} from "@/api/word";
	export default {
		mixins: [MyMixin],
		data() {
			return {
				backColor: 'transparent',
				tab: 0,
				data:{
					wordEn:''
				},
				allData:{}
			}
		},
		onLoad(e) {
			this.data.wordEn=e.wordEn
			this.getWordEn()
			console.log(e.wordEn)
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#fff'
			} else {
				this.backColor = 'transparent'
			}
		},
		methods: {
			async getWordEn(){
				let data = await wordEn(this.data);
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
		background-size: 100% 100%;
		min-height: 100vh;
	}

	.head {
		margin: 0 66rpx;
		text-align: center;
		border-bottom: 2rpx dashed #1863E5;
		padding-bottom: 50rpx;
	}

	.headTitle {
		font-size: 75rpx;
		font-weight: 600;
		position: relative;
		display: inline;
	}

	.headTitle-bar {
		background: rgba(220, 12, 12, 0.3);
		height: 11rpx;
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 16rpx;
	}

	.headAudio {
		margin-top: 35rpx;
		display: flex;
		justify-content: center;
	}

	.headAudio image {
		width: 15rpx;
		height: 30rpx;
	}

	.headAudio-box {
		background: #fff;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding: 12rpx 20rpx;
		font-size: 30rpx;
		color: #565656;
	}

	.headAudio-boxC {
		margin: 0 15rpx;
		color: #8A8A8A;
		font-size: 24rpx;
	}

	.headText {
		margin-top: 33rpx;
		color: #3D3D3D;
		font-size: 30rpx;
	}

	.headText-item {
		margin-bottom: 6rpx;
	}

	.content {
		padding: 0 40rpx;
	}

	.tab {
		display: flex;
		margin-top: 50rpx;
		justify-content: space-around;
	}

	.tabItem {
		color: #8A8A8A;
		font-size: 34rpx;
	}

	.tabItem-select {
		color: #1863E5;
		font-weight: 600;
		position: relative;
	}

	.tabItem image {
		position: absolute;
		width: 40rpx;
		height: 6rpx;
		bottom: -15rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.contentText {
		border-radius: 30rpx;
		background: rgba(255, 255, 255, 0.3);
		border: 3rpx solid #ADCBFF;
		padding: 30rpx 50rpx;
		margin-top: 50rpx;
	}
	.contentText-item{
		margin-bottom: 40rpx;
	}

	.contentText-itemTitle {
		display: inline;
		position: relative;
		font-size: 30rpx;
	}

	.contentText-itemTitle-bar {
		height: 9rpx;
		position: absolute;
		width: 100%;
		bottom: 2rpx;
		background: linear-gradient(90deg, #9BBFFF 0%, rgba(255, 255, 255, 0) 135%);
	}

	.contentText-itemText {
		color: #8A8A8A;
		font-size: 30rpx;
	}
</style>