<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">获取时长</view>
    </cy-navbar>

    <view class="px-4 pb-5">
      <view class="title-box">
        <view class="title-box-top">
          <text>邀请</text>
          <text>好友</text>
        </view>
        <view class="mt-1">
          <text>获取口语练习时长</text>
        </view>
      </view>

      <view class="content-box">
        <image :src="`${imageBaseUrl}/xl-image-53.png`" mode="widthFix" class="image1"/>
        <image :src="`${imageBaseUrl}/xl-image-18.png`" mode="widthFix" class="image2"/>
        <view class="content1 flex align-item-center">
          <image :src="`${imageBaseUrl}/img_31.png`" mode="widthFix" class="image3"/>
          <text class="t-size-24 ml-3 mt-1">每邀请一名好友+10分钟自由对话</text>
        </view>
        <view class="content2 flex align-item-center">
          <image :src="`${imageBaseUrl}/img_32.png`" mode="widthFix" class="image4"/>
          <text class="t-size-24 ml-3 mt-1">已邀请人数</text>
          <text class="t-size-30 ml-3 mt-1">0</text>
        </view>
      </view>

      <view class="procedure-box">
        <view class="flex align-item-center pb-5">
          <view><text class="font-weight-bold t-size-36">参与步骤</text></view>
          <view class="flex">
            <view class="procedure-note-triangle"></view>
            <view class="procedure-note flex align-item-center justify-content-center">
              最高可获赠60分钟
            </view>
          </view>
        </view>

        <view class="pr-4 pl-2 pt-2">
          <view class="flex font-weight-bold t-size-40 justify-content-around align-item-center">
            <view>01</view>
            <view class="iconfont">&#xe60c;</view>
            <view>02</view>
            <view class="iconfont">&#xe60c;</view>
            <view>03</view>
            <view class="iconfont">&#xe60c;</view>
            <view>04</view>
          </view>
          <view class="mt-3 flex font-weight-bold t-size-30 justify-content-around align-item-center">
            <view class="flex flex-direction-column align-item-center">
              <text>复制</text>
              <text>邀请码</text>
            </view>
            <view class="flex flex-direction-column align-item-center">
              <text>点击去邀请</text>
              <text>分享给好友</text>
            </view>
            <view class="flex flex-direction-column align-item-center">
              <text>好友打开</text>
              <text>小程序注册</text>
            </view>
            <view class="flex flex-direction-column align-item-center">
              <text>复制</text>
              <text>邀请码</text>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-5 pt-5 flex justify-content-center">
        <text class="font-weight-bold t-size-36">我的邀请码：17jsq278</text>
      </view>

      <view class="invite-box flex align-item-center justify-content-center mt-2">
        <text class="font-weight-bold t-size-36 t-color-fff">去邀请</text>
      </view>

      <view class="code-box flex align-item-center justify-content-center mt-2">
        <text class="font-weight-bold t-size-36">输入邀请码</text>
      </view>
    </view>

  </view>
</template>

<script>
import cyNavbar from "@/components/cy-navbar.vue";
import MyMixin from "@/utils/MyMixin";
export default {
  mixins: [MyMixin],
  components: {cyNavbar}

}
</script>

<style lang="scss">
page {
  background: #F0FCFF;
}

.title-box {
  font-size: 36rpx;
  margin-top: 60rpx;
  margin-left: 50rpx;
}
.title-box-top text:nth-child(2) {
  color: #0041F6;
}

.content-box {
  padding: 0 !important;
  width: 670rpx;
  margin-top: 40rpx;
  height: 400rpx;
  border-radius: 30rpx;
  background: linear-gradient(116deg, rgba(0, 65, 246, 0.7) 0%, rgba(183, 210, 255, 0.7) 114%);
  box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.3);
  position: relative;
  color: #FFFFFF;

  .image1 {
    position: absolute;
    top: -40rpx;
    left: -20rpx;
    width: 320rpx;
  }
  .image2 {
    position: absolute;
    top: -110rpx;
    right: 20rpx;
    width: 220rpx;
  }

  .content1 {
    position: absolute;
    bottom: 150rpx;
    left: 100rpx;
    .image3 {
      width: 60rpx;
      height: 60rpx;
    }
  }

  .content2 {
    position: absolute;
    bottom: 50rpx;
    left: 104rpx;
    .image4 {
      width: 60rpx;
      height: 60rpx;
    }
  }
}

.procedure-box {
  width: 670rpx;
  margin-top: 50rpx;
  height: 400rpx;
  border-radius: 30rpx;
  opacity: 0.7;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 50rpx 30rpx 30rpx 40rpx;
}
.procedure-note-triangle {
  width: 20rpx;
  height: 5rpx;
  border: 30rpx solid;
  border-color: #ffffff #FF8709 #ffffff #ffffff;
}
.procedure-note {
  width: 300rpx;
  height: 60rpx;
  opacity: 1;
  background: linear-gradient(100deg, #FF8709 5%, #FFDCCC 99%);
  color: #ffffff;
}

.invite-box, .code-box {
  width: 670rpx;
  height: 100rpx;
  border-radius: 50rpx;
}
.invite-box {
  background: linear-gradient(180deg, #5D97FD 0%, #1157D0 100%);
}
.code-box {
  border: 1px solid #97BDFF;
  color: #1863E5;
}
</style>
