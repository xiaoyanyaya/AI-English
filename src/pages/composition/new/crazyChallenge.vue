<template>
  <view class="pb-5 main-body"> <!--style="min-height: 100vh; background: #F5FBFD"-->
    <cy-navbar showBack>
      <view class="t-size-30">疯狂挑战</view>
    </cy-navbar>

    <view class="px-4 mt-5">
      <view class="total-challenge mb-4"
            @click="$navigateTo('/pages/composition/new/Leaderboard')"
            :style="{
        backgroundImage: `url(${imageBaseUrl}/4-14-04.png)`
      }">
        <view class="flex align-item-center justify-content-around">
          <view class="flex flex-direction-column justify-content-center">
            <image style="width: 400rpx" class="mt-2" mode="widthFix" :src="`${imageBaseUrl}/4-14-03.png`"></image>
            <view class="review mt-2 flex align-item-center justify-content-center">
              <view class="click t-size-22 mr-1">点击查看排名</view>
              <image style="width: 24rpx" mode="widthFix" :src="`${imageBaseUrl}/6-2-03.png`"></image>
            </view>
          </view>
          <view>
            <image style="width: 160rpx" mode="widthFix" :src="`${imageBaseUrl}/4-14-01.png`"></image>
          </view>
        </view>
      </view>

      <view class="top-content-box">
        <view class="bg-image-box flex align-item-center justify-content-center">
          <view class="title t-size-32 font-weight-bold t-color-fff">每周挑战题专区</view>
<!--          <image :src="`${imageBaseUrl}/3-22-01.png`"></image>-->
        </view>
        <view class="top-content flex-direction-column flex align-item-center justify-content-center px-5">
          <view class="tags t-size-20 flex align-item-center justify-content-center">
            <text class="mr-2">{{ challenge.compositionLabel }}</text>
          </view>
          <view class=" t-size-26 mt-1">
            <!--            <view class="mb-1">书面表达（满分 25分）</view>-->
            <rich-text :nodes="challenge.compositionTitleText"></rich-text>
          </view>
          <view class="mt-4 flex align-item-center btns justify-content-between">
            <view class="flex align-item-center justify-content-center btns-box"
                  v-for="(item, index) in btnsList" :key="index"
                  @click="clickBtn(item.title, challenge)">
              <image :src="`${imageBaseUrl}${item.icon}`" mode="widthFix"></image>
              <view class="t-size-26 ml-1">{{ item.title }}</view>
              <view v-if="index === 0"
                    class="t-size-20 t-color-8A8A8A ml-1">({{ challenge.favoritesTimes || 0 }})
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="flex align-item-center mt-3 ml-2">
        <view class="school-item mr-3 mt-3"
              :class="{active: item.isActive}"
              @click="clickSChoolType(item, index)"
              v-for="(item, index) in schoolTypeList" :key="index">
          {{ item.name }}
        </view>
      </view>

      <view class="evaluate-box mt-3 pb-5" v-for="(item, index) in evaluateData" :key="index">
        <view class="tags t-size-24 flex align-item-center justify-content-center">
          <text class=""> {{ item.compositionLabel }}</text>
        </view>
        <view class="content-box pt-3 pb-3 t-size-26">
          <view class="item">
            <!--            <view>书面表达（满分 25分）</view>-->
            <rich-text :nodes="item.compositionTitleText"></rich-text>
          </view>
