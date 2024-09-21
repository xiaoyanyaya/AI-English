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

      <view class="flex mt-5 justify-content-between">
        <view class="mr-2 mt-3 nots-box flex pt-3 pb-2 flex-direction-column align-item-center">
          <view class="font-weight-bold t-size-32">
            <span class="t-color-1863E5">全国</span>中小学
          </view>
          <view class="font-weight-bold t-size-32 mt-1 mb-1">
            英语教材<span class="t-color-E77415">新课改</span>
          </view>

          <view v-for="(item, index) in menu3" :key="index"
                class="nots-item flex justify-content-between align-item-center px-3 mt-2">
            <view class="font-weight-bold t-size-26">重 <span class="t-color-1863E5 t-italic">{{item.text}}</span> </view>
            <view class="t-size-18">
              <view>{{ item.subText }}</view>
              <view>{{ item.subText2 }}</view>
            </view>
          </view>
        </view>

        <view class="ai-grid-container">
          <view class="ai-tools-box mt-3 pl-5 pt-2 pb-2 flex flex-direction-column justify-content-center"
                @click="toProduct(index)"
                v-for="(item, index) in menu2" :key="index"
                :style="{ background: item.bgColor }">
            <view class="t-color-3D3D3D font-weight-bold mt-1 t-size-34">{{ item.text }}</view>
            <view class="t-color-3D3D3D t-size-22 mt-2">{{ item.subText }}</view>
            <view class="t-color-3D3D3D t-size-22 mt-05">{{ item.subText2 }}</view>

            <image :src="`${imageBaseUrl}/${item.image}`"
                   :class="index === 1 ? 'image2' : 'image'"></image>
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
import store from "@/store";
import {getPhone} from "@/api/user";
import {queryLetterList} from "../../api/word";

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
        text: 'AI理念',
        subText: '智能、科技、',
        subText2: '极简、高效、有趣',
        bgColor: 'linear-gradient(134deg, #EAF2FF 20%, #FFECEC 98%)'
      }, {
        image: 'word/6-30-02.png',
        text: '用户故事',
        subText: '家长更少操心',
        subText2: '孩子学的开心',
        bgColor: 'linear-gradient(134deg, #EAF2FF 14%, #FFF5E4 100%)'
      }],

      // 菜单3
      menu3: [{
        text: '口语',
        subText: '听说分数占比大幅提升',
        subText2: '每周口语不少于30分钟',
        bgColor: '#45901a'
      }, {
        text: '词汇',
        subText: '词汇量从1600到2000',
        subText2: '拿高分词汇须达3000',
        bgColor: '#d55700'
      }, {
        text: '写作',
        subText: '强化写作能力，准确描',
        subText2: '述事物和表达观点',
        bgColor: '#1f55a7'
      }, {
        text: '阅读',
        subText: '取消传统语法选择题转',
        subText2: '转向阅读理解',
        bgColor: '#8aade5'
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
  onLoad({promoCode}) {
    if (promoCode) {
      uni.setStorageSync('promoCode', promoCode)
    }
    if (!store.state.token) {
      this.network().loginAndGetVirtual();
    }
    this.network().queryLetterList();
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
        this.$navigateTo(`/pages/index/product?title=AI理念`)
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
        },
        queryLetterList: async () => {
          const res = await queryLetterList();
          // 存储英文单词
          uni.setStorageSync('letterList', res.data.result)
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

.nots-box {
  flex: 1;
  background: #EFF6FF;
  border-radius: 20rpx;
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

.nots-item {
  background-image: url("https://aien.xiaolixb.com/assets/8-24-01.png");
  background-size: 100% 100%;
  width: 90%;
  height: 80rpx;

}

.ai-grid-container {

  .ai-tools-box {
    width: 250rpx;
    height: 260rpx;
    border-radius: 20rpx;
    position: relative;

    .image, .image2 {
      position: absolute;
      right: 0;
      top: -50rpx;
    }

    .image {
      width: 90rpx;
      height: 80rpx;
    }

    .image2 {
      width: 80rpx;
      height: 90rpx;
      margin-top: 20rpx;
      right: -10rpx;
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
