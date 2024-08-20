<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">视屏列表</view>
    </cy-navbar>

    <view class="search-box">
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
        @click="getSearchVideoList"
        v-if="serchParams.keyword.length > 0"
        class="search-boxIcon"
        >搜索</view
      >
    </view>

    <view class="tabs">
      <view @click="cickFlexbox1" class="flex_box">
        <view class="mr-1">发布时间</view>
        <view v-if="activeTab == 0">
          <image v-if="isOpenOne" :src="imageBaseUrl + '/frank/8-12-01.png'">
          </image>
          <image v-else :src="imageBaseUrl + '/frank/8-12-03.png'"> </image>
        </view>
        <view v-else>
          <image v-if="isOpenOne" :src="imageBaseUrl + '/frank/8-12-02.png'">
          </image>
          <image v-else :src="imageBaseUrl + '/frank/8-12-04.png'"> </image>
        </view>
      </view>
      <view @click="cickFlexbox2" class="flex_box">
        <view class="mr-1">播放次数</view>
        <view v-if="activeTab == 1">
          <image v-if="isOpenTwo" :src="imageBaseUrl + '/frank/8-12-01.png'">
          </image>
          <image v-else :src="imageBaseUrl + '/frank/8-12-03.png'"> </image>
        </view>
        <view v-else>
          <image v-if="isOpenTwo" :src="imageBaseUrl + '/frank/8-12-02.png'">
          </image>
          <image v-else :src="imageBaseUrl + '/frank/8-12-04.png'"> </image>
        </view>
      </view>
      <view @click="cickFlexbox3" class="flex_box">
        <view class="mr-1">收藏人数</view>
        <view v-if="activeTab == 2">
          <image v-if="isOpenThr" :src="imageBaseUrl + '/frank/8-12-01.png'">
          </image>
          <image v-else :src="imageBaseUrl + '/frank/8-12-03.png'"> </image>
        </view>
        <view v-else>
          <image v-if="isOpenThr" :src="imageBaseUrl + '/frank/8-12-02.png'">
          </image>
          <image v-else :src="imageBaseUrl + '/frank/8-12-04.png'"> </image>
        </view>
      </view>
    </view>
    <view class="borders">
      <view class="">
        <view v-if="activeTab == 0" class="a_border"></view>
        <view v-else class="a"></view>
      </view>
      <view class="">
        <view v-if="activeTab == 1" class="a_border"></view>
        <view v-else class="a"></view>
      </view>
      <view class="">
        <view v-if="activeTab == 2" class="a_border"></view>
        <view v-else class="a"></view>
      </view>
    </view>

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
            >发布时间： {{ item.createTime.slice(0, 10) }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import { getSearchVideoList } from "@/api/frank";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      serchParams: {
        keyword: "",
        pageNo: 1,
        pageSize: 10,
        orderFiledName: "publish_time", ////publish_time， play_times，collect_times，目前三选一
        orderType: "asc", ////asc, desc ， 目前二选一
      },
      videoList: [],
      activeTab: 0,
      isOpenOne: true,
      isOpenTwo: false,
      isOpenThr: false,
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
    if (e.value) {
      this.serchParams.keyword = e.value;
      this.getSearchVideoList();
    }
  },
  methods: {
    async getSearchVideoList() {
      const res = await getSearchVideoList(this.serchParams);
      this.videoList = res.data.result.records;
      console.log("this.videoList", this.videoList);
    },
    cickFlexbox1() {
      this.activeTab = 0;
      this.isOpenOne = !this.isOpenOne;
      this.serchParams.orderFiledName = "publish_time";
      this.resetChangeTab(this.isOpenOne);
    },
    cickFlexbox2() {
      this.activeTab = 1;
      this.isOpenTwo = !this.isOpenTwo;
      this.serchParams.orderFiledName = "play_times";
      this.resetChangeTab(this.isOpenTwo);
    },
    cickFlexbox3() {
      this.activeTab = 2;
      this.isOpenThr = !this.isOpenThr;
      this.serchParams.orderFiledName = "collect_times";
      this.resetChangeTab(this.isOpenThr);
    },
    resetChangeTab(isOpen) {
      if (isOpen) {
        this.serchParams.orderType = "asc";
      } else {
        this.serchParams.orderType = "desc";
      }
      this.getSearchVideoList();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;
}

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

.tabs {
  display: flex;
  justify-content: space-between;
  padding: 0 80rpx 25rpx;
  height: 21rpx;
  line-height: 21rpx;
  .flex_box {
    display: flex;
    image {
      width: 25rpx;
      height: 21rpx;
    }
  }
}

.borders {
  display: flex;
  justify-content: space-between;
  padding: 0 125rpx 25rpx 112rpx;
  height: 21rpx;
  line-height: 21rpx;
  .a_border {
    width: 55rpx;
    height: 6rpx;
    margin-top: 10rpx;
    border-radius: 10rpx;
    background: #1863e5;
  }
  .a {
    width: 55rpx;
    height: 6rpx;
  }
}

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
</style>