<template>
  <view class="pb-5 main">
    <cy-navbar :showBack="false" :bgColor="backColor" textColor="#3D3D3D">
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
          <view class="content-text mt-3 mr-2" @click="$navigateTo(`/pages/virtualCharacter/index`)">
            <text class="table-nowrap-2">{{ personInfo.intro }}</text>
            <view class="say-hello mr-2 mt-2 flex align-item-center justify-content-center">
              <image :src="`${imageBaseUrl}/6-30-05.png`" mode="widthFix" class="say-hello-btn"></image>
              <view class="ml-2">Say hello</view>
            </view>
          </view>

          <view class="content-bottom">
            <view class="flex justify-content-between align-item-center px-3">
              <view class="description flex flex-direction-column align-item-center justify-content-center">
                <view class="font-weight-bold t-size-36">情景自由聊</view>
                <view class="t-size-22">每天10分钟 进阶口语达人</view>
              </view>
              <button v-if="isAuthPhone === true"
                      class="start-btn t-color-fff t-size-28 flex align-item-center justify-content-center"
                      @click="$navigateTo(`/pages/virtualCharacter/index`)">
                <view>开始对练</view>
              </button>
              <button v-else class="start-btn t-color-fff t-size-28 flex align-item-center justify-content-center"
                      open-type="getPhoneNumber"
                      @getphonenumber="getPhone($event, '/pages/virtualCharacter/index')">
                <view>开始对练</view>
              </button>
            </view>
          </view>
          <view class="video-container">
            <video
              v-if="personInfo.indexDigitalhumanType === 'VIDEO'"
              :src="personInfo.video"
              class="scene-img" autoplay loop muted :controls="false"></video>
            <image v-else
                   :src="personInfo.avatarLarge" class="scene-img"></image>
          </view>
        </view>
      </view>

      <view v-for="(item, index) in menu1" :key="index"
            class="score-full mt-5 flex align-item-center justify-content-center">
        <button v-if="isAuthPhone === true" class="toAuhorizePhoneBtn" @click="$navigateTo(item.toPath)"></button>
        <button v-else
                class="toAuhorizePhoneBtn"
                size="mini" type="primary"
                open-type="getPhoneNumber"
                @getphonenumber="getPhone($event, item.toPath)"></button>

        <view class="mr-4 t-color-3D3D3D">
          <view class="font-weight-bold t-size-36">{{ item.text }}</view>
          <view class="t-size-22 mt-1">{{ item.subText }}</view>
        </view>
        <view class="ml-4">
          <image :src="`${imageBaseUrl}/${item.image}`" mode="widthFix" class="image"></image>
        </view>

        <image :src="`${imageBaseUrl}/img_4.png`" class="vip-image"></image>
      </view>

      <view class="ai-grid-container mt-5">
        <view class="ai-tools-box px-3 pt-3 pb-3"
              @click="toProduct(index)"
              v-for="(item, index) in menu2" :key="index"
              :style="{ background: item.bgColor }">
          <view class="t-color-3D3D3D font-weight-bold t-size-36">{{ item.text }}</view>
          <view class="t-color-3D3D3D t-size-20 mt-1">{{ item.subText }}</view>

          <image :src="`${imageBaseUrl}/${item.image}`" class="image"></image>
        </view>
      </view>
    </view>

    <cy-tabbar :currentActive="0"></cy-tabbar>
  </view>

</template>

<script>

import MyMixin from "@/utils/MyMixin";
import {defaultVirtual} from "@/api/aiFriend";
import store from "@/store";
import {getPhone} from "@/api/user";

