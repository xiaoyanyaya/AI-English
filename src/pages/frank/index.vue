<template>
  <view class="main">
    <cy-navbar :showBack="false" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="frank_en">
      <view class="frank_left" @click="toNav('/pages/frank/frankDetail')">
        <image :src="imageBaseUrl + '/frank/8-28-02.png'" mode=""></image>
        <view class="frank_buton">
          <text class="mr-1">查看Frank介绍</text>
          <uni-icons type="arrow-right" size="19" color="#fff"></uni-icons>
        </view>
      </view>
      <view class="frank_right">
        <view class="flex justify-content-between">
          <view class="border_r">
            <view class="text_bu">一朝<text>掌握</text>方法</view>
          </view>
          <view class="border_r">
            <view class="text_bu">一生<text>远离</text>补习</view>
          </view>
        </view>
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
            <text class="text">{{
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
            <text class="text">{{
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
            <text class="text">{{
              introduceCirList.children[2].nodeName
            }}</text>
          </view>
          课程数： {{ introduceCirList.videoNum }}
        </view>
      </view>
    </view>

    <!-- 广告图 -->
    <view class="infomercial">
      <image :src="imageBaseUrl + '/frank/10-16-05.png'"></image>
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

    <!-- 课程体系 -->
    <view class="middle_box" v-for="item in courseSystemList" :key="item.id">
      <view class="mb_title">
        <view class="bu"></view>
        <text class="text">{{ item.nodeName }}</text>
      </view>
      <view class="mb_box" v-for="item2 in item.children" :key="item2.id">
        <view
          class="box_img"
          @click="
            toNav(
              `/pages/frank/components/courseOutline?nodeCode=${item2.nodeCode}&nodeName=${item2.nodeName}`
            )
          "
        >
          <image :src="item2.imageUrl" mode=""></image>
        </view>
        <view class="box_cont">
          <view class="t-size-26">{{ item2.nodeName }}</view>
          <view class="t-size-22 t-color-666 mt-1 mb-1"
            >共{{ item2.videoNum }}个视频</view
          >
          <view class="flex justify-content-between">
            <view v-if="item2.videoNum == 0" class="t-size-22 t-color-666">
              暂无视频
            </view>
            <view class="progress" v-else>
              <u-line-progress
                active-color="#1863e5"
                inactive-color="#d8d8d8"
                :show-percent="false"
                :percent="((item2.studyNum / item2.videoNum) * 100).toFixed(2)"
                style="width: 200rpx; margin-bottom: 8rpx"
                height="16"
              >
              </u-line-progress>
              <text
                >{{
                  ((item2.studyNum / item2.videoNum) * 100).toFixed(0)
                }}%</text
              >
            </view>
            <view
              @click="
                toNav(
                  `/pages/frank/components/courseOutline?nodeCode=${item2.nodeCode}&nodeName=${item2.nodeName}`
                )
              "
            >
              <view v-if="item2.studyNum == 0" class="button bg-blue">
                开始学习
              </view>
              <view
                v-else-if="item2.studyNum / item2.videoNum == 1"
                class="button bg-gray"
              >
                已学完
              </view>
              <view v-else class="button bg-orange">继续学习</view>
            </view>
          </view>
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
    <!-- <view @click="toNav('/pages/frank/leaningFoot')" class="imgs">
      <image :src="imageBaseUrl + '/frank/8-7-21.png'" mode=""></image>
    </view> -->
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
      courseSystemList: [], //课程体系
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
    this.getBasicData(false);
  },
  methods: {
    toNav(url) {
      uni.navigateTo({ url });
    },
    // 首页课程体系
    async getCourseSystem() {
      const res = await getCourseSystem(this.rootNodeCode);
      this.introduceCirList = res.data.result[0].children[0];
      this.courseSystemList = res.data.result[0].children.slice(1);
      console.log("this.courseSystemList", this.courseSystemList);
      // this.secretCourseBagList = res.data.result[0].children[4];
      // this.leaningIncreaseList = res.data.result[0].children[5];
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
    margin: 40rpx 55rpx;
    .frank_left {
      position: relative;
      width: 215rpx;
      height: 270rpx;
      background-color: #fff;
      border-radius: 5%;
      image {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 90%;
        height: 88%;
      }
      .frank_buton {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10rpx;
        display: flex;
        justify-content: center;
        width: 90%;
        height: 40rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 22rpx;
        color: #fff;
        background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
      }
    }
    .frank_right {
      flex: 1;
      padding-left: 40rpx;
      .border_r {
        position: relative;
        width: 180rpx;
        height: 50rpx;
        border-radius: 10rpx;
        box-sizing: border-box;
        border: 1rpx solid #165bd2;
        .text_bu {
          position: absolute;
          left: -8%;
          top: 17%;
          width: 180rpx;
          height: 50rpx;
          line-height: 50rpx;
          text-align: center;
          border-radius: 10rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #1863e5;
          background: #ffffff;
          text {
            margin: 0 3rpx;
            font-size: 30rpx;
            font-weight: normal;
            color: #e76615;
          }
        }
      }

      .introduce_cir {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        padding: 0 10rpx;
        .circle {
          width: 80rpx;
          height: 80rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          font-size: 24rpx;
          margin-top: 10rpx;
          width: 95rpx;
        }
      }
    }
  }

  .infomercial {
    width: 670rpx;
    height: 150rpx;
    margin: 0 40rpx 40rpx;
    image {
      width: 100%;
      height: 100%;
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

    .mb_box {
      display: flex;
      justify-content: space-between;
      padding: 35rpx 40rpx 0;
      .box_img {
        width: 185rpx;
        height: 125rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .box_cont {
        flex: 1;
        padding-left: 35rpx;
        .progress {
          display: flex;
          align-items: center;
          width: 55%;
          text {
            margin-left: 8rpx;
            font-size: 22rpx;
            color: #8a8a8a;
          }
        }
        .button {
          width: 150rpx;
          height: 40rpx;
          line-height: 40rpx;
          border-radius: 125rpx;
          text-align: center;
          color: #fff;
          font-size: 23rpx;
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