<template>
  <view class="pb-5">
    <cy-navbar>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="px-4 mt-5">
      <view class="user-box flex align-item-center justify-content-between border-box px-3">
        <view class="flex align-item-center">
          <viwe class="mr-2 user-img-box flex align-item-center justify-content-center">
            <image :src="`${imageBaseUrl}/xl-image-42.png`" mode="widthFix" class="user-img"></image>
          </viwe>
          <view class="t-color-3D3D3D" v-if="0">未登录用户</view>
          <view v-if="1" class="ml-3">
            <view class="t-size-30 t-color-3D3D3D flex align-item-center">
              <view>小礼AI</view>
              <image :src="`${imageBaseUrl}/icon_6.png`" mode="widthFix" class="user-write mt-1 ml-1"></image>
            </view>
            <view class="t-size-24 t-color-8A8A8A mt-1">ID: 123456</view>
          </view>
        </view>
        <view @click="$navigateTo('/pages/me/personInfo')">
          <image :src="`${imageBaseUrl}/xl-image-42.png`" mode="widthFix" class="setting-img"></image>
        </view>
      </view>

      <view :style="userCenterBoxStyle"
            class="user-center-box flex align-item-center justify-content-between border-box">
        <view class="">
          <view class="flex align-item-center">
            <image :src="`${imageBaseUrl}/icon_11.png`" mode="widthFix" class="user-center-img"></image>
            <view class="user-center-text ml-2">会员中心</view>
          </view>
          <view class="mt-2 t-size-24 user-center-desc">
            开通VIP立享所有权益
          </view>
        </view>
        <view class="user-center-btn t-color-fff flex align-item-center justify-content-center t-size-24">
          立享优惠
        </view>
      </view>

      <view class="person-info-box px-4 pb-4 mt-4">
        <view class="flex align-item-center justify-content-between pt-4 mt-1"
              v-for="(item, index) in menuList" :key="index"
              @click="toPage(parentIndex, index)">
          <view class="flex align-item-center">
            <image :src="`${imageBaseUrl}/${item.image}`" class="ml-1" mode="widthFix"></image>
            <view class="ml-3">{{item.title}}</view>
          </view>
          <view class="flex align-item-center">
            <view class="ml-2">
              <u-icon name="arrow-right" color="#8A8A8A" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>

    </view>

    <cy-tabbar :currentActive="1"></cy-tabbar>
  </view>
</template>

<script>

import MyMixin from '@/utils/MyMixin.js'
export default {
  mixins: [MyMixin],
  data() {
    return {
      currentPage: 1,

      menuList: [
        { title: '分销中心', image: 'icon_7.png' },
        { title: '卡密兑换', image: 'icon_8.png' },
        { title: '联系客服', image: 'icon_9.png' },
        { title: '邀请好友', image: 'icon_10.png' }
      ]
    };
  },
  computed: {
    userCenterBoxStyle() {
      return `background: url(${this.imageBaseUrl}/img_17.png) no-repeat center center; background-size: cover;`
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}

.user-box {
  height: 152rpx;
  border-radius: 30rpx;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;

  .user-write {
    width: 34rpx;
    height: 34rpx;
  }

  .user-img-box {
    background: #D8D8D8;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }
  .user-img {
    width: 40rpx;
    height: 40rpx;
  }

  .setting-img {
    width: 30rpx;
    height: 30rpx;
  }
}

.user-center-box {
  height: 200rpx;
  margin-top: 40rpx;
  border-radius: 30rpx;
  padding-left: 60rpx;
  padding-right: 50rpx;

  .user-center-img {
    width: 40rpx;
    height: 40rpx;
  }

  .user-center-text {
    font-family: Source Han Sans;
    font-size: 32rpx;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    font-feature-settings: "kern" on;
    background: linear-gradient(106deg, #E99544 14%, #592B00 79%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .user-center-desc {
    color: #A59789;
  }

  .user-center-btn {
    width: 210rpx;
    height: 60rpx;
    border-radius: 156rpx;
    background: #DB7716;
  }
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
