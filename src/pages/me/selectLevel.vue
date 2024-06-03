<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">选择年级</view>
    </cy-navbar>

    <view class="px-4">
      <view class="mt-7 ml-5"><text class="font-weight-bold t-size-30">选择英语等级</text></view>

      <view class="english-level-box">
        <view class="px-4 pb-5 mt-5">
          <view class="item mt-3 flex align-item-center border-box px-3"
                :class="{active: item.isSelect}"
                @click="selectLevel(index)"
                v-for="(item, index) in englishLevelList" :key="index">
            <view class="cricle-parent flex align-item-center justify-content-center"
                  :class="{active: item.isSelect}">
              <view class="cricle"></view>
            </view>
            <view class="ml-4">
              {{ item.title }}
            </view>
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
      englishLevelList: [
        {title: '新手A1：词汇量少，对话困难', value: '', isSelect: true},
        {title: '新手A2：词汇量少，对话困难', value: '', isSelect: false},
        {title: '初级B1：词汇量适中，对话基本', value: '', isSelect: false},
        {title: '中级B2：词汇量丰富，对话流利', value: '', isSelect: false},
        {title: '高级C1：词汇量丰富，对话流利', value: '', isSelect: false},
        {title: '高级C2：词汇量丰富，对话流利', value: '', isSelect: false}
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
page {
  background: #F5FBFD;
}
.english-level-box {
  height: 800rpx;

  .title {
    position: fixed;
    top: 0;
    width: 100%;
    background: #FFFFFF;
    border-bottom: 1px solid #D8D8D8;
  }

  .item {
    height: 110rpx;
    border-radius: 30rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1rpx solid #BFBFBF;

    &.active {
      background: #E1EDFF;
      border: 1px solid #1863E5;
      color: #1863E5;
    }

    .cricle-parent {
      width: 40rpx;
      height: 40rpx;
      background: #D8D8D8;
      border-radius: 50%;

      &.active {
        background: #1863E5;
      }

      .cricle {
        width: 22rpx;
        height: 22rpx;
        background: #FFFFFF;
        border-radius: 50%;
      }
    }
  }
}
</style>
