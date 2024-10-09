<template>
  <view class="main">
    <cy-navbar showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">学习报告</view>
    </cy-navbar>

    <scroll-view
      v-if="reportList.length"
      @scrolltolower="onScrolltolower"
      scroll-y
    >
      <view class="list">
        <view
          v-for="item in reportList"
          :key="item.id"
          @click="goWordAnswer(item)"
          class="listItem-contentBook"
        >
          <view class="listItem-contentBook-head">
            <view class="l_date">
              <!-- {{ item.reviewPlanDateName }} -->
            </view>
            <view class="flex align-item-center justify-content-between pl-5">
              <view class="t-size-24 font-weight-bold t-color-1863E5">
                {{ item.bookFullName }}
              </view>
              <view class="t-size-26 font-weight-bold">
                <text class="t-size-24 t-color-3D3D3D">
                  正确({{ item.correctWordNum }})
                </text>
                <text>/</text>
                <text class="t-size-24 t-color-3D3D3D">
                  错误({{ item.errorWordNum }})
                </text>
              </view>
            </view>
            <view
              class="flex align-item-center justify-content-between mt-2 pl-5"
            >
              <view class="font-w-5 t-size-30">
                {{ item.lessonName }}
              </view>
              <view class="t-color-DC0C0C">{{ item.reviewScore }}分</view>
            </view>
            <view class="t-size-24 t-color-3D3D3D ml-5 mt-2">
              答题时间：{{ item.finishTime }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <image
      v-else
      :src="`${imageBaseUrl}/nodata.png`"
      style="width: 400rpx; height: 400rpx"
      class="nodataClass"
    ></image>
  </view>
</template>
  
  <script>
import MyMixin from "@/utils/MyMixin";
import { queryStudyReport, queryStudyReportDetail } from "@/api/word";

export default {
  mixins: [MyMixin],
  data() {
    return {
      reportList: [],
      params: {
        pageNo: 1,
        pageSize: 20,
      },
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
    goWordAnswer(item) {
      this.toNav(`/pages/word/answer?id=${item.id}`);
    },
    async getData() {
      let res = await queryStudyReport(this.params);
      console.log("学习报告res", res);
      this.reportList.push(...(res.data.result.records || []));
      this.params.pages = res.data.result.pages;
    },
    // 上划加载更多
    onScrolltolower() {
      console.log("加载更多！！！！！！！！！！");

      if (this.params.pageNo >= this.params.pages)
        return uni.showToast({ title: "没有更多了哦~", icon: "none" });
      this.params.pageNo++;
      this.getData();
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.main {
  min-height: 100vh;
  background: linear-gradient(180deg, #d1eaff 0%, #f8fdff 14%) !important;
  .nodataClass {
    position: absolute;
    left: 50%;
    height: 50%;
    transform: translateX(-50%);
  }
}

.list {
  height: 85vh;
  padding: 0 40rpx 40rpx;
  .listItem-contentBook {
    margin-top: 35rpx;

    .listItem-contentBook-head {
      background-color: #f1f6ff;
      position: relative;
      background-size: cover;
      padding: 30rpx 40rpx 30rpx 10rpx;
      border-radius: 10rpx;
      height: 200rpx;
      .l_date {
        transform: rotate(-45deg);
        position: absolute;
        top: 20rpx;
        color: #7199d6;
        width: 48rpx;
        font-size: 24rpx;
      }
    }
  }
}

.lessonName-box {
  width: 62%;
}

.listItem-contentBook-tab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 60rpx;
  margin-top: 15rpx;
}

.listItem-contentBook-tabItem {
  color: #8a8a8a;
  font-size: 25rpx;
  padding: 12rpx;
}

.listItem-contentBook-tabItem-select {
  color: #e79315;
  border-bottom: 4rpx solid #e79315;
  padding-bottom: 6rpx;
}

.listItem-contentBook-form {
  margin-top: 8rpx;
}

.listItem-contentBook-formTitle {
  display: flex;
  font-size: 24rpx;
  text-align: center;
  padding: 16rpx;
}

.listItem-contentBook-formList {
  display: flex;
  color: #878787;
  font-size: 23rpx;
  text-align: center;
  padding: 13rpx;
}

.listItem-contentBook-formList:nth-child(even) {
  background: #f9f9f9;
}

.listItem-contentBook-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateX(180deg);
  padding: 15rpx;
}

.imgs {
  display: flex;
  justify-content: center;
}

.imgs image {
  width: 670rpx;
  height: 180rpx;
}

.listItem-contentBook-icon image {
  width: 24rpx;
  height: 24rpx;
}

.listItem-contentBook-icons {
  transform: rotateX(0deg);
}
</style>
  