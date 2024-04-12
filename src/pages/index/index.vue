<template>
  <view class="pb-5">
    <cy-navbar>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="px-4">

      <view class="scene-box">
        <view class="check-teacher mt-2 flex align-item-center justify-content-center">
          <view class="font-weight-bold mr-3">AI虚拟人口语</view>
          <image :src="`${imageBaseUrl}/img_4.png`" mode="widthFix"></image>
<!--          <view class="iconfont ml-2">&#xe652;</view>-->
        </view>
        <view class="scene-content">
          <view class="content-text mt-3 mr-2">
            <text class="table-nowrap-2">{{personInfo.intro}}</text>
            <view class="say-hello mr-2 mt-2 flex align-item-center justify-content-center">
              <view></view>
              <view>Say hello</view>
            </view>
          </view>

          <view class="content-bottom">
            <view class="flex justify-content-between align-item-center px-3">
              <view class="description flex flex-direction-column align-item-center justify-content-center">
                <view class="font-weight-bold t-size-36">情景自由聊</view>
                <view class="t-size-22">每天10分钟 进阶口语达人</view>
              </view>
              <view class="start-btn t-color-fff t-size-28 flex align-item-center justify-content-center"
              @click="$navigateTo(`/pages/virtualCharacter/index`)">
                <view>开始对练</view>
              </view>
            </view>
          </view>
          <image v-show="personInfo.avatarLarge"
            :src="personInfo.avatarLarge" mode="widthFix" class="scene-img"></image>
        </view>
      </view>

<!--      <view class="grid-container mt-5">
        <view class="share-box flex align-item-center justify-content-around">
          <view>
            <view class="font-weight-bold t-size-28">分享得会员</view>
            <view class="t-size-20 mt-1">年卡会员免费拿</view>
          </view>
          <view>
            <image :src="`${imageBaseUrl}/xl-image-11.png`" class="share-img"></image>
          </view>
        </view>

        <view class="share-box flex align-item-center justify-content-around">
          <view>
            <view class="font-weight-bold t-size-28">分享得会员</view>
            <view class="t-size-20 mt-1">年卡会员免费拿</view>
          </view>
          <view>
            <image :src="`${imageBaseUrl}/img_3.png`" class="share-img"></image>
          </view>
        </view>
      </view>-->

      <view class="ai-grid-container mt-5">
        <view class="ai-tools-box" @click="$navigateTo('/pages/composition/index')">
          <view class="t-color-3D3D3D font-weight-bold t-size-30 ai-write">AI满分作文</view>
          <view class="aparent">作文批改提分神器</view>
          <image :src="`${imageBaseUrl}/img_4.png`" class="ment-image"></image>
          <image :src="`${imageBaseUrl}/img_5.png`" class="identification"></image>
        </view>
        <view class="ai-tools-box">
          <view class="t-color-3D3D3D font-weight-bold t-size-30 ai-write">AI阅读</view>
          <view class="aparent">Aparentment</view>
          <image :src="`${imageBaseUrl}/img_4.png`" class="ment-image"></image>
          <image :src="`${imageBaseUrl}/img_6.png`" class="identification"></image>
        </view>
        <view class="ai-tools-box">
          <view class="t-color-3D3D3D font-weight-bold t-size-30 ai-write">AI速记单词</view>
          <view class="aparent">低成本高效率速记单词</view>
          <image :src="`${imageBaseUrl}/img_4.png`" class="ment-image"></image>
          <image :src="`${imageBaseUrl}/img_7.png`" class="identification2"></image>
        </view>

        <view class="ai-tools-box2 flex align-item-center border-box pl-2 pr-3"
              @click="$navigateTo('/pages/index/question')">
          <image :src="`${imageBaseUrl}/img_8.png`"></image>
          <view class="ml-3">
            <view class="title font-weight-bold">
              <view>AI在线</view>
              <view>英语老师</view>
            </view>
            <view class="subtitle mt-2">
              <view>24小时在线</view>
              <view>帮你解答</view>
            </view>
          </view>
        </view>
        <view class="ai-tools-box3 flex align-item-center border-box px-3"
              @click="$navigateTo('')">
          <image :src="`${imageBaseUrl}/img_9.png`"></image>
          <view class="ml-3">
            <view class="title font-weight-bold flex flex-direction-column align-item-center">
              <view>中考</view>
              <view>提分课程</view>
            </view>
            <view class="subtitle mt-2">
              <view>现在就来看看吧</view>
            </view>
          </view>
        </view>
        <view class="ai-tools-box4 flex align-item-center border-box px-3"
              @click="$navigateTo('/pages/index/aiLecture')">
          <image :src="`${imageBaseUrl}/img_10.png`"></image>
          <view class="ml-3">
            <view class="title font-weight-bold">
              <view>AI演讲</view>
            </view>
            <view class="subtitle mt-2">
              <view>好玩又有趣，</view>
              <view>快来合成吧~</view>
            </view>
          </view>
        </view>
      </view>

    </view>

    <cy-tabbar :currentActive="0"></cy-tabbar>
  </view>

</template>

<script>

import MyMixin from "@/utils/MyMixin";
import {defaultVirtual} from "@/api/aiFriend";

export default {
  mixins: [MyMixin],
  data() {
    return {
      personInfo: {}
    }
  },
  onLoad() {
    this.network().defaultVirtual();
    uni.$on("switchVirtual", () => {
      this.network().defaultVirtual();
    })
  },
  methods: {
    network() {
      return {
        defaultVirtual: async () => {
          const res = await defaultVirtual();
          this.personInfo = res.data.result;
          console.log(this.personInfo)
        }
      }
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}

.check-teacher {
  width: 280rpx;
  height: 60rpx;
  border-radius: 100rpx;
  background: #FFC786;
  float: right;
  font-size: 24rpx;
  color: #6D3100;
  position: relative;

  image {
    width: 70rpx;
    position: absolute;
    border-bottom-left-radius: 14rpx;
    right: 0;
    top: 0;
  }
}

.scene-box {
  margin-top: 50rpx;
  position: relative;
  height: 450rpx;

  .scene-content {
    width: 100%;
    height: 350rpx;
    background: #DAE9FF;
    position: absolute;
    bottom: 0;
    z-index: 2;
    border-radius: 40rpx 40rpx 0 0;

    .scene-img {
      position: absolute;
      z-index: 3;
      margin-left: 30rpx;
      width: 260rpx;
      top: -100rpx;
    }

    .content-text {
      width: 50%;
      color: #022689;
      float: right;

      .say-hello {
        width: 200rpx;
        height: 50rpx;
        border-radius: 100rpx;
        background: #FFFFFF;
        float: right;
      }
    }

    .content-bottom {
      width: 100%;
      height: 150rpx;
      position: absolute;
      bottom: 0;
      z-index: 4;
      background: linear-gradient(90deg, #C7CAFF 0%, #8FB8FF 100%);

      .description {
        height: 150rpx;
        color: #022689;
        box-sizing: border-box;
        letter-spacing: 2rpx;
      }

      .start-btn {
        width: 240rpx;
        height: 70rpx;
        border-radius: 100rpx;
        background: linear-gradient(90deg, #6296F3 0%, #022689 97%);
      }
    }
  }
}


.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;

  .share-box {
    height: 120rpx;
    border-radius: 30rpx;
    background: linear-gradient(270deg, rgba(225, 235, 254, 0.3) 0%, rgba(0, 93, 255, 0.3) 100%);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    color: #022689;

    .share-img {
      width: 80rpx;
      height: 80rpx;
    }
  }

}

.ai-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;

  .ai-tools-box {
    height: 300rpx;
    border-radius: 50rpx;
    overflow: hidden;
    background: linear-gradient(180deg, #DAE8FF 0%, #FFFFFF 100%);
    box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.3);
    position: relative;

    .ai-write {
      position: absolute;
      top: 30rpx;
      left: 30rpx;
    }

    .aparent, .ment {
      font-size: 20rpx;
    }

    .aparent {
      position: absolute;
      top: 80rpx;
      left: 30rpx;
    }

    .ment-image {
      position: absolute;
      top: -10rpx;
      right: -10rpx;
      width: 134rpx;
      height: 46rpx;
      overflow: hidden;
    }

    .identification {
      position: absolute;
      width: 150rpx;
      height: 150rpx;
      bottom: 20rpx;
      right: 20rpx;
    }

    .identification2 {
      position: absolute;
      width: 170rpx;
      height: 100rpx;
      bottom: 20rpx;
      right: 20rpx;
    }
  }

  .ai-tools-box2, .ai-tools-box3, .ai-tools-box4 {
    height: 260rpx;
    border-radius: 50rpx;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 26rpx;
      line-height: 40rpx;
    }
    .subtitle {
      font-size: 18rpx;
    }
  }
  .ai-tools-box2 {
    height: 300rpx;
    background: #FFFFFF;

    image {
      width: 130rpx;
      height: 130rpx;
    }

    .title {
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      background: linear-gradient(180deg, #5693FF 0%, #002BA3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    .subtitle {
      color: #002BA3;
    }
  }
  .ai-tools-box3 {
    background: linear-gradient(125deg, #FFD07E 2%, #FEF6E8 39%, #EBFBF3 100%);

    image {
      width: 100rpx;
      height: 100rpx;
    }

    .title {
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #6B3400;
    }

    .subtitle {
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #6B3400;
    }
  }
  .ai-tools-box4 {
    background: linear-gradient(128deg, #97CDFE 3%, #E8FEFC 35%, #FFF2F2 99%);

    image {
      width: 120rpx;
      height: 120rpx;
    }
  }
}
</style>
