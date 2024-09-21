<template>
  <view>
    <!-- <view v-for="(node, index) in videoList" :key="node.id" class="box_tree"> -->
    <view class="title">
      <view class="t_left" @click="toggleChildren(node)">
        <view>
          <image
            v-if="isOpen"
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
        <!-- <view class="topOpen">
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
        </view> -->
      </view>
      <view class="t_right"> </view>
    </view>
    <!-- 组件递归 -->
    <view v-if="isOpen && node.children.length">
      <cube-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @updateVideoList="emitUpdateVideoList(child)"
      ></cube-node>
    </view>
    <!-- 视屏列表 -->
    <view v-if="isOpen && !node.children.length">
      <view v-for="item in node.vList" :key="item.id" class="box_video">
        <view @click="goStudy(node, item, index)" class="video_title">
          <view class="flex align-item-center">
            <image :src="imageBaseUrl + '/frank/8-7-27.png'"></image>
            <view class="font-w-500 t-size-30 w-395">{{ item.videoName }}</view>
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
    videoList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isOpen: false, // 控制子节点的展开和收起
      // vData: [], //视频列表
      // nodeId: null, //点击的叶子节点id
    };
  },
  methods: {
    async toggleChildren(node) {
      this.isOpen = !this.isOpen; // 切换展开状态
      //如果是叶子节点且children是空 就请求该节点下的视频列表vList
      console.log("toggleChildren111", node);
      if (node.isLeafNode && !node.children?.length) {
        console.log("toggleChildren222", node);

        // const vData = await getNodeVideo({ nodeId: node.id });
        // console.log("vData", vData);
        // this.$emit("updateVideoList", vData, node.id); //只有根节点才会执行这一步
        this.emitUpdateVideoList(node);
      }
    },
    async emitUpdateVideoList(node) {
      console.log("emitUpdateVideoList333", node);
      if (node.isLeafNode && !node.children?.length) {
        const vData = await getNodeVideo({ nodeId: node.id });
        console.log("vData4444", vData);
        this.$emit("updateVideoList", vData, node.id);
      }
    },
    goStudy(node, item, index) {
      this.$emit("updateClickInfo", node.id, index);
      this.toNav(
        `/pages/frank/webview?videoId=${item.vodVideoId}&id=${item.id}&vName=${item.videoFullName}&pTime=${item.publishTime}&cover=${item.videoImageUrl}&playTimes=${item.playTimes}&currTime=${item.currTime}`
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
</style>