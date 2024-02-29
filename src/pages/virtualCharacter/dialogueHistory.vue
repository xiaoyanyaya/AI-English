<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">对话历史</view>
    </cy-navbar>

    <view class="flex align-item-center justify-content-center">
      <image :src="`${imageBaseUrl}/xl-image-49.png`" mode="widthFix" class="dialogue-img"></image>
    </view>
  </view>
</template>

<script>

import MyMixin from "@/utils/MyMixin";
export default {
  mixins: [MyMixin],
  data() {
    return {};
  }
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}

.dialogue-img {
  margin-top: 260rpx;
}
</style>
