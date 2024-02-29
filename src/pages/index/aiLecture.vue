<template>
  <view class="pb-5">
    <cy-navbar showBack>
      <view class="t-size-30">AI演讲</view>
    </cy-navbar>

    <view class="px-4">
      <view class=" pt-4 border-box flex">
        <view class="say-image flex align-item-center justify-content-center">
          会说话的照片
        </view>
        <view class="real-avatar flex align-item-center justify-content-center">
          <view class="ml-3">真人头像</view>
        </view>
      </view>
      <view style="height: 70rpx"></view>

      <view class="flex align-item-end select-video">
        <view class="mr-5">01</view>
        <view class="font-weight-bold t-size-32">选择视频模板</view>
      </view>

      <view class="select-video-container">
        <view class="flex align-item-center flex-wrap justify-content-center">
          <view class="mt-3 video-menu-item mr-5 flex align-item-center justify-content-center"
                :class="{active: item.isActive}"
                @click="changeVideoMenu(item, index)"
                v-for="(item, index) in videoMenuList" :key="index">
            {{item.title}}
          </view>
        </view>
      </view>

      <view class="flex align-item-end edit-video">
        <view class="mr-5">02</view>
        <view class="font-weight-bold t-size-32">编辑您的视频脚本</view>
      </view>

      <view class="edit-video-content px-1">
        <u-input v-model="videoContent" :type="'textarea'" :border="false"
                 :maxlength="500"
                 :height="350" :auto-height="false" />

        <view class="max-css">
          {{videoContent.length}}/500
        </view>
      </view>

      <view class="continue-btn mt-10 flex align-item-center justify-content-center"  @click="$navigateTo('/pages/common/appearanceSelection?type=lecture')">
        <text class="font-weight-bold t-size-32 t-color-fff">继续</text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      videoMenuList:[
        {title: '广告', isActive: false},
        {title: '新闻', isActive: false},
        {title: '电视剧', isActive: false},
        {title: '电影', isActive: false},
        {title: '综艺', isActive: false},
        {title: '其他', isActive: true}
      ],
      videoContent: ''
    };
  },
  methods: {
    changeVideoMenu(item, index) {
      this.videoMenuList.forEach((item, itemIndex) => {
        item.isActive = itemIndex === index;
      });
    }
  },
}
</script>

<style lang="scss">

  .border-box {
    position: relative;

    .say-image {
      width: 300rpx;
      height: 70rpx;
      background: #1863E5;
      border-radius: 100rpx 0 200rpx 100rpx;
      position: absolute;
      left: 80rpx;
      color: #FFFFFF;
    }

    .real-avatar {
      width: 300rpx;
      height: 70rpx;
      border-radius: 100rpx;
      box-sizing: border-box;
      border: 1px solid #1863E5;
      position: absolute;
      left: 300rpx;
      color: #1863E5;
    }
  }

  .select-video {
    margin-top: 100rpx;
  }

  .select-video-container {
    .video-menu-item {
      width: 160rpx;
      height: 70rpx;
      border-radius: 15rpx;
      background: #FFFFFF;
      box-sizing: border-box;
      border: 1px dashed #000000;

      // 激活状态
      &.active {
        border: 1px dashed #FF8709;
        color: #FF8709;
      }
    }
  }

  .edit-video {
    margin-top: 100rpx;
  }
  .edit-video-content {
    margin-top: 20rpx;
    height: 410rpx;
    border-radius: 15px;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1px dashed #000000;

    .max-css {
      float: right;
      margin-right: 30rpx;
      font-size: 20rpx;
      color: #BFBFBF;
    }
  }

  .continue-btn {
    width: 650rpx;
    height: 80rpx;
    border-radius: 50rpx;
    background: #FFA547;
    box-shadow: 0rpx 0rpx 10rpx 0rpx #D8D8D8;
  }
</style>
