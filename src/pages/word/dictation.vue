<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30">词汇听写</view>
		</cy-navbar>
		<view class="title">
			<view class="titleText">
				{{word.unitFullName}}
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
			{{answerShow?wordDetails.spellAnswer:'答案提示显示区'}}
		</view>
		<view class="definition" v-if="setData.show">
			{{"['"+wordData.symbolUsa+"]"}}
		</view>
		<view class="word" v-if="setData.show">
			{{wordData.wordCn}}
		</view>
		<view class="inputWord">
			<!-- <uMessageInput @finish="finish" :inactive-color="answer" :value="inputValue"
				:maxlength="wordData.wordEn?wordData.wordEn.length:2" mode="bottomLine" width="30" font-size="30">
			</uMessageInput> -->
			<view class="inputWord-input" v-for="(item,i) in verificationCode" :key="i">
				<input type="text" :maxlength="item.maxlength" :value="item.value" @input="handleInput($event,i)"
					:focus="item.focus" v-if="wordDetails.spellQuestioin.charAt(i)=='_'" />
				<view class="inputWord-input-text" v-else>
					{{wordDetails.spellQuestioin.charAt(i)}}
				</view>
			</view>
			<view class="success" v-if="answer=='#5AC591'">
				<u-icon name='checkbox-mark' :color="answer"></u-icon>
			</view>
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
			<view class="controlItem" @click="handleClickWithDebounce()">
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
	const findUnderscoreIndexes = (str) => {
		const indexes = [];
		for (let i = 0; i < str.length; i++) {
			if (str[i] != '_') {
				indexes.push(i);
			}
		}
		return indexes;
	};
	import MyMixin from "@/utils/MyMixin";
	import uCircleProgressVue from "uview-ui/components/u-circle-progress/u-circle-progress.vue"
	import uMessageInput from "uview-ui/components/u-message-input/u-message-input.vue"
	import {
		reviewNext,
		wordEn,
		reviewFinish
	} from "@/api/word";
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
				word: {},
				wordList: [],
				answerShow: false,
				wordData: {},
				setData: {},
				spaceIndices: [],
				answer: '#606266',
				lessonId: 0,
				wordDetails: {},
				num: 0,
				onOff: true,
				playing: false,
				timeout: '',
				show: false,
				id: 0,
				inputValue: '',
				timer: null, // 用于存储定时器的变量
				verificationCode: [],
			}
		},
		onLoad(e) {
			console.log(e)
			this.word = uni.getStorageSync('wordList')
			this.wordList = this.word.wordLessonDictList
			this.setData = uni.getStorageSync('setData')
			this.lessonId = e.lessonId
			this.id = e.id
		},
		onShow() {
			this.getWordEn(0)
		},
		mounted() {
			// 页面加载时，自动聚焦到第一个输入框
			// this.nextInput(0);
		},
		methods: {
			handleInput(event, index) {
				var that = this
				// 更新当前输入框的值
				const value = event.detail.value;
				this.verificationCode[index].value = value
				// this.$set(this.verificationCode[index], 'value', value);
				// 如果当前输入框的值长度等于其最大长度
				if (value.length === this.verificationCode[index].maxlength) {
					this.verificationCode[index].focus = false
					if (index + 1 != this.verificationCode.length) {
						console.log(findUnderscoreIndexes(this.wordDetails.spellQuestioin))
						if(findUnderscoreIndexes(this.wordDetails.spellQuestioin).length>=1){
							findUnderscoreIndexes(this.wordDetails.spellQuestioin).forEach(function(element, i, array) {
								if (element == index + 1) {
									that.verificationCode[index + 2].focus = true
								} else {
									that.verificationCode[index + 1].focus = true
								}
							})
						}else{
							this.verificationCode[index + 1].focus = true
						}
					} else {
						this.finish()
					}
				}
			},
			debounce(func, wait) {
				let timeout;
				return function() {
					const context = this;
					const args = arguments;
					clearTimeout(timeout);
					timeout = setTimeout(function() {
						func.apply(context, args);
					}, wait);
				};
			},
			handleClickWithDebounce() {
				const debouncedHandleClick = this.debounce(this.next, 1500); // 设置1.5秒的防抖时间
				debouncedHandleClick();
			},
			async next() {
				let stringWithSpacesRestored = '';
				let currentIndex = 0;

				for (let i = 0; i < this.wordData.wordEn.length; i++) {
					stringWithSpacesRestored += this.wordData.wordEn[i];
					while (this.spaceIndices.length > 0 && this.spaceIndices[0] === currentIndex) {
						stringWithSpacesRestored += ' '; // 在原始空格的位置添加空格
						this.spaceIndices.shift(); // 移除已处理的空格位置
					}
					currentIndex++;
				}
				var getData = {
					reviewId: this.id,
					lessonId: this.lessonId,
					wordIndex: this.wordData.wordIndex,
					wordEn: stringWithSpacesRestored,
					userAnswer: stringWithSpacesRestored
				}
				let data = await reviewNext(getData);
				if (data.data.code == 200) {
					this.num = 0
					this.answer = "#606266"
					innerAudioContext.pause()
					this.onOff = false
					clearTimeout(this.timeout);
					this.getWordEn(this.wordData.wordIndex)
					console.log(data.data.result.wordIndex, this.wordList.length)
					if (data.data.result.wordIndex == this.wordList.length - 1) {
						var passData = {
							id: this.id
						}
						let data = await reviewFinish(passData)
						this.toNav('/pages/word/answer?id='+this.id)
					}
				} else {
					console.log('记录失败')
				}
			},
			finish(e) {
				function concatenateNonEmptyValues(array) {
					return array.reduce((accumulator, item) => {
						const value = item.value;
						if (value !== null && value !== undefined && value !== '') {
							// 如果value不是空值，则添加到累积字符串中
							return accumulator + value;
						}
						// 如果value是空值，则直接返回累积字符串
						return accumulator;
					}, ''); // 初始化累积字符串为空字符串
				}

				var answer = concatenateNonEmptyValues(this.verificationCode);
				console.log(this.wordDetails.spellAnswer.toLowerCase(), answer.toLowerCase())
				if (this.wordDetails.spellAnswer.toLowerCase() == answer.toLowerCase()) {
					console.log('成功')
					this.answer = '#5AC591'
					clearTimeout(timeout)
					let timeout = setTimeout(obj => {
						this.next()
					}, 2000)
				} else {
					console.log('失败')
					this.answer = '#EB7171'
					this.show = true
					clearTimeout(timeout)
					let timeout = setTimeout(obj => {
						this.show = false
					}, 2000)
				}
			},
			async getWordEn(index) {
				this.onOff = true
				this.wordData = this.wordList[index]
				var newData = {
					wordEn: this.wordData.wordEn
				}
				let data = await wordEn(newData);
				this.wordDetails = data.data.result
				Array.prototype.fillPlus = function(item) {
						// 深拷贝
						function copy(object) {
							let data = object instanceof Array ? [] : {}
							for (const [key, value] of Object.entries(object)) {
								data[key] = typeof value == 'object' ? copy(value) : value;
							}
							return data
						}
						// 手动填充数据
						const data = []
						for (let index = 0; index < this.length; index++) {
							data[index] = copy(item);
						}
						return data
					},
					this.verificationCode = new Array(data.data.result.spellQuestioin.length).fillPlus({
						value: '',
						maxlength: 1,
						focus: false,
					})
				this.verificationCode[0].focus = true
				console.log(this.verificationCode)
				// 记录空格的位置
				for (let i = 0; i < this.wordData.wordEn.length; i++) {
					// if (this.wordData.wordEn[i] === ' ') {
					this.spaceIndices.push(i);
				}
				this.wordData.wordEn = this.wordData.wordEn.replace(/\s/g, '');
				for (var i = 0; i < this.setData.num; i++) {
					if (this.onOff) {
						await this.autoPlay(this.wordData.audioUsa)
						console.log(this.num, i)
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
			},
			autoPlay(src) {
				if (src) {
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
				}
			},
			async pause() {
				if (this.num == 3) {
					return
				}
				if (this.onOff) {
					innerAudioContext.pause()
					this.onOff = false
					clearTimeout(this.timeout);
					this.playing = false
				} else {
					this.onOff = true
					for (var i = 0; i < this.setData.num + 1 - this.num; i++) {
						if (this.onOff) {
							await this.autoPlay(this.wordData.audioUsa)
							this.num = this.num + 1
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
		},
		beforeDestroy() {
			// 在组件销毁前清除可能存在的定时器
			if (this.timer) {
				clearTimeout(this.timer);
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
		top: 400rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 508rpx;
		height: 382rpx;
		border-radius: 20rpx;
		z-index: 1;
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

	.success {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.inputWord {
		display: flex;
		justify-content: center;
	}

	.inputWord-input {}

	.inputWord-input input {
		border-bottom: 2rpx solid black;
		width: 32rpx;
		margin-right: 14rpx;
		font-size: 34rpx;
		text-align: center;
	}

	.inputWord-input-text {
		white-space: pre-line;
		font-size: 34rpx;
		width: 32rpx;
		margin-right: 14rpx;
		text-align: center;
	}
</style>