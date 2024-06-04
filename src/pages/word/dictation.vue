<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30">词汇听写</view>
		</cy-navbar>
		<view class="title">
			<view class="titleText">
				{{word.unitFullName?word.unitFullName:title}}
			</view>
			<view class="titleSet" v-if="false">
				<u-icon name="setting" size="42"></u-icon>
			</view>
		</view>
		<!-- <view class="num">
			第{{wordData.wordIndex}}个/共{{wordList.length}}个
		</view> -->
		<view class="frequency">
			<view class="frequencyLeft">
				<u-line-progress inactive-color="#FDF5EC" active-color="#FFAB2D" height="40"
					:percent="(wordData.wordIndex/wordList.length)*100">
					<view class="frequencyLeft-text">
						{{wordData.wordIndex}}/{{wordList.length}}
					</view>
				</u-line-progress>
			</view>
			<view class="frequencyRight">
				{{stayTime}}
			</view>
		</view>
		<!-- <view class="hit">
			{{answerShow?wordDetails.spellAnswer:'答案提示显示区'}}
		</view> -->
		<view class="playImg" @click="num==setData.num?play(wordData.audioUsa):''">
			<image :src="imageBaseUrl + (playing?'/word/5-31-01.gif':'/word/speaker.png')" mode=""></image>
		</view>
		<view class="definition" v-if="setData.show">
			{{"['"+wordData.symbolUsa+"]"}}
		</view>
		<view class="word" v-if="setData.show">
			{{wordData.wordCn}}
		</view>
		<view class="inputWord">
			<view class="inputWord-input" v-for="(item,i) in wordDetails.spellQuestioin" :key="i">
				<!-- <input type="text" adjust-position :maxlength="item.maxlength" :value="item.value"
					@input="handleInput($event,i)" :focus="item.focus"
					v-if="wordDetails.spellQuestioin.charAt(i)=='_'" /> -->
				<view class="inputWord-input-text" :class="item!='_'?'inputWord-input-textB' :''">
					<text v-if="item!='_'" :style="{'color': answer}">{{item}}</text>
				</view>
			</view>
			<view class="success" v-if="answer=='#5AC591'">
				<u-icon name='checkbox-mark' :color="answer"></u-icon>
			</view>
			<view class="inputWord-input" @click="deleteWord()" @longpress="longpressDeleteWord">
				<image :src="imageBaseUrl+'/word/5-31-02.png'" mode=""></image>
				<view class="inputWord-inputIcon">
					<u-icon name="close"></u-icon>
				</view>
			</view>
		</view>
		<!-- <view class="control">
			<view class="controlItem" @click="num==setData.num?play(wordData.audioUsa):''">
				<image v-if="num!=setData.num" :src="imageBaseUrl + '/word/5-21-26.png'" mode=""></image>
				<image v-else :src="imageBaseUrl + '/word/5-29-02.png'" mode=""></image>
				<view class="controlItem-text" :class="num==setData.num?'controlItem-textBlue':''">
					重读
				</view>
			</view>
			<view class="controlItemC" @click="num!=setData.num?pause():''">
				<image v-if="num!=setData.num"
					:src="playing?imageBaseUrl + '/word/5-21-28.png':imageBaseUrl + '/word/5-21-27.png'" mode="">
				</image>
				<image v-else :src="imageBaseUrl + '/word/5-29-07.png'" mode="">
				</image>
				<view class="controlItem-text" :class="num!=setData.num?'controlItem-textBlue':''">
					{{playing?'暂停':'播放'}}
				</view>
			</view>
			<view class="controlItem" @click="!debounceShow?handleClickWithDebounce():''">
				<image :src="debounceShow?imageBaseUrl + '/word/play_s.png':imageBaseUrl + '/word/5-29-01.png'" mode="">
				</image>
				<view class="controlItem-text" :class="!debounceShow?'controlItem-textBlue':''">
					下一个
				</view>
			</view>
		</view> -->
		<!-- <view class="leftSidebar" @click="answerShow=!answerShow">
			答案提示
		</view>
		<view class="rightSidebar" @click="toNav('/pages/word/definition')">
			词汇讲解
		</view> -->
		<view class="keys">
			<view class="keysItem" v-for="(item,i) in shuffledStr" @click="selectWord(item,i)"
				:class="selectWordIndex.find(obj=>obj===i)>=0?'keysItem-select':''">
				{{item}}
			</view>
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
		<view class="controller">
			<view class="controllerItem" @click="!debounceShow?handleClickWithDebounce(0):''"
				v-show="wordData.wordIndex!=1">
				<image :src="imageBaseUrl + (!debounceShow?'/word/6-1-01.png':'/word/pre_s.png')" mode=""></image>
				<view class="" :class="!debounceShow?'controlItem-textBlue':''">
					上一个
				</view>
			</view>
			<view class="controllerItem" @click="!debounceShow?handleClickWithDebounce(1):''">
				<image :src="imageBaseUrl + (!debounceShow?'/word/6-1-02.png':'/word/next_s.png')" mode=""></image>
				<view class="" :class="!debounceShow?'controlItem-textBlue':''">
					下一个
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

	import {
		reviewNext,
		wordEn,
		reviewFinish
	} from "@/api/word";
	export default {
		mixins: [MyMixin],
		watch: {
			'wordDetails.spellQuestioin'(newval, oldval) {
				if (!newval.includes('_')) {
					this.finish()
				}
			}
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
				startTime: 0, // 记录开始时间
				stayTime: '0秒', // 展示停留时间
				timer: null, // 计时器
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
				debounceShow: false,
				title: '',
				shuffledStr: [],
				selectWordIndex: [],
				errorNum:1
			}
		},
		onLoad(e) {
			this.word = uni.getStorageSync('wordList')
			if (this.word.wordLessonDictList) {
				this.wordList = this.word.wordLessonDictList
			} else {
				this.wordList = this.word
			}
			this.setData = uni.getStorageSync('setData')
			this.lessonId = e.lessonId
			this.id = e.id
			if (e.title) {
				this.title = e.title
			}
			console.log(this.title)
			// 页面加载时开始计时
			this.startTime = Date.now();
			this.timer = setInterval(this.updateStayTime, 1000); // 每秒更新一次停留时间

		},
		onShow() {
			this.getWordEn(0)
		},
		mounted() {
			// 页面加载时，自动聚焦到第一个输入框
			// this.nextInput(0);
		},
		methods: {
			longpressDeleteWord() {
				this.selectWordIndex = []
				this.wordDetails.spellQuestioin = this.wordDetails.spellQuestioin.replace(/[a-zA-Z]/g, '_')
			},
			replaceLastAlphabetSequenceWithUnderscore(str) {
				// 使用正则表达式的全局标志g来找到所有的字母，然后使用函数作为replace的第二个参数
				// 该函数会在每次匹配时调用，并可以通过$&获取匹配到的内容
				// 使用数组来记录所有匹配到的字母的索引
				let letterIndices = [];
				// 第一次使用matchAll来找到所有字母及其索引
				const matches = str.matchAll(/[a-zA-Z]/g);
				for (const match of matches) {
					letterIndices.push(match.index);
				}
				// 如果没有找到字母，直接返回原字符串
				if (letterIndices.length === 0) {
					return str;
				}
				// 获取最后一个字母的索引
				const lastIndex = letterIndices[letterIndices.length - 1];
				// 使用replace方法和函数参数来替换最后一个字母
				return str.replace(/[a-zA-Z]/g, (match, index) => {
					// 检查当前匹配的索引是否是最后一个字母的索引
					console.log(index === lastIndex)
					return index === lastIndex ? '_' : match;
				});
			},
			deleteWord() {
				this.selectWordIndex.pop()
				this.wordDetails.spellQuestioin = this.replaceLastAlphabetSequenceWithUnderscore(this.wordDetails
					.spellQuestioin);
				console.log(this.wordDetails.spellQuestioin)
			},
			selectWord(item, i) {
				if (!this.selectWordIndex.find(item => item === i)) {
					if (this.selectWordIndex.length < this.wordDetails.spellAnswer.length) {
						this.selectWordIndex.push(i)
					}
					if (this.wordDetails.spellQuestioin.indexOf('_') != -1) {
						this.wordDetails.spellQuestioin = this.replaceCharAt(this.wordDetails.spellQuestioin, this
							.wordDetails
							.spellQuestioin.indexOf('_'), item)
					}
				}
			},
			replaceCharAt(str, index, newChar) {
				// 检查索引是否有效
				if (index < 0 || index >= str.length) {
					return str; // 或者可以抛出错误
				}
				// 转换为字符数组
				let chars = str.split('');
				// 替换指定下标的字符
				chars[index] = newChar;
				// 转换回字符串
				let newStr = chars.join('');
				return newStr;
			},
			shuffleString(str) {
				// 转换为字符数组
				let chars = str.split('');
				// 打乱数组顺序
				chars.sort(() => 0.5 - Math.random());
				return chars;
			},
			updateStayTime() {
				// 更新停留时间
				const currentTime = Date.now();
				const elapsedTime = currentTime - this.startTime;
				const seconds = Math.floor(elapsedTime / 1000);
				this.stayTime = this.formatTime(seconds);
			},
			formatTime(seconds) {
				// 格式化时间
				const minutes = Math.floor(seconds / 60);
				const hours = Math.floor(minutes / 60);
				let displayTime = '';
				if (hours > 0) {
					displayTime += `${hours}小时`;
				}
				if (minutes > 0) {
					displayTime += `${minutes % 60}分`;
				}
				displayTime += `${seconds % 60}秒`;
				return displayTime;
			},
			handleBlur(event, index) {
				var that = this
				if (this.verificationCode[index].value.length == 1) {
					if (index + 1 != this.verificationCode.length) {
						if (findUnderscoreIndexes(this.wordDetails.spellQuestioin).length >= 1) {
							findUnderscoreIndexes(this.wordDetails.spellQuestioin).forEach(function(element, i,
								array) {
								if (element == index + 1) {
									that.verificationCode[index + 2].focus = true
								} else {
									console.log(event)
									console.log(that.verificationCode[index])
									that.verificationCode[index + 1].focus = true
								}
							})
						} else {
							this.verificationCode[index + 1].focus = true
						}
					} else {
						this.finish()
					}
				} else {
					console.log(index)
					if (index != 0) {
						if (findUnderscoreIndexes(this.wordDetails.spellQuestioin).length >= 1) {
							findUnderscoreIndexes(this.wordDetails.spellQuestioin).forEach(function(element, i,
								array) {
								console.log(element, index)
								if (element == index - 1) {
									that.verificationCode[index - 2].focus = true
								} else {
									that.verificationCode[index - 1].focus = true
								}
							})
						} else {
							this.verificationCode[index - 1].focus = true
						}
					}
				}
			},
			handleInput(event, index) {
				var that = this
				// 更新当前输入框的值
				var value = ""
				if (event.detail.value) {
					value = event.detail.value;
				}
				this.verificationCode[index].value = value
				// this.$set(this.verificationCode[index], 'value', value);
				// 如果当前输入框的值长度等于其最大长度
				this.verificationCode[index].focus = false
				if (this.verificationCode[index].value.length == 1) {
					if (index + 1 != this.verificationCode.length) {
						if (findUnderscoreIndexes(this.wordDetails.spellQuestioin).length >= 1) {
							findUnderscoreIndexes(this.wordDetails.spellQuestioin).forEach(function(element, i,
								array) {
								if (element == index + 1) {
									that.verificationCode[index + 2].focus = true
								} else {
									console.log(event)
									console.log(that.verificationCode[index])
									that.verificationCode[index + 1].focus = true
								}
							})
						} else {
							this.verificationCode[index + 1].focus = true
						}
					} else {
						this.finish()
					}
				} else {
					console.log(index)
					if (index != 0) {
						if (findUnderscoreIndexes(this.wordDetails.spellQuestioin).length >= 1) {
							findUnderscoreIndexes(this.wordDetails.spellQuestioin).forEach(function(element, i,
								array) {
								console.log(element, index)
								if (element == index - 1) {
									that.verificationCode[index - 2].focus = true
								} else {
									that.verificationCode[index - 1].focus = true
								}
							})
						} else {
							this.verificationCode[index - 1].focus = true
						}
					}
				}
				console.log(this.verificationCode[index].focus)
			},
			debounce(func, wait, e) {
				let timeout;
				const that = this;
				return function() {
					const context = this;
					const args = arguments;
					clearTimeout(timeout);
					timeout = setTimeout(function() {
						func(e)
						that.debounceShow = false
					}, wait);
				};
			},
			handleClickWithDebounce(e) {
				this.debounceShow = true
				const debouncedHandleClick = this.debounce(this.next, 1500, e); // 设置1.5秒的防抖时间
				debouncedHandleClick();
			},
			async next(e) {
				var getData = {
					reviewId: this.id,
					lessonId: this.lessonId,
					wordIndex: this.wordData.wordIndex,
					wordEn: this.wordData.wordEn,
					userAnswer: this.wordDetails.spellQuestioin
				}
				let data = await reviewNext(getData);
				if (data.data.code == 200) {
					this.num = 0
					this.answer = "#606266"
					innerAudioContext.pause()
					this.onOff = false
					clearTimeout(this.timeout);
					console.log(e)
					if (e == 1) {
						this.getWordEn(this.wordData.wordIndex)
					} else {
						this.getWordEn(this.wordData.wordIndex - 2)
					}
					this.longpressDeleteWord()
					this.errorNum=1
					if (data.data.result.wordIndex == this.wordList.length - 1) {
						var passData = {
							id: this.id
						}
						let data = await reviewFinish(passData)
						this.toNav('/pages/word/answer?id=' + this.id)
					}
				} else {
					console.log('记录失败')
				}
			},
			finish(e) {
				if (this.wordDetails.wordEn.toLowerCase() == this.wordDetails.spellQuestioin.toLowerCase()) {
					console.log('成功')
					this.answer = '#5AC591'
					clearTimeout(timeout)
					let timeout = setTimeout(obj => {
						this.next(1)
					}, 2000)
				} else {
					console.log('失败',this.errorNum)
					this.answer = '#EB7171'
					if(this.errorNum==3){
						this.errorNum=this.errorNum++
						clearTimeout(timeout)
						let timeout = setTimeout(obj => {
							this.next(1)
						}, 2000)
					}else{
						this.errorNum=this.errorNum+1
						this.show = true
						clearTimeout(timeout)
						let timeout = setTimeout(obj => {
							this.show = false
						}, 2000)
					}
				}
			},
			async getWordEn(index) {
				this.onOff = true
				this.wordData = this.wordList[index]
				console.log(this.wordData)
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
				this.shuffledStr = this.shuffleString(this.wordDetails.spellAnswer + this.wordDetails
					.spellAnswerNoise);
				console.log(this.shuffledStr)
				// 记录空格的位置
				// for (let i = 0; i < this.wordData.wordEn.length; i++) {
				// 	// if (this.wordData.wordEn[i] === ' ') {
				// 	this.spaceIndices.push(i);
				// }
				// this.wordData.wordEn = this.wordData.wordEn.replace(/\s/g, '');
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
				that.playing = true
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
		font-size: 30rpx;
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
		padding: 0 70rpx;
		margin-top: 58rpx;
		margin-bottom: 95rpx;
		align-items: center;
	}

	.frequencyLeft {
		flex: 1;
		margin-right: 28rpx;
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
		font-size: 30rpx;
		color: rgba(138, 138, 138, 1);
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
		position: fixed;
		background: #fff;
		top: 0rpx;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 508rpx;
		height: 382rpx;
		border-radius: 20rpx;
		z-index: 99999;
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
		margin-left: 10rpx;
	}

	.inputWord-input {
		display: flex;
		align-items: center;
		position: relative;
	}

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
		margin-right: 12rpx;
		text-align: center;
		border-bottom: 2rpx solid black;
		height: 48rpx;
	}

	.inputWord-input-textB {
		border-bottom: 0rpx solid black;
	}

	.controlItem-textBlue {
		color: rgba(25, 100, 229, 1);
	}

	.u-active {
		/* border-radius: 30rpx; */
	}

	.playImg {
		display: flex;
		justify-content: center;
		margin-bottom: 59rpx;
	}

	.playImg image {
		width: 126rpx;
		height: 94rpx;
	}

	.keys {
		display: flex;
		margin-top: 112rpx;
		padding: 0 40rpx;
		flex-wrap: wrap;
		padding-bottom: 160rpx;
	}

	.keysItem {
		border-radius: 10rpx;
		border: 2rpx solid #517EF1;
		background: #F1F6FF;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		margin-right: 26rpx;
		margin-bottom: 30rpx;
	}

	.keysItem:nth-child(6n) {
		margin-right: 0;
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

	.frequencyLeft-text {
		padding-left: 20rpx;
		color: black;
	}

	.inputWord-input image {
		width: 68rpx;
		height: 38rpx;
		margin-left: 24rpx;
	}

	.inputWord-inputIcon {
		color: #fff;
		position: absolute;
		font-size: 22rpx;
		right: 20rpx;
		margin: auto;
	}

	.keysItem-select {
		border: 2rpx solid #E06D25;
		background: #FAB472;
		color: #fff;
	}
</style>