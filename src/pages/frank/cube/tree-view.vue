<template>
  <view>
    <!-- <view v-for="(node, index) in videoList" :key="node.id" class="box_tree"> -->
    <view v-if="node.parentIndex.length == 1">
      <view class="top_title" @click="toggleChildren(node)">
        <view class="top_left">
          <image :src="node.imageUrl"></image>
          <view class="text_cont">
            <view class="t-size-28 font-w-5">{{ node.nodeName }}</view>
            <view class="t-size-20 t-color-8A8A8A"
              >共{{ node.videoNum }}个视频</view
            >
            <view
              v-if="node.studyNum == node.videoNum"
              class="t-size-20 t-color-1863E5"
            >
              已完成
            </view>
            <view v-else class="t-size-20 t-color-1863E5">
              {{ node.studyNum }}/{{ node.videoNum }}
            </view>
          </view>
        </view>
        <view class="top_right">
          <u-circle-progress
            v-if="node.videoNum != 0"
            active-color="#2979ff"
            :percent="((node.studyNum / node.videoNum) * 100).toFixed(0)"
            width="100"
            border-width="8"
            style="margin-right: 35rpx"
          >
            <view class="u-progress-content">
              <text class="u-progress-info"
                >{{ ((node.studyNum / node.videoNum) * 100).toFixed(0) }}%</text
              >
            </view>
          </u-circle-progress>
          <u-circle-progress
            v-else
            active-color="#2979ff"
            percent="0"
            width="100"
            border-width="8"
            style="margin-right: 35rpx"
          >
            <view class="u-progress-content">
              <text class="u-progress-info">0%</text>
            </view>
          </u-circle-progress>
          <view class="f_image">
            <image
              v-show="node.isOpen"
              :src="imageBaseUrl + '/frank/8-7-25.png'"
              mode=""
            ></image>
            <image
              v-show="!node.isOpen"
              :src="imageBaseUrl + '/frank/8-7-26.png'"
              mode=""
            ></image>
          </view>
        </view>
      </view>
      <view v-show="node.isOpen" class="border_t"></view>
    </view>

    <view v-else class="box" @click="toggleChildren(node)">
      <view
        class="left"
        :style="{
          paddingLeft:
            node.parentIndex.length == 3
              ? node.parentIndex.length * 15 + 'rpx'
              : '0rpx',
        }"
      >
        <view class="f_image">
          <image
            v-show="node.isOpen"
            :src="imageBaseUrl + '/frank/8-7-25.png'"
            mode=""
          ></image>
          <image
            v-show="!node.isOpen"
            :src="imageBaseUrl + '/frank/8-7-26.png'"
            mode=""
          ></image>
        </view>
        <view class="flex align-item-center">
          <text class="t-color-2A67D2 t-size-28 mr-1"
            >{{ node.nodeName }}
          </text>
          <view v-if="node.videoNum != 0" class="flex align-item-center">
            <u-line-progress
              v-if="((node.studyNum / node.videoNum) * 100).toFixed(2) == 100"
              active-color="#52c41a"
              inactive-color="#c8c8c8"
              :show-percent="false"
              :percent="((node.studyNum / node.videoNum) * 100).toFixed(2)"
              style="width: 90rpx; margin-bottom: 8rpx"
              height="12"
            >
            </u-line-progress>
            <u-line-progress
              v-else
              active-color="#2979ff"
              inactive-color="#c8c8c8"
              :show-percent="false"
              :percent="((node.studyNum / node.videoNum) * 100).toFixed(2)"
              style="width: 90rpx; margin-bottom: 8rpx"
              height="12"
            >
            </u-line-progress>
            <view class="line_right">
              <view
                v-if="((node.studyNum / node.videoNum) * 100).toFixed(0) == 100"
              >
                <view class="circle">
                  <u-icon name="checkmark" color="#fff" size="18"></u-icon>
                </view>
              </view>
              <text v-else
                >{{ ((node.studyNum / node.videoNum) * 100).toFixed(0) }}%</text
              >
            </view>
          </view>
        </view>
      </view>
      <view class="border_t"></view>
      <!-- <view
          v-if="node.parentIndex.length == 1"
          @click.stop="toggleTopIsOpen(index)"
          class="topOpen"
        >
          <view class="button3" v-if="node.isOpen">
            <image :src="imageBaseUrl + '/frank/8-7-29.png'" mode=""></image>
            <text> 展开 </text>
          </view>
          <view class="button3" v-else>
            <image :src="imageBaseUrl + '/frank/8-7-28.png'" mode=""></image>
            <text> 收起 </text>
          </view>
        </view> -->
    </view>

    <!-- 组件递归 -->
    <view v-if="node.isOpen && node.children.length">
      <!-- <cube-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @updateVideoList="emitUpdateVideoList(child)"
      ></cube-node> -->
      <cube-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      ></cube-node>
    </view>

    <!-- 视屏列表 -->
    <view v-if="node.isOpen && !node.children.length">
      <view v-for="item in node.vList" :key="item.id" class="box_video">
        <view @click="goStudy(item, node)" class="video_title">
          <view class="flex align-item-center">
            <image :src="imageBaseUrl + '/frank/8-7-27.png'"></image>
            <view class="vName">{{ item.videoName }}</view>
          </view>
          <text
            v-if="item.studyStatusText == '已学'"
            class="t-color-43A71C t-size-24 font-w-5"
            >·{{ item.studyStatusText }}</text
          >
          <text
            v-else-if="item.studyStatusText == '学习中'"
            class="t-color-FFAB2D t-size-24 font-w-5"
            >·{{ item.studyStatusText }}</text
          >
          <text v-else class="t-color-636363 t-size-24 font-w-5"
            >·{{ item.studyStatusText }}</text
          >
        </view>
        <view class="border"></view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import { getNodeVideo } from "@/api/frank";
