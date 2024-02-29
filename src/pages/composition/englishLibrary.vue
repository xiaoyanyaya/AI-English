<template>
  <view class="pb-5">
    <cy-navbar showBack>
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">
      <view class="flex mt-4" v-if="pageIndex===0">
        <view class="grade flex align-item-center border-box px-1 justify-content-around mr-3"
              @click="showDate = true">
          <text class="t-size-24 t-color-8A8A8A">{{dateValue}}</text>
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
          <view class="sort-box">{{index + 1}}、</view>
          <view class="title-box">{{ item.title }}</view>
          <view class="t-size-24 t-color-8A8A8A">{{ item.date }}</view>
        </view>
        <view class="flex align-item-center mt-2">
          <view class="sort-box"></view>
          <view class="">{{ item.subTitle }}</view>
        </view>
        <view class="flex align-item-center mt-2">
          <view class="sort-box"></view>
          <view class="">{{ item.content }}</view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageTitle: "我的英语作文库",

      // 日期
      dateValue: "日期",
      showDate: false,

      contentData: [{
        title: "A happy day with my sistem  ",
        date: "2021-08-01",
        subTitle: "作文题目及要求说明（显示前30个单词）",
        content: "作文内容（显示前50个单词）"
      },{
        title: "A happy day with my sistem  ",
        date: "2021-08-01",
        subTitle: "作文题目及要求说明（显示前30个单词）",
        content: "作文内容（显示前50个单词）"
      },{
        title: "A happy day with my sistem  ",
        date: "2021-08-01",
        subTitle: "作文题目及要求说明（显示前30个单词）",
        content: "作文内容（显示前50个单词）"
      },{
        title: "A happy day with my sistem  ",
        date: "2021-08-01",
        subTitle: "作文题目及要求说明（显示前30个单词）",
        content: "作文内容（显示前50个单词）"
      }]
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