<!--          <view class="item mt-2">
            &lt;!&ndash;            <view>要点包括：</view>&ndash;&gt;
            <view>
              <rich-text :nodes="item.note"></rich-text>
            </view>
          </view>-->
        </view>
        <view class="line-box"></view>
        <view class="mt-5 flex align-item-center btns justify-content-between">
          <view class="flex align-item-center justify-content-center btns-box"
                v-for="(btn, btnIndex) in evaluateBtnsList" :key="btnIndex"
                @click="clickBtn(btn.title, item)">
            <image :src="`${imageBaseUrl}${btn.icon}`" mode="widthFix"></image>
            <view class="t-size-26 ml-1">{{ btn.title }}</view>
            <view v-if="btnIndex === 0"
                  class="t-size-20 t-color-8A8A8A ml-1">({{ item.favoritesTimes || 0 }})
            </view>
            <button
              v-if="btnIndex === 2"
              open-type="share"
              data-name="shareBtn"
              class="share-btn">
            </button>
          </view>
        </view>
      </view>
    </view>

    <view v-show="evaluateData.length < 1" class="mt-5 flex align-item-center justify-content-center">
      <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
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
        title: '挑战次数',
        value: 0
      }, {
        icon: '/3-22-07.png',
        title: '立即挑战'
      }],

      evaluateBtnsList: [{
        icon: '/3-22-08.png',
        title: '挑战次数',
        value: 0
      }, {
        icon: '/3-22-07.png',
        title: '立即挑战'
      }, {
        icon: '/3-22-05.png',
        title: '邀请挑战'
      }],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        compositionType: ''
      },
      isMoreData: true,
      challenge: {},
      evaluateData: [],
      schoolTypeList: [],
      clickData: {}
    };
  },
  onLoad() {
    this.network().getCompositionDictList('composition_type_challenge')
    this.network().getChallengeCompositionWeek()
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.network().getCompositionList()
  },
  onShareAppMessage(res) {
    console.log(res)
    if (res.from === "button") {
      var data = this.clickData
      uni.setStorageSync('compositionTitleText', data.compositionTitleText)
      const SRC = `/pages/composition/new/titleSubject?`;
      const path = `pageIndex=4&pageTitle=作文内容输入页&id=${data.id}&compositionType=${data.compositionType}`;
      // 来自页面内分享按钮
      return {
        title: this.pageTitle,
        path: `${SRC}${path}`,
        // imageUrl: `${this.imgDomain}wxapp/icon1.1/pic_visit.png`,
      };
    }
  },
  methods: {
    clickBtn(title, data) {
      this.clickData = data
      if (title == '挑战次数') {
        this.$navigateTo(`/pages/composition/new/challengeNumber?id=${data.id}&title=${data.compositionTitleText}&compositionLabel=${data.compositionLabel}`)
      }
      if (title == '立即挑战') {
        uni.setStorageSync('compositionTitleText', data.compositionTitleText)
        this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=4&pageTitle=作文内容输入页&id=${data.id}&compositionType=${data.compositionType}`)
      }
    },
    clickSChoolType(item, index) {
      this.schoolTypeList.forEach((d, dIndex) => {
        d.isActive = index === dIndex
      })

      this.queryParams.compositionType = item.value
      this.initData()
    },
    initData() {
      this.isMoreData = true
      this.evaluateData = []
      this.queryParams.pageNo = 1
      this.network().getCompositionList()
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
              result.forEach((d, index) => {
                this.schoolTypeList.push({
                  name: d.text,
                  value: d.value,
                  isActive: index === 0
                })
              })

              this.$nextTick(() => {
                this.queryParams.compositionType = this.schoolTypeList[0].value
                this.network().getCompositionList()
              })
              break;
          }
        },
        getCompositionList: async () => {
          if (!this.isMoreData) return
          let data = await getCompositionList(this.queryParams);
          data.data.result.records.forEach(d => {
            d.compositionTitleText = d.compositionTitleText.replaceAll("\n", "<br/>")
            this.evaluateData.push(d)
          })
          this.isMoreData = data.data.result.records.length === this.queryParams.pageSize
        },
        getChallengeCompositionWeek: async () => {
          let data = await getChallengeCompositionWeek();
          data.data.result.compositionTitleText = data.data.result.compositionTitleText.replaceAll("\n", "<br/>")
          this.challenge = data.data.result
        }
      }
    }
  },
}
</script>

<style lang="scss">
.total-challenge {
  width: 670rpx;
  height: 200rpx;
  border-radius: 10rpx;
  background-size: 100% 100%;
  background-repeat: no-repeat;


  .review {
    width: 210rpx;
    height: 50rpx;
    border-radius: 10rpx;
    opacity: 1;
    letter-spacing: 2rpx;
    background: linear-gradient(103deg, #FFFFFF -4%, rgba(255, 255, 255, 0.76) 99%);
    //background: linear-gradient(102deg, #FFE5DD -3%, rgba(255, 248, 246, 0.76) 99%);

    .click {
      color: #003DAB;
    }
  }
}

.top-content-box {
  border-radius: 20rpx;
  overflow: hidden;

  .bg-image-box {
    width: 670rpx;
    height: 100rpx;
    position: relative;
    background: #FF9B6D;

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
    background: #FFF7F5;
    //background: linear-gradient(180deg, #FFFFFF 0%, rgba(193, 218, 250) 100%);
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

.share-btn {
  width: 200rpx;
  height: 80rpx;
  position: absolute;
  opacity: 0;
}
</style>
