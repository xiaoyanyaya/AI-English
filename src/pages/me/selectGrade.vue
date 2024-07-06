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
        @click="selectGrade(index, item)">
          <image class="mt-2"
                 style="width: 130rpx"
                 :src="`${imageBaseUrl}${item.image}`" mode="widthFix"></image>
          <view class="criteria" :style="{background: `${item.color}`}"></view>
          <view class="criteria2" :style="{background: `${item.color}`}"></view>
          <view class="criteria3" :style="{background: `${item.color}`}"></view>
          <view class="grade-btn flex align-item-center justify-content-center"
                :class="item.isSelect ? 'active' : ''">
            {{item.title}}
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>

import MyMixin from "@/utils/MyMixin";
import {modifyEnglishLevel, modifyGrade} from "@/api/me";
export default {
  mixins: [MyMixin],
  data() {
    return {
      // 年级列表
      gradeList: [],
      pageForm: ""
    };
  },
  onLoad({pageForm}) {
    this.pageForm = pageForm || "";
    var basicData = uni.getStorageSync('basicData')
    var currGrade = basicData.currGrade || "";
    let color = ['#E1EDFF', '#FFE8CF', '#E9FFE1', '#FFD3CF', '#FFFCE1', '#FFDEEE']
    var data = basicData.dictCodeList.grade
    console.log("data", data)
    data.forEach((item, index) => {
      item.isSelect = item.value === currGrade;
      item.image = `/img_18.png`;
      item.color = color[index % color.length];
    });
    this.gradeList = data;
  },
  methods: {
    selectGrade(index, item) {
      this.gradeList.forEach((item, i) => {
        item.isSelect = i === index;
      });
      modifyGrade({grade: item.value}).then(res => {
        this.getBasicData()
        uni.showToast({
          title: '设置成功',
          icon: 'none'
        })
        if (this.pageForm === 'login') {
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            });
          }, 1000)
        }
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