import cubeNode from "./tree-view.vue";

export default {
  name: "cubeNode",
  components: {
    cubeNode,
  },
  mixins: [MyMixin],
  props: {
    node: {
      type: Object,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    topIsOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async toggleChildren(node) {
      //设置对应节点的isOpen
      //如果是叶子节点且vList是空 就请求该节点下的视频列表vList
      if (node.isLeafNode == 1 && !node.vList) {
        const vData = await getNodeVideo({ nodeId: node.id });
        // this.$emit("updateVideoList", vData, node.id); //只有根节点才会执行这一步
        // this.emitUpdateVideoList(node);
        uni.$emit("uniUpdateVideoList", vData, node.id);
      } else {
        uni.$emit("uniUpdateVideoList", "0", node.id);
      }
    },
    goStudy(item, node) {
      uni.$emit("uniUpdateStudyVideoPid", node.id);
      // this.toNav(
      //   `/pages/frank/webview?vodVideoId=${item.vodVideoId}&videoId=${item.id}&vName=${item.videoFullName}&pTime=${item.publishTime}&cover=${item.videoImageUrl}&playTimes=${item.playTimes}&currTime=${item.currTime}`
      // );
      //携带点击视频的pId 在h5请求视频列表并播放当前点击视频
      this.toNav(`/pages/frank/webview?videoId=${item.id}&pid=${node.id}`);
    },
    toNav(url) {
      uni.navigateTo({ url });
    },

    // toggleTopIsOpen(index) {
    //   console.log("index", index);
    //   //递归修改根节点及其全部子节点的isopen统一
    //   this.topIsOpen = !this.topIsOpen;
    //   uni.$emit("uniUpdateTopOpen", index, this.topIsOpen);
    // },
    // async emitUpdateVideoList(node) {
    //   console.log("emitUpdateVideoList333", node);
    //   if (node.isLeafNode && !node.children?.length) {
    //     const vData = await getNodeVideo({ nodeId: node.id });
    //     console.log("vData4444", vData);
    //     this.$emit("updateVideoList", vData, node.id);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.border {
  margin: 22rpx 0;
  width: 605rpx;
  height: 0rpx;
  border-top: 0.5px solid #d8d8d8;
}
.border_t {
  margin: 30rpx;
  width: 605rpx;
  height: 0rpx;
  border-top: 0.5px solid #d8d8d8;
}

.top_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx;
  .top_left {
    display: flex;
    image {
      margin-right: 15rpx;
      width: 190rpx;
      height: 116rpx;
    }
    .text_cont {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 200rpx;
    }
  }
  .top_right {
    display: flex;
    align-items: center;
    .f_image {
      display: flex;
      align-items: center;
      width: 33rpx;
      height: 33rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .u-progress-content {
      display: flex;
      align-items: center;
      justify-content: center;
      .u-progress-info {
        font-size: 22rpx;
      }
    }
  }
}
.box {
  .left {
    display: flex;
    align-items: center;
    margin-left: 20rpx;
    .line_right {
      margin-left: 8rpx;
      font-size: 22rpx;
      color: #8a8a8a;
      .circle {
        position: relative;
        width: 25rpx;
        height: 24rpx;
        background-color: #52c41a;
        border-radius: 50%;
        margin-top: 5rpx;
        u-icon {
          z-index: 999;
          position: absolute;
          right: 4rpx;
          top: 6rpx;
        }
      }
    }
  }
  .f_image {
    display: flex;
    align-items: center;
    width: 33rpx;
    height: 100%;
    margin: 0 20rpx 0 0;
    image {
      width: 33rpx;
      height: 33rpx;
    }
  }

  .topOpen {
    margin-right: 20rpx;
    padding-left: 8rpx;
    .button3 {
      display: flex;
      align-items: center;
      width: 90rpx;
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

.box_video {
  padding: 0 30rpx;
  .video_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 60rpx;
    image {
      width: 33rpx;
      height: 30rpx;
      padding-right: 10rpx;
    }
    .vName {
      font-weight: 500;
      font-size: 28rpx;
      width: 400rpx; /* 设置宽度 */
      overflow-wrap: break-word; /* 允许长单词换行 */
      word-wrap: break-word; /* 兼容性 */
      white-space: normal; /* 确保文本正常换行 */
    }
  }
}
</style>