<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>
    <view class="top-content">
      <view class="title">
        <image :src="`${imageBaseUrl}/img_a1.png`" mode="widthFix"></image>
      </view>
      <view class="top-content-bg">
        <image :src="`${imageBaseUrl}/img_b1.png`" mode="widthFix"></image>
      </view>
      <view class="desc">
        <view class="flex align-item-center"
              :style="{top: `${item.top}rpx`, left: `${item.left}rpx`, position: 'absolute'}"
              v-for="(item, index) in descList" :key="index">
          <image :src="`${imageBaseUrl}/img_b2.png`" mode="widthFix"></image>
          <view class="t-size-24 ml-1">{{ item.title }}</view>
        </view>
      </view>
    </view>
    <view class="mt-1 px-4">
      <view class="flex align-item-center">
        <view class="aitype-box-1 flex flex-direction-column justify-content-around align-item-center"
              @click="toPage(0)">
          <view>{{ aiTypeList[0].title }}</view>
          <view class="t-size-22 text-center">{{ aiTypeList[0].desc }}</view>
          <image :style="{width: `${aiTypeList[0].imageWidth}rpx`}"
                 :src="`${imageBaseUrl}${aiTypeList[0].image}`" mode="widthFix" class="w-100"></image>
        </view>
        <view class="flex flex-direction-column">
          <view class="aitype-box-2" @click="toPage(1)">
            <view class="flex align-item-center">
              <image :style="{width: `${aiTypeList[1].imageWidth}rpx`}"
                     :src="`${imageBaseUrl}${aiTypeList[1].image}`" mode="widthFix" class="w-100"></image>
              <view class="font-weight-bold ml-2">{{ aiTypeList[1].title }}</view>
            </view>
            <view class="mt-2 ml-1">
              <view class="t-size-22">{{ aiTypeList[1].desc }}</view>
            </view>
          </view>
          <view class="aitype-box-3 mt-2" @click="toPage(2)">
            <view class="flex align-item-center">
              <image :style="{width: `${aiTypeList[2].imageWidth}rpx`}"
                     :src="`${imageBaseUrl}${aiTypeList[2].image}`" mode="widthFix" class="w-100"></image>
              <view class="font-weight-bold ml-2">{{ aiTypeList[2].title }}</view>
            </view>
            <view class="mt-2 ml-1">
              <view class="t-size-22">{{ aiTypeList[2].desc }}</view>
            </view>
          </view>
        </view>
      </view>

      <view @click="toPage(3)"
            class="composition-box mt-2 flex align-item-center justify-content-around">
        <view class="flex">
          <image :src="`${imageBaseUrl}/img_a4.png`" mode="widthFix" class="mr-3"></image>
          <view class="flex flex-direction-column justify-content-around align-item-center">
            <view class="font-weight-bold">我的作文库</view>
            <view class="t-size-20">作文收藏，随时回顾，巩固学习成果</view>
          </view>
        </view>
      </view>

      <view class="flex align-item-center justify-content-between ml-3 mt-6">
        <view class="flex align-item-center">
          <image :src="`${imageBaseUrl}/new-2.1.png`" mode="widthFix" class="small-image"></image>
          <view class="t-size-26 font-weight-bold ml-2">批改实例</view>
        </view>
        <view class="circle-box flex align-item-center justify-content-center mr-2">
          <u-icon name="arrow-right" color="#FFFFFF" size="20"></u-icon>
        </view>
      </view>
      <view class="living-box mt-2 px-2 pb-3 pt-1">
        <view class="flex justify-content-between mt-4 pb-4 pl-2 t-size-26 living-item"
              v-for="(item, index) in livingData" :key="index">
          <view class="flex align-item-center">
            <image :src="`${imageBaseUrl}${item.image}`"
                   mode="widthFix" class="living-item-image"></image>
            <view class="flex flex-direction-column justify-content-around ml-3">
              <view class="t-color-3D3D3D font-weight-bold">{{item.title}}</view>
              <view class="mt-2 t-size-22 t-color-8A8A8A">{{item.desc}}</view>
            </view>
          </view>
          <view class="flex flex-direction-column justify-content-around ml-3 user-info">
            <view class="flex align-item-center mb-1">
              <image :src="`${imageBaseUrl}/icon_a1.png`" mode="widthFix" class=""></image>
              <view class="ml-1 t-color-3D3D3D t-size-22">{{item.username}}</view>
            </view>
            <view class="flex align-item-center mt-1">
              <image :src="`${imageBaseUrl}/icon_a2.png`" mode="widthFix" class=""></image>
              <view class="ml-1 t-color-3D3D3D t-size-22">{{item.school}}</view>
            </view>
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
                <view class="t-color-2D6CDA t-color-3D3D3D">{{ item.nickname }}</view>
                <view class="t-size-24">
                  <u-rate :count="5" active-color="#FFAB2D" v-model="item.star"></u-rate>
                </view>
              </view>
              <view class="mt-1 t-size-22 t-color-8A8A8A">{{ item.content }}</view>
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
        image: '/img_a5.png',
        imageWidth: 100,
      }, {
        title: '作文训练',
        desc: '作文训练新体验！写作提升轻松练！',
        image: '/img_a2.png',
        imageWidth: 50,
      }, {
        title: '作文帮写',
        desc: '考试作文,作业作文AI帮你写',
        image: '/img_a3.png',
        imageWidth: 50,
      }],

      livingData: [{
        image: '/img_a6.png',
        title: '2023年广东高考作文',
        desc: '作文题目内容',
        username: '张三',
        school: '深圳中学',
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
      }],
      descList: [{
        title: '作文批改最强神器',
        icon: '',
        top: 230,
        left: 50
      }, {
        title: '母语级水准陪练',
        icon: '',
        top: 290,
        left: 50
      }, {
        title: '助你写出高分作文',
        icon: '',
        top: 350,
        left: 50
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

<style lang="scss">
page {
  background: #F5FBFD;
}

.top-content {
  width: 750rpx;
  height: 450rpx;
  background: linear-gradient(180deg, #BBD3FF 0%, rgba(216, 216, 216, 0) 100%);
  position: relative;

  .title {
    position: absolute;
    top: 100rpx;
    left: 50rpx;

    image {
      width: 380rpx;
    }
  }

  .top-content-bg {
    position: absolute;
    bottom: 20rpx;
    right: 0;

    image {
      width: 350rpx;
    }
  }

  .desc {
    color: #001E53;

    image {
      width: 30rpx;
    }
  }
}

.aitype-box-1 {
  width: 340rpx;
  padding: 40rpx 30rpx;
  height: 336rpx;
  border-radius: 10rpx;
  background: linear-gradient(139deg, #FFDDB6 0%, #FFFCF4 98%);
  color: #442200;
}

.aitype-box-2, .aitype-box-3 {
  margin-left: 20rpx;
  width: 340rpx;
  padding: 20rpx 30rpx;
  height: 160rpx;
  border-radius: 10rpx;
}

.aitype-box-2 {
  background: linear-gradient(119deg, #D1E5FB 0%, #F3F3FB 99%);
  color: #001E53;
}

.aitype-box-3 {
  background: linear-gradient(118deg, #D7FFEB 0%, #FCFEF4 99%);
  color: #114E00;
}

.composition-box {
  height: 160rpx;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #FEE0E0 0%, #FFF7F7 100%);
  color: #4E0000;

  image {
    width: 80rpx;
  }
}

.small-image {
  width: 30rpx;
  height: 30rpx;
}

.circle-box {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #3A73D9;
  box-sizing: border-box;
  padding-left: 4rpx;
}

.living-box {
  border-radius: 10rpx;
  background: linear-gradient(180deg, #EDF3FF 0%, #FFFFFF 100%);

  .living-item {

    .living-item-image {
      width: 80rpx;
    }

    .user-info {
      image {
        width: 20rpx;
      }
    }
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
