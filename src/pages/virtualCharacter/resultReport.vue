<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">结果报告</view>
    </cy-navbar>

    <view class="person-info-box">
      <view class="ml-5 mr-5 mt-3 px-3 py-3 person-info">
        <view class="flex align-item-center">
          <view class="mr-4 avatar flex justify-content-center align-item-center">
            <image src="/static/logo.png" mode="aspectFill"></image>
          </view>
          <view class="t-size-30 font-weight-bold">
            <text>小李飞刀</text>
          </view>
        </view>

        <view class="flex justify-content-around mt-5 t-color-3D3D3D">
          <view class="flex flex-direction-column align-item-center">
            <view class="font-weight-bold t-size-32">0</view>
            <view class="mt-2">总评分</view>
          </view>
          <view class="flex flex-direction-column align-item-center">
            <view>
              <text class="font-weight-bold t-size-32">0</text>
              <text class="mt-1">/100</text>
            </view>
            <view class="mt-2">发音评分</view>
          </view>
          <view class="flex flex-direction-column align-item-center">
            <view>
              <text class="font-weight-bold t-size-32">0</text>
              <text>/100</text>
            </view>
            <view class="mt-2">语法评分</view>
          </view>
        </view>
      </view>
    </view>

    <view class="flex flex-direction-column align-item-center score-box">
      <view><text class="font-weight-bold t-size-36">总评分</text></view>
      <view class="score">
        <text>99</text>
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

<style lang="scss" scoped>
  page {
    background: #F5FBFD;
  }

  .person-info-box {
    width: 750rpx;
    height: 400rpx;
    opacity: 1;
    background: linear-gradient(298deg, #DE8375 0%, #EEBDBD 24%, #93B5E8 74%, #4B7DEA 100%);
    position: relative;
    overflow: hidden;

    .person-info {
      height: 360rpx;
      border-radius: 30rpx;
      background: rgba(255, 255, 255, 0.5);
      box-sizing: border-box;

      .avatar {
        width: 80rpx;
        height: 80rpx;
        background: #D8D8D8;
        border-radius: 50%;
        image {
          width: 80%;
          height: 80%;
          border-radius: 50%;
        }
      }
    }
  }

  .score-box {
    margin-top: 80rpx;

    .score {
      font-family: YouSheBiaoTiHei;
      font-size: 200rpx;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0rpx;
      font-variation-settings: "opsz" auto;
      background: linear-gradient(1deg, #B16A00 -13%, #FF9900 27%, rgba(255, 229, 0, 0.98) 58%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
</style>
