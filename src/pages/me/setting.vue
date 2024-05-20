<template>
  <view class="pt-3">
    <cy-navbar show-back>
      <view class="t-size-30">设置</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box px-4 pb-4 mt-4">
        <view class="flex align-item-center justify-content-between pt-4 mt-1"
              v-for="(item, index) in menuList" :key="index"
              @click="toPage(item)">
          <view class="flex align-item-center">
<!--            <image :src="`${imageBaseUrl}/${item.image}`" class="ml-1" mode="widthFix"></image>-->
            <view class="ml-2">{{item.title}}</view>
          </view>
          <view class="flex align-item-center">
            <view class="ml-2">
              <u-icon name="arrow-right" color="#8A8A8A" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { index: 0, title: '用户协议', image: 'icon_7.png' },
        { index: 1, title: '隐私政策', image: 'icon_8.png' },
        { index: 2, title: '使用帮助', image: 'icon_9.png' },
        { index: 3, title: '关于', image: 'icon_10.png' }
      ]
    };
  },
  methods: {
    toPage(item) {
      console.log("test", item)
      this.$navigateTo(`/pages/me/content?type=${item.index}&title=${item.title}`);
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}
.person-info-box {
  border-radius: 30rpx;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
  font-size: 30rpx;

  image {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
