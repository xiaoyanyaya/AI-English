<template>
  <view class="main">
    <cy-navbar :showBack="false" bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">复习历程</view>
    </cy-navbar>

    <view class="pt-5 px-4">
      <view class="t-size-30 t-color-636363 font-weight-bold">人教版 初中英语（八年级上）</view>

      <view class="top-content mt-3 px-5 flex align-item-center justify-content-between">
        <view class="t-size-36 font-weight-bold t-color-1863E5">Unit 1</view>
        <view class="flex flex-direction-column">
          <view class="t-size-20 t-color-8A8A8A">2024-03-27 17:08:00</view>
          <view class="t-size-28 mt-2 t-color-636363">总单词数：20个</view>
        </view>
      </view>

      <view class="content-header mt-3 flex align-item-center">
        <view class="t-size-24 t-color-fff item" v-for="(item,index) in headerMenu" :key="index">
          {{item}}
        </view>
      </view>
      <view v-for="(item,index) in data" :key="index"
            class="item-content flex justify-content-around align-item-center">
        <view>{{item.time}}</view>
        <view>{{item.time}}</view>
        <view>{{item.correct}}</view>
        <view>{{item.error}}</view>
        <view>{{item.pass}}</view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      headerMenu: ["复习日期", "用时", "正确数", "错误数", "是否通过"],
      data: [{
        date: "2024-03-27",
        time: "18",
        correct: 20,
        error: 1,
        pass: "否"
      }, {
        date: "2024-03-27",
        time: "18",
        correct: 20,
        error: 1,
        pass: "否"
      }, {
        date: "2024-03-27",
        time: "18",
        correct: 20,
        error: 1,
        pass: "否"
      }, {
        date: "2024-03-27",
        time: "18",
        correct: 20,
        error: 1,
        pass: "否"
      }, {
        date: "2024-03-27",
        time: "18",
        correct: 20,
        error: 1,
        pass: "是"
      }]
    };
  }
}
</script>

<style lang="scss" scoped>
  .top-content {
    height: 140rpx;
    border-radius: 10rpx;
    background: #EAF3FF;
    box-sizing: border-box;
    border: 3px solid #E5F3FF;
  }

  .content-header {
    height: 100rpx;
    background: #508BF6;
    border-radius:10rpx 10rpx 0 0 ;

    view {
      width: 20%;
      text-align: center;
    }
  }

  .item-content {
    view {
      width: 20%;
      text-align: center;
    }
  }
</style>
