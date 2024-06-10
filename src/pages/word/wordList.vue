<template>
	<view class="main">
		 <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
		</cy-navbar>
		<view class="content">
			<u-sticky offset-top="200">
				<view class="title">
					{{id==0||id==2||id==3?allData.unitFullName:bookData.bookType_dictText+bookData.bookSecondType_dictText+title}}
					<!-- {{title?title:''}} -->
				</view>
			</u-sticky>
			<view class="list">
				<view class="listItem" v-for="(item,i) in allData.wordLessonDictList" :key="item.id" v-if="id==0||id==2||id==3"
					@click="item.audioUsa?play(item.audioUsa,item.id):''">
					<view class="listItem-l">
						<image v-if="gif&&selectId==item.id" class="listItem-lGif"
							:src="imageBaseUrl + '/word/in_play.gif'" mode=""></image>
						<u-icon v-else name="volume-up" size="36" color="rgba(24, 99, 229, 1)"></u-icon>
					</view>
					<view class="listItem-c">
						<view class="listItem-cTitle">
							<view class="listItem-cTitle-word">
								{{item.wordEn}}
							</view>
							<view class="listItem-cTitle-definition">
								{{"['"+item.symbolUsa+"']"}}
							</view>
						</view>
						<view class="listItem-cContent">
							<view class="listItem-cContent-item">
								{{item.wordCn}}
							</view>
						</view>
					</view>
					<view class="listItem-r" @click.stop="toNav('/pages/word/definition?wordEn='+item.wordEn)">
						词汇讲解
					</view>
					<view class="listItem" v-if="id==3">

					</view>
				</view>
				<view class="listItem" v-for="(item,i) in allData" :key="item.id" v-if="id==1"
					@click="item.audioUsa?play(item.audioUsa):''">
					<view class="listItem-l">
						<u-icon name="volume-up" size="36" color="rgba(24, 99, 229, 1)"></u-icon>
					</view>
					<view class="listItem-c">
						<view class="listItem-cTitle">
							<view class="listItem-cTitle-word">
								{{item.wordEn}}
							</view>
							<view class="listItem-cTitle-definition">
								{{"['"+item.symbolUsa+"']"}}
							</view>
						</view>
						<view class="listItem-cContent">
							<view class="listItem-cContent-item">
								{{item.wordCn}}
							</view>
						</view>
					</view>
					<view class="listItem-r" @click="toNav('/pages/word/definition?wordEn='+item.wordEn+'&id=1')">
						词汇讲解
					</view>
				</view>
			</view>
			<view class="button"
				@click="toNav('/pages/word/set?id='+(id==1?dataB.lessonId:allData.id)+'&title='+(title?title:''))">
				立即挑战
			</view>
		</view>
		<!-- <audio :src="audioSrc" autoplay auto></audio> -->
	</view>
</template>

<script>
	// import uSticky from "@/node_modules/uview-ui/components/u-sticky"
	// const bgAudioManager = uni.getBackgroundAudioManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true
	// bgAudioManager.title = '音乐标题';
	// bgAudioManager.epname = '专辑名称';
	// bgAudioManager.singer = '演唱者';
	import MyMixin from "@/utils/MyMixin";
	import {
		wordList,
		dictList,
		lessonWordList,
		queryById
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
				dataB: {
					lessonId: 0,
					pageSize: 99
				},
				dataC:{
					id:0
				},
				allData: {},
				bookData: {},
				audioSrc: '',
				gif: false,
				selectId: 0,
				title: '',

			}
		},
		onLoad(e) {
			if (e.title) {
				this.title = e.title
			}
			if (e.id) {
				this.id = e.id
				uni.setStorageSync('wordType', e.id);
			} else {
				this.id = uni.getStorageSync('wordType');
			}
			if (e.id == 0) {
				this.data.unitId = e.unitId
			} else if (e.id == 1) {
				this.dataB.lessonId = e.unitId
				console.log(e.unitId)
			} else if (e.id == 2) {
				this.data.unitId = e.unitId
			} else if (e.id == 3) {
				this.dataC.id = e.unitId
			}
			this.bookData = uni.getStorageSync('bookData')
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#DEF0FF'
			} else {
				this.backColor = 'transparent'
			}
		},
		onShow() {
			this.getWord()
		},
		methods: {
			async getWord() {
				if (this.id == 0) {
					let data = await wordList(this.data);
					this.allData = data.data.result
					uni.setStorageSync('wordList', data.data.result)
				} else if (this.id == 1) {
					let data = await dictList(this.dataB);
					this.allData = data.data.result.records
					uni.setStorageSync('wordList', data.data.result.records)
				} else if (this.id == 2) {
					let data = await lessonWordList(this.data)
					this.allData = data.data.result
					uni.setStorageSync('wordList', data.data.result)
				}else if(this.id == 3){
					let data = await queryById(this.dataC)
					this.allData = data.data.result
					uni.setStorageSync('wordList', data.data.result)
				}
			},
			play(src, id) {
				var that = this
				this.gif = true
				this.selectId = id
				// innerAudioContext.src = src;
				console.log(uni.getSystemInfoSync().platform)
				if (uni.getSystemInfoSync().platform === 'ios') {
					innerAudioContext.src = encodeURI(src);
					console.log(innerAudioContext.src)
					innerAudioContext.play()
					innerAudioContext.onEnded(() => {
						console.log('音频播放结束');
						that.gif = false
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
									that.gif = false
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

	.title {
	/* 	position: fixed; */
		background: #DEF0FF;
		width: 100%;
		padding-bottom: 30rpx;
		z-index: 1;
		/* top: 120rpx; */
		left: 0;
		/* padding-left: 55rpx; */
		/* padding-top: 30rpx; */
	}

	.content {
		padding: 30rpx 55rpx;
		/* padding-top: 90rpx; */
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
		white-space: pre-line;
		line-height: 36rpx;
	}

	.listItem-r {
		background: #F7A751;
		border-radius: 50rpx;
		color: #fff;
		font-size: 20rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 20rpx;
	}

	.listItem-l {
		position: relative;
		top: 4rpx;
	}

	.button {
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

	.listItem-lGif {
		width: 38rpx;
		height: 26rpx;
		position: relative;
	}
</style>
