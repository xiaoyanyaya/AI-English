<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="mt-5 px-3 flex justify-content-between">
      <view :class="item.isActive ? 'querstion-type-active-box' : 'querstion-type-box'"
            v-for="(item, index) in questionTypeMenu" :key="index"
            class="flex align-item-center justify-content-center"
            @click="clickQuestionType(item, index)">
        {{ item.title }}
      </view>
    </view>

    <cy-grip
      @clickMenu="clickMenu"
      :menuList="menuList" :column="2" :boxHeight="300"></cy-grip>

    <cy-tabbar :currentActive="1"></cy-tabbar>
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
</style>
