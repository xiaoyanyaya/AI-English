<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>

    <view class="mt-5 px-4">
      <view class="grid-box">
        <view class="grid-item flex flex-direction-column justify-content-around align-item-center"
              v-for="(item, index) in aiTypeList" :key="index"
              @click="toPage(index)">
          <image :style="{width: `${item.imageWidth}rpx`}"
                 :src="`${imageBaseUrl}${item.image}`" mode="widthFix" class="w-100"></image>
          <view>{{ item.title }}</view>
          <view class="t-size-20 text-center">{{ item.desc }}</view>
        </view>
      </view>

      <view @click="toPage(3)"
        class="composition-box mt-3 flex align-item-center justify-content-around">
        <view class="flex">
          <image :src="`${imageBaseUrl}/new-2.6.png`" mode="widthFix" class="mr-3"></image>
          <view class="flex t-color-fff flex-direction-column justify-content-around align-item-center">
            <view class="">我的作文库</view>
            <view class="t-size-20">作文收藏，随时回顾，巩固学习成果</view>
          </view>
        </view>
      </view>

      <view class="flex align-item-center ml-3 mt-6">
        <image :src="`${imageBaseUrl}/new-2.1.png`" mode="widthFix" class="small-image"></image>
        <view class="t-size-26 font-weight-bold ml-2">批改实例</view>
      </view>
      <view class="living-box mt-2 px-2 pb-3 pt-1">
        <view class="flex justify-content-between mt-3 pb-3 t-size-26 living-item"
          v-for="(item, index) in livingData" :key="index">
          <view>
            <view class="t-color-2D6CDA">{{index+1}}、{{item.title}}</view>
            <view class="t-size-24 mt-2">{{item.desc}}</view>
          </view>
          <view class="flex t-size-24 t-color-8A8A8A">
            <view>{{item.username}}</view>
            <view>{{`(${item.school})`}}</view>
          </view>
        </view>
      </view>

      <view class="flex align-item-center ml-3 mt-6">
        <image :src="`${imageBaseUrl}/new-2.2.png`" mode="widthFix" class="small-image"></image>
        <view class="t-size-26 font-weight-bold ml-2">热门评论（6）</view>
      </view>
      <view class="common-box mt-2 px-2 pb-3 pt-1">
        <view class="flex justify-content-between mt-3 pb-3 t-size-26 common-item"
              v-for="(item, index) in commonData" :key="index">
          <view class="flex align-item-center">
            <view class="image-box mr-2">
              <image :src="`${imageBaseUrl}${item.image}`" mode="widthFix"></image>
            </view>
            <view class="t-size-26">
              <view class="flex justify-content-between align-item-center">
                <view class="t-color-2D6CDA t-color-3D3D3D">{{item.nickname}}</view>
                <view class="t-size-24">
                  <u-rate :count="5" active-color="#FFAB2D" v-model="item.star"></u-rate>
                </view>
              </view>
              <view class="mt-1 t-size-22 t-color-8A8A8A">{{item.content}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from '@/utils/MyMixin';

export default {
  mixins: [MyMixin],
  data() {
    return {
      aiTypeList: [{
        title: '作文批改',
        desc: '从单词到语法，全方位提高英语写作能力',
        image: '/new-2.4.png',
        imageWidth: 100,
      }, {
        title: '作文训练',
        desc: '作文训练新体验！写作提升轻松练！',
        image: '/new-2.3.png',
        imageWidth: 80,
      }, {
        title: '作文帮写',
        desc: '考试作文,作业作文AI帮你写',
        image: '/new-2.5.png',
        imageWidth: 80,
      }],

      livingData: [{
        title: '2023年广东高考作文',
        desc: '作文题目内容（显示前50个单词）',
        username: '张三',
        school: '深圳中学',
      }, {
        title: '2023年广东高考作文',
        desc: '作文题目内容（显示前50个单词）',
        username: '张三',
        school: '广州中学',
      }, {
        title: '2023年广东高考作文',
        desc: '作文题目内容（显示前50个单词）',
        username: '张三',
        school: '东莞中学',
      }],

      commonData: [{
        nickname: '灰太狼',
        content: '这款工具的作文批改功能非常细致，从单词拼写、语法错误到篇章结构，都能给出准确的建议。',
        image: '/new-2.7.png',
        star: 5,
      }, {
        nickname: '灰太狼',
        content: '这款工具的作文批改功能非常细致，从单词拼写、语法错误到篇章结构，都能给出准确的建议。',
        image: '/new-2.8.png',
        star: 5,
      }, {
        nickname: '灰太狼',
        content: '这款工具的作文批改功能非常细致，从单词拼写、语法错误到篇章结构，都能给出准确的建议。',
        image: '/new-2.9.png',
        star: 5,
      }]
    }
  },
  methods: {
    toPage(index) {
      if (index == 3) {
        this.$navigateTo(`/pages/composition/englishLibrary?type=0`);
      } else {
        this.$navigateTo(`/pages/composition/titleSubject?index=${index}`);
      }
    }
  },
}
</script>

<style lang="scss" >
page {
  background: #F5FBFD;
}

.grid-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  .grid-item {
    width: 210rpx;
    height: 260rpx;
    border-radius: 10rpx;
    opacity: 1;
    color: #FFFFFF;
    padding: 20rpx 6rpx;

    &:nth-child(1) {
      background: linear-gradient(180deg, #FFA63E 0%, #FF5F09 100%);
    }

    &:nth-child(2) {
      background: linear-gradient(180deg, #39ACFF 0%, #3967FF 100%);
    }

    &:nth-child(3) {
      background: linear-gradient(180deg, #66DE45 0%, #2BA121 100%);
    }
  }
}

.composition-box {
  height: 140rpx;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #FF8484 0%, #D45454 100%);

  image {
    width: 80rpx;
  }
}

.small-image {
  width: 30rpx;
  height: 30rpx;
}

.living-box {
  border-radius: 10rpx;
  background: #FFFFFF;

  .living-item {
    border-bottom: 1rpx solid #F0F0F0;
  }
}

.common-box {
  border-radius: 10rpx;
  background: #FFFFFF;

  .common-item {
    border-bottom: 1rpx solid #F0F0F0;

    .image-box {
      width: 100rpx;
      height: 100rpx;

      image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }

  }
}
</style>
