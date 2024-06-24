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
          <view class="font-weight-bold">{{ aiTypeList[0].title }}</view>
          <view class="t-size-22 text-center">{{ aiTypeList[0].desc }}</view>
          <image :style="{width: `${aiTypeList[0].imageWidth}rpx`}"
                 :src="`${imageBaseUrl}${aiTypeList[0].image}`" mode="widthFix" class="w-100"></image>
        </view>
        <view class="flex flex-direction-column">
          <view class="aitype-box-2 flex align-item-center" @click="toPage(1)">
            <image :style="{width: `${aiTypeList[1].imageWidth}rpx`}"
                   :src="`${imageBaseUrl}${aiTypeList[1].image}`" mode="widthFix" class="w-100"></image>
            <view class="ml-3 flex flex-direction-column">
              <view class="font-weight-bold">{{ aiTypeList[1].title }}</view>
              <view class="t-size-20 mt-1">{{ aiTypeList[1].desc }}</view>
            </view>
          </view>
          <view class="aitype-box-3 mt-2 flex align-item-center" @click="toPage(2)">
            <image :style="{width: `${aiTypeList[2].imageWidth}rpx`}"
                   :src="`${imageBaseUrl}${aiTypeList[2].image}`" mode="widthFix" class="w-100"></image>
            <view class="ml-3 flex flex-direction-column">
              <view class="font-weight-bold">{{ aiTypeList[2].title }}</view>
              <view class="t-size-20 mt-1">{{ aiTypeList[2].desc }}</view>
            </view>
          </view>
        </view>
      </view>
      <view @click="toPage(3)"
            class="composition-box mt-2 flex align-item-center justify-content-around">
        <view class="flex">
          <image :src="`${imageBaseUrl}/3-24-03.png`" mode="widthFix" class="mr-3"></image>
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
<!--        <view class="circle-box flex align-item-center justify-content-center mr-2">
          <u-icon name="arrow-right" color="#FFFFFF" size="20"></u-icon>
        </view>-->
      </view>
      <view class="living-box mt-2 px-2 pb-3 pt-1">
        <view class="flex justify-content-between mt-4 pb-4 pl-2 t-size-26 living-item"
              v-for="(item, index) in livingData" :key="index"
              @click="clickLivingData(item, index)">
          <view class="flex align-item-center" style="width: 470rpx">
            <view style="width: 80rpx;">
              <image :src="`${imageBaseUrl}${item.image}`" class="living-item-image"></image>
            </view>
            <view class="flex flex-direction-column justify-content-around ml-3">
              <view class="t-color-3D3D3D font-weight-bold">{{ getNameWithEllipsis(item.compositionTitleText, 10) }}</view>
              <view class="mt-2 t-size-22 t-color-8A8A8A table-nowrap-2">{{ item.compositionText }}</view>
            </view>
          </view>
          <view class="flex flex-direction-column justify-content-around ml-3 user-info">
            <view class="flex align-item-center mb-1">
              <image :src="`${imageBaseUrl}/icon_a1.png`" mode="widthFix" class=""></image>
              <view class="ml-1 t-color-3D3D3D t-size-22">{{ item.username }}</view>
            </view>
            <view class="flex align-item-center mt-1">
              <image :src="`${imageBaseUrl}/icon_a2.png`" mode="widthFix" class=""></image>
              <view class="ml-1 t-color-3D3D3D t-size-22">{{ item.school }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="flex align-item-center ml-3 mt-6">
        <image :src="`${imageBaseUrl}/new-2.2.png`" mode="widthFix" class="small-image"></image>
        <view class="t-size-26 font-weight-bold ml-2">热门评论（3008）</view>
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
import {
  getCompositionCollectInfo,
} from "@/api/composition";
export default {
  mixins: [MyMixin],
  data() {
    return {
      aiTypeList: [{
        title: '作文批改',
        desc: '从单词到语法，全方位提高英语写作能力',
        image: '/3-24-01.png',
        imageWidth: 100,
      }, {
        title: '疯狂挑战',
        desc: 'AI出题，历届中高考作文题，等你来战！',
        image: '/4-14-02.png',
        imageWidth: 200,
      }, {
        title: '作文帮写',
        desc: '考试作文、作业作文，AI帮你写',
        image: '/img_a2.png',
        imageWidth: 120,
      }],

      livingData: [{
        image: '/img_a6.png',
        compositionTitleText: '',
        compositionText: '',
        username: '刘子轩',
        school: '深圳中学',
      }],

      commonData: [{
        nickname: 'alex',
        content: '作文批改太棒了，从单词拼写、语法解析、好辞好句、作文优缺点、总结评分、参考范文等，非常详细。',
        image: '/new-2.7.png',
        star: 5,
      }, {
        nickname: '王丽蓉',
        content: '作文帮写帮了大忙，我英语不好，指导不了孩子写作文，这个功能能直接写出范文给孩子参考。',
        image: '/new-2.8.png',
        star: 5,
      }, {
        nickname: 'Jack',
        content: '我已经挑战了最近5年的全国高考作文题，还邀请了同学来挑战，有点意思。',
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
  onLoad() {
    this.getCollection();
  },
  methods: {
    async getCollection() {
      let res = await getCompositionCollectInfo({id: "1793463207032631297"});
      var data = res.data.result
      this.livingData[0].compositionTitleText = data.compositionTitleText;
      this.livingData[0].compositionText = data.compositionText;
      console.log("livingData", this.livingData)
    },
    clickLivingData(item, index) {
      this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=7&id=1793463207032631297&pageTitle=作文详情&isShowTitle=1`);
    },
    toPage(index) {
      switch (index) {
        case 0:
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=0&pageTitle=作文批改`);
          break;
        case 1:
          this.$navigateTo(`/pages/composition/new/crazyChallenge`);
          break;
        case 2:
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=2&pageTitle=作文帮写`);
          break;
        case 3:
          this.$navigateTo(`/pages/composition/new/englishLibrary?type=0`);
          break;
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
  width: 300rpx;
  padding: 40rpx 30rpx;
  height: 336rpx;
  border-radius: 10rpx;
  background: linear-gradient(139deg, #E0EEFF 0%, #F2F2FB 98%);
  color: #001E53;
}

.aitype-box-2, .aitype-box-3 {
  margin-left: 20rpx;
  width: 380rpx;
  padding: 20rpx 30rpx;
  height: 160rpx;
  border-radius: 10rpx;
}

.aitype-box-2 {
  background: linear-gradient(117deg, #FFDAC6 0%, #F2F2FB 99%);
  color: #8E4D0D;
}

.aitype-box-3 {
  background: linear-gradient(119deg, #D1E5FB 0%, #F3F3FB 99%);
  color: #001E53;
}

.composition-box {
  height: 160rpx;
  border-radius: 10rpx;
  background: linear-gradient(139deg, #E0EEFF 0%, #F2F2FB 98%);
  color: #001E53;

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
      height: 80rpx;
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
