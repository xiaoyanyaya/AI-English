<template>
  <view class="main">
    <cy-navbar showBack :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">{{ title }}</view>
    </cy-navbar>

    <view v-if="title === '产品理念'">
      <image v-for="(item, index) in productConcept" :key="index"
             :src="`${imageBaseUrl}/${item}`" mode="widthFix" style="width: 750rpx"></image>
    </view>
    <view v-else class="flex align-item-center flex-direction-column">
      <image v-for="(item, index) in userStory" :key="index" :class="index === 0 ? 'image1' : 'image2'"
             :src="`${imageBaseUrl}/${item}`" mode="widthFix"></image>
    </view>

  </view>
</template>

<script>
import MyMixin from "../../utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: 'transparent',
      title: '',

      // 产品理念数组
      productConcept: ['6-30-07_01.png', '6-30-07_02.png', '6-30-07_03.png', '6-30-07_04.png', '6-30-07_05.png', '6-30-07_06.png'],
      // 用户故事数组
      userStory: ['6-30-06_01.png', '6-30-06_02.png', '6-30-06_03.png'],
    };
  },
  onLoad({title}) {
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
.image1 {
  width: 600rpx;
  padding: 30rpx 0;
}

.image2 {
  width: 750rpx;
}
</style>
