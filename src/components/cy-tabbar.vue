<template>
  <view>
    <view class="tabbar-box-display"></view>
    <view class="tabbar-box flex justify-content-around align-item-center">
      <view v-for="(item, index) in tabbarList" :key="index"
            @click="toPage(item, inedx)"
            class="flex flex-direction-column align-item-center">
        <view class="iconfont"
              :class="index === currentActive ? 'tabbar-box-color-active' : 'tabbar-box-color'"
              style="font-size: 50rpx">{{item.icon}}</view>
        <view class="t-size-28"
              :class="index === currentActive ? 'tabbar-box-color-active' : 'tabbar-box-color'"
        >{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabbarList: [
        {title: '首页', icon: '\ue731', path: '/pages/index/index'},
        {title: 'AI作文', icon: '\ue61d', path: ''},
        {title: '虚拟人对练', icon: '\ue606', path: '/pages/virtualCharacter/index'},
        {title: 'AI演讲', icon: '\uee19', path: ''},
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
      this.$navigateTo(item.path);
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
  color: #1863E5;
}
.tabbar-box-color {
  color: #97BDFF;
}
</style>
