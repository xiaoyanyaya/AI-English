<template>
  <view class="pb-5">
    <cy-navbar>
      <view class="t-size-30">生成结果</view>
    </cy-navbar>

    <view class="px-4 pt-4">
      <view class="content-box">

      </view>

      <view class="flex justify-content-center ">
        <view class="generate-poster-btn mt-8 flex align-item-center justify-content-center">
          <text class="font-weight-bold t-size-32 t-color-fff">生成海报一键分享</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
}
</script>

<style lang="scss">
  .content-box {
    height: 795rpx;
    border-radius: 10rpx;
    background: #CCDFFF;
  }

  .generate-poster-btn {
    width: 500rpx;
    height: 80rpx;
    border-radius: 50rpx;
    background: linear-gradient(90deg, #2A67D2 0%, #002BA3 100%);
    box-shadow: 0rpx 0rpx 10rpx 0rpx #D8D8D8;
  }
</style>
