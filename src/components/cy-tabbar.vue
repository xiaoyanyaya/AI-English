<template>
  <view>
<!--    <view class="tabbar-box-display"></view>
    <view class="tabbar-box flex justify-content-around align-item-center">
      <view v-for="(item, index) in tabbarList" :key="index"
            @click="toPage(item, inedx)"
            class="flex flex-direction-column align-item-center">
        <image :src="index === currentActive ? `${imageBaseUrl}${item.activeImage}` : `${imageBaseUrl}${item.image}`" mode="widthFix"
        :style="{
          width: `${item.width}rpx`,
          height: `${item.height}rpx`
        }"></image>
        <view class="t-size-24 mt-1"
              :class="index === currentActive ? 'tabbar-box-color-active' : 'tabbar-box-color'"
        >{{item.title}}</view>
      </view>
    </view>-->
  </view>
</template>

<script>

import MyMixin from "@/utils/MyMixin";
export default {
  mixins: [MyMixin],
  data() {
    return {
      tabbarList: [
        {title: '首页', icon: '\ue731',
          width: 50, height: 50,
          image: '/icon_4.png', activeImage: '/icon_2.png', path: '/pages/index/index'},
        {title: '会员中心', icon: '\uee19',
          width: 40, height: 40,
          image: '/icon_3.png', activeImage: '/icon_5.png', path: '/pages/me/index'},
      ]
    }
  },
  props: {
    currentActive: {
      type: Number,
      default: 0
    },
  },
  methods: {
    toPage(item, index) {
      if (index === this.currentActive) return;
      uni.reLaunch({
        url: item.path
      });
    }
  },
}
</script>

<style>
.tabbar-box-display {
  height: 110rpx;
}
.tabbar-box {
  width: 750rpx;
  height: 110rpx;
  box-sizing: border-box;
  padding: 10rpx 0;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #E5E5E5;
  background: #ffffff;
}

.tabbar-box-color-active {
  color: #3D3D3D;
}
.tabbar-box-color {
  color: #BFBFBF;
}
</style>
