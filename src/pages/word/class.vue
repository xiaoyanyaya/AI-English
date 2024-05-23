<template>
	<view class="main">
		<cy-navbar :showBack="true" :bgColor="backColor">
			<view class="t-size-30" v-if="id==0">教材词汇速记</view>
			<view class="t-size-30" v-if="id==1">考纲词汇速记</view>
		</cy-navbar>
		<view class="content">
			<view class="tab">
				<view class="tabItem" v-for="(item,i) in classList" :key="item.value"
					:class="item.value==getData.bookType?'tabItem-select':''" @click="tabClick(item.value)">
					{{item.title}}
				</view>
			</view>
			<view class="list">
				<view class="listItem" v-for="(item,i) in list" @click="toNav('/pages/word/textbook?id='+id+'&bookId='+item.id,item)">
					<view class="listItem-top">
						<image :src="item.bookImage" mode=""></image>
						<view class="listItem-topText">
							{{item.wordNums}}个单词
						</view>
					</view>
					<view class="listItem-text">
						{{item.bookSecondType_dictText}}
					</view>
					<view class="listItem-textB">
						{{item.bookName}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyMixin from "@/utils/MyMixin";
	import {
		educationType,
		bookList
	} from "@/api/word";
	export default {
		mixins: [MyMixin],
		data() {
			return {
				id: 0,
				backColor: 'transparent',
				classList: [],
				list: [],
				getData: {
					bookType: 0,
					pageNo: 1,
					pageSize: 9,
					bookProperties: 0
				},
				page: 0
			}
		},
		onLoad(e) {
			this.id = e.id
			if (e.id == 0) {
				this.getData.bookProperties = 101
			} else {
				this.getData.bookProperties = 102
			}
			this.getClass()
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.backColor = '#fff'
			} else {
				this.backColor = 'transparent'
			}
		},
		methods: {
			async getClass() {
				let data = await educationType();
				this.classList = data.data.result
				this.getData.bookType = data.data.result[0].value
				this.getBook()
			},
			async getBook() {
				let data = await bookList(this.getData);
				if (this.getData.pageNo == 1) {
					this.list = data.data.result.records
				} else {
					this.list.push(...data.data.result.records)
				}
				this.page = data.data.result.pages
			},
			tabClick(id) {
				this.getData.pageNo = 1
				this.getData.bookType = id
				this.getBook()
			},
			toNav(urls,data) {
				uni.setStorageSync('bookData', data);
				uni.navigateTo({
					url: urls
				})
			}
		},
		onReachBottom() {
			if (this.page > this.getData.pageNo) {
				this.getData.pageNo = this.getData.pageNo++
				console.log(this.getData.pageNo++)
				this.getBook()
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
		background: linear-gradient(180deg, #DFF0FF 0%, #F0F7FD 10%, #FFFFFF 26%);
	}

	.content {
		padding: 40rpx 55rpx;
	}

	.tab {
		display: flex;
		align-items: center;
		overflow-x: scroll;
		white-space: nowrap;
		margin-bottom: 35rpx;
	}

	.tab::-webkit-scrollbar {
		display: none;
	}

	.tabItem {
		margin-right: 96rpx;
		font-size: 26rpx
	}

	.tabItem-select {
		background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
		color: #fff;
		font-weight: 600;
		padding: 20rpx 30rpx;
		border-radius: 50rpx;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.listItem {
		margin-bottom: 60rpx;
		text-align: center;
		width: 200rpx;
	}

	.listItem-top {
		position: relative;
		font-size: 0;
		width: 200rpx;
		height: 290rpx;
		margin-bottom: 20rpx;
	}

	.listItem-top image {
		width: 200rpx;
		height: 290rpx;
	}

	.listItem-topText {
		position: absolute;
		bottom: 0;
		color: rgba(58, 115, 217, 1);
		font-size: 22rpx;
		width: 100%;
		text-align: right;
		padding: 8rpx;
		background: linear-gradient(270deg, #FFFFFF 57%, rgba(255, 255, 255, 0) 124%);
	}

	.listItem-text {
		color: rgba(196, 0, 0, 1);
		font-size: 24rpx;
	}

	.listItem-textB {
		font-size: 26rpx;
		margin-top: 4rpx;
	}
</style>