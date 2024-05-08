<template>
  <view>
    <view :style="contentStyle">
      <view :style="statusBarHeight"></view>
      <view class="nav-content" :style="navContentStyle">
        <view class="nav-icon ml-1 flex align-item-center">
          <span v-show="showBack" @click="returnPageNum(1)" class="iconfont nav-icon-css">&#xe837;</span>
<!--          <image v-show="showBack" src="/static/logo.png" class="avatar-css"></image>-->
        </view>
        <view class="nav-slot mr-1">
          <slot></slot>
        </view>
        <view class="nav-btn"></view>
      </view>
    </view>
    <view v-if="!isAbsolute" :style="placeholderStyle"></view>
  </view>
</template>

<script>
export default {
  props: {
    // 是否显示返回键
    showBack: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: '#3A73D9'
    },
    isReturnHome: {
      type: Number,
      default: 0
    },
    // 是否需要消除绝对定位的高度
    isAbsolute: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    statusBarHeight() {
      return `
      padding-top: ${this.systemInfo.statusBarHeight}px;
      background: ${this.bgColor};
      `
    },
    contentStyle() {
      return `
      background: ${this.bgColor};
      position: fixed;
      z-index: 9999;
      top: 0;
      `
    },
    navContentStyle() {
      return `
      height: ${this.navContentHeiht}rpx;;
      `
    },
    placeholderStyle() {
      var navContentHeiht = uni.upx2px(this.navContentHeiht)
      console.log("navContentHeiht + this.systemInfo.statusBarHeight", navContentHeiht + this.systemInfo.statusBarHeight)
      return `
      height: ${navContentHeiht + this.systemInfo.statusBarHeight}px;
      `
    }
  },
  data() {
    return {
      // 系统信息
      systemInfo: {},
      navContentHeiht: 80
    };
  },
  mounted() {
    this.getSystemInfo()
  },
  methods: {
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.systemInfo = res;
          console.log('状态栏高度:', res.statusBarHeight);
        }
      });
    },
    returnPageNum(num) {
      this.$emit('returnPageNum', num)
      if (this.isReturnHome == 1) {
        uni.reLaunch({
          url: '/pages/index/index'
        });
      } else {
        uni.navigateBack({
          delta: num
        });
      }

    }
  }
}
</script>

<style>
.nav-content {
  width: 750rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #3A73D9;
}

.nav-icon {
  width: 20%;
  box-sizing: border-box;
  padding-left: 10rpx;
}

.nav-icon-css {
  width: 50rpx;
  padding: 10rpx 0;
  font-size: 24rpx;
}

.nav-slot {
  width: 60%;
  text-align: center;
}

.nav-btn {
  width: 20%;
}

.nav-icon, .nav-slot, .nav-btn {
  color: #fff;
}

.avatar-css {
  width: 50rpx; height: 50rpx;
  border-radius: 50%;
  margin-left: 30rpx;
}
</style>
