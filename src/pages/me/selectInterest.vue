<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">选择年级</view>
    </cy-navbar>

    <view class="px-5 mt-7">
      <text class="font-weight-bold mb-5">选择兴趣标签</text>

      <view class="english-level-box mt-3">
        <view class="pb-5">
          <view class="item mt-3 flex justify-content-between align-item-center border-box px-3"
                :class="{active: item.isSelect}"
                @click="selectLevel(index)"
                v-for="(item, index) in englishLevelList" :key="index">
            <view class="flex align-item-center">
              <view class="cylinder" :class="{active: item.isSelect}"></view>
              <view class="ml-2">
                {{item.title}}
              </view>
            </view>
            <image :src="`${imageBaseUrl}${item.image}`" mode="widthFix"></image>
          </view>
        </view>
      </view>
    </view>

    <view class="px-3 mt-2">
      <view class="confirm-btn flex align-item-center justify-content-center t-color-fff">
        确定
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
      englishLevelList: [
        {title: '全面提升', value: '', image: '/img_24.png', isSelect: true},
        {title: '口语更溜', value: '', image: '/img_25.png', isSelect: false},
        {title: '满分作文', value: '', image: '/img_26.png', isSelect: false},
        {title: '纯粹好玩', value: '', image: '/img_27.png', isSelect: false},
        {title: '不想背单词', value: '', image: '/img_28.png', isSelect: false},
        {title: '语法好难', value: '', image: '/img_29.png', isSelect: false},
      ],
    };
  },
  methods: {
    selectLevel(index) {
      this.englishLevelList.forEach((item, i) => {
        item.isSelect = i === index
      })
    },
  },
}
</script>

<style lang="scss">
.english-level-box {
  .item {
    height: 130rpx;
    border-radius: 30rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1rpx solid #BFBFBF;
    &.active {
      background: #E1EDFF;
      border: 1px solid #1863E5;
      color: #1863E5;
    }

    .cylinder {
      margin-top: 4rpx;
      width: 10rpx;
      height: 34rpx;
      background: #D8D8D8;
      border-radius: 6rpx;
      &.active {
        background: #1863E5;
      }
    }

    image {
      width: 100rpx;
      height: 100rpx;
      margin-right: 80rpx;
    }
  }
}

.confirm-btn {
  height: 80rpx;
  border-radius: 50rpx;
  opacity: 1;
  background: #3A73D9;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
}
</style>
