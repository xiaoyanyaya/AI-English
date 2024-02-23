<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">AI演讲</view>
    </cy-navbar>

    <view class="px-5 py-3">
      <view class="flex justify-content-center">
        <view class="my-image mr-5 flex align-item-center justify-content-center">
          <text class="font-weight-bold">我的形象</text>
        </view>
        <view class="my-image-template flex align-item-center justify-content-center">
          <text class="font-weight-bold">形象模板库</text>
        </view>
      </view>

      <view class="select-template-box mt-6">
        <view class="flex justify-content-between font-weight-bold mb-2">
          <view class="t-color-3D3D3D">请选择</view>
          <view class="view-more">查看更多>></view>
        </view>
        <view class="grid-container">
          <view class="grid-item" v-for="(item, index) in publicTemplateList" :key="index" v-if="index < 4">
            <view v-if="index === 0" class="flex flex-direction-column align-item-center">
              <view class="mt-3">
                <image class="uploa-image" src="/static/logo.png" mode="widthFix"></image>
              </view>
              <view><text class="t-size-24">上传或生成</text></view>
            </view>
            <image class="avatar" v-else :src="item.image" mode="widthFix"></image>
          </view>
        </view>
      </view>

      <view class="select-template-box mt-10">
        <view class="flex justify-content-between font-weight-bold mb-2">
          <view class="t-color-3D3D3D">声音模板</view>
          <view class="view-more">查看更多>></view>
        </view>
        <view class="grid-container">
          <view class="grid-item" v-for="(item, index) in publicTemplateList" :key="index" v-if="index < 4">
            <view v-if="index === 0" class="flex flex-direction-column align-item-center">
              <view class="mt-3">
                <image class="uploa-image" src="/static/logo.png" mode="widthFix"></image>
              </view>
              <view><text class="t-size-24">上传或生成</text></view>
            </view>
            <image class="avatar" v-else :src="item.image" mode="widthFix"></image>
          </view>
        </view>
      </view>

      <view class="select-template-box mt-10">
        <view class="flex justify-content-between font-weight-bold mb-2">
          <view class="t-color-3D3D3D">形象模板</view>
          <view class="view-more">查看更多>></view>
        </view>
        <view class="grid-container">
          <view class="grid-item mt-3" v-for="(item, index) in publicTemplateList" :key="index">
            <image class="avatar" :src="item.image" mode="widthFix"></image>
          </view>
        </view>
      </view>

      <view class="generate-avatar-btn mt-10 flex align-item-center justify-content-center">
        <text class="font-weight-bold t-size-32 t-color-fff">立即生成</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      publicTemplateList: [
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
        {image: 'https://yuemei-image.oss-cn-beijing.aliyuncs.com/wxapp/icon/icon_avatar.png'},
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
page {
  background: #F5FBFD;
}

.my-image {
  width: 200rpx;
  height: 60rpx;
  border-radius: 29.5rpx;
  background: #1863E5;
  color: #fff;
}

.my-image-template {
  width: 220rpx;
  height: 60rpx;
  border-radius: 29.5px;
  opacity: 1;
  box-sizing: border-box;
  border: 1px solid #1863E5;
  color: #1863E5;
}

.select-template-box {
  .view-more {
    color: #002BA3;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 20rpx;

    .grid-item {
      width: 150rpx;
      height: 150rpx;
      border-radius: 10rpx;
      background: #fff;
      border: 1px dashed #000000;

      .uploa-image {
        width: 50rpx;
        height: 50rpx;
      }

      .avatar {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.generate-avatar-btn {
  width: 650rpx;
  height: 80rpx;
  border-radius: 50rpx;
  background: #43D0B2;
  box-shadow: 0rpx 0rpx 10rpx 0rpx #D8D8D8;
}
</style>
