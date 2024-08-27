<template>
  <view class="main-body">
    <cy-navbar showBack isAbsolute>
      <view class="t-size-30">虚拟人对练</view>
    </cy-navbar>

    <view class="content-box" :style="contentBoxStyle">
      <view class="mark-bg"></view>
      <view class="flex align-item-center justify-content-center">
        <image :src="personInfo.avatarLarge" class="scene-img"></image>
      </view>
      <view class="options-btns flex flex-direction-column">
        <view v-for="(item, index) in optionsBtnsMenu" :key="index" class="options-item"
              @click="$navigateTo(item.path)">
          <view @click="$navigateTo('/pages/me/selectLevel')"
            v-if="item.title == '切换'" class="switch-level flex align-item-center justify-content-center">
            <image :src="`${imageBaseUrl}/6-3-01.png`" mode="widthFix" class="mr-1" style="width: 24rpx;"></image>
            {{ currEnglishLevel }}
          </view>
          <view v-if="item.title != '切换'" class="item-title t-size-24 flex align-item-center justify-content-center"
            :style="{width: `${item.width}rpx`, right: `${item.right}rpx`}"
          >{{item.title}}</view>
          <image v-if="item.title != '切换'" :src="item.icon" mode="widthFix" class="options-btn-img"></image>
        </view>
      </view>

      <view class="select-btns flex flex-direction-column">
        <view v-for="(item, index) in selectBtnsMenu" :key="index"
              @click="clickSelectBtnMenu(index)">
          <view :class="index === 0 ? 'select-btn-box-first' : 'select-btn-box-last'"
                class="flex align-item-center justify-content-center">
            <image :src="item.icon" mode="widthFix" class="mr-3"></image>
            <view>{{ item.title }}</view>
          </view>
        </view>
      </view>

      <view class="start-btn font-weight-bold t-size-40 flex justify-content-center align-item-center"
            @click="$navigateTo('/pages/virtualCharacter/dialogue')">
        跟{{personInfo.name || ''}}练口语
      </view>

      <view class="flex justify-content-center notes-box">
        <text>
          根据你的每日学习时间和频率，制定
          专属学习计划随时调整，养成好习惯
        </text>
      </view>
    </view>

    <view v-if="isShowPopup">
      <view class="popup-mask" @click="isShowPopup = false"></view>
      <view class="popup-content px-5 py-5 flex flex-direction-column">
        <view class="flex justify-content-between">
          <span class="iconfont nav-icon-css" @click="isShowPopup = false">&#xe837;</span>
          <text class="font-weight-bold mr-3">第三方用户信息授权说明</text>
          <view></view>
        </view>

        <view class="desc-box t-color-3D3D3D">
          <text>你授权后，小程序开发者将收集你的手机号码，用来为你提供相关服务。开发者严格按照</text>
          <text class="t-color-1863E5">《小礼AI极简英语小程序隐私保护指引》</text>
          <text>处理你的个人资料，如你发现开发者不当处理你的个人资料，可进行</text>
          <text class="t-color-1863E5">举报</text>
          <text>。</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import cyNavbar from "@/components/cy-navbar.vue";
import cyTabbar from "@/components/cy-tabbar.vue";
import MyMixin from "@/utils/MyMixin";
import {defaultVirtual} from "@/api/aiFriend";

export default {
  mixins: [MyMixin],
  components: {cyTabbar, cyNavbar},
  data() {
    return {
      otherHeight: {
        statusBarHeight: 0,
        navContentHeiht: 80,
        tabbarHeight: 110
      },
      optionsBtnsMenu: [],
      selectBtnsMenu: [],
      isShowPopup: false,
      personInfo: {},
      currEnglishLevel: ""
    }
  },
  onLoad() {
    this.getSystemInfo();
    this.init();
    this.network().defaultVirtual();
    uni.$on("switchVirtual", () => {
      this.network().defaultVirtual(1);
    })
  },
  onShow() {
    var basicData = uni.getStorageSync("basicData");
    console.log("basicData", basicData)
    this.currEnglishLevel = basicData.currEnglishLevel;

    if (basicData) {
    }
  },
  computed: {
    contentBoxStyle() {
      // return `height: calc(100vh - ${this.otherHeight.navContentHeiht + this.otherHeight.tabbarHeight - 30}px);`
    }
  },
  methods: {
    init() {
      this.optionsBtnsMenu = [
        {
          title: '切换',
          width: 120,
          right: -80,
          icon: `${this.imageBaseUrl}/xl-image-45.png`,
          path: '/pages/virtualCharacter/duration'
        },
        {
          title: '查看测评报告历史',
          width: 220,
          right: -190,
          icon: `${this.imageBaseUrl}/xl-image-8.png`,
          path: '/pages/virtualCharacter/dialogueHistory'
        },
        /*{
          title: '使用视频',
          width: 140,
          right: -100,
          icon: `${this.imageBaseUrl}/xl-image-37.png`,
        }*/
      ],
      this.selectBtnsMenu = [
        {
          title: '场景切换',
          icon: `${this.imageBaseUrl}/xl-image-25.png`,
        },
        {
          title: '形象选择',
          icon: `${this.imageBaseUrl}/xl-image-27.png`,
        }
      ]
    },
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.otherHeight.statusBarHeight = res.statusBarHeight;

          // upx转px
          this.otherHeight.navContentHeiht = uni.upx2px(this.otherHeight.navContentHeiht);
          this.otherHeight.tabbarHeight = uni.upx2px(this.otherHeight.tabbarHeight);
        }
      });
    },
    clickSelectBtnMenu(index) {
      switch (index) {
        case 0:
          this.$navigateTo('/pages/virtualCharacter/sceneSwitch');
          break;
        case 1:
          this.$navigateTo('/pages/virtualCharacter/aiFriend');
          break;
      }
    },
    network() {
      return {
        defaultVirtual: async (isRefresh) => {
          const res = await defaultVirtual();
          this.personInfo = res.data.result;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>

.switch-level {
  width: 140rpx;
  height: 60rpx;
  border-radius: 50rpx;
  background: #DBEBFF;
  box-sizing: border-box;
  border: 3rpx solid #6B9BEF;
  position: absolute;
  top: -100rpx;
  color: #2A67D2;
  font-size: 26rpx;
  letter-spacing: 0.15em;
}

.content-box {
  overflow: hidden;
  height: 100vh;
  //background-image: url('https://c-ssl.dtstatic.com/uploads/item/202003/31/20200331123100_nBc5m.thumb.1000_0.jpeg');
  background-size: cover;
  position: relative;
}

.options-btns {
  position: absolute;
  left: 50rpx;
  top: 280rpx;

  .options-item {
    position: relative;

    .item-title {
      position: absolute;
      top: -20rpx;
      height: 52rpx;
      border-radius: 204rpx;
      background: #FFFFFF;
      box-sizing: border-box;
      color: #2A67D2;
      z-index: 1;
      border: 0.1rpx solid #2A67D2;
    }
  }
}

.options-btn-img {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 50rpx;
  z-index: 2;
  position: relative;
}

.select-btns {
  position: absolute;
  z-index: 3;
  right: 50rpx;
  bottom: 400rpx;

  image {
    margin-top: 4rpx;
    width: 30rpx;
    height: 30rpx;
  }
}

.select-btn-box-first, .select-btn-box-last {
  width: 210rpx;
  height: 80rpx;
  border-radius: 15rpx;
  box-sizing: border-box;
  border: 1rpx solid #e5dcdc;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.select-btn-box-first {
  background: linear-gradient(180deg, rgba(192, 119, 255, 1) 0%, rgba(126, 42, 210, 1) 100%);
}

.select-btn-box-last {
  margin-top: 50rpx;
  background: linear-gradient(180deg, rgba(255, 119, 214, 1) 0%, rgba(210, 42, 129, 1) 100%);
}
.scene-img {
  height: 820rpx;
  width: 750rpx;
  position: absolute;
  bottom: 300rpx;
}
.start-btn {
  position: absolute;
  z-index: 3;
  left: 102rpx;
  bottom: 200rpx;
  width: 546rpx;
  height: 96rpx;
  border-radius: 331rpx;
  background: linear-gradient(270deg, #528EF8 3%, #002BA3 100%);
  box-shadow: 0rpx 0rpx 5rpx 0rpx #0546B8;
  color: #ffffff;
}

.notes-box {
  position: absolute;
  z-index: 3;
  bottom: 100rpx;
  width: 750rpx;
  color: #002BA3;
  font-size: 26rpx;
  line-height: 40rpx;
  font-weight: 500;
}

.mark-bg {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 700rpx;
  z-index: 2;
  background: linear-gradient(180deg, rgba(232, 242, 255, 0) 0%, rgba(228, 240, 255, 0.77) 38%, #B8D8FF 66%);
}

.popup-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: fixed;
  width: 750rpx;
  height: 600rpx;
  bottom: 0;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  background: #FFFFFF;
  box-sizing: border-box;

  .nav-icon-css {
    font-size: 28rpx;
  }

  .desc-box {
    margin-top: 50rpx;
    line-height: 40rpx;
  }
}
</style>
