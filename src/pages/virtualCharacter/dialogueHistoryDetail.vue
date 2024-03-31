<template>
  <view class="main-body pb-5">
    <cy-navbar showBack>
      <view class="t-size-30">结果报告</view>
    </cy-navbar>

    <view class="top-content-box flex align-item-center justify-content-center">
      <view class="top-content border-box pt-4 pb-3 px-5">
        <view class="flex justify-content-between">
          <view class="flex align-item-center ml-3">
            <image src="/static/logo.png" style="width: 50rpx; height: 50rpx;border-radius: 50%"></image>
            <view class="t-size-26 ml-2">自由对话</view>
          </view>
          <view>
            <image :src="`${imageBaseUrl}/3-25-01.png`" style="width: 40rpx; height: 40rpx;"></image>
          </view>
        </view>

        <view class="flex justify-content-between px-3 mt-6 align-item-center t-color-818181">
          <view class="flex flex-direction-column align-item-center">
            <view class="font-weight-bold t-size-32 t-color-DC0C0C">80</view>
            <view class="mt-1 t-size-22">总评分</view>
          </view>
          <view class="flex flex-direction-column align-item-center">
            <view>
              <text class="font-weight-bold t-size-32 t-color-3D3D3D">80</text>
              <text class="mt-1 t-size-22">/100</text>
            </view>
            <view class="mt-1 t-size-22">发音评分</view>
          </view>
          <view class="flex flex-direction-column align-item-center">
            <view>
              <text class="font-weight-bold t-size-32 t-color-3D3D3D">80</text>
              <text class="t-size-22">/100</text>
            </view>
            <view class="mt-1 t-size-22">语法评分</view>
          </view>
        </view>
      </view>
    </view>

    <view class="mt-5 px-4">
      <view class="flex justify-content-between ">
        <view class="yi-content px-2 pt-2 pb-2 flex">
          <view class="t-size-26 mr-4">
            Hi there！I'mEcho,your English conversation partner. How can I help you today？
          </view>
          <view class="">
            <image :src="`${imageBaseUrl}/3-25-02.png`" mode="widthFix" style="width: 14rpx; "></image>
          </view>
        </view>
        <view class="yi t-color-818181 t-size-26 flex align-item-center justify-content-center">
          译
        </view>
      </view>

      <view class="yi-content-2 mt-5 border-box pl-4 pr-3">
        <view class="sort-box flex align-item-center justify-content-center t-size-22 t-color-fff">
          <view>需要修正</view>
          <u-icon name="checkbox-mark" color="#FFFFFF" size="22"></u-icon>
        </view>
        <view class="flex justify-content-between pt-7">
          <view class="t-size-26">Hello!</view>
          <image :src="`${imageBaseUrl}/3-25-03.png`" mode="widthFix" style="width: 14rpx; "></image>
        </view>

        <view class="flex mt-5">
          <view class="run-color t-size-22">AI润色</view>
        </view>
        <view class="flex justify-content-between mt-1 border-bottom pb-3">
          <view class="mr-1 t-size-26">How can I help you today？</view>
          <image :src="`${imageBaseUrl}/3-25-03.png`" mode="widthFix" style="width: 14rpx; "></image>
        </view>

        <view class="flex mt-5">
          <view class="run-color t-size-22">AI建议</view>
        </view>
        <view class="flex justify-content-between mt-1 border-bottom pb-3">
          <view class="mr-1 t-size-26">此句在语义上更贴切地表达出用户对上文所提问</view>
          <image :src="`${imageBaseUrl}/3-25-03.png`" mode="widthFix" style="width: 14rpx; "></image>
        </view>

        <view class="flex mt-5">
          <view class="run-color t-size-22">发音建议</view>
        </view>
        <view class="flex justify-content-between align-item-center mt-1 pb-5">
          <image :src="`${imageBaseUrl}/3-25-03.png`" mode="widthFix" style="width: 14rpx; "></image>
          <view class="ml-2 mr-2 mask flex align-item-center justify-content-center t-size-24">
            Hello!
          </view>
          <view class="mr-1 t-size-26">此句在语义上更贴切地表达出用户对上文所提问</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {getAiDialogueRecordList} from "@/api/aiDialogue";

export default {
  mixins: [MyMixin],
  data() {
    return {};
  },
  onLoad({id}) {
    this.network().getAiDialogueRecordList(id);
  },
  methods: {
    network() {
      return {
        getAiDialogueRecordList: async (id) => {
          const res = await getAiDialogueRecordList({
            chatSessionId: id
          });
          console.log(res.data.result)
        }
      }
    }
  },
}
</script>

<style lang="scss">
.top-content-box {
  width: 750rpx;
  height: 364rpx;
  background: linear-gradient(296deg, rgba(222, 131, 117, 0.5) 0%, rgba(238, 189, 189, 0.4) 23%, rgba(147, 181, 232, 0.5) 56%, rgba(75, 125, 234, 0.5) 100%);

  .top-content {
    width: 650rpx;
    height: 284rpx;
    border-radius: 30rpx;
    background: linear-gradient(180deg, rgba(247, 250, 255, 0.3) 0%, rgba(247, 250, 255, 0) 100%);
  }
}

.yi-content {
  width: 590rpx;
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.8);
}

.yi {
  margin-top: 4rpx;
  width: 50rpx;
  height: 50rpx;
  border-radius: 10rpx;
  background: rgba(255, 255, 255, 0.8);
}

.yi-content-2 {
  position: relative;
  width: 670rpx;
  border-radius: 30rpx;
  overflow: hidden;

  background: linear-gradient(180deg, rgba(73, 138, 255, 0.15) 0%, rgba(73, 138, 255, 0.15) 100%);

  .sort-box {
    position: absolute;
    z-index: 1000;
    width: 150rpx;
    height: 50rpx;
    background: #FAAC0F;
    border-radius: 0 0 30rpx 0;
    position: absolute;
    top: 0;
    left: 0;

    view {
      margin-right: 4rpx;
    }
  }
}

.run-color {
  border-radius: 10rpx 0 10rpx 0;
  background: #5995FC;
  color: #FFFFFF;
  padding: 6rpx 12rpx;
}

.border-bottom {
  border-bottom: 1px dashed #A6C7FF;
}

.mask {
  width: 100rpx;
  height: 52rpx;
  border-radius: 10rpx;
  background: rgba(255, 255, 255, 0.5);
}
</style>
