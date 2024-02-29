<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">选择年级</view>
    </cy-navbar>

    <view class="px-4">
      <view class="mt-7 ml-5"><text class="font-weight-bold t-size-30">选择我的年级</text></view>

      <view class="grade-grap mt-4">
        <view class="grade-box mt-1 flex justify-content-center"
        v-for="(item, index) in gradeList" :key="index"
        @click="selectGrade(index)">
          <image class="mt-2"
                 :style="{width: `${item.width}rpx`}"
                 :src="`${imageBaseUrl}${item.image}`" mode="widthFix"></image>
          <view class="criteria" :style="{background: `${item.color}`}"></view>
          <view class="criteria2" :style="{background: `${item.color}`}"></view>
          <view class="criteria3" :style="{background: `${item.color}`}"></view>
          <view class="grade-btn flex align-item-center justify-content-center"
                :class="item.isSelect ? 'active' : ''">
            七年级
          </view>
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
    return {
      // 年级列表
      gradeList: [
        {title: '七年级', image:'/img_18.png', color:'#E1EDFF', width: 130, isSelect: true},
        {title: '八年级', image:'/img_19.png', color:'#FFE8CF', width: 180, isSelect: false},
        {title: '九年级', image:'/img_20.png', color:'#E9FFE1', width: 120, isSelect: false},
        {title: '高一', image:'/img_21.png', color:'#FFD3CF', width: 160, isSelect: false},
        {title: '高二', image:'/img_22.png', color:'#FFFCE1', width: 90, isSelect: false},
        {title: '高三', image:'/img_23.png', color:'#FFDEEE', width: 110, isSelect: false}
      ]
    };
  },
  methods: {
    selectGrade(index) {
      this.gradeList.forEach((item, i) => {
        item.isSelect = i === index;
      });
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}
.grade-grap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  .grade-box {
    height: 320rpx;
    border-radius: 20rpx;
    opacity: 1;
    background: #FFFFFF;
    box-shadow: 0px 0px 10rpx 0px #BFBFBF;
    position: relative;
    overflow: hidden;

    .criteria {
      position: absolute;
      width: 54rpx;
      height: 54rpx;
      border-radius: 50%;
      top: 100rpx;
      right: 30rpx;
    }
    .criteria2 {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      top: 30rpx;
      left: 30rpx;
    }
    .criteria3 {
      position: absolute;
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      bottom: 90rpx;
      left: 40rpx;
    }

    .grade-btn {
      width: 100%;
      height: 60rpx;
      background: #BFBFBF;
      position: absolute;
      bottom: 0;
      color: #FFFFFF;

      &.active {
        background: #1863E5;
      }
    }
  }
}
</style>
