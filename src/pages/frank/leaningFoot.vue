<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">学习足迹</view>
    </cy-navbar>

    <!-- <view class="search-box">
      <image :src="imageBaseUrl + '/word/icon3.png'" mode=""></image>
      <input
        type="text"
        placeholder="输入课程或视频名称"
        v-model="serchParams.keyword"
      />
      <view class="search-box-icon" @click="serchParams.keyword = ''">
        <u-icon
          v-if="serchParams.keyword.length > 0"
          name="close-circle"
        ></u-icon>
      </view>
      <view
        @click="getSearchFooList"
        v-if="serchParams.keyword.length > 0"
        class="search-boxIcon"
        >搜索</view
      >
    </view> -->

    <!-- 视屏列表 -->
    <scroll-view @scrolltolower="onScrolltolower" scroll-y>
      <view class="v_list">
        <view v-for="(item, index) in videoList" :key="item.id" class="v_item">
          <view
            @click="
              toNav(
                `/pages/frank/webview?videoId=${item.vodVideoId}&id=${item.id}&vName=${item.videoFullName}&pTime=${item.publishTime}&cover=${item.videoImageUrl}&playTimes=${item.playTimes}&currTime=${item.currTime}`
              )
            "
            class="image"
          >
            <image :src="item.videoImageUrl" mode=""></image>
          </view>
          <view class="r_content">
            <view class="flex mt-2">
              <text>{{ item.videoFullName }}</text>
              <image
                class="ml-1"
                v-if="index == 0 || index == 1"
                :src="imageBaseUrl + '/frank/路径.png'"
              ></image>
            </view>
            <view class="t-color-8A8A8A t-size-20 mt-1 mb-1">{{
              item.videoName
            }}</view>
            <view v-if="item.updateTime" class="t-color-8A8A8A t-size-20">
              播放时间： {{ item.updateTime.slice(0, 10) }}
            </view>
            <view v-else class="t-color-8A8A8A t-size-20">
              播放时间： {{ item.finishTime.slice(0, 10) }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getUserPayList } from "@/api/frank";
// import { getSearchVideoList } from "@/api/frank";
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      pagingParams: {
        pageNo: 1,
        pageSize: 20,
        totalPage: null,
      },
      videoList: [],
      serchParams: {
        keyword: "",
        pageNo: 1,
        pageSize: 30,
      },
    };
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  onLoad(e) {
    this.getUserPayList();
  },
  methods: {
    async getUserPayList() {
      const res = await getUserPayList(this.pagingParams);
      this.videoList.push(...(res.data.result.records || []));
      this.pagingParams.totalPage = res.data.result.pages;
      console.log("this.videoList", this.videoList);
    },
    async getSearchFooList() {
      // const res = await getSearchVideoList(this.serchParams);
      // this.videoList = res.data.result.records;
      // console.log("this.videoList", this.videoList);
    },
    // 上划加载更多
    onScrolltolower() {
      if (this.pagingParams.pageNo >= this.pagingParams.totalPage)
        return uni.showToast({ title: "没有更多了哦~", icon: "none" });
      this.pagingParams.pageNo++;
      this.getUserPayList();
    },
    toNav(url) {
      uni.navigateTo({ url });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;

  .search-boxIcon {
    position: absolute;
    right: 40rpx;
    background: #e9f5ff;
    width: 100rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    border-radius: 40rpx;
    color: #1863e5;
  }
  .search-box-icon {
    position: absolute;
    right: 160rpx;
  }
  .search-box input {
    flex: 1;
    margin-right: 150rpx;
    z-index: 0;
  }
  .search-box {
    margin: 50rpx 40rpx 40rpx;
    height: 70rpx;
    line-height: 70rpx;
    color: #8a8a8a;
    height: 70rpx;
    border-radius: 401rpx;
    box-sizing: border-box;
    padding: 0 50rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    position: relative;
    background-color: #fff;
  }
  .search-box image {
    width: 26rpx;
    height: 26rpx;
    margin-right: 30rpx;
  }

  .v_list {
    height: 85vh;
    margin: 20rpx 20rpx 40rpx;
    .v_item {
      display: flex;
      width: 710rpx;
      border-radius: 10rpx;
      background: #ffffff;
      margin-bottom: 20rpx;
      padding: 25rpx 36rpx 25rpx 20rpx;
      .image {
        width: 317rpx;
        height: 178rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .r_content {
        width: 300rpx;
        position: relative;
        margin-left: 40rpx;
        text {
          width: 275rpx;
        }
        image {
          position: absolute;
          right: 5rpx;
          width: 24rpx;
          height: 33rpx;
        }
      }
    }
  }
}
</style>