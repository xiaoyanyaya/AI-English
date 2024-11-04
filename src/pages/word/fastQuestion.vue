<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :allTrans="true"
      bgColor="linear-gradient(180deg, #D9EEFF 0%, #fff 100%)"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">单词测试页</view>
    </cy-navbar>
    <view class="title">
      <text>{{ frequencyName }}</text>
      <text @click="changeFrequency">切换考频</text>
    </view>
    <view class="numShow"
      >本轮测试统计 正确数:{{ correctNum }} 错误数:{{ errorNum }}</view
    >
  </view>
</template>
    
  <script>
export default {
  data() {
    return {
      frequencyName: "考频666 ++",
      frequencyList: [],
      correctNum: "0",
      errorNum: "0",
    };
  },
  methods: {
    //切换考频
    changeFrequency() {
      //弹出考频列表，用户选择之后刷新页面题目以及以下初始值
      //   this.correctNum = 0;
      //   this.errorNum = 0;
    },
  },
};
</script>
    
  <style lang="scss" scoped>
.main {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 200rpx;

  .title {
    display: flex;
    justify-content: space-between;
    width: 50vw;
    margin-left: 40vw;
    color: #3894ff;
  }
  .numShow {
    padding-top: 20rpx;
    text-align: center;
    font-size: 30rpx;
  }
}
</style>