<template>
  <view class="main">
    <cy-navbar :showBack="false" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="frank_en">
      <view class="frank_left">
        <image :src="imageBaseUrl + '/frank/8-28-02.png'" mode=""></image>
      </view>
      <view class="frank_right">
        <view class="t-color-1863E5 t-size-30">Frank课程理念</view>
        <view class="t-size-22 f-w-5">
          <view>· 一朝掌握方法</view>
          <view class="mt-1">· 一生远离补习</view>
        </view>
        <view @click="toNav('/pages/frank/frankDetail')" class="frank_buton">
          <text class="mr-1">点击查看详情</text>
          <uni-icons type="arrow-right" size="20" color="#fff"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 介绍 理念 案例 -->
    <view class="introduce_cir">
      <view class="flex flex-direction-column align-item-center">
        <view
          class="circle"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${introduceCirList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=0`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-02.png'" mode=""></image>
        </view>
        <text class="t-size-24 mt-2">{{
          introduceCirList.children[0].nodeName
        }}</text>
      </view>
      <view class="flex flex-direction-column align-item-center">
        <view
          class="circle"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${introduceCirList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=1`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-03.png'" mode=""></image>
        </view>
        <text class="t-size-24 mt-2">{{
          introduceCirList.children[1].nodeName
        }}</text>
      </view>
      <view class="flex flex-direction-column align-item-center">
        <view
          class="circle"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${introduceCirList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=2`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-04.png'" mode=""></image>
        </view>
        <text class="t-size-24 mt-2">{{
          introduceCirList.children[2].nodeName
        }}</text>
      </view>
    </view>
    <!-- 查询 -->
    <view class="search-box">
      <image :src="imageBaseUrl + '/word/icon3.png'" mode=""></image>
      <input
        type="text"
        placeholder="输入课程或视频名称"
        v-model="serchValue"
      />
      <view class="search-box-icon" @click="serchValue = ''">
        <u-icon v-if="serchValue.length > 0" name="close-circle"></u-icon>
      </view>
      <view
        v-if="serchValue.length > 0"
        @click="toNav(`/pages/frank/videoList?value=${serchValue}`)"
        class="search-boxIcon"
        >搜索</view
      >
    </view>
    <!-- 自学 初级 -->
    <view class="middle_box">
      <view class="mb_title">
        <view class="bu"></view>
        <text class="text">{{ courseSystemOneList.nodeName }}</text>
        <!-- <text class="text2">（初级）</text> -->
      </view>
      <view class="click_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemOneList.nodeCode}&nodeName=${courseSystemOneList.nodeName}&clickIndex=0`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-05.png'" mode=""></image>
          <text class="text1">{{
            courseSystemOneList.children[0].nodeName
          }}</text>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemOneList.nodeCode}&nodeName=${courseSystemOneList.nodeName}&clickIndex=1`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-06.png'" mode=""></image>
          <text class="text2">{{
            courseSystemOneList.children[1].nodeName
          }}</text>
        </view>
      </view>
      <view class="click_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemOneList.nodeCode}&nodeName=${courseSystemOneList.nodeName}&clickIndex=2`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-07.png'" mode=""></image>
          <text class="text3">{{
            courseSystemOneList.children[2].nodeName
          }}</text>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemOneList.nodeCode}&nodeName=${courseSystemOneList.nodeName}&clickIndex=3`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-08.png'" mode=""></image>
          <text class="text4">{{
            courseSystemOneList.children[3].nodeName
          }}</text>
        </view>
      </view>
    </view>
    <!-- 自学 中级 -->
    <view class="middle_box">
      <view class="mb_title">
        <view class="bu"></view>
        <text class="text">{{ courseSystemTwoList.nodeName }}</text>
        <!-- <text class="text2">（初级）</text> -->
      </view>
      <view class="click_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemTwoList.nodeCode}&nodeName=${courseSystemTwoList.nodeName}&clickIndex=0`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-05.png'" mode=""></image>
          <text class="text1">{{
            courseSystemTwoList.children[0].nodeName
          }}</text>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemTwoList.nodeCode}&nodeName=${courseSystemTwoList.nodeName}&clickIndex=1`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-06.png'" mode=""></image>
          <text class="text2">{{
            courseSystemTwoList.children[1].nodeName
          }}</text>
        </view>
      </view>
      <view class="click_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemTwoList.nodeCode}&nodeName=${courseSystemTwoList.nodeName}&clickIndex=2`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-07.png'" mode=""></image>
          <text class="text3">{{
            courseSystemTwoList.children[2].nodeName
          }}</text>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemTwoList.nodeCode}&nodeName=${courseSystemTwoList.nodeName}&clickIndex=3`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-08.png'" mode=""></image>
          <text class="text4">{{
            courseSystemTwoList.children[3].nodeName
          }}</text>
        </view>
      </view>
    </view>
    <!-- 自学 高级 -->
    <view class="middle_box">
      <view class="mb_title">
        <view class="bu"></view>
        <text class="text">{{ courseSystemThrList.nodeName }}</text>
        <!-- <text class="text2">（初级）</text> -->
      </view>
      <view class="click_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemThrList.nodeCode}&nodeName=${courseSystemThrList.nodeName}&clickIndex=0`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-05.png'" mode=""></image>
          <text class="text1">{{
            courseSystemThrList.children[0].nodeName
          }}</text>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemThrList.nodeCode}&nodeName=${courseSystemThrList.nodeName}&clickIndex=1`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-06.png'" mode=""></image>
          <text class="text2">{{
            courseSystemThrList.children[1].nodeName
          }}</text>
        </view>
      </view>
      <view class="click_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemThrList.nodeCode}&nodeName=${courseSystemThrList.nodeName}&clickIndex=2`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-07.png'" mode=""></image>
          <text class="text3">{{
            courseSystemThrList.children[2].nodeName
          }}</text>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${courseSystemThrList.nodeCode}&nodeName=${courseSystemThrList.nodeName}&clickIndex=3`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-08.png'" mode=""></image>
          <text class="text4">{{
            courseSystemThrList.children[3].nodeName
          }}</text>
        </view>
      </view>
    </view>
    <!-- 秘籍课程 -->
    <!-- <view class="bag_box">
      <view class="mb_title">
        <view class="bu"></view>
        <text class="text">{{ secretCourseBagList.nodeName }}</text>
      </view>
      <view class="s_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${secretCourseBagList.nodeCode}&nodeName=${secretCourseBagList.nodeName}&clickIndex=0`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-09.png'" mode=""></image>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${secretCourseBagList.nodeCode}&nodeName=${secretCourseBagList.nodeName}&clickIndex=1`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-10.png'" mode=""></image>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${secretCourseBagList.nodeCode}&nodeName=${secretCourseBagList.nodeName}&clickIndex=2`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-11.png'" mode=""></image>
        </view>
      </view>
      <view class="s_box">
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${secretCourseBagList.nodeCode}&nodeName=${secretCourseBagList.nodeName}&clickIndex=3`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-12.png'" mode=""></image>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${secretCourseBagList.nodeCode}&nodeName=${secretCourseBagList.nodeName}&clickIndex=4`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-13.png'" mode=""></image>
        </view>
        <view
          class="box"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${secretCourseBagList.nodeCode}&nodeName=${secretCourseBagList.nodeName}&clickIndex=5`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-14.png'" mode=""></image>
        </view>
      </view>
    </view> -->
    <!-- 学段提分 -->
    <!-- <view class="bag_box">
      <view class="mb_title">
        <view class="bu"></view>
        <text class="text">{{ leaningIncreaseList.nodeName }}</text>
      </view>
      <view class="line_box">
        <view
          class="box1"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=0`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-15.png'" mode=""></image>
          <text class="text1">小学系列</text>
        </view>
        <view
          class="box2"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=1`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-16.png'" mode=""></image>
          <text class="text2">初中系列</text>
        </view>
        <view
          class="box3"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=2`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-17.png'" mode=""></image>
          <text class="text3">高中系列</text>
        </view>
      </view>
      <view class="line_box">
        <view
          class="box4"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=3`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-18.png'" mode=""></image>
          <text class="text4">香港高考DSE</text>
        </view>
        <view
          class="box5"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=4`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-19.png'" mode=""></image>
          <text class="text5">美国高考SAT</text>
        </view>
        <view
          class="box6"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=5`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-7-20.png'" mode=""></image>
          <text class="text6">托福训练</text>
        </view>
      </view>
      <view class="line_box">
        <view
          class="box7"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=6`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-8-01.png'" mode=""></image>
          <text class="text7">雅思训练</text>
        </view>
        <view
          class="box8"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${leaningIncreaseList.nodeCode}&nodeName=${introduceCirList.nodeName}&clickIndex=7`
            )
          "
        >
          <image :src="imageBaseUrl + '/frank/8-8-02.png'" mode=""></image>
          <text class="text8">艺考生训练</text>
        </view>
        <view class="box9"> </view>
      </view>
    </view> -->
    <!-- 学习足迹 -->
    <view @click="toNav('/pages/frank/leaningFoot')" class="imgs">
      <image :src="imageBaseUrl + '/frank/8-7-21.png'" mode=""></image>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import { getCourseSystem } from "@/api/frank";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      serchValue: "",
      rootNodeCode: {
        rootNodeCode: "",
      },
      introduceCirList: [], // 顶部三个
      courseSystemOneList: [], //课程体系 初级
      courseSystemTwoList: [], //课程体系 中级
      courseSystemThrList: [], //课程体系 高级
      secretCourseBagList: [], //秘籍课程加强包
      leaningIncreaseList: [], //学段提分加强包
    };
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  onLoad() {
    this.getCourseSystem();
  },
  onShow() {
    this.serchValue = "";
  },
  methods: {
    toNav(url) {
      uni.navigateTo({ url });
    },
    // 首页课程体系
    async getCourseSystem() {
      const res = await getCourseSystem(this.rootNodeCode);
      this.introduceCirList = res.data.result[0].children[0];
      this.courseSystemOneList = res.data.result[0].children[1].children[0];
      this.courseSystemTwoList = res.data.result[0].children[1].children[1];
      this.courseSystemThrList = res.data.result[0].children[1].children[2];
      // this.secretCourseBagList = res.data.result[0].children[4];
      // this.leaningIncreaseList = res.data.result[0].children[5];
      console.log("000", res.data.result[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;

  .frank_en {
    display: flex;
    justify-content: space-between;
    padding: 40rpx 80rpx 40rpx 50rpx;
    margin: 40rpx 40rpx 0 40rpx;
    width: 670rpx;
    height: 323rpx;
    border-radius: 10rpx;
    background-color: #fff;
    .frank_left {
      width: 229rpx;
      height: 250rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .frank_right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .frank_buton {
        display: flex;
        justify-content: center;
        width: 230rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 23rpx;
        color: #fff;
        border-radius: 163rpx;
        background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
      }
    }
  }

  .introduce_cir {
    display: flex;
    justify-content: space-between;
    padding: 40rpx;
    margin: 0 40rpx;
    .circle {
      width: 135rpx;
      height: 136rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
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
    margin: 0rpx 40rpx 40rpx;
    height: 70rpx;
    line-height: 70rpx;
    color: #8a8a8a;
    height: 70rpx;
    border-radius: 401rpx;
    box-sizing: border-box;
    border: 1rpx solid #bfbfbf;
    padding: 0 50rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    position: relative;
  }
  .search-box image {
    width: 26rpx;
    height: 26rpx;
    margin-right: 30rpx;
  }

  .middle_box {
    width: 670rpx;
    // height: 462rpx;
    padding: 37rpx 0 30rpx;
    margin: 0 40rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    background: #ffffff;
    .mb_title {
      display: flex;
      margin-left: 20rpx;
      .bu {
        width: 10rpx;
        height: 37rpx;
        margin-right: 10rpx;
        border-radius: 20rpx;
        background: #3a73d9;
      }
      .text {
        height: 37rpx;
        line-height: 37rpx;
        font-weight: 500;
        font-size: 30rpx;
      }
      .text2 {
        height: 37rpx;
        line-height: 37rpx;
        font-size: 30rpx;
        color: #2a67d2;
      }
    }
    .click_box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 40rpx;
      .box {
        position: relative;
        width: 275rpx;
        height: 155rpx;
        margin-top: 25rpx;
        image {
          width: 100%;
          height: 100%;
        }
        .text1 {
          position: absolute;
          bottom: 13rpx;
          left: 12%;
          font-weight: 500;
          color: #0028aa;
        }
        .text2 {
          @extend .text1;
          color: #b85f00;
        }
        .text3 {
          @extend .text1;
          color: #8ed08e;
        }
        .text4 {
          @extend .text1;
          color: #7531ec;
        }
      }
    }
  }

  .bag_box {
    @extend .middle_box;
    .line_box {
      @extend .click_box;
      .box1 {
        position: relative;
        width: 175rpx;
        height: 96rpx;
        border-radius: 10rpx;
        margin-top: 73rpx;
        background: #fffaf3;
      }
      .box2 {
        @extend .box1;
        background: #fffdf2;
      }
      .box3 {
        @extend .box1;
        background: #f6fcff;
      }
      .box4 {
        @extend .box1;
        background: #f7fff5;
      }
      .box5 {
        @extend .box1;
        background: #f7fcff;
      }
      .box6 {
        @extend .box1;
        background: #f4f9ff;
      }
      .box7 {
        @extend .box1;
        background: #fff8f8;
      }
      .box8 {
        @extend .box1;
        background: #fff9f3;
      }
      .box9 {
        @extend .box1;
        background: #fff;
      }
      image {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -30%;
        width: 60rpx;
        height: 68rpx;
      }
      .text1 {
        position: absolute;
        white-space: nowrap;
        font-size: 26rpx;
        font-weight: 500;
        bottom: 13rpx;
        left: 50%;
        transform: translateX(-50%);
        color: #b85f00;
      }
      .text2 {
        @extend .text1;
        color: #aa7600;
      }
      .text3 {
        @extend .text1;
        color: #005eaa;
      }
      .text4 {
        @extend .text1;
        color: #114d00;
      }
      .text5 {
        @extend .text1;
        color: #0009aa;
      }
      .text6 {
        @extend .text1;
        color: #0028aa;
      }
      .text7 {
        @extend .text1;
        color: #b32218;
      }
      .text8 {
        @extend .text1;
        color: #b85300;
      }
    }
    .s_box {
      @extend .click_box;
      .box {
        width: 185rpx;
        height: 130rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .imgs {
    display: flex;
    justify-content: center;
  }
  .imgs image {
    width: 670rpx;
    height: 180rpx;
  }
}
</style>