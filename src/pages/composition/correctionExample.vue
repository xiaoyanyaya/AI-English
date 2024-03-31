<template>
  <view class="pb-5 content">
    <cy-navbar show-back>
      <view class="t-size-30">批改示例</view>
    </cy-navbar>

    <view class="px-4">
      <view class="title-box text-center mt-5">
        <text class="t-size-32 font-weight-bold">2023年广东高考作文</text>
        <view class="bg"></view>
      </view>

      <view class="person-box mt-5 ml-2 flex align-item-center justify-content-around">
        <view class="flex align-item-center">
          <image :src="`${imageBaseUrl}/icon_a1.png`" mode="widthFix" class=""></image>
          <view class="ml-1 t-color-3D3D3D t-size-22">张同学</view>
        </view>
        <view class="flex align-item-center">
          <image :src="`${imageBaseUrl}/icon_a2.png`" mode="widthFix" class=""></image>
          <view class="ml-1 t-color-3D3D3D t-size-22">深圳中学</view>
        </view>
      </view>

      <view class="menu-box mt-6 px-3 flex justify-content-between">
        <view v-for="(item, index) in menuList" :key="index" class="flex flex-direction-column align-item-center">
          <view class="item flex align-item-center justify-content-center"
                :style="{background: item.bgColor}">
            <image :src="`${imageBaseUrl}${item.image}`" mode="widthFix"></image>
          </view>
          <view class="mt-2">{{ item.title }}</view>
        </view>
      </view>

      <view class="mt-5 font-weight-bold flex align-item-center">
        <view class="font-weight-bold t-size-28 ml-3">
          作文题目
        </view>
      </view>
      <view class="ai-title-box mt-2">
        <textarea class="t-size-22"
                  style="height: 100%; width: 100%;"
                  v-model="essayData.title"
                  placeholder="请输入作文题目"></textarea>
      </view>

      <view class="mt-6 font-weight-bold flex align-item-center">
        <view class="font-weight-bold t-size-28 ml-3">
          作文内容
        </view>
      </view>
      <view class="ai-title-box mt-2">
        <textarea class="t-size-22"
                  style="height: 100%; width: 100%;"
                  v-model="essayData.content"
                  placeholder="请输入作文内容"></textarea>
      </view>

    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      menuList: [{
        image: '/xl-image-18.png',
        title: '内容',
        bgColor: 'linear-gradient(180deg, #96D0FF 0%, rgba(216, 216, 216, 0) 100%)'
      }, {
        image: '/xl-image-18.png',
        title: '纠错',
        bgColor: 'linear-gradient(180deg, #ACFF96 0%, rgba(216, 216, 216, 0) 100%)'
      }, {
        image: '/xl-image-18.png',
        title: '点评',
        bgColor: 'linear-gradient(180deg, #FFCF87 0%, rgba(216, 216, 216, 0) 100%)'
      }, {
        image: '/xl-image-18.png',
        title: '范文',
        bgColor: 'linear-gradient(180deg, #FFA3A3 0%, rgba(216, 216, 216, 0) 100%)'
      }],
      // 作文
      essayData: {
        title: '',
        content: ''
      },
    };
  }
}
</script>

<style lang="scss">
.content {
  background: linear-gradient(180deg, #E3F2FF 0%, rgba(245, 251, 253, 0) 100%);
  padding-bottom: 50rpx;
}

.title-box {
  position: relative;

  .bg {
    position: absolute;
    width: 182rpx;
    height: 16rpx;
    right: 196rpx;
    bottom: 2rpx;
    opacity: 0.3;
    background: #1863E5;
  }
}

.person-box {
  image {
    width: 30rpx;
    height: 30rpx;
  }
}

.menu-box {
  .item {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;

    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
}

.ai-title-box, .ai-review-box {
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 20rpx;
}

.ai-title-box {
  height: 500rpx;
}
</style>
