<template>
  <view class="main">
    <cy-navbar showBack :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">{{ title }}</view>
    </cy-navbar>

    <image :src="imageUrl" mode="widthFix" style="width: 750rpx"></image>

  </view>
</template>

<script>
import MyMixin from "../../utils/MyMixin";
export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: 'transparent',
      imageUrl: '',
      title: '',
    };
  },
  onLoad({ imageUrl, title }) {
    this.imageUrl = imageUrl
    this.title = title
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = '#fff'
    } else {
      this.backColor = 'transparent'
    }
  },
}
</script>

<style lang="scss">
  .main {
    background: #F0F7FF;
  }
</style>
