<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">AI作文</view>
    </cy-navbar>

    <view class="item-1 mt-3" @click="toPage(0)">
      <view class="common-content content-1 flex align-item-center justify-content-around">
        <view class="circle circle-01 flex align-item-center justify-content-center">
          <text>01</text>
        </view>
        <image class="image" :src="`${imageBaseUrl}/img_11.png`" mode="widthFix"></image>
        <view class="text-css t-color-3D3D3D">
          <text>AI英语</text>
          <text class="c-299C0A">中考</text>
          <text>作文</text>
        </view>
      </view>
    </view>
    <view class="item-1" @click="toPage(1)">
      <view class="common-content content-2 flex align-item-center justify-content-around">
        <view class="circle circle-02 flex align-item-center justify-content-center">
          <text>02</text>
        </view>
        <image class="image" :src="`${imageBaseUrl}/img_12.png`" mode="widthFix"></image>
        <view class="text-css t-color-3D3D3D">
          <text>AI英语</text>
          <text class="c-CE0E0E">高考</text>
          <text>作文</text>
        </view>
      </view>
    </view>
    <view class="item-1" @click="toPage(2)">
      <view class="common-content content-3 flex align-item-center justify-content-around">
        <view class="circle circle-03 flex align-item-center justify-content-center">
          <text>03</text>
        </view>
        <image class="image" :src="`${imageBaseUrl}/img_13.png`" mode="widthFix"></image>
        <view class="text-css t-color-3D3D3D">
          <text>AI英语</text>
          <text class="c-9A8706">教材</text>
          <text>作文</text>
        </view>
      </view>
    </view>

    <view class="teacher flex align-item-center justify-content-around">
      <view class="drill-common drill-1" @click="toPage(3)">
        <view class="drill-circle drill-circle-01 flex align-item-center justify-content-center">
          <text>04</text>
        </view>
        <image class="drill-image mt-4" :src="`${imageBaseUrl}/img_14.png`" mode="widthFix"></image>
        <view class="t-color-3D3D3D mb-1 text-css">
          <text>AI英语</text>
          <text class="t-2E00D5">作文训练</text>
        </view>
      </view>
      <view class="drill-common drill-2">
        <view class="drill-circle drill-circle-02 flex align-item-center justify-content-center">
          <text>05</text>
        </view>
        <image class="drill-image mt-4" :src="`${imageBaseUrl}/img_15.png`" mode="widthFix"></image>
        <view class="t-color-3D3D3D mb-1 text-css">
          <text>AI英语</text>
          <text class="t-D17310">作文批改</text>
        </view>
      </view>
    </view>

    <view class="library flex align-item-center justify-content-around" @click="$navigateTo(`/pages/composition/englishLibrary?type=0`)">
      <view class="library-1 library-common">
        <view class="drill-circle library-circle-01 flex align-item-center justify-content-center">
          <text>06</text>
        </view>
        <image class="library-image mt-4" :src="`${imageBaseUrl}/img_16.png`" mode="widthFix"></image>
        <view class="t-color-3D3D3D mb-1 text-css">
          <text class="t-002BA3">我的英语作文库</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {};
  },
  methods: {
    toPage(index) {
      this.$navigateTo(`/pages/composition/titleSubject?index=${index}`);
    }
  },
}
</script>

<style lang="scss">
.item-1 {
  padding: 25rpx 100rpx;
}

.common-content {
  position: relative;
  height: 148rpx;
  border-radius: 15rpx;
  background: transparent;
  box-sizing: border-box;
  box-shadow: 0px 4rpx 10rpx 0px rgba(0, 0, 0, 0.1);
  padding: 0 50rpx;
}

.common-content::before,
.common-content::after {
  content: "";
  position: absolute;
  top: -1rpx; /* 更细的边框 */
  right: -1rpx; /* 更细的边框 */
  bottom: -1rpx; /* 更细的边框 */
  left: -1rpx; /* 更细的边框 */
  border-radius: 15rpx;
  z-index: -1;
}

.common-content::after {
  top: 1rpx; /* 更细的边框 */
  right: 1rpx; /* 更细的边框 */
  bottom: 1rpx; /* 更细的边框 */
  left: 1rpx; /* 更细的边框 */
  border-radius: 15rpx;
}

