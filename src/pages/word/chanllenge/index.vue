<template>
  <view class="main">
    <cy-navbar :showBack="false" bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">抗遗忘复习</view>
    </cy-navbar>

    <view class="review-box px-4 pt-5 flex align-item-center justify-content-between">
      <view class="flex align-item-center">
        <view class="plac mr-2"></view>
        <view class="t-size-30 t-color-3D3D3D font-weight-bold">单词复习列表</view>
      </view>
      <view class="flex align-item-center">
        <view class="t-color-8A8A8A t-size-28 mr-2">艾宾浩斯遗忘曲线</view>
        <u-icon name="question-circle-fill" class="t-color-8A8A8A" size="32"></u-icon>
      </view>
    </view>

    <view class="px-3 mt-4">
      <view class="time-box flex align-item-center justify-content-between px-5">
        <view class="t-size-28 t-color-8A8A8A">{{dateTIme}}</view>
        <u-icon name="arrow-down" class="t-color-8A8A8A" size="32"></u-icon>
      </view>
    </view>

    <view class="px-3 mt-3">
      <view class="word-box pt-3 pb-3 pl-5 pr-4">
        <view class="flex align-item-center justify-content-between">
          <view class="t-size-24 font-weight-bold t-color-1863E5">单词专题训练</view>
          <view class="t-size-22 t-color-8A8A8A">2024-03-27 17:08:00</view>
        </view>
        <view class="flex align-item-center justify-content-between mt-3">
          <view class="t-size-36 t-color-3D3D3D font-weight-bold">Unit 1</view>
          <view class="t-size-26 font-weight-bold">
            <text class="t-color-24A800">正确(16)</text>
            <text class="t-color-8A8A8A mr-1">/</text>
            <text class="t-color-DC0C0C">错误(0)</text>
          </view>
        </view>

        <view class="mt-5 flex justify-content-center">
          <u-tabs bg-color="transparent" inactive-color="#8A8A8A" active-color="#E79315"
                  :list="optinsList" :current="currentOptions" @change="changeOptions"></u-tabs>
        </view>

        <view class="mt-3">
          <view v-for="(item, index) in tableData" :key="index">
            <view
              :class="index === 0 ? 't-size-24 font-weight-bold t-color-3D3D3D' : 't-size-20 t-color-878787'"
              :style="index%2 === 1 ? 'background: #F9F9F9' : ''"
              class="flex align-item-center table-item">
              <view>{{ item.value1 }}</view>
              <view>{{ item.value2 }}</view>
              <view>{{ item.value3 }}</view>
              <view>{{ item.value4 }}</view>
              <view>{{ item.value5 }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="px-3 mt-3" v-for="i in 3">
      <view class="word-box pt-3 pb-3 pl-5 pr-4">
        <view class="flex align-item-center justify-content-between">
          <view class="t-size-24 font-weight-bold t-color-1863E5">单词专题训练</view>
          <view class="t-size-22 t-color-8A8A8A">2024-03-27 17:08:00</view>
        </view>
        <view class="flex align-item-center justify-content-between mt-3">
          <view class="t-size-36 t-color-3D3D3D font-weight-bold">Unit 1</view>
          <view class="t-size-26 font-weight-bold">
            <text class="t-color-24A800">正确(16)</text>
            <text class="t-color-8A8A8A mr-1">/</text>
            <text class="t-color-DC0C0C">错误(0)</text>
          </view>
        </view>
      </view>
    </view>


    <view style="height: 160rpx"></view>
    <wordTab :type="2"></wordTab>
  </view>
</template>

<script>
import wordTab from "@/pages/word/components/word-tabbar/index.vue";

export default {
  components: {wordTab},
  data() {
    return {
      dateTIme: "今天",

      currentOptions: 0,
      optinsList: [{
        name: "已复习历程",
        id: 0,
      }, {
        name: "待复习计划",
        id: 1,
      }],

      tableData: [{
        value1: "日期",
        value2: "用时(min)",
        value3: "正确数",
        value4: "错误数",
        value5: "结果",
      }, {
        value1: "2024-03-27",
        value2: "10",
        value3: "16",
        value4: "0",
        value5: "通过",
      }, {
        value1: "2024-03-27",
        value2: "10",
        value3: "16",
        value4: "0",
        value5: "不通过",
      }, {
        value1: "2024-03-27",
        value2: "10",
        value3: "16",
        value4: "0",
        value5: "通过",
      }],
    };
  },
  methods: {
    changeOptions(index) {
      this.currentOptions = index;
      this.queryParams.sceneCategoryId = this.optinsList[index].id
      // this.initData()
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(180deg, #D1EAFF 0%, #F8FDFF 14%) !important;
}

.review-box {
  .plac {
    width: 12rpx;
    height: 29rpx;
    border-radius: 2rpx;
    background: #3A73D9;
  }
}

.time-box {
  height: 80rpx;
  border-radius: 10rpx;
  border: 1px #1863E5 solid;
  background: #FFFFFF;
}

.word-box {
  border-radius: 10rpx;
  background: linear-gradient(180deg, #E8F2FF 0%, #FFFFFF 100%);
}

.table-item {
  padding: 20rpx 0;

  view {
    width: 20%;
    text-align: center;
  }
}
</style>
