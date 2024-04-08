<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack>
      <view class="t-size-30">疯狂挑战</view>
    </cy-navbar>

    <view class="px-4 mt-5">
      <view class="top-content-box">
        <view class="bg-image-box flex align-item-center justify-content-center">
          <view class="title t-size-32 font-weight-bold t-color-fff">每周挑战</view>
          <image :src="`${imageBaseUrl}/3-22-01.png`"></image>
        </view>
        <view class="top-content flex-direction-column flex align-item-center justify-content-center px-5">
          <view class="tags t-size-20 flex align-item-center justify-content-center">
            <text class="mr-2">{{challenge.compositionLabel}}</text>
          </view>
          <view class=" t-size-26 mt-1">
<!--            <view class="mb-1">书面表达（满分 25分）</view>-->
            <rich-text :nodes="challenge.compositionTitleText"></rich-text>
          </view>
          <view class="mt-4 flex align-item-center btns justify-content-between">
            <view class="flex align-item-center justify-content-center btns-box"
            v-for="(item, index) in btnsList" :key="index"
            @click="clickBtn(item.title, challenge)">
              <image :src="`${imageBaseUrl}${item.icon}`"></image>
              <view class="t-size-26 ml-1">{{item.title}}</view>
              <view v-if="index === 0"
                    class="t-size-20 t-color-8A8A8A ml-1">({{challenge.favoritesTimes || 0}})</view>
            </view>
          </view>
        </view>
      </view>

      <view class="flex align-item-center mt-4">
        <view class="school-item mr-3 mt-3"
              :class="{active: item.isActive}"
              @click="clickSChoolType(item, index)"
              v-for="(item, index) in schoolTypeList" :key="index">
          {{item.name}}
        </view>
      </view>

      <view class="evaluate-box mt-3 pb-5" v-for="(item, index) in evaluateData" :key="index">
        <view class="tags t-size-24 flex align-item-center justify-content-center">
          <text class=""> {{item.compositionLabel}}</text>
        </view>
        <view class="content-box pt-3 pb-3 t-size-26">
          <view class="item">
<!--            <view>书面表达（满分 25分）</view>-->
            <rich-text :nodes="item.compositionTitleText"></rich-text>
          </view>
          <view class="item mt-2">
<!--            <view>要点包括：</view>-->
            <view>
              <rich-text :nodes="item.note"></rich-text>
            </view>
          </view>
        </view>
        <view class="line-box"></view>
        <view class="mt-5 flex align-item-center btns justify-content-between">
          <view class="flex align-item-center justify-content-center btns-box"
                v-for="(btn, btnIndex) in evaluateBtnsList" :key="btnIndex"
                @click="clickBtn(btn.title, item)">
            <image :src="`${imageBaseUrl}${btn.icon}`"></image>
            <view class="t-size-26 ml-1">{{btn.title}}</view>
            <view v-if="btnIndex === 0"
                  class="t-size-20 t-color-8A8A8A ml-1">({{item.favoritesTimes || 0}})</view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {
  getChallengeCompositionWeek,
  getCompositionDictList, getCompositionList,
} from "@/api/composition";
export default {
  mixins: [MyMixin],
  data() {
    return {
      btnsList: [{
        icon: '/3-22-08.png',
        title: '挑战人数',
        value: 0
      }, {
        icon: '/3-22-07.png',
        title: '立即挑战'
      }],

      evaluateBtnsList: [{
        icon: '/3-22-08.png',
        title: '挑战人数',
        value: 0
      }, {
        icon: '/3-22-07.png',
        title: '立即挑战'
      }, {
        icon: '/3-22-05.png',
        title: '邀请挑战'
      }],
      challenge: {},
      evaluateData:[],
      schoolTypeList: []
    };
  },
  onLoad() {
    this.network().getCompositionDictList('composition_type_challenge')
    this.network().getChallengeCompositionWeek()
  },
  methods: {
    clickBtn(title, data) {
      if (title == '挑战人数') {
        this.$navigateTo(`/pages/composition/new/challengeNumber?id=${data.id}&title=${data.compositionTitleText}&compositionLabel=${data.compositionLabel}`)
      }
      if (title == '立即挑战') {
        this.$navigateTo(`/pages/composition/new/titleSubject?title=${data.compositionTitleText}&pageIndex=4&pageTitle=作文内容输入页&id=${data.id}`)
      }
    },
    clickSChoolType(item, index) {
      this.schoolTypeList.forEach((d, dIndex) => {
        d.isActive = index === dIndex
      })

      this.network().getCompositionList({
        compositionType: this.schoolTypeList[index].value
      })
    },
    network() {
      return {
        getCompositionDictList: async (type) => {
          let params = {type}
          let data = await getCompositionDictList(params);
          var result = data.data.result
          console.log(result)

          switch (type) {
            case 'composition_type_challenge':
              result.forEach((d,index) => {
                this.schoolTypeList.push({
                  name: d.text,
                  value: d.value,
                  isActive: index === 0
                })
              })

              this.$nextTick(() => {
                this.network().getCompositionList({
                  compositionType: this.schoolTypeList[0].value
                })
              })
              break;
          }
        },
        getCompositionList: async (params) => {
          let data = await getCompositionList(params);
          this.evaluateData = data.data.result.records
        },
        getChallengeCompositionWeek: async () => {
          let data = await getChallengeCompositionWeek();
          this.challenge = data.data.result
        }
      }
    }
  },
}
</script>

<style lang="scss">
.top-content-box {
  border-radius: 20rpx;
  overflow: hidden;

  .bg-image-box {
    width: 670rpx;
    height: 100rpx;
    position: relative;
    .title {
      position: absolute;
      z-index: 2;
      letter-spacing: 10rpx;
    }
    image {
      z-index: 1;
      position: absolute;
      width: 670rpx;
      height: 100rpx;
    }
  }

  .top-content {
    margin-top: -15rpx;
    width: 670rpx;
    height: 320rpx;
    opacity: 1;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(193, 218, 250) 100%);
    position: relative;
    overflow: hidden;

    .tags {
      position: absolute;
      left: -40rpx;
      top: 10rpx;
      transform: rotate(-45deg);
      width: 150rpx;
      height: 50rpx;
      color: #DC0C0C;
      background: #FFDCDC;
    }
  }
}

.btns {
  width: 670rpx;
  .btns-box {
    flex: 1;
    image {
      width: 30rpx;
      height: 30rpx;
    }
  }

}

.school-item {
  border-radius: 100rpx;
  opacity: 1;
  padding: 20rpx 34rpx;

  &.active {
    color: #FFFFFF;
    background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
  }
}

.evaluate-box {
  background: #FFFFFF;
  width: 670rpx;
  border-radius: 20rpx 20rpx 0 0;
  overflow: hidden;
  position: relative;

  .tags {
    position: absolute;
    left: -40rpx;
    top: 10rpx;
    transform: rotate(-45deg);
    width: 150rpx;
    height: 50rpx;
    color: #DC0C0C;
    background: #FFDCDC;
  }

  .content-box {
    padding: 50rpx 50rpx 50rpx 60rpx;

    .item {
      line-height: 38rpx;
    }
  }
}

.line-box {
  width: 670rpx;
  height: 1rpx;
  background: #D8D8D8;
}
</style>
