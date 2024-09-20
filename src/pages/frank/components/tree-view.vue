<template>
  <view>
    <view v-for="(node, index) in videoList" :key="node.id" class="box_tree">
      <view class="title">
        <view class="t_left" @click="toggleTileOpen(node, index)">
          <view>
            <image
              v-if="node.isOpen"
              :src="imageBaseUrl + '/frank/8-7-25.png'"
              mode=""
            ></image>
            <image
              v-else
              :src="imageBaseUrl + '/frank/8-7-26.png'"
              mode=""
            ></image>
            <text class="t-color-2A67D2 t-size-3">{{ node.nodeName }}</text>
          </view>
          <view class="topOpen">
            <view
              @click="toggleTopOpen(index)"
              class="button3"
              v-if="node.topIsOpen"
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
      <tree-view
        v-if="node.children.length"
        :videoList="node.children"
      ></tree-view>
      <view v-else>
        <view v-if="node.isOpen">
          <view v-for="item in node.vList" :key="item.id" class="box_video">
            <view @click="goStudy(node, item)" class="video_title">
              <view class="flex align-item-center">
                <image :src="imageBaseUrl + '/frank/8-7-27.png'"></image>
                <view class="font-w-500 t-size-30 w-395">{{
                  item.videoName
                }}</view>
              </view>
              <text
                v-if="item.studyStatusText == '已学'"
                class="t-color-43A71C t-size-26 font-w-5"
                >·{{ item.studyStatusText }}</text
              >
              <text
                v-else-if="item.studyStatusText == '学习中'"
                class="t-color-FFAB2D t-size-26 font-w-5"
                >·{{ item.studyStatusText }}</text
              >
              <text v-else class="t-color-636363 t-size-26 font-w-5"
                >·{{ item.studyStatusText }}</text
              >
            </view>
            <view class="border"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import { getCourseOutline, getNodeVideo } from "@/api/frank";

export default {
  name: "treeView",
  mixins: [MyMixin],
  props: {
    videoList: {
      type: Array,
      require: true,
    },
  },
  methods: {
    async toggleTileOpen(node, index) {
      console.log("inde", index, node);
      //如果是叶子节点 就去请求节点下的视频
      if (node.isLeafNode == 1) {
        const vData = await getNodeVideo({ nodeId: node.id });
        console.log("vData000", vData);
        this.$emit("update-video-list", vData, index);
      }
    },
    goStudy(node, item) {
      this.studyVideoPid = node.id;
      this.toNav(
        `/pages/frank/webview?videoId=${item.vodVideoId}&id=${item.id}&vName=${item.videoFullName}&pTime=${item.publishTime}&cover=${item.videoImageUrl}&playTimes=${item.playTimes}&currTime=${item.currTime}`
      );
    },
    toNav(url) {
      uni.navigateTo({ url });
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .box_video {
    padding: 0 30rpx;
    .video_title {
      display: flex;
      justify-content: space-between;
      padding: 0 5rpx;
      padding-left: 60rpx;
      image {
        width: 33rpx;
        height: 30rpx;
        padding-right: 10rpx;
      }
    }
    .border {
      margin: 22rpx 0;
      width: 605rpx;
      height: 0rpx;
      border-top: 0.5px solid #d8d8d8;
    }
  }
}
</style>