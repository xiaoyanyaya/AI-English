<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30">词汇听写</view>
		</cy-navbar>
		<view class="title">
			<view class="titleText">
				八年级上册Unit2
			</view>
			<view class="titleSet" v-if="false">
				<u-icon name="setting" size="42"></u-icon>
			</view>
		</view>
		<view class="num">
			第{{wordData.wordIndex}}个/共{{wordList.length}}个
		</view>
		<view class="frequency">
			<uCircleProgressVue active-color="#2979ff" :percent="(num/setData.num)*100">
				<view class="u-progress-content">
					<text class='u-progress-info'>{{num}}次</text>
				</view>
			</uCircleProgressVue>
		</view>
		<view class="hit">
			{{answerShow?wordData.wordEn:'答案提示显示区'}}
		</view>
		<view class="definition" v-if="setData.show">
			{{"['"+wordData.symbolUsa+"]"}}
		</view>
		<view class="word" v-if="setData.show">
			{{wordData.wordCn}}
		</view>
		<view class="inputWord">
			<uMessageInput @finish="finish" :inactive-color="answer"
				:maxlength="wordData.wordEn?wordData.wordEn.length:2" mode="bottomLine" width="30" font-size="30">
			</uMessageInput>
		</view>
		<view class="control">
			<view class="controlItem" @click="play(wordData.audioUsa)">
				<image :src="imageBaseUrl + '/word/5-21-26.png'" mode=""></image>
				<view class="controlItem-text">
					重读
				</view>
			</view>
			<view class="controlItemC" @click="pause()">
				<image :src="playing?imageBaseUrl + '/word/5-21-28.png':imageBaseUrl + '/word/5-21-27.png'" mode="">
				</image>
				<view class="controlItem-text">
					{{playing?'暂停':'播放'}}
				</view>
			</view>
			<view class="controlItem" @click="next()">
				<image :src="imageBaseUrl + '/word/play_s.png'" mode=""></image>
				<view class="controlItem-text">
					下一个
				</view>
			</view>
		</view>
		<view class="leftSidebar" @click="answerShow=!answerShow">
			答案提示
		</view>
		<view class="rightSidebar" @click="toNav('/pages/word/definition')">
			词汇讲解
		</view>
		<view v-if="show" class="popup">
			<view class="popup-back" @click="show=false"></view>
			<view class="popup-content">
				<view class="popup-contentImg">
					<image :src="imageBaseUrl+'/word/5-21-37.png'" mode=""></image>
				</view>
				<view class="popup-contentTitle">
					填写错误，请重新输入!
				</view>
				<view class="popup-contentButton" @click="show=false">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.playbackRate = 0.8
	import MyMixin from "@/utils/MyMixin";
	import uCircleProgressVue from "uview-ui/components/u-circle-progress/u-circle-progress.vue"
	import uMessageInput from "uview-ui/components/u-message-input/u-message-input.vue"
	// import {
	// 	wordEn
	// } from "@/api/word";
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
				data: {
					wordEn: ''
				},
				wordList: [],
				answerShow: false,
				wordData: {},
				setData: {},
				spaceIndices: [],
				answer: '#606266',
				lessonId: 0,
				num: 0,
				onOff: true,
				playing: false,
				timeout: '',
				show: false
			}
		},
		onLoad(e) {
			console.log(e)
			this.wordList = uni.getStorageSync('wordList')
			this.setData = uni.getStorageSync('setData')
			this.lessonId = e.lessonId
		},
		onShow() {
			this.getWordEn()
		},
		methods: {
			finish(e) {
				if (this.wordData.wordEn.toLowerCase() == e.toLowerCase()) {
					console.log('成功')
					this.answer = '#5AC591'
				} else {
					this.answer = false
					console.log('失败')
					this.answer = '#EB7171'
					this.show = true
					setTimeout(obj => {
						this.show = false
					}, 2000)
				}
			},
			async getWordEn() {
				this.wordData = this.wordList.find(obj => obj.lessonId == this.lessonId)
				// 记录空格的位置
				for (let i = 0; i < this.wordData.wordEn.length; i++) {
					if (this.wordData.wordEn[i] === ' ') {
						this.spaceIndices.push(i);
					}
				}
				this.wordData.wordEn = this.wordData.wordEn.replace(/\s/g, '');
				for (var i = 0; i < this.setData.num; i++) {
					if (this.onOff) {
						await this.autoPlay(this.wordData.audioUsa)
						this.num = i + 1
						if (this.num == this.setData.num) {
							this.playing = false
						}
					}
				}
			},
			play(src) {
				var that = this
				if (uni.getSystemInfoSync().platform === 'ios') {
					innerAudioContext.src = encodeURI(src);
					innerAudioContext.play()
					innerAudioContext.onEnded(() => {
						console.log('音频播放结束');
						that.playing = false
					});
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
									that.playing = false
								});
							}
						},
						fail: (error) => {
							console.log(error, 'error')
						}
					})
				}
			},
			autoPlay(src) {
				var that = this
				return new Promise(resolve => {
					that.playing = true
					that.timeout = setTimeout(() => {
						if (uni.getSystemInfoSync().platform === 'ios') {
							innerAudioContext.src = encodeURI(src);
							innerAudioContext.play()
							innerAudioContext.onEnded(() => {
								console.log('音频播放结束');
							});
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
						console.log('异步操作完成');
						resolve();
					}, 3000); // 假设每次操作需要1秒
				});
			},
			async pause() {
				if (this.onOff) {
					innerAudioContext.pause()
					this.onOff = false
					clearTimeout(this.timeout);
					this.playing = false
				} else {
					this.onOff = true
					for (var i = 0; i < this.setData.num - this.num; i++) {
						if (this.onOff) {
							await this.autoPlay(this.wordData.audioUsa)
							this.num = i + 1
							if (this.num == this.setData.num) {
								this.playing = false
							}
						}
					}
					// this.playing = true
					// innerAudioContext.play()
					// innerAudioContext.onEnded(() => {
					// 	this.playing = false
					// });
				}
			},
			toNav(urls) {
				uni.navigateTo({
					url: urls
				})
			},
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

	.rightSidebar {
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

	.popup {
		position: fixed;
		background: linear-gradient(180deg, rgba(195, 216, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.popup-back {
		position: fixed;
		background: black;
		opacity: .6;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
	}

	.popup-content {
		text-align: center;
		position: absolute;
		background: #fff;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 508rpx;
		height: 382rpx;
		border-radius: 20rpx;
	}

	.popup-contentImg image {
		width: 83rpx;
		height: 83rpx;
	}

	.popup-contentButton {
		border-radius: 20rpx;
		color: #1863E5;
		border: 2rpx solid #1863E5;
		padding: 20rpx 0;
		text-align: center;
		width: 175rpx;
		left: 0;
		right: 0;
		margin: 40rpx;
		margin: auto;
	}

	.popup-contentTitle {
		margin-bottom: 50rpx;
		margin-top: 25rpx;
	}

	.popup-contentImg {
		margin-top: 60rpx;
	}
</style>