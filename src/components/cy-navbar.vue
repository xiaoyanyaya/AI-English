<template>
  <view>
    <view :style="contentStyle">
      <view :style="statusBarHeight"></view>
      <view class="nav-content" :style="navContentStyle">
        <view class="nav-icon ml-2 flex align-item-center">
          <span
            v-show="showBack"
            @click="returnPageNum(1)"
            :style="{ color: textColor }"
            class="iconfont nav-icon-css"
            >&#xe837;</span
          >
          <!--          <image v-show="showBack" src="/static/logo.png" class="avatar-css"></image>-->
        </view>
        <view class="nav-slot mr-1" :style="{ color: textColor }">
          <view class="t-size-30" v-if="titleStr">{{ titleStr }}</view>
          <view v-else><slot></slot></view>
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
    title: {
      type: String,
      default: "",
    },
    // 标题显示长度
    titleLength: {
      type: Number,
      default: 14,
    },
    // 是否显示返回键
    showBack: {
      type: Boolean,
      default: false,
    },
    showBgColor: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: "#3A73D9",
    },
    textColor: {
      type: String,
      default: "#fff",
    },
    isReturnHome: {
      type: Number,
      default: 0,
    },
    // 是否需要消除绝对定位的高度
    isAbsolute: {
      type: Boolean,
      default: false,
    },
    // 是否整块过渡效果
    allTrans: {
      type: Boolean,
      default: false,
    },
    // 是否自定义返回
    customBack: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * 标题截断省略号
     */
    titleStr() {
      if (!this.title) return "";

      if (this.title.length > this.titleLength) {
        return this.title.substring(0, this.titleLength) + "...";
      }
      return this.title;
    },
    statusBarHeight() {
      var style = `padding-top: ${this.systemInfo.statusBarHeight}px;`;
      if (this.showBgColor && !this.allTrans) {
        style += `background: ${this.bgColor};`;
      }
      return style;
    },
    contentStyle() {
      var style = `position: fixed;
      z-index: 9999;
      top: 0;`;
      if (this.showBgColor) {
        style += `background: ${this.bgColor};`;
      }
      return style;
    },
    navContentStyle() {
      return `
      height: ${this.navContentHeiht}rpx;;
      `;
    },
    placeholderStyle() {
      var navContentHeiht = uni.upx2px(this.navContentHeiht);
      console.log(
        "navContentHeiht + this.systemInfo.statusBarHeight",
        navContentHeiht + this.systemInfo.statusBarHeight
      );
      return `
      height: ${navContentHeiht + this.systemInfo.statusBarHeight}px;
      `;
    },
  },
  data() {
    return {
      // 系统信息
      systemInfo: {},
      navContentHeiht: 80,
    };
  },
  mounted() {
    this.getSystemInfo();
  },
  methods: {
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.systemInfo = res;
          console.log("状态栏高度:", res.statusBarHeight);
        },
      });
    },
    returnPageNum(num) {
      if (this.customBack) {
        this.$emit("customBack");
        return;
      }

      this.$emit("returnCustom", num);
      if (this.isReturnHome == 1) {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      } else {
        uni.navigateBack({
          delta: num,
        });
      }
    },
  },
};
</script>

<style>
.nav-content {
  width: 750rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background: #3A73D9; */
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

.nav-icon,
.nav-slot,
.nav-btn {
  color: #fff;
}

.avatar-css {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-left: 30rpx;
}
</style>
