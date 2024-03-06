<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">个人信息</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box px-4 pb-4 mt-5"
            v-for="(parent, parentIndex) in personInfo" :key="parentIndex">
        <view class="flex align-item-center justify-content-between pt-4"
          v-for="(item, index) in parent" :key="index"
              @click="toPage(parentIndex, index)">
          <view>{{item.title}}</view>
          <view class="flex align-item-center">
            <view>{{item.value}}</view>
            <view class="ml-2">
              <u-icon v-if="item.isShowArrow" name="arrow-right" color="#8A8A8A" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

    <u-popup v-model="showEnglishLevel" mode="bottom">
      <view class="english-level-box">
        <view class="px-4 pt-5 pb-5 flex align-item-center title">
          <u-icon name="arrow-left" size="28"></u-icon>
          <view class="ml-5">选择英语水平</view>
        </view>
        <view style="height: 140rpx"></view>

        <view class="px-4 pb-5">
          <view class="item mt-3 flex align-item-center border-box px-3"
                :class="{active: item.isSelect}"
                @click="selectLevel(index)"
                v-for="(item, index) in englishLevelList" :key="index">
            <view class="cricle-parent flex align-item-center justify-content-center"
                  :class="{active: item.isSelect}">
              <view class="cricle"></view>
            </view>
            <view class="ml-4">
              {{item.title}}
            </view>
          </view>
        </view>
      </view>
    </u-popup>

  </view>
</template>

<script>
export default {
  data() {
    return {
      personInfo: [
        [
          { title: '头像', value: '点击上传', isShowArrow: true },
          { title: '昵称', value: 'Jim', isShowArrow: true },
          { title: '手机号', value: '133********' },
          { title: '用户ID', value: '7336819' }
        ],
        [
          { title: '年级', value: '请选择', isShowArrow: true },
          { title: '英语等级', value: '请选择', isShowArrow: true },
          { title: '兴趣爱好', value: '请选择', isShowArrow: true }
        ]
      ],

      englishLevelList: [
        {title: '新手A1：词汇量少，对话困难', value: '', isSelect: true},
        {title: '新手A2：词汇量少，对话困难', value: '', isSelect: false},
        {title: '初级B1：词汇量适中，对话基本', value: '', isSelect: false},
        {title: '中级B2：词汇量丰富，对话流利', value: '', isSelect: false},
        {title: '高级C1：词汇量丰富，对话流利', value: '', isSelect: false},
        {title: '高级C2：词汇量丰富，对话流利', value: '', isSelect: false}
      ],

      showEnglishLevel: false
    }
  },
  onLoad() {
  },
  methods: {
    selectLevel(index) {
      this.englishLevelList.forEach((item, i) => {
        item.isSelect = i === index
      })
    },
    toPage(parentIndex, index) {
      if (parentIndex == 0) {
        if (index == 1) this.$navigateTo('/pages/me/updateInfo')
      } else {
        if (index == 0) this.$navigateTo('/pages/me/selectGrade')
        if (index == 1) this.showEnglishLevel = true
        if (index == 2) this.$navigateTo('/pages/me/selectInterest')
      }
    }
  },
}
</script>

<style lang="scss">
  page {
    background: #F5FBFD;
  }
  .person-info-box {
    border-radius: 30rpx;
    background: #FFFFFF;
    box-shadow: 0px 0px 10rpx 0px #D8D8D8;
    font-size: 30rpx;
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
