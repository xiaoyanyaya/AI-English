<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">学习足迹</view>
    </cy-navbar>

    <!-- 视屏列表 -->
    <view class="v_list">
      <view v-for="(item, index) in videoList" :key="item.id" class="v_item">
        <view class="image">
          <image :src="imageBaseUrl + '/frank/8-7-21.png'" mode=""></image>
        </view>
        <view class="r_content">
          <view class="flex mt-2">
            口语练习视频
            <image
              v-if="index == 0 || index == 1"
              :src="imageBaseUrl + '/frank/路径.png'"
            ></image>
          </view>
          <view class="t-color-8A8A8A t-size-20 mt-1 mb-1">{{
            item.videoName
          }}</view>
          <view class="t-color-8A8A8A t-size-20"
            >发布时间： {{ item.publishTime.slice(0, 10) }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserPayList } from "@/api/frank";

export default {
  data() {
    return {
      backColor: "transparent",
      footPrintsParams: {
        pageNo: 1,
        pageSize: 10,
      },
      videoList: [],
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
      const res = await getUserPayList(this.footPrintsParams);
      this.videoList = res.data.result.records;
      console.log("this.videoList", this.videoList);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;

  .v_list {
    margin: 20rpx 20rpx 40rpx;
    .v_item {
      display: flex;
      width: 710rpx;
      height: 228rpx;
      border-radius: 10rpx;
      background: #ffffff;
      margin-bottom: 20rpx;
      padding: 25rpx 36rpx 25rpx 20rpx;
      .image {
        width: 317rpx;
        height: 178rpx;
        background-color: pink;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .r_content {
        margin-left: 40rpx;
        image {
          width: 24rpx;
          height: 33rpx;
        }
      }
    }
  }
}
</style>