<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">{{ navbarTitle }}</view>
    </cy-navbar>

    <view class="top_button">
      <view
        @click="activeIndex = 0"
        :class="{ active_bu: activeIndex == 0, text: true }"
      >
        课程介绍
      </view>
      <view @click="activeIndex = 1" :class="{ active_bu: activeIndex == 1 }">
        课程大纲
      </view>
    </view>

    <!-- 课程介绍内容 -->
    <view v-if="activeIndex == 0" class="contaner">
      <view class="flex ml-3">
        <image :src="imageBaseUrl + '/frank/8-7-24.png'" mode=""></image>
        <text class="ml-1 t-size-30 font-w-5 mt-33">课程详情</text>
      </view>
      <view class="text">{{ introduce }}</view>
    </view>

    <!-- 课程大纲内容 -->
    <view
      v-else
      v-for="(item, index) in videoList"
      class="box_tree"
      :key="item.id"
    >
      <view class="title">
        <view class="t_left" @click="toggleTileOpen(index)">
          <view>
            <image
              v-if="item.isOpen"
              :src="imageBaseUrl + '/frank/8-7-25.png'"
              mode=""
            ></image>
            <image
              v-else
              :src="imageBaseUrl + '/frank/8-7-26.png'"
              mode=""
            ></image>
            <text class="t-color-2A67D2 t-size-3">{{ item.nodeName }}</text>
          </view>
          <view class="topOpen">
            <view
              @click="toggleTopOpen(index)"
              class="button3"
              v-if="item.topIsOpen"
            >
              <image :src="imageBaseUrl + '/frank/8-7-29.png'" mode=""></image>
              <text> 展开 </text>
            </view>
            <view @click="toggleTopClose(index)" class="button3" v-else>
              <image :src="imageBaseUrl + '/frank/8-7-28.png'" mode=""></image>
              <text> 收起 </text>
            </view>
          </view>
        </view>
        <view class="t_right"> </view>
      </view>
      <view v-if="item.isOpen">
        <view
          class="box_cont"
          v-for="(item2, index2) in item.children"
          :key="item2.id"
        >
          <view class="cont_title">
            <view class="flex" @click="toggleContOpen(index, index2)">
              <image
                v-if="item2.isOpen"
                :src="imageBaseUrl + '/frank/8-7-25.png'"
                mode=""
              ></image>
              <image
                v-else
                :src="imageBaseUrl + '/frank/8-7-26.png'"
                mode=""
              ></image>
              <view class="font-w-500 t-size-30">{{ item2.nodeName }}</view>
            </view>
          </view>
          <view class="border"></view>
          <view v-if="item2.isOpen">
            <view
              v-for="item3 in item2.children"
              :key="item3.id"
              class="box_video"
            >
              <view @click="goStudy(item2, item3)" class="video_title">
                <view class="flex align-item-center">
                  <image :src="imageBaseUrl + '/frank/8-7-27.png'"></image>
                  <view class="font-w-500 t-size-30 w-320">{{
                    item3.videoName
                  }}</view>
                </view>
                <text
                  v-if="item3.studyStatusText == '已学'"
                  class="t-color-43A71C t-size-26 font-w-5"
                  >·{{ item3.studyStatusText }}</text
                >
                <text
                  v-else-if="item3.studyStatusText == '学习中'"
                  class="t-color-FFAB2D t-size-26 font-w-5"
                  >·{{ item3.studyStatusText }}</text
                >
                <text v-else class="t-color-636363 t-size-26 font-w-5"
                  >·{{ item3.studyStatusText }}</text
                >
              </view>
              <view class="border"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCourseOutline, getNodeVideo } from "@/api/frank";
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      navbarTitle: "了解Frank英语",
      activeIndex: "0",
      introduce: "",
      query: {},
      videoList: [],
      videoPId: null, //获取视频
      studyVideoPid: null, //被点击的视频节点id
    };
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  async onLoad(e) {
    this.query = e;
    this.navbarTitle = e.nodeName;
    await this.getCourseOutline();
    this.getInitNodeVideo();
  },
  onShow() {
    // 刷新刚学习的视频状态
    this.videoList.forEach((item) => {
      if (!item.isOpen) return;
      item.children.forEach(async (item2) => {
        if (item2.id == this.studyVideoPid) {
          const res = await getNodeVideo({ nodeId: item2.id });
          item2.children = res.data.result;
        }
      });
    });
    this.videoList = [...this.videoList];
  },
  methods: {
    toNav(url) {
      uni.navigateTo({ url });
    },
    async getCourseOutline() {
      const res = await getCourseOutline({ rootNodeCode: this.query.nodeCode });
      this.introduce = res.data.result[0].nodeContent;
      this.videoList = res.data.result[0].children;
      this.videoList.forEach((item, index) => {
        if (index == this.query.clickIndex) {
          item.isOpen = true;
          item.children.forEach((item2, index2) => {
            if (index2 == 0) {
              item2.isOpen = true;
            } else {
              item2.isOpen = false;
            }
          });
        } else {
          item.isOpen = false;
          item.topIsOpen = true;
          item.children.forEach((item2) => {
            item2.isOpen = false;
          });
        }
      });
      this.videoPId = this.videoList[this.query.clickIndex].children[0].id;
    },
    async getInitNodeVideo() {
      const res = await getNodeVideo({ nodeId: this.videoPId });
      this.videoList[this.query.clickIndex].children[0].children =
        res.data.result;
    },
    goStudy(item2, item3) {
      this.studyVideoPid = item2.id;
      this.toNav(
        `/pages/frank/webview?videoId=${item3.vodVideoId}&id=${item3.id}&vName=${item3.videoFullName}&pTime=${item3.publishTime}&cover=${item3.videoImageUrl}&playTimes=${item3.playTimes}&currTime=${item3.currTime}`
      );
    },
    toggleTopOpen(index) {
      this.$set(this.videoList[index], "topIsOpen", false);
      this.$set(this.videoList[index], "isOpen", false);
      this.videoList[index].children.forEach(async (item) => {
        if (item.children?.length == 0) {
          const res = await getNodeVideo({ nodeId: item.id });
          item.children = res.data.result;
        }
        item.isOpen = true;
        console.log("item.isopem", item.isOpen);
      });
      this.videoList = [...this.videoList];
    },
    toggleTopClose(index) {
      this.$set(this.videoList[index], "topIsOpen", true);
      this.$set(this.videoList[index], "isOpen", true);
      this.videoList[index].children.forEach(async (item) => {
        item.isOpen = false;
        console.log("item.isopem", item.isOpen);
      });
      this.videoList = [...this.videoList];
    },
    toggleTileOpen(index) {
      // this.videoList[index].isOpen = !this.videoList[index].isOpen;
      // 使用 $set 更新
      this.$set(this.videoList, index, {
        ...this.videoList[index],
        isOpen: !this.videoList[index].isOpen,
      });
      if (this.videoList[index].isOpen) {
        this.videoList[index].topIsOpen = false;
      } else {
        this.videoList[index].topIsOpen = true;
      }
      this.videoList = [...this.videoList];
    },
    async toggleContOpen(index, index2) {
      const target = this.videoList[index].children[index2];
      this.$set(this.videoList[index].children, index2, {
        ...target,
        isOpen: !target.isOpen,
      });
      if (target.children?.length == 0) {
        this.videoPId = target.id;
        const res = await getNodeVideo({ nodeId: this.videoPId });
        this.videoList[index].children[index2].children = res.data.result;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;

  .top_button {
    display: flex;
    justify-content: space-evenly;
    height: 80rpx;
    line-height: 80rpx;
    margin: 20rpx 100rpx 0 100rpx;
    font-size: 26rpx;
    .active_bu {
      color: #1863e5;
      padding-bottom: 10rpx;
      border-bottom: 7rpx solid #1863e5;
      // width: 172rpx;
      // text-align: center;
      // font-size: 32rpx;
      // font-weight: bold;
      // color: #fff;
      // border-radius: 163rpx;
      // background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
    }
    .text {
      margin-right: 21rpx;
    }
  }

  .box_tree {
    margin-left: 40rpx;
    margin-top: 35rpx;
    width: 670rpx;
    border-radius: 10rpx;
    background: #ffffff;
    .title {
      display: flex;
      justify-content: space-between;
      width: 670rpx;
      height: 98rpx;
      line-height: 98rpx;
      margin-bottom: 20rpx;
      border-top-left-radius: 10rpx; /* 左上角圆角，以10rpx为单位 */
      border-top-right-radius: 10rpx; /* 右上角圆角，以10rpx为单位 */
      background: #e7f0ff;
      .t_left {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        image {
          width: 33rpx;
          height: 33rpx;
          margin: 0 20rpx 0 30rpx;
        }
        .topOpen {
          .button3 {
            display: flex;
            align-items: center;
            height: 80rpx;
            line-height: 80rpx;
            image {
              margin-right: 10rpx;
              width: 25rpx;
              height: 21rpx;
            }
            text {
              font-size: 26rpx;
              color: #8a8a8a;
            }
          }
        }
      }
      .t_right {
        margin-right: 60rpx;
        font-size: 24rpx;
        font-weight: 500;
      }
    }
    .box_cont {
      padding: 0 33rpx;
      .cont_title {
        display: flex;
        justify-content: space-between;
        padding: 0 5rpx;
        image {
          width: 33rpx;
          height: 33rpx;
          margin-right: 20rpx;
        }
      }
      .border {
        margin: 22rpx 0;
        width: 605rpx;
        height: 0rpx;
        border-top: 0.5px solid #d8d8d8;
      }
      .box_video {
        .video_title {
          @extend .cont_title;
          padding-left: 60rpx;
          image {
            width: 33rpx;
            height: 30rpx;
          }
        }
      }
    }
  }

  .contaner {
    margin-left: 40rpx;
    margin-top: 35rpx;
    width: 670rpx;
    min-height: 415rpx;
    border-radius: 10rpx;
    background-color: #fff;
    image {
      width: 29rpx;
      height: 29rpx;
      margin-top: 40rpx;
    }
    .text {
      font-size: 26rpx;
      color: #8a8a8a;
      margin: 20rpx 45rpx 39rpx 70rpx;
    }
  }
}
</style>