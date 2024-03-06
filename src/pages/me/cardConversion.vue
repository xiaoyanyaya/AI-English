<template>
  <view class="pt-3">
    <cy-navbar show-back>
      <view class="t-size-30">卡密兑换</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box px-4 pb-4 pt-4 mt-4">
        <input class="t-size-24"
               :maxlength="10" style="width: 80%;" :placeholder="'请输入卡密'" v-model="value"/>
      </view>

      <view class="save-btn flex align-item-center justify-content-center t-color-fff mt-3">
        立即兑换
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      value:''
    };
  }
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
}

.save-btn {
  height: 74rpx;
  border-radius: 50rpx;
  opacity: 1;
  background: #43D0B2;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
}
</style>
