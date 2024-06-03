<template>
	<view class="main pb-5">
		<view class="head" :style="{ backgroundImage: 'url(' + imageBaseUrl + '/word/word_bg.png)' }" ref="head">
			<cy-navbar :showBack="true" :bgColor="backColor">
			</cy-navbar>
			<view class="headTitle">
				{{allData.wordEn}}
				<view class="headTitle-bar"></view>
			</view>
			<view class="headAudio">
				<view class="headAudio-box" @click="play(allData.audioUsa)">
					<text>英</text>
					<text class="headAudio-boxC">['{{allData.symbolUsa}}]</text>
					<image :src="imageBaseUrl+'/word/5-21-31.png'" mode=""></image>
				</view>
			</view>
			<view class="headText">
				<view class="headText-item">
					{{allData.wordCn}}
				</view>
			</view>
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
		</view>
		<!-- <view class="content">
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
		</view> -->
		<view class="content" :style="{height:'calc(100vh - 160rpx - '+height+'rpx )'}">
			<view class="contentText" v-if="tab==1">
				<view class="contentText-item" v-for="(item,i) in allData.skillItemList" :key="i" v-if="allData.skillItemList">
					<view class="contentText-itemTitle">
						{{item.itemIndex}}{{item.itemName}}
					</view>
					<view class="contentText-itemText">
						{{item.itemText}}
					</view>
				</view>
				<view v-if="allData.skillItemList.length<1" class="contentText-img">
					<image :src="imageBaseUrl+'/nodata.png'" mode="widthFix"></image>
				</view>
			</view>
			<view class="contentText" v-if="tab==0">
				<view class="contentText-item" v-for="(item,i) in allData.explainItemList" v-if="allData.explainItemList">
					<view class="contentText-itemTitle">
						{{item.itemIndex}}{{item.itemName}}
					</view>
					<view class="contentText-itemText">
						{{item.itemText}}
					</view>
				</view>
				<view v-else class="contentText-img">
					<image :src="imageBaseUrl+'/nodata.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="controller" v-if="state==0">
			<view class="controllerItem" @click="previous">
				<image :src="imageBaseUrl + '/word/pre_s.png'" mode=""></image>
				<view class="">
					上一个
				</view>
			</view>
			<view class="controllerItem" @click="next">
				<image :src="imageBaseUrl + '/word/next_s.png'" mode=""></image>
				<view class="">
					下一个
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
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
				data: {
					wordEn: ''
				},
				allData: {},
				wordList: {},
				height: 0,
				lista: [],
				state:0
			}
		},
		onLoad(e) {
			var that = this
			this.data.wordEn = e.wordEn
			if(e.state){
				this.state=e.state
			}
			this.getWordEn()
			this.wordList = uni.getStorageSync('wordList');
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.head').boundingClientRect(rect => {
					that.height = rect.height * 2 // 输出元素的高度
				}).exec();
			});
			console.log(this.list, 'okkkkk')
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = 'transparent'
			} else {
				this.backColor = 'transparent'
			}
		},
		methods: {
			async getWordEn() {
				let data = await wordEn(this.data);
				this.allData = data.data.result
				if (this.allData.wordFormat) {
					var res = {
						name: '词形词态',
						data: 'allData.wordFormat'
					}
					this.lista.push(res)
				}
				if (this.allData.wordSentence) {
					var res = {
						name: '例句',
						data: 'allData.wordSentence'
					}
					this.lista.push(res)
				}
				if (this.allData.wordPhrase) {
					var res = {
						name: '短词语组',
						data: 'allData.wordPhrase'
					}
					this.lista.push(res)
				}
				if (this.allData.wordSynonym) {
					var res = {
						name: '同义词',
						data: 'allData.wordSynonym'
					}
					this.lista.push(res)
				}
				if (this.allData.wordCognate) {
					var res = {
						name: '同根词',
						data: 'allData.wordCognate'
					}
					this.lista.push(res)
				}
			},
			play(src) {
				if (uni.getSystemInfoSync().platform === 'ios') {
					innerAudioContext.src = encodeURI(src);
					// console.log(innerAudioContext.src)
					innerAudioContext.play()
					innerAudioContext.onEnded(() => {
						console.log('音频播放结束');
					});
					// console.log('ios')
					// bgAudioManager.src = src
					// bgAudioManager.play()
					// bgAudioManager.onEnded(()=>{
					// 	bgAudioManager.stop()
					// })
				} else {
					uni.showLoading({
						title: '加载中'
					});
					uni.downloadFile({
						url: src,
						success: (res) => {
							if (res.statusCode === 200) {
								uni.hideLoading();
								innerAudioContext.src = res.tempFilePath;
								innerAudioContext.play()
								innerAudioContext.onEnded(() => {
									console.log('音频播放结束');
								});
							}
						},
						fail: (error) => {
							console.log(error, 'error')
						}
					})
				}
			},
			toNav(urls) {
				uni.navigateTo({
					url: urls
				})
			},
			next() {
				let index = this.wordList.findIndex(obj => obj.wordEn === this.data.wordEn)
				if (index !== -1) {
					// 如果找到了目标对象
					if (index < this.wordList.length - 1) {
						// 如果目标对象不是数组的最后一个元素，那么可以获取下一个对象的id
						let previousObj = this.wordList[index + 1];
						let previousId = previousObj.wordEn;
						this.data.wordEn = previousId
						this.getWordEn()
						console.log('下一个对象的id是:', previousId);
					} else {
						// 如果目标对象是数组的最后一个元素，那么没有下一个对象
						uni.showModal({
							title: '这是最后一个单词~',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									// 执行操作
								} else if (res.cancel) {
									console.log('用户点击取消');
									// 操作取消
								}
							}
						});
						console.log('这是数组的最后一个对象，没有下一个对象');
					}
				} else {
					// 如果没有找到目标对象
					uni.showModal({
						title: '未找到单词~',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								// 执行操作
							} else if (res.cancel) {
								console.log('用户点击取消');
								// 操作取消
							}
						}
					});
					console.log('在数组中未找到id为', this.data.wordEn, '的对象');
				}
			},
			previous() {
				let index = this.wordList.findIndex(obj => obj.wordEn === this.data.wordEn)
				if (index !== -1) {
					// 如果找到了目标对象
					if (index > 0) {
						// 如果目标对象不是数组的第一个元素，那么可以获取上一个对象的id
						let previousObj = this.wordList[index - 1];
						let previousId = previousObj.wordEn;
						this.data.wordEn = previousId
						this.getWordEn()
						console.log('上一个对象的id是:', previousId);
					} else {
						// 如果目标对象是数组的第一个元素，那么没有上一个对象
						uni.showModal({
							title: '这是第一个单词~',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									// 执行操作
								} else if (res.cancel) {
									console.log('用户点击取消');
									// 操作取消
								}
							}
						});
						console.log('这是数组的第一个对象，没有上一个对象');
					}
				} else {
					// 如果没有找到目标对象
					uni.showModal({
						title: '未找到单词~',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								// 执行操作
							} else if (res.cancel) {
								console.log('用户点击取消');
								// 操作取消
							}
						}
					});
					console.log('在数组中未找到id为', this.data.wordEn, '的对象');
				}
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
		text-align: center;
		padding-bottom: 50rpx;
		background-size: 100% 100%;
		/* position: fixed; */
		width: 100%;
		/* top: 0;
		z-index: 1; */
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
		margin: 0rpx 66rpx;
		margin-top: 30rpx;
		color: #3D3D3D;
		font-size: 30rpx;
		border-bottom: 2rpx dashed #1863E5;
		padding-bottom: 40rpx;
	}

	.headText-item {
		margin-bottom: 6rpx;
	}

	.content {
		/* padding-top: 520rpx; */
		padding-bottom: 100rpx;
		overflow-y: scroll;
	}

	.content::-webkit-scrollbar {
		width: 0;
	}

	.tab {
		display: flex;
		margin-top: 50rpx;
		justify-content: space-around;
		padding: 0 50rpx;
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
		background: #fff;
		/* border: 3rpx solid #ADCBFF; */
		padding: 30rpx 50rpx;
		/* margin-top: 50rpx; */
	}

	.contentText-item {
		margin-bottom: 40rpx;
	}

	.contentText-itemTitle {
		display: inline;
		position: relative;
		font-size: 30rpx;
		font-weight: 600;
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
		font-size: 28rpx;
		white-space: pre-line;
		line-height: 42rpx;
		margin-top: 10rpx;
	}

	.controller {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 80rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 36rpx 0;
		border-top: 2rpx solid #BFBFBF;
		background: #fff;
	}

	.controllerItem {
		margin-right: 212rpx;
		text-align: center;
		font-size: 24rpx;
		color: #8A8A8A;
	}

	.controllerItem:nth-child(2) {
		margin-right: 0;
	}

	.controller image {
		width: 28rpx;
		height: 34rpx;
		margin-bottom: 6rpx;
	}
	
	.contentText-img{
		text-align: center;
		margin-top: 50rpx;
	}

	.contentText-img image{
		width: 400rpx;
	}
</style>