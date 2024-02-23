<template>
  <view class="pb-5">
    <cy-navbar>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="flex align-item-center justify-content-between px-5 pt-2">
      <view class="font-weight-bold t-size-48">
        Hi，同学
      </view>
      <view>
        <image src="/static/logo.png" class="student-css"></image>
      </view>
    </view>
    <view class="flex align-item-center justify-content-between px-5 pt-5">
      <view class="t-size-28 t-line-46">
        <text>
          嗨，我是Jim!
          跟我一起沉浸式学习英语，
          让您的技能更上一层楼！
        </text>
        <view class="music-css mt-2 flex align-item-center justify-content-center">
          美音
        </view>
      </view>
      <view>
        <image src="/static/logo.png" class="person-css"></image>
      </view>
    </view>

    <view class="today-learning-box border-box px-3 py-4">
      <view class="flex align-item-center justify-content-between">
        <text class="t-size-28 t-color-3D3D3D font-weight-bold">今日学习</text>
        <text class="t-size-28 t-color-3D3D3D font-weight-bold">我的课程</text>
      </view>

      <view class="flex mt-3">
        <view class="current-time mr-2">46分钟</view>
        <view class="total-time-box flex mt-1">
          <view>/</view>
          <view>60分钟</view>
        </view>
      </view>

      <view class="progress-box mt-3">
        <view class="progress-bar"></view>
      </view>
    </view>

    <view class="mt-4 flex border-box px-3">
      <image src="/static/logo.png" class="english-teacher-box mr-3"></image>
      <image src="/static/logo.png" class="word-box"></image>
    </view>

    <view class="mt-5 px-3">
      <text class="font-weight-bold t-size-40">AI中考提分</text>
    </view>

    <view class="mt-5 px-3 flex justify-content-between">
      <view :class="item.isActive ? 'querstion-type-active-box' : 'querstion-type-box'"
            v-for="(item, index) in questionTypeMenu" :key="index"
            class="flex align-item-center justify-content-center"
            @click="clickQuestionType(item, index)">
        {{ item.title }}
      </view>
    </view>

    <cy-grip :menuList="menuList"
             @clickMenu="clickMenu"></cy-grip>

    <cy-tabbar :currentActive="0"></cy-tabbar>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 题目类型
        questionTypeMenu: [
          {title: '语法', isActive: true},
          {title: '词汇', isActive: false},
          {title: '句型', isActive: false},
          {title: '作文', isActive: false},
        ],

        // 菜单栏
        menuList: [
          {title: '基础语法', icon: 'home', path: ''},
          {title: '高级语法', icon: 'course', path: ''},
          {title: '基础短语', icon: 'exam', path: ''},
          {title: '高级短语', icon: 'my', path: ''},
        ],
      }
    },
    methods: {
      clickQuestionType(item, clickIndex) {
        this.questionTypeMenu.forEach((item, index) => {
          item.isActive = clickIndex === index;
        });
      },
      clickMenu(item, index) {
        this.$navigateTo('/pages/index/questionDetail?title=' + item.title);
      }
    }
  }
</script>

<style>
  page {
    background: #F0FCFF;
  }
  .student-css {
    width: 80rpx; height: 80rpx; border-radius: 50%;
  }
  .music-css {
    width: 110rpx;
    height: 46rpx;
    border-radius: 8rpx;
    background: #FF8817;
    color: #fff;
  }
  .person-css {
    width: 200rpx; height: 300rpx; border-radius: 50%;
  }
  .today-learning-box {
    width: 690rpx;
    height: 260rpx;
    margin: 50rpx 30rpx 30rpx 30rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 10rpx 20rpx 0rpx #BFBFBF;
    border-radius: 20rpx;
  }

  .current-time {
    font-size: 50rpx;
    letter-spacing: 0em;
    color: #3D3D3D;
  }

  .progress-box {
    width: 100%;
    height: 12rpx;
    background: #D8D8D8;
    border-radius: 5rpx;
  }

  .progress-bar {
    width: 80%;
    height: 12rpx;
    background: linear-gradient(270deg, #FF8A1D 0%, #FFFFFF 99%);
    border-radius: 5rpx;
  }

  .english-teacher-box {
  }
  .word-box {
  }
  .english-teacher-box, .word-box {
    height: 260rpx;
    border-radius: 30rpx;
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
</style>
