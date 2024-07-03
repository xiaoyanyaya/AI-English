<template>
  <view class="main-body">
    <cy-navbar showBack>
      <view class="t-size-30">场景介绍</view>
    </cy-navbar>

    <view class="py-3 flex flex-direction-column align-item-center">
      <view class="content-1 flex flex-direction-column align-item-center pb-5">
        <image :src="data.sceneLogo" mode="widthFix"
               style="width: 160rpx;height: 140rpx;margin-top: -70rpx"></image>
        <view class="mt-3 t-size-32 t-color-3D3D3D font-weight-bold">{{ data.sceneName }}</view>
        <view class="t-color-3D3D3D t-size-26"
              style="margin-top: 70rpx">{{ data.tips }}
        </view>
      </view>

      <view class="content-2 mt-5 mb-3">
        <view class="font-weight-bold t-color-3D3D3D t-size-32">请完成以下目标：</view>
        <view class="mt-4">
          <view class="flex">
            <view class="blue-triangle mr-2" style="margin-top: 8rpx"></view>
            <view class="t-color-3D3D3D t-size-28"
            style="line-height: 38rpx">
              <rich-text :nodes="data.targetCn"></rich-text>
            </view>
          </view>

          <view class="t-size-24 mt-2 ml-4" style="color: #868686">
            <rich-text :nodes="data.targetEn"></rich-text>
          </view>
        </view>
      </view>

      <view @click="toPage"
        class="btn t-color-fff flex align-item-center justify-content-center mt-5">
        开始对话
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  onLoad() {
    this.data = uni.getStorageSync("sceneData")
    if (this.data.targetCn) {
      this.data.targetCn = this.data.targetCn.replaceAll("\n", "<p></p>")
    }
    if (this.data.targetEn) {
      this.data.targetEn = this.data.targetEn.replaceAll("\n", "<p></p>")
    }
    console.log(this.data)
  },
  methods: {
    toPage() {
      this.$navigateTo("/pages/virtualCharacter/dialogue?sceneId=" + this.data.id);
    }
  },
}
</script>

<style lang="scss">
.content-1 {
  margin-top: 130rpx;
  width: 670rpx;
  border-radius: 20rpx;
  background: #FFFFFF;
  position: relative;
}

.content-2 {
  width: 670rpx;
  border-radius: 20rpx;
  background: #FFFFFF;
  padding: 20rpx 30rpx 30rpx 30rpx;
}

.blue-triangle {
  width: 0;
  height: 0;
  border-left: 12rpx solid transparent;
  border-right: 12rpx solid transparent;
  border-bottom: 20.6rpx solid #1863E5;
}

.btn {
  width: 550rpx;
  height: 80rpx;
  border-radius: 124rpx;
  background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
}
</style>
