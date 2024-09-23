<template>
  <view class="body" :style="bodyStyle">
    <cy-navbar
      @customBack="returnCustom"
      customBack
      showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="flex align-item-center justify-content-center flex-direction-column">
      <image :src="`${imageBaseUrl}/9-23-01.png`" mode="widthFix" class="main-image mb-5 ml-2"></image>

      <view class="t-color-3D3D3D t-size-36">会员已过期！</view>
      <view class="t-color-8A8A8A t-size-26 mt-2"></view>

      <view class="flex align-item-center justify-content-center">
        <view @click="$navigateTo('/pages/me/userCenter?type=1')"
          class="btn-box flex align-item-center justify-content-center t-size-32 t-color-fff">
          开通会员
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "../../../utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      message: "审核中，请耐心等待~"
    }
  },
  computed: {
    bodyStyle() {
      return `background-image: url(${this.imageBaseUrl}/8-13-03.png);
              background-size: 100% 100%;`
    }
  },
  onLoad({message}) {
    if (message) {
      this.message = message;
    }
  },
  methods: {
    returnCustom() {
      this.$navigateTo('/pages/me/userCenter?type=1')
    }
  },
}
</script>

<style lang="scss">
.body {
  min-height: 100vh;
}

.main-image {
  width: 30%;
  margin-top: 200rpx;
  margin-right: 50rpx;
}


.btn-box {
  width: 450rpx;
  height: 80rpx;
  border-radius: 50rpx;
  background: #ffffff;
  border: 1px solid #1863E5;
  color: #1863E5;
  margin-top: 130rpx;
}
</style>
