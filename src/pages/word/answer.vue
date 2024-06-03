<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30">{{wordList.lessonFullName?wordList.lessonFullName:bookData.bookFullName}}</view>
		</cy-navbar>
		<view class="head">
			<image v-if="data.reviewResult==0" :src="imageBaseUrl+'/word/5-22-02.png'" mode="widthFix"></image>
			<image v-if="data.reviewResult==1" :src="imageBaseUrl+'/word/5-22-03.png'" mode="widthFix"></image>
		</view>
		<view class="statistics">
			<view class="statisticsItem">
				<view class="statisticsItem-top">
					{{data.reviewScore}}
				</view>
				<view class="statisticsItem-bottom">
					分数
				</view>
			</view>
			<view class="statisticsItem" v-if="false">
				<view class="statisticsItem-top">
					70%
				</view>
				<view class="statisticsItem-bottom">
					击败人数
				</view>
			</view>
			<view class="statisticsItem">
				<view class="statisticsItem-top">
					{{data.costTimes}}s
				</view>
				<view class="statisticsItem-bottom">
					用时
				</view>
			</view>
		</view>
		<view class="tab">
			<view class="tabLeft" @click="tab=0" :class="tab!=0?'tabLeft-select':''">
				答题卡
			</view>
			<view class="tabRight" @click="tab=1" :class="tab==1?'tabRight-select':''">
				词汇表
			</view>
		</view>
		<view class="list" v-if="tab==1">
			<view class="listItem" v-for="(item,i) in data.wordReviewDictList">
				<view class="listItem-l">
					<view class="listItem-lL" :class="item.answerResult==0?'red':''||item.answerResult==1?'greey':''">
						{{i+1}}
					</view>
					<view class="listItem-lR">
						<view class="listItem-lR-t">
							<view class="listItem-lR-tName">
								{{item.wordEn}}
							</view>
							<view class="listItem-lR-tHit">
								{{"['"+item.symbolUsa+"]"}}
							</view>
						</view>
						<view class="listItem-lR-b">
							{{item.wordCn}}
						</view>
					</view>
				</view>
				<view class="listItem-r"
					:class="item.answerResult==0?'redFont':''||item.answerResult==1?'greeyFont':''">
					<text v-if="item.answerResult==0">× 错误</text>
					<text v-else-if="item.answerResult==1">√ 正确</text>
					<text v-else>× 跳过</text>
				</view>
			</view>
		</view>
		<view class="result" v-if="tab==0">
			<view class="resultTitle">
				<view class="resultTitle-item">
					<view class="resultTitle-itemRed"></view>
					<view class="resultTitle-itemText">
						错误
					</view>
				</view>
				<view class="resultTitle-item">
					<view class="resultTitle-itemGreen"></view>
					<view class="resultTitle-itemText">
						正确
					</view>
				</view>
				<view class="resultTitle-item">
					<view class="resultTitle-itemGrey"></view>
					<view class="resultTitle-itemText">
						跳过
					</view>
				</view>
			</view>
			<view class="resultList">
				<view class="resultList-item" v-for="(item,i) in data.wordReviewDictList"
					:class="item.answerResult==0?'red':''||item.answerResult==1?'greey':''">
					{{i+1}}
				</view>
			</view>
		</view>
		<view class="charts-box" v-if="tab==0">
			<qiun type="column" :opts="opts" :chartData="chartData" />
		</view>
		<view class="button">
			<view class="buttonLeft" @click="toNav('/pages/word/wordList?id='+wordType+'&unitId='+(wordList.unitId?wordList.unitId:data.lessonId))">
				<image :src="imageBaseUrl + '/word/5-21-26.png'" mode=""></image>
				重新挑战
			</view>
			<view class="buttonLeft" @click="toNav('/pages/word/index')">
				<u-icon name="home" size="32"></u-icon>
				<text style="margin-left: 10rpx;">回到首页</text>
			</view>
			<view class="buttonRight" @click="toNav('/pages/word/textbook?id='+wordType+'&bookId='+bookData.id)">
				<image :src="imageBaseUrl + '/word/5-21-29.png'" mode=""></image>
				挑战下一关
			</view>
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import qiun from "@/pages/word/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
	import {
		reviewList,
		queryReviewList
	} from "@/api/word.js"
	export default {
		mixins: [MyMixin],
		components: {
			qiun
		},
		data() {
			return {
				backColor: 'transparent',
				tab: 0,
				chartData: {},
				id: 0,
				opts: {
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					color: ["#A1C3FF", "#4FC455", "#F06B6B", "#BFBFBF", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					pixelRatio: 2,
					padding: [15, 15, 0, 5],
					fontSize: 13,
					fontColor: "#666666",
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: "solid",
					touchMoveLimit: 60,
					enableScroll: false,
					enableMarkLine: false,
					legend: {
						show: true,
						position: "bottom",
						float: "center",
						padding: 5,
						margin: 5,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "rgba(0,0,0,0)",
						borderWidth: 0,
						fontSize: 13,
						fontColor: "#666666",
						lineHeight: 11,
						hiddenColor: "#CECECE",
						itemGap: 10
					},
					xAxis: {
						disableGrid: true,
						disabled: false,
						axisLine: true,
						axisLineColor: "#CCCCCC",
						calibration: false,
						fontColor: "#666666",
						fontSize: 13,
						lineHeight: 20,
						marginTop: 0,
						rotateLabel: false,
						rotateAngle: 45,
						itemCount: 5,
						boundaryGap: "center",
						splitNumber: 5,
						gridColor: "#CCCCCC",
						gridType: "solid",
						dashLength: 4,
						gridEval: 1,
						scrollShow: false,
						scrollAlign: "left",
						scrollColor: "#A6A6A6",
						scrollBackgroundColor: "#EFEBEF",
						title: "",
						titleFontSize: 13,
						titleOffsetY: 0,
						titleOffsetX: 0,
						titleFontColor: "#666666",
						format: ""
					},
					yAxis: {
						data: [{
							min: 0
						}],
						disabled: false,
						disableGrid: false,
						splitNumber: 5,
						gridType: "solid",
						dashLength: 8,
						gridColor: "#CCCCCC",
						padding: 10,
						showTitle: false
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							seriesGap: 2,
							categoryGap: 3,
							barBorderCircle: false,
							linearType: "none",
							linearOpacity: 1,
							colorStop: 0,
							meterBorder: 1,
							meterFillColor: "#FFFFFF",
							labelPosition: "outside"
						},
						tooltip: {
							showBox: true,
							showArrow: true,
							showCategory: false,
							borderWidth: 0,
							borderRadius: 0,
							borderColor: "#000000",
							borderOpacity: 0.7,
							bgColor: "#000000",
							bgOpacity: 0.7,
							gridType: "solid",
							dashLength: 4,
							gridColor: "#CCCCCC",
							boxPadding: 3,
							fontSize: 13,
							lineHeight: 20,
							fontColor: "#FFFFFF",
							legendShow: true,
							legendShape: "auto",
							splitLine: true,
							horizentalLine: false,
							xAxisLabel: false,
							yAxisLabel: false,
							labelBgColor: "#FFFFFF",
							labelBgOpacity: 0.7,
							labelFontColor: "#666666"
						},
						markLine: {
							type: "solid",
							dashLength: 4,
							data: []
						}
					}
				},
				data: {},
				bookData: {},
				wordType: '',
				wordList:[]
			}
		},
		onReady() {
			this.getServerData();
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#fff'
			} else {
				this.backColor = 'transparent'
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData()
			this.bookData = uni.getStorageSync('bookData')
			this.wordList = uni.getStorageSync('wordList')
			this.wordType = uni.getStorageSync('wordType')
		},
		methods: {
			async getData() {
				var dataPass = {
					id: this.id
				}
				// var dataPassB = {
				// 	reviewId: this.id
				// }
				let data = await reviewList(dataPass)
				// let dataA = await queryReviewList(dataPassB)
				console.log(data)
				this.data = data.data.result
			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: [""],
						series: [{
							name: "总数",
							data: [this.data.totalWordNum]
						}, {
							name: "正确",
							data: [this.data.correctWordNum]
						}, {
							name: "错误",
							data: [this.data.errorWordNum]
						}, {
							name: "跳过",
							data: [this.data.totalWordNum-this.data.correctWordNum-this.data.errorWordNum]
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
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
		background: linear-gradient(180deg, #DFECFF 0%, #FFFFFF 33%);
		padding-bottom: 80rpx;
	}

	.head image {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.head {
		height: 420rpx;
	}

	.statistics {
		display: flex;
		justify-content: space-around;
		padding: 0 30rpx;
	}

	.statisticsItem-top {
		font-size: 37rpx;
		text-align: center;
	}

	.statisticsItem-bottom {
		color: #595959;
		font-size: 20rpx;
		text-align: center;
	}

	.charts-box {
		width: calc(100% - 130rpx);
		height: 300rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 35rpx;
		margin-bottom: 60rpx;
	}

	.tabLeft {
		width: 276rpx;
		height: 70rpx;
		line-height: 70rpx;
		background: linear-gradient(180deg, #7FAEFF 0%, #1B68EC 100%);
		color: #fff;
		font-size: 32rpx;
		border-radius: 50rpx 0 0 50rpx;
		text-align: center;
	}

	.tabLeft-select {
		border: 2rpx solid #1863E5;
		color: #1863E5;
		background: #fff;
	}

	.tabRight {
		width: 276rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 32rpx;
		border-radius: 0rpx 50rpx 50rpx 0rpx;
		text-align: center;
		border: 2rpx solid #1863E5;
		color: #1863E5;
	}

	.tabRight-select {
		border: 0;
		color: #fff;
		background: linear-gradient(180deg, #7FAEFF 0%, #1B68EC 100%);
	}

	.resultTitle {
		display: flex;
		margin-bottom: 40rpx;
		justify-content: space-around;
		padding: 0 130rpx;
	}

	.resultTitle-itemRed {
		width: 26rpx;
		height: 26rpx;
		background: #F06B6B;
		border-radius: 50%;
	}

	.resultTitle-itemGreen {
		width: 26rpx;
		height: 26rpx;
		background: #4FC455;
		border-radius: 50%;
	}

	.resultTitle-itemGrey {
		width: 26rpx;
		height: 26rpx;
		background: #BFBFBF;
		border-radius: 50%;
	}

	.resultTitle-itemText {
		color: #595959;
		font-size: 20rpx;
		margin-left: 10rpx;
	}

	.resultTitle-item {
		display: flex;
		align-items: center;
	}

	.resultList {
		display: flex;
		flex-wrap: wrap;
		padding: 0 80rpx;
		margin-bottom: 50rpx;
	}

	.resultList-item {
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		line-height: 58rpx;
		text-align: center;
		color: #fff;
		background: #BFBFBF;
		font-size: 30rpx;
		margin: 0 23rpx;
		margin-bottom: 30rpx;
	}

	.red {
		background: #F06B6B !important;
	}

	.greey {
		background: #4FC455 !important;
	}

	.redFont {
		color: #F06B6B !important;
	}

	.greeyFont {
		color: #4FC455 !important;
	}

	.button {
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
	}

	.buttonLeft {
		display: flex;
		align-items: center;
		color: #8A8A8A;
		font-size: 24rpx;
		border: 2rpx solid #8A8A8A;
		width: 200rpx;
		height: 77rpx;
		justify-content: center;
		border-radius: 80rpx;
	}

	.buttonLeft image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.buttonRight {
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 24rpx;
		width: 200rpx;
		height: 77rpx;
		justify-content: center;
		border-radius: 80rpx;
		background: linear-gradient(180deg, #F99F56 0%, #E57B18 100%);
	}

	.buttonRight image {
		width: 34rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}

	.list {
		padding: 0 40rpx;
	}

	.listItem {
		background: #F6FBFF;
		border-radius: 10rpx;
		padding: 18rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.listItem-l {
		display: flex;
		align-items: center;
	}

	.listItem-lL {
		margin-right: 20rpx;
		background: #BFBFBF;
		border-radius: 50%;
		color: #fff;
		font-size: 30rpx;
		width: 52rpx;
		height: 52rpx;
		text-align: center;
		line-height: 52rpx;
	}

	.listItem-lR-t {
		display: flex;
		align-items: center;
		margin-bottom: 4rpx;
	}

	.listItem-lR-tName {
		color: #3D3D3D;
		font-size: 26rpx;
	}

	.listItem-lR-tHit {
		font-size: 22rpx;
		color: #6D6D6D;
		margin-left: 10rpx;
	}

	.listItem-lR-b {
		font-size: 24rpx;
	}

	.listItem-r {
		font-size: 24rpx;
	}
</style>