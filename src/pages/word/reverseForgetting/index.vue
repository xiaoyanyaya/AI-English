<template>
  <view class="main">
    <cy-navbar :showBack="false" bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">抗遗忘复习</view>
    </cy-navbar>
    <view class="head">
      <view class="headLeft">
        <view class="headLeft-icon"></view>
        单词复习列表
      </view>
      <view class="headRight" @click="show=true">
        <text>艾宾浩斯遗忘曲线</text>
        <u-icon name="question-circle-fill"></u-icon>
      </view>
    </view>
    <view class="list">
      <view class="listItem" v-for="(items,index) in bookData" :key="index">
        <view class="listItem-title">
          {{ items.planDateName }}
        </view>
        <view class="listItem-content">
<!--          @click="toNav('/pages/word/wordList?id=3'+'&unitId='+item.id)"-->
          <view @click="toNav('/pages/word/wordList?id=3'+'&unitId='+item.id)"
            class="listItem-contentBook" v-for="(item,i) in items.wordLessonList" :key="item.id">
            <view class="listItem-contentBook-head">
              <view class="flex align-item-center justify-content-between">
                <view class="t-size-24 font-weight-bold t-color-1863E5">
                  {{ getNameWithEllipsis(item.lessonFullName) }}
                </view>
              </view>
              <view class="flex justify-content-between align-item-center mt-3">
                <view class="font-weight-bold t-size-22">复习日期</view>
                <view class="t-size-22 t-color-8A8A8A">{{ item.reviewLastDate }}</view>
              </view>
              <view class="flex align-item-center justify-content-between mt-3">
                <view class="t-size-32 t-color-3D3D3D font-weight-bold lessonName-box">
                  {{ getNameWithEllipsis(item.lessonName, 20) }}
                </view>
                <view class="t-size-26 font-weight-bold">
                  <text class="t-color-24A800">正确({{ item.correctWordNum }})</text>
                  <text class="t-color-8A8A8A mr-1">/</text>
                  <text class="t-color-DC0C0C">错误({{ item.errorWordNum }})</text>
                </view>
              </view>
              <view class="listItem-contentBook-icon" @click.stop="launch(item.id)"
                    :class="item.click?'listItem-contentBook-icons':''">
                <image :src="imageBaseUrl+'/word/6-4-02.png'" mode=""></image>
              </view>
            </view>
            <view class="listItem-contentBook-tab" v-show="item.click">
              <view class="listItem-contentBook-tabItem" @click.stop="tabClick(0)"
                    :class="tabNum==0?'listItem-contentBook-tabItem-select':''">
                已复习历程
              </view>
              <view class="listItem-contentBook-tabItem" @click.stop="tabClick(1)"
                    :class="tabNum==1?'listItem-contentBook-tabItem-select':''">
                待复习计划
              </view>
            </view>
            <view class="listItem-contentBook-form" v-show="item.click">
              <view class="listItem-contentBook-formTitle">
                <view class="listItem-contentBook-formTitle-item" style="width: 20%;">
                  日期
                </view>
                <view class="listItem-contentBook-formTitle-item" style="width: 20%;">
                  用时(min)
                </view>
                <view class="listItem-contentBook-formTitle-item" style="width: 20%;">
                  正确数
                </view>
                <view class="listItem-contentBook-formTitle-item" style="width: 20%;">
                  错误数
                </view>
                <view class="listItem-contentBook-formTitle-item" style="width: 20%;">
                  结果
                </view>
              </view>
              <view class="listItem-contentBook-formList"
                    v-for="(tab, tabIndex) in tabData" :key="item.id">
                <view class="listItem-contentBook-formList-item" style="width: 20%;">
                  {{ tab.reviewDate }}
                </view>
                <view class="listItem-contentBook-formList-item" style="width: 20%;">
                  {{ tab.costTimes ? tab.costTimes : '-' }}
                </view>
                <view class="listItem-contentBook-formList-item" style="width: 20%;">
                  {{ tab.correctWordNum ? tab.correctWordNum : '-' }}
                </view>
                <view class="listItem-contentBook-formList-item" style="width: 20%;">
                  {{ tab.errorWordNum ? tab.errorWordNum : '-' }}
                </view>
                <view class="listItem-contentBook-formList-item" style="width: 20%;">
                  {{ tab.reviewResult == 1 ? '通过' : '失败' }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="imgs" @click="toNav('/pages/word/reverseForgetting/wrongWords')">
      <image :src="imageBaseUrl+'/word/6-4-01.png'" mode=""></image>
    </view>
    <u-popup v-model="show" mode="center" border-radius="20">
      <view class="popup">
        <view class="popupHead">
          <u-icon name="close" @click="show=false"></u-icon>
        </view>
        <view class="popupContent">
          <image :src="imageBaseUrl+'/word/6-4-03.jpg'" mode=""></image>
          <view class="popupContent-text">
            <view class="popupContent-textItem">
              艾宾浩斯记忆曲线是德国心理学家艾宾浩斯通过大量实验得出的关于记忆遗忘规律的曲线。
            </view>
            <view class="popupContent-textItem">
              它揭示了遗忘的速度在记忆初期较快，随后逐渐减慢的稳定规律。根据这一规律，人们可以制定科学的复习策略，从而更有效地记住单词。
            </view>
            <view class="popupContent-textItem">
              对于记英语单词来说，艾宾浩斯记忆曲线具有显著的指导作用。
            </view>

            <view class="popupContent-textItem">
              通过遵循遗忘规律，及时复习，并结合多样化学习方式，可以提高单词记忆的效率，使记忆更加牢固。
            </view>
            <view class="popupContent-textItem">
              因此，艾宾浩斯记忆曲线是帮助我们快速记住单词并提高学习效率的有力工具。
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <wordTab :type="1"></wordTab>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import luanqingProgressbar from '@/pages/word/components/luanqing-progressbar/luanqing-progressbar.vue'
import wordTab from '@/pages/word/components/word-tabbar/index.vue'
import {
  getUserLessonList,
  queryListByLessonId
} from "@/api/word"

export default {
  mixins: [MyMixin],
  components: {
    wordTab
  },
  data() {
    return {
      bookData: [],
      tabData: [],
      show: false,
      tabNum: 0
    }
  },
  onShow() {
    this.getData()
  },
  methods: {
    toNav(urls) {
      uni.navigateTo({
        url: urls
      })
    },
    tabClick(i) {
      this.tabData = this.tabAllData[i].wordReviewList
      this.tabNum = i
    },
    async getData() {
      var that = this
      let data = await getUserLessonList()
      this.bookData = data.data.result
      this.bookData.forEach(function (item, i) {
        item.wordLessonList.forEach(function (items, index) {
          that.bookData[i].wordLessonList[index].click = false
        })
      })
    },
    async tab(id) {
      var res = {
        lessonId: id
      }
      let data = await queryListByLessonId(res)
      this.tabAllData = data.data.result
      this.tabData = data.data.result[0].wordReviewList
      console.log("tabData", this.tabData)
    },
    launch(id) {
      var that = this
      this.bookData.forEach(function (item, i) {
        item.wordLessonList.forEach(function (items, index) {
          if (that.bookData[i].wordLessonList[index].id == id) {
            if (that.bookData[i].wordLessonList[index].click == false) {
              that.bookData[i].wordLessonList[index].click = true
              that.tab(id)
            } else {
              that.bookData[i].wordLessonList[index].click = false
            }
          } else {
            that.bookData[i].wordLessonList[index].click = false
          }
        })
      })
      this.bookData = JSON.parse(JSON.stringify(this.bookData));
    }
  }
}
</script>

<style>
.nav-icon,
.nav-slot,
.nav-btn {
  color: black !important;
}

.main {
  background: linear-gradient(180deg, #D1EAFF 0%, #F8FDFF 14%) !important;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx;
}

.headLeft {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #3D3D3D;
}

.headRight {
  color: #8A8A8A;
  font-size: 24rpx;
}

.headRight text {
  margin-right: 16rpx;
}

.headLeft-icon {
  width: 8rpx;
  height: 30rpx;
  border-radius: 2rpx;
  background: #3A73D9;
  margin-right: 10rpx;
}

.u-progress-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.u-progress-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #fb9126;
}

.u-progress-info {
  font-size: 28rpx;
  padding-left: 16rpx;
  letter-spacing: 2rpx
}

.list {
  padding: 40rpx;
  padding-top: 0;
}

.listItem {
  /* background: #fff; */
}

.listItem-title {
  color: #8A8A8A;
  font-size: 24rpx;
  padding: 20rpx 40rpx;
  background: #fff;
  margin-bottom: 30rpx;
  border-radius: 10rpx;
  margin-top: 30rpx;
}

.listItem-content {
}

.listItem-contentBook {
  background: #fff;
  margin-top: 30rpx;
}

.listItem-contentBook-head {
  background: linear-gradient(180deg, #D6E8FF 0%, #FFFFFF 100%);
  padding: 25rpx 40rpx 25rpx 40rpx;
  border-radius: 10rpx 10rpx 0 0;
}

.listItem-contentBook-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20rpx;
  margin-bottom: 22rpx;
}

.listItem-contentBook-topTitle {
  color: #1863E5;
  font-size: 24rpx;
}

.listItem-contentBook-topDate {
  color: #8A8A8A;
}

.listItem-contentBook-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.listItem-contentBook-bottomL {
  color: #3D3D3D;
  font-weight: 600;
  font-size: 36rpx;
}

.listItem-contentBook-bottomC {
  font-size: 24rpx;
  color: #8A8A8A;
}

.listItem-contentBook-bottomC text {
  color: #24A800;
}

.lessonName-box {


  width: 62%;
}

.listItem-contentBook-tab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 60rpx;
  margin-top: 30rpx;
}

.listItem-contentBook-tabItem {
  color: #8A8A8A;
  font-size: 24rpx;
}

.listItem-contentBook-tabItem-select {
  color: #E79315;
  border-bottom: 4rpx solid #E79315;
  padding-bottom: 6rpx;
}

.listItem-contentBook-form {
  margin-top: 20rpx;
}

.listItem-contentBook-formTitle {
  display: flex;
  font-size: 24rpx;
  text-align: center;
  padding: 16rpx;
}

.listItem-contentBook-formList {
  display: flex;
  color: #878787;
  font-size: 20rpx;
  text-align: center;
  padding: 16rpx;
}

.listItem-contentBook-formList:nth-child(even) {
  background: #F9F9F9;
}

.listItem-contentBook-icon {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
  transform: rotateX(180deg);
}

.imgs {
  display: flex;
  justify-content: center;
}

.imgs image {
  width: 670rpx;
  height: 180rpx;
}

.listItem-contentBook-icon image {
  width: 24rpx;
  height: 24rpx;
}

.listItem-contentBook-icons {
  transform: rotateX(0deg);
}

.popup {
  width: 588rpx;
  border-radius: 20rpx;
}

.popupHead {
  background: linear-gradient(180deg, rgba(195, 216, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
  height: 65rpx;
  font-size: 24rpx;
  text-align: right;
  padding-right: 50rpx;
  line-height: 65rpx;
}

.popupContent {
  padding: 15rpx 58rpx;
  padding-bottom: 42rpx;
}

.popupContent image {
  width: 470rpx;
  height: 292rpx;
  margin-bottom: 38rpx;
}

.popupContent-textItem {
  margin-bottom: 20rpx;
  font-size: 22rpx;
  color: #555555;
  text-indent: 40rpx;
  line-height: 34rpx;
}

/* .popupContent-text{
  white-space: pre;
} */

/* .progress {
  width: 90px;
  height: 90px;
  background: conic-gradient(#F06D6D var(--progress), #f1f1f1 var(--last));
  border-radius: 50%;
  position: relative;

  &::before {
    content: attr(data-progress);
    position: absolute;
    inset: 10px;
    background-color: #fff;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    border-radius: 50%;
    font-size: 18px;

  }
}

.progress[data-progress^="0"] {
  --start-angle: calc(360deg * (var(--progress) / 100));
} */
</style>
