<template>
  <view class="pb-5">
    <cy-navbar showBack>
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">
      <view class="flex mt-4" v-if="pageIndex==0">
        <view class="grade flex align-item-center border-box px-1 justify-content-around mr-3"
              @click="showDate = true">
          <text class="t-size-24 t-color-8A8A8A">{{ dateValue }}</text>
          <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
        </view>
        <view class="keywords flex align-item-center border-box px-1 justify-content-around mr-3 t-size-24"
              @click="showDate = true">
          <u-input placeholder="请输入题目关键词"
                   custom-style='font-size: 18rpx;color:#333'
                   :border="false"/>
          <u-icon name="search" color="#8A8A8A" size="28"></u-icon>
        </view>
      </view>
      <view class="flex mt-4" v-if="pageIndex===1">
        <view class="keywords flex align-item-center border-box px-3 justify-content-between  t-size-24"
              @click="showDate = true">
          <u-input placeholder="请输入题目关键词"
                   custom-style='font-size: 18rpx;color:#333'
                   :border="false"/>
          <u-icon name="search" color="#8A8A8A" size="28"></u-icon>
        </view>
      </view>

      <view class="mt-5 font-weight-bold t-size-36 flex align-item-center">
        <view class="font-weight-bold t-size-36">
          作文列表
        </view>
      </view>

      <view class="content-border mt-3 border-box px-2 pt-1 pb-2"
            :class="index % 2 === 1 ? 'active' : ''"
            v-for="(item, index) in contentData" :key="index">
        <view class="flex align-item-center justify-content-between content-top">
          <view class="sort-box">{{ index + 1 }}、</view>
          <view class="title-box">{{ item.compositionTitleText }}</view>
          <view class="t-size-24 t-color-8A8A8A">{{ item.createTime }}</view>
        </view>
        <view class="flex align-item-center mt-2">
          <view class="sort-box"></view>
          <view class="">{{ item.note }}</view>
        </view>
        <view class="flex align-item-center mt-2">
          <view class="sort-box"></view>
          <view class="">{{ item.compositionText }}</view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import {getCompositionList, getCompositionCollectList} from '@/api/composition';

export default {
  data() {
    return {
      pageIndex: 0,
      pageTitle: "我的英语作文库",

      // 日期
      dateValue: "日期",
      showDate: false,

      contentData: [],
    }
  },
  onLoad({type}) {
    this.pageIndex = type
    this.network().getData(type)
  },
  methods: {
    network() {
      return {
        getData: async (type) => {
          let data = "";
          if (type == 0) {
            this.pageTitle = "我的英语作文库";
            data = await getCompositionCollectList();
          } else {
            this.pageTitle = "选择作文题目";
            data = await getCompositionList();
          }
          this.contentData = data.data.result.records
          this.contentData.forEach(d => {
            d.createTime = d.createTime.split(' ')[0]
          })
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.grade {
  width: 200rpx;
  height: 70rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
}

.keywords {
  flex: 1;
  height: 70rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
}

.content-border {
  border-radius: 10rpx;
  box-sizing: border-box;
  border: 1rpx solid #8A8A8A;
  font-size: 26rpx;

  &.active {
    background: #FFF6EE;
  }

  .sort-box {
    width: 50rpx;
  }

  .content-top {
    color: #3C7BDB;
  }

  .title-box {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
  }
}
</style>
