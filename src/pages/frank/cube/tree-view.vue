<template>
  <view>
    <!-- <view v-for="(node, index) in videoList" :key="node.id" class="box_tree"> -->
    <view class="title">
      <view class="t_left" @click="toggleChildren(node)">
        <view
          class="left"
          :style="{ paddingLeft: node.parentIndex.length * 20 + 'rpx' }"
        >
          <!-- <view> -->
          <view class="f_image">
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
                  v-if="
                    ((node.studyNum / node.videoNum) * 100).toFixed(0) == 100
                  "
                >
                  <view class="circle">
                    <u-icon name="checkmark" color="#fff" size="18"></u-icon>
                  </view>
                </view>
                <text v-else
                  >{{
                    ((node.studyNum / node.videoNum) * 100).toFixed(0)
                  }}%</text
                >
              </view>
            </view>
          </view>
        </view>
        <view
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
        </view>
      </view>
      <view class="t_right"> </view>
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
    <!-- </view> -->
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
    videoList: {
      type: Array,
      require: true,
    },
    topIsOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // isOpen: false, // 控制子节点的展开和收起-通过循环遍历模板生成每个节点也就是每个模板的isOpen 这样只能一层一层的展开收起
      // vData: [], //视频列表
      // nodeId: null, //点击的叶子节点id
    };
  },
  methods: {
    async toggleChildren(node) {
      // this.isOpen = !this.isOpen; // 切换展开状态
      //设置对应节点的isOpen
      //如果是叶子节点且vList是空 就请求该节点下的视频列表vList
      if (node.isLeafNode && !node.vList) {
        console.log("toggleChildren222", node);
        const vData = await getNodeVideo({ nodeId: node.id });
        console.log("vData", vData);
        // this.$emit("updateVideoList", vData, node.id); //只有根节点才会执行这一步
        // this.emitUpdateVideoList(node);
        //uni.$emit("uniUpdateVideoList", 视频列表, 点击节点id, 根节点索引, 展开或收起该根节点及其全部子节点);
        uni.$emit("uniUpdateVideoList", vData, node.id);
      } else {
        uni.$emit("uniUpdateVideoList", "0", node.id);
      }
    },
    toggleTopIsOpen(index) {
      console.log("index", index);
      //递归修改根节点及其全部子节点的isopen统一
      this.topIsOpen = !this.topIsOpen;
      uni.$emit("uniUpdateTopOpen", index, this.topIsOpen);
    },

    async emitUpdateVideoList(node) {
      console.log("emitUpdateVideoList333", node);
      if (node.isLeafNode && !node.children?.length) {
        const vData = await getNodeVideo({ nodeId: node.id });
        console.log("vData4444", vData);
        this.$emit("updateVideoList", vData, node.id);
      }
    },
    goStudy(item, node) {
      uni.$emit("uniUpdateStudyVideoPid", node.id);
      this.toNav(
        `/pages/frank/webview?vodVideoId=${item.vodVideoId}&videoId=${item.id}&vName=${item.videoFullName}&pTime=${item.publishTime}&cover=${item.videoImageUrl}&playTimes=${item.playTimes}&currTime=${item.currTime}`
      );
    },
    toNav(url) {
      uni.navigateTo({ url });
    },

    // //根节点收缩、展开
    // async toggleTitleOpen(node, index) {
    //   console.log("toggleTitleOpen", node, index);
    //   if (node.isLeafNode == 1) {
    //     //如果是叶子节点 就去请求节点下的视频-更新isopen + vList
    //     console.log("叶子节点 请求节点下的视频");
    //     const vData = await getNodeVideo({ nodeId: node.id });
    //     this.$emit("updateVideoListOne", vData, index); //因为子节点没有触发emit
    //   } else {
    //     // 节点数组-更新isopen
    //     this.$emit("updateVideoListTwo", index); //因为子节点没有触发emit
    //   }
    // },
    // //所以子节点收缩、展开
    // async emitVideoListOne(node, index) {
    //   console.log("emitVideoListOne", node, index);
    //   if (node.isLeafNode == 1) {
    //     //如果是叶子节点 就去请求节点下的视频-更新isopen + vList
    //     console.log("叶子节点 请求节点下的视频");
    //     const vData = await getNodeVideo({ nodeId: node.id });
    //     this.$emit("updateVideoListOne", vData, index, node);
    //   } else {
    //     // 节点数组-更新isopen
    //     this.$emit("updateVideoListTwo", index, node);
    //   }
    // },
    // //所以子节点收缩、展开
    // async emitVideoListTwo(node, index) {
    //   console.log("emitVideoListTwo", node, index);
    //   if (node.isLeafNode == 1) {
    //     //如果是叶子节点 就去请求节点下的视频-更新isopen + vData
    //     console.log("叶子节点 请求节点下的视频");
    //     const vData = await getNodeVideo({ nodeId: node.id });
    //     this.$emit("updateVideoListOne", vData, index, node);
    //   } else {
    //     // 节点数组-更新isopen
    //     this.$emit("updateVideoListTwo", index, node);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 670rpx;
  padding: 30rpx 0;
  margin-bottom: 20rpx;
  border-top-left-radius: 10rpx; /* 左上角圆角，以10rpx为单位 */
  border-top-right-radius: 10rpx; /* 右上角圆角，以10rpx为单位 */
  background: #e7f0ff;
  .t_left {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
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
          margin-top: 7rpx;
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
      margin: 0 20rpx;
    }
    image {
      width: 33rpx;
      height: 33rpx;
    }
    .topOpen {
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
  .t_right {
    margin-right: 20rpx;
    font-size: 24rpx;
    font-weight: 500;
  }
}

.box_video {
  padding: 0 30rpx;
  .video_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5rpx;
    padding-left: 80rpx;
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
  .border {
    margin: 22rpx 0;
    width: 605rpx;
    height: 0rpx;
    border-top: 0.5px solid #d8d8d8;
  }
}
</style>