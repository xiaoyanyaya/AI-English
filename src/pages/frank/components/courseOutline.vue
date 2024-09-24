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
    <view v-else>
      <view v-for="(item, index) in videoList" :key="item.id" class="box_tree">
        <!-- <tree-view
          :node="item"
          @updateVideoList="handeleUpdateVideoList"
        ></tree-view> -->
        <tree-view :node="item" :index="index"></tree-view>
      </view>
    </view>

    <!-- <tree-view
      :videoList="videoList"
      @updateVideoListOne="handleUpdateVideoListOne"
      @updateVideoListTwo="handleUpdateVideoListTwo"
      @updateClickInfo="handeleUpdateClickInfo"
    ></tree-view> -->
  </view>
</template>

<script>
import { getCourseOutline, getNodeVideo } from "@/api/frank";
import MyMixin from "@/utils/MyMixin";
import TreeView from "../cube/tree-view.vue";

export default {
  mixins: [MyMixin],
  components: {
    TreeView,
  },
  data() {
    return {
      backColor: "transparent",
      navbarTitle: "了解Frank英语",
      activeIndex: "1", ///
      introduce: "",
      query: {},
      videoList: [],
      videoPId: null, //获取视频
      studyVideoPid: null, //被点击的视频节点id
      studyVideoIndex: null, //被点击视频的根索引
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
    // this.getInitNodeVideo();
    uni.$on("uniUpdateVideoList", (vData, nodeId) => {
      console.log("监听收到的vdata nodeId", vData, nodeId);
      this.studyVideoPid = nodeId;
      this.addVListToNode(this.videoList, nodeId, vData.data?.result, 1);
      this.videoList = [...this.videoList];
      console.log("监听修改后的videoList", this.videoList);
    });
    uni.$on("uniUpdateTopOpen", (index, flag) => {
      console.log("监听到的index, flag", index, flag);
      this.updataTopIsOpen([this.videoList[index]], flag);
      this.videoList = [...this.videoList];
      console.log("2监听修改后的videoList", this.videoList);
    });
  },
  async onShow() {
    // 刷新刚学习的视频状态
    const vData = await getNodeVideo({ nodeId: this.studyVideoPid });
    this.addVListToNode(
      this.videoList,
      this.studyVideoPid,
      vData.data.result,
      0
    );
    this.videoList = [...this.videoList];
  },
  methods: {
    //递归找到需要添加视频列表的节点
    addVListToNode(tree, targetId, vList, onshow) {
      for (const node of tree) {
        if (node.id === targetId) {
          if (vList) node.vList = vList; //添加视频列表
          if (onshow) node.isOpen = !node.isOpen; //展开收起
          return true;
        }
        if (node.children && node.children.length > 0) {
          const found = this.addVListToNode(
            node.children,
            targetId,
            vList,
            onshow
          );
          if (found) return true;
        }
      }
      return false;
    },
    //刷新videoList的视频列表
    handeleUpdateVideoList(vData, nodeId) {
      console.log("父组件收到的vdata nodeId", vData, nodeId);
      this.addVListToNode(this.videoList, nodeId, vData.data.result);
      console.log("list111111", this.videoList);
    },
    updataTopIsOpen(items, flag) {
      items.forEach(async (item) => {
        item.isOpen = flag; // 设置当前项目的 isOpen 属性为 false
        if (item.isLeafNode && !item.vList) {
          const vData = await getNodeVideo({ nodeId: item.id });
          item.vList = vData.data.result;
        }
        if (item.children && item.children.length > 0) {
          this.updataTopIsOpen(item.children, flag); // 递归调用处理子项目
        }
      });
    },

    //更新isopen + vList
    async handleUpdateVideoListOne(vData, index) {
      // console.log("handleUpdateVideoListOne", vData, index);
      this.$set(this.videoList, index, {
        ...this.videoList[index],
        isOpen: !this.videoList[index].isOpen,
        vList: vData.data.result,
      });
      if (this.videoList[index].isOpen) {
        this.videoList[index].topIsOpen = false;
      } else {
        this.videoList[index].topIsOpen = true;
      }
      this.videoList = [...this.videoList];
      console.log("父组件修改this.videoList", this.videoList);
    },
    //更新isopen
    handleUpdateVideoListTwo(index) {
      // console.log("handleUpdateVideoListTwo", index);
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
      console.log("父组件修改this.videoList", this.videoList);
    },
    toNav(url) {
      uni.navigateTo({ url });
    },
    assignParentIndex(nodes, parentIndex = []) {
      nodes.forEach((node, index) => {
        node.parentIndex = [...parentIndex, index];
        node.isOpen = false;

        if (node.children && node.children.length > 0) {
          this.assignParentIndex(node.children, node.parentIndex);
        }
      });
    },
    async getCourseOutline() {
      const res = await getCourseOutline({ rootNodeCode: this.query.nodeCode });
      this.introduce = res.data.result[0].nodeContent;
      this.videoList = res.data.result[0].children;
      // 格式化
      this.assignParentIndex(this.videoList);
      console.log("格式化数据", this.videoList);
    },
    async getInitNodeVideo() {
      const res = await getNodeVideo({ nodeId: this.videoPId });
      this.videoList[this.query.clickIndex].children[0].children =
        res.data.result;
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