.content-1::before {
  background: linear-gradient(180deg, #FFFFFF 0%, #299C0A 99%);
}

.content-1::after {
  background: linear-gradient(180deg, #E5FFDF 0%, #FFFFFF 100%);
}

.content-2::before {
  background: linear-gradient(180deg, #FFFFFF 0%, #CE0E0E 99%);
}

.content-2::after {
  background: linear-gradient(180deg, #FFECEC 0%, #FFFFFF 100%);
}

.content-3::before {
  background: linear-gradient(180deg, #FFFFFF 0%, #ABAE00 99%);
}

.content-3::after {
  background: linear-gradient(180deg, #FDFFD6 0%, #FFFFFF 100%);
}


.circle {
  position: absolute;
  left: -35.5rpx;
  width: 71rpx;
  height: 71rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 50%;
}

.drill-circle {
  position: absolute;
  top: -35.5rpx;
  width: 71rpx;
  height: 71rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 50%;
}

.circle-01 {
  border: 1rpx solid #24A800;
  text-color: #166800;
}

.circle-02 {
  border: 1rpx solid #E4483C;
  text-color: #9B0000;
}

.circle-03 {
  border: 1rpx solid #C5A96E;
  text-color: #9C8C00;
}

.image {
  width: 100rpx;
  height: 100rpx;
}

.text-css {
  line-height: normal;
  letter-spacing: 0.13em;
}

.c-299C0A {
  color: #299C0A;
  font-weight: bold;
  font-size: 32rpx;
  border-bottom: 4rpx solid #299C0A;
}

.c-CE0E0E {
  color: #CE0E0E;
  font-weight: bold;
  font-size: 32rpx;
  border-bottom: 4rpx solid #CE0E0E;
}

.c-9A8706 {
  color: #9A8706;
  font-weight: bold;
  font-size: 32rpx;
  border-bottom: 4rpx solid #9A8706;
}

.teacher {
  margin-top: 70rpx;
  padding: 0 50rpx;

  .drill-common {
    position: relative;
    width: 280rpx;
    height: 250rpx;
    border-radius: 15rpx;
    background: transparent;
    box-sizing: border-box;
    box-shadow: 0px 4rpx 10rpx 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .drill-common::before,
  .drill-common::after {
    content: "";
    position: absolute;
    top: -1rpx;
    right: -1rpx;
    bottom: -1rpx;
    left: -1rpx;
    border-radius: 15rpx;
    z-index: -1;
  }

  .drill-common::after {
    top: 1rpx;
    right: 1rpx;
    bottom: 1rpx;
    left: 1rpx;
    border-radius: 15rpx;
  }

  .drill-1::before {
    background: linear-gradient(360deg, #FFFFFF 0%, #4D34A9 99%);
  }

  .drill-circle-01 {
    border: 1rpx solid #4D34A9;
    color: #3600A3;
  }

  .drill-circle-02 {
    border: 1rpx solid #D17310;
    color: #3600A3;
  }

  .t-D17310 {
    color: #D17310;
    font-weight: bold;
    font-size: 32rpx;
    border-bottom: 4rpx solid #D17310;
  }

  .t-2E00D5 {
    color: #2E00D5;
    font-weight: bold;
    font-size: 32rpx;
    border-bottom: 4rpx solid #2E00D5;
  }

  .drill-1::after {
    background: linear-gradient(360deg, #DED4FF 0%, #FFFFFF 100%);
  }

  .drill-2::before {
    background: linear-gradient(360deg, #FFFFFF 0%, #D28A1F 99%);
  }

  .drill-2::after {
    background: linear-gradient(360deg, #FFE0B1 0%, #FFFFFF 100%);
  }

  .drill-image {
    width: 100rpx;
    height: 100rpx;
  }
}

.circle, .drill-circle, .library-cricle {
  text {
    font-family: YouSheBiaoTiHei;
    font-size: 34rpx;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0.05em;
  }
}

.library {
  margin-top: 70rpx;
  padding: 0 50rpx;
}

.library-common {
  position: relative;
  width: 400rpx;
  height: 300rpx;
  border-radius: 15rpx;
  background: transparent;
  box-sizing: border-box;
  box-shadow: 0px 4rpx 10rpx 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.library-common::before,
.library-common::after {
  content: "";
  position: absolute;
  top: -1rpx;
  right: -1rpx;
  bottom: -1rpx;
  left: -1rpx;
  border-radius: 15rpx;
  z-index: -1;
}

.library-common::after {
  top: 1rpx;
  right: 1rpx;
  bottom: 1rpx;
  left: 1rpx;
  border-radius: 15rpx;
}

.library-1::before {
  background: linear-gradient(360deg, #FFFFFF 0%, #002BA3 99%);
}

.library-1::after {
  background: linear-gradient(360deg, #CEE4FF 0%, #FFFFFF 100%);
}

.library-image {
  width: 130rpx;
  height: 130rpx;
}

.t-002BA3 {
  color: #002BA3;
  font-weight: bold;
  font-size: 32rpx;
  border-bottom: 4rpx solid #2E00D5;
}

.library-circle-01 {
  border: 1rpx solid #002BA3;
  color: #002BA3;
}
</style>
