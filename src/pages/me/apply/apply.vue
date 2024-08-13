<template>
  <view class="body" :style="bodyStyle">
    <cy-navbar showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">申请成为合作商</view>
    </cy-navbar>

    <view class="flex align-item-center justify-content-center flex-direction-column">
      <image :src="`${imageBaseUrl}/8-13-05.png`" mode="widthFix" class="main-image mb-5"></image>

      <view class="t-color-3D3D3D t-size-36">提交成功！</view>
      <view class="t-color-8A8A8A t-size-26 mt-2">审核中，请耐心等待~</view>

      <view class="flex align-item-center justify-content-center">
        <view class="btn-box flex align-item-center justify-content-center t-size-32 t-color-fff">
          返回会员中心
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "../../../utils/MyMixin";

export default {
  mixins: [MyMixin],
  computed: {
    bodyStyle() {
      return `background-image: url(${this.imageBaseUrl}/8-13-03.png);
              background-size: 100% 100%;`
    }
  },
  data() {
    return {};
  }
}
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
  border: 1px solid #1863E5;
  color: #1863E5;
  margin-top: 130rpx;
}
</style>
