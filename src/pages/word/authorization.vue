<template>
  <view class="body" :style="bodyStyle">
    <cy-navbar showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view
      class="flex align-item-center justify-content-center flex-direction-column"
    >
      <image
        :src="`${imageBaseUrl}/8-13-05.png`"
        mode="widthFix"
        class="main-image mb-5"
      ></image>

      <view class="t-color-3D3D3D t-size-36">{{ titlee }}！</view>
      <view class="t-color-8A8A8A t-size-26 mt-2"
        >授权关注公众号，获取您的日常学习通知</view
      >
      <view class="t-color-8A8A8A t-size-26 mt-3">快来解锁更多功能吧~</view>

      <view
        @click="toNav('/pages/word/webview')"
        class="flex align-item-center justify-content-center"
      >
        <view
          class="btn-box flex align-item-center justify-content-center t-size-32 t-color-fff"
        >
          去关注小礼AI公众号
        </view>
      </view>
    </view>
  </view>
</template>
  
  <script>
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  computed: {
    bodyStyle() {
      return `background-image: url(${this.imageBaseUrl}/8-13-03.png);
                background-size: 100% 100%;`;
    },
  },
  data() {
    return {
      titlee: "答题完成！",
    };
  },
  onLoad(e) {
    if (e) this.titlee = "立享优惠";
  },
  methods: {
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
  },
};
</script>
  
  <style lang="scss">
.body {
  min-height: 100vh;
}

.main-image {
  width: 25%;
  margin-top: 200rpx;
  margin-right: 50rpx;
}

.btn-box {
  width: 450rpx;
  height: 80rpx;
  border-radius: 50rpx;
  background: #ffffff;
  border: 1px solid #1863e5;
  color: #1863e5;
  margin-top: 100rpx;
}
</style>
  