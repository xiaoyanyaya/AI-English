<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :bgColor="backColor"
      textColor="#3D3D3D"
      :title="navbarTitle"
    >
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
      <view @click="updateTopIsOpen(videoList)" class="ml-18"
        >展开收起
        <image
          v-if="topIsOpen"
          :src="imageBaseUrl + '/frank/8-7-28.png'"
        ></image>
        <image v-else :src="imageBaseUrl + '/frank/8-7-29.png'"></image>
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
        <tree-view
          :node="item"
          :index="index"
          :topIsOpen="item.topIsOpen"
        ></tree-view>
      </view>
    </view>
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
      activeIndex: "1", ////
      introduce: "",
      topIsOpen: false, //顶部展开收起按钮
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
    console.log("eeeeeeeeeeeeeee", e);
    this.query = e;
    this.navbarTitle = e.nodeName;
    await this.getCourseOutline();
    uni.$on("uniUpdateVideoList", (vData, nodeId) => {
      this.addVListToNode(this.videoList, nodeId, vData.data?.result, 1);
      this.videoList = [...this.videoList];
    });
    uni.$on("uniUpdateTopOpen", (index, flag) => {
      this.updateTopIsOpen([this.videoList[index]], flag);
    });
    uni.$on("uniUpdateStudyVideoPid", (studyVideoPid) => {
      this.studyVideoPid = studyVideoPid;
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
    updateTopIsOpen(items) {
      this.topIsOpen = !this.topIsOpen;
      const toggleOpenState = (items) => {
        items.forEach((item) => {
          if (item.isLeafNode == "0") {
            item.isOpen = this.topIsOpen; // 更新非叶子节点的展开状态
          }
          if (item.children && item.children.length > 0) {
            toggleOpenState(item.children); // 递归调用处理子项目
          }
        });
      };
      toggleOpenState(items);
      this.videoList = [...this.videoList];
      console.log("展开收起", this.videoList);
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
      console.log("格式化数据this.videoList", this.videoList);
    },

    // updateTopIsOpen(items, flag) {
    //   items.forEach(async (item) => {
    //     item.isOpen = flag; // 设置当前项目的 isOpen 属性为 false
    //     if (item.isLeafNode && !item.vList) {
    //       const vData = await getNodeVideo({ nodeId: item.id });
    //       item.vList = vData.data.result;
    //     }
    //     if (item.children && item.children.length > 0) {
    //       this.updateTopIsOpen(item.children, flag); // 递归调用处理子项目
    //     }
    //   });
    //   this.videoList = [...this.videoList];
    // },
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
    justify-content: space-between;
    height: 80rpx;
    line-height: 80rpx;
    margin: 20rpx 80rpx 0 80rpx;
    font-size: 26rpx;
    .active_bu {
      color: #1863e5;
      padding-bottom: 10rpx;
      border-bottom: 7rpx solid #1863e5;
    }
    .text {
      margin-right: 21rpx;
    }
    image {
      width: 23rpx;
      height: 23rpx;
      margin-left: 5rpx;
    }
  }

  .box_tree {
    margin-left: 35rpx;
    margin-top: 35rpx;
    width: 680rpx;
    border-radius: 10rpx;
    padding: 0 25rpx 0 10rpx;
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
