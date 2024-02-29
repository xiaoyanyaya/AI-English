<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">{{title}}</view>
    </cy-navbar>

    <view class="mt-5 ml-3 video-box"></view>

    <view class="mt-4 px-5">
      <view class="t-color-3D3D3D t-size-30">高级语法</view>
      <view class="t-color-8A8A8A t-size-24 mt-2">高级语法</view>
    </view>

    <view class="mt-5 px-5">
      <view class="t-color-3D3D3D t-size-30">视频简介</view>
      <view class="t-color-8A8A8A t-size-24 mt-2">本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了本视频主要讲了</view>
    </view>

    <view class="mt-5 px-5">
      <view class="t-color-3D3D3D t-size-30">发布时间</view>
      <view class="t-color-8A8A8A t-size-24 mt-2">2023年1月23日</view>
    </view>
  </view>
</template>

<script>
import cyNavbar from "@/components/cy-navbar.vue";
import cyGrip from "@/components/cy-grip.vue";
import cyTabbar from "@/components/cy-tabbar.vue";

export default {
  components: {cyTabbar, cyGrip, cyNavbar},
  data() {
    return {
      title: '',
      // 题目类型
      questionTypeMenu: [
        {title: '语法', isActive: true},
        {title: '词汇', isActive: false},
        {title: '句型', isActive: false},
        {title: '作文', isActive: false},
      ],

      // 菜单栏
      menuList: [
        {title: '首页', icon: 'home', path: '/pages/index/index'},
        {title: '课程', icon: 'course', path: '/pages/course/index'},
        {title: 'AI中考', icon: 'exam', path: '/pages/exam/index'},
        {title: '我的', icon: 'my', path: '/pages/my/index'},
      ],
    }
  },
  onLoad(res) {
    this.title = res.title;
  },
  methods: {
    clickQuestionType(item, clickIndex) {
      this.questionTypeMenu.forEach((item, index) => {
        item.isActive = clickIndex === index;
      });
    }
  },
}
</script>

<style>
page {
  background: #F0FCFF;
}

.querstion-type-box, .querstion-type-active-box {
  width: 160rpx;
  height: 60rpx;
  border-radius: 30rpx;
}
.querstion-type-box {
  border: 1px solid #1863E5;
  background: #ffffff;
  color: #1863E5;
}
.querstion-type-active-box {
  background: #1863E5;
  color: #ffffff;
}
.video-box {
  width: 690rpx;
  height: 795rpx;
  border-radius: 10rpx;
  background: #CCDFFF;
}
</style>