export default {
  mixins: [MyMixin],
  data() {
    return {
      personInfo: {},
      backColor: 'transparent',
      isAuthPhone: false,
      // 菜单1
      menu1: [{
        image: 'img_5.png',
        text: 'AI高分作文',
        toPath: '/pages/composition/index',
        subText: '作文批改提分神器'
      }, {
        image: 'img_7.png',
        text: 'AI速记单词',
        toPath: '/pages/word/index',
        subText: '低成本高效率记单词'
      }],

      // 菜单2
      menu2: [{
        image: 'word/6-30-01.png',
        text: '产品理念',
        subText: '智能、科技、极简、高效、有趣',
        bgColor: 'linear-gradient(134deg, #EAF2FF 20%, #FFECEC 98%)'
      }, {
        image: 'word/6-30-02.png',
        text: '用户故事',
        subText: '家长用的放心，孩子学的开心',
        bgColor: 'linear-gradient(134deg, #EAF2FF 14%, #FFF5E4 100%)'
      }]
    }
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = '#fff'
    } else {
      this.backColor = 'transparent'
    }
  },
  onLoad() {
    if (!store.state.token) {
      this.network().loginAndGetVirtual();
    }
  },
  onShow() {
    this.isAuthPhone = uni.getStorageSync("isAuthPhone");
    if (store.state.token) {
      this.network().defaultVirtual();
      this.getBasicData(false)
    }
  },
  methods: {
    toProduct(index) {
      if (index === 0) {
        this.$navigateTo(`/pages/index/product?title=产品理念`)
      } else {
        this.$navigateTo(`/pages/index/product?title=用户故事`)
      }
    },
    network() {
      return {
        loginAndGetVirtual: async () => {
          const loginRes = await this.login();
          if (loginRes.data.code === 200) {
            this.network().defaultVirtual();
          }
        },
        defaultVirtual: async () => {
          const res = await defaultVirtual();
          this.personInfo = res.data.result;
        }
      }
    }
  },
}
</script>

<style lang="scss">
.main {
  background: linear-gradient(164deg, #C1DAFF 3%, #F0F7FD 12%, #FFFFFF 21%);
  min-height: 100vh;
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
    background: #ECF4FF;
    position: absolute;
    bottom: 0;
    z-index: 2;
    border-radius: 40rpx 40rpx 0 0;


    .video-container {
      width: 250rpx;
      height: 310rpx;
      position: absolute;
      z-index: 4;
      top: -112rpx;
      margin-left: 30rpx;
      overflow: hidden;
    }

    /*position: absolute;
      z-index: 3;
      margin-left: 30rpx;
      width: 260rpx;
      height: 300rpx;
      top: -100rpx;*/

    .scene-img {
      position: absolute;
      z-index: 3;
      width: 270rpx;
      height: 310rpx;
      object-fit: cover;
    }

    .content-text {
      width: 50%;
      color: #022689;
      float: right;

      .say-hello {
        width: 210rpx;
        height: 50rpx;
        border-radius: 100rpx;
        background: #FFFFFF;
        float: right;

        .say-hello-btn {
          width: 30rpx;
        }
      }
    }

    .content-bottom {
      width: 100%;
      height: 150rpx;
      position: absolute;
      bottom: 0;
      z-index: 4;
      border-radius: 30rpx 30rpx 0 0;
      background: linear-gradient(90deg, #DFE2FF 0%, #B3CFFF 100%);

      .description {
        height: 150rpx;
        color: #022689;
        box-sizing: border-box;
        letter-spacing: 2rpx;
      }

      .start-btn {
        position: absolute;
        right: 30rpx;
        width: 240rpx;
        height: 70rpx;
        border-radius: 100rpx;
        background: linear-gradient(90deg, #6F9EF3 0%, #0B46E7 97%);
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

.score-full {
  width: 670rpx;
  height: 200rpx;
  border-radius: 20rpx;
  background: #EFF6FF;
  position: relative;

  .image {
    width: 156rpx;
  }

  .vip-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 96rpx;
    height: 32rpx;
  }
}

.ai-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;

  .ai-tools-box {
    width: 320rpx;
    height: 308rpx;
    border-radius: 20rpx;
    position: relative;

    .image {
      position: absolute;
      width: 150rpx;
      height: 140rpx;
      right: 30rpx;
      bottom: 30rpx;
    }
  }
}

.toAuhorizePhoneBtn {
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  position: absolute;
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

</style>
