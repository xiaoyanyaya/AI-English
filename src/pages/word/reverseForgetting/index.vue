<template>
  <view class="main">
    <cy-navbar showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">抗遗忘复习</view>
    </cy-navbar>
    <view class="head">
      <view class="headLeft">
        <view class="headLeft-icon"></view>
        单词复习列表
      </view>
      <view class="headRight" @click="show = true">
        <text>艾宾浩斯遗忘曲线</text>
        <u-icon name="question-circle-fill"></u-icon>
      </view>
    </view>
    <!-- 日历筛选 -->
    <view class="calendar">
      <view
        v-for="(item, index) in calendarList"
        :key="item"
        class="c_filter"
        @click="changeHighlight(index)"
        :style="{
          'background-image': `url(${imageBaseUrl}/word/7-18-0${item.highlight}.png)`,
        }"
        >{{ item.value }}
      </view>
    </view>
    <!-- 复习列表 -->
    <view class="list">
      <view
        v-for="item in bookData"
        :key="item.id"
        @click="goWordList(item)"
        class="listItem-contentBook"
      >
        <view
          class="listItem-contentBook-head"
          :style="{
            'background-image': `url(${imageBaseUrl}/word/7-18-03.png)`,
          }"
        >
          <view class="l_date">
            {{ item.reviewPlanDateName }}
          </view>
          <view class="flex align-item-center justify-content-between pl-5">
            <view class="t-size-24 font-weight-bold t-color-1863E5">
              {{ getNameWithEllipsis(item.bookFullName, 15) }}
            </view>
            <view class="t-size-26 font-weight-bold">
              <text class="t-size-24 t-color-3D3D3D">
                正确({{ item.correctWordNum }})
              </text>
              <text>/</text>
              <text class="t-size-24 t-color-3D3D3D">
                错误({{ item.errorWordNum }})
              </text>
            </view>
          </view>
          <view
            class="flex align-item-center justify-content-between mt-2 pl-5"
          >
            <view class="font-w-5 t-size-30">
              {{ getNameWithEllipsis(item.lessonName, 28) }}
            </view>
            <view
              class="listItem-contentBook-icon"
              @click.stop="launch(item.id)"
              :class="item.click ? 'listItem-contentBook-icons' : ''"
            >
              <image :src="imageBaseUrl + '/word/6-4-02.png'" mode=""></image>
            </view>
          </view>
        </view>
        <view class="listItem-contentBook-form" v-show="item.click">
          <view class="listItem-contentBook-tab">
            <view
              class="listItem-contentBook-tabItem"
              @click.stop="tabClick(0)"
              :class="tabNum == 0 ? 'listItem-contentBook-tabItem-select' : ''"
            >
              已复习历程
            </view>
            <view
              class="listItem-contentBook-tabItem"
              @click.stop="tabClick(1)"
              :class="tabNum == 1 ? 'listItem-contentBook-tabItem-select' : ''"
            >
              待复习计划
            </view>
          </view>
          <view class="listItem-contentBook-formTitle">
            <view
              class="listItem-contentBook-formTitle-item"
              style="width: 20%"
            >
              日期
            </view>
            <view
              class="listItem-contentBook-formTitle-item"
              style="width: 20%"
            >
              用时(秒)
            </view>
            <view
              class="listItem-contentBook-formTitle-item"
              style="width: 20%"
            >
              正确数
            </view>
            <view
              class="listItem-contentBook-formTitle-item"
              style="width: 20%"
            >
              错误数
            </view>
            <view
              class="listItem-contentBook-formTitle-item"
              style="width: 20%"
            >
              结果
            </view>
          </view>
          <view
            class="listItem-contentBook-formList"
            v-for="tab in tabData"
            :key="tab.id"
          >
            <view class="listItem-contentBook-formList-item" style="width: 20%">
              {{ tab.reviewDate }}
            </view>
            <view class="listItem-contentBook-formList-item" style="width: 20%">
              {{ tab.costTimesText ? tab.costTimesText : "-" }}
            </view>
            <view class="listItem-contentBook-formList-item" style="width: 20%">
              {{ tab.correctWordNum || 0 }}
            </view>
            <view class="listItem-contentBook-formList-item" style="width: 20%">
              {{ tab.errorWordNum || 0 }}
            </view>
            <view class="listItem-contentBook-formList-item" style="width: 20%">
              <view v-if="tabNum == 0">
                <text v-if="tab.reviewResult == 0">不通过</text>
                <text v-else-if="tab.reviewResult == 1">通过</text>
                <text v-else>未完成答题</text>
              </view>
              <view v-else>{{ tab.reviewResult == 1 ? "通过" : "-" }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 错词本 -->
    <view
      class="imgs"
      @click="toNav('/pages/word/reverseForgetting/wrongWords')"
    >
      <image :src="imageBaseUrl + '/word/6-4-01.png'" mode=""></image>
    </view>
    <!-- 弹窗 -->
    <u-popup v-model="show" mode="center" border-radius="20">
      <view class="popup">
        <view class="popupHead">
          <u-icon name="close" @click="show = false"></u-icon>
        </view>
        <view class="popupContent">
          <image :src="imageBaseUrl + '/word/6-4-03.jpg'" mode=""></image>
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
    <view style="height: 160rpx"></view>
    <wordTab :type="1"></wordTab>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import luanqingProgressbar from "@/pages/word/components/luanqing-progressbar/luanqing-progressbar.vue";
import wordTab from "@/pages/word/components/word-tabbar/index.vue";
import { getUserLessonList, queryListByLessonId } from "@/api/word";

export default {
  mixins: [MyMixin],
  components: {
    wordTab,
  },
  data() {
    return {
      bookData: [],
      allBookData: [],
      tadayBookData: [],
      tomorBookData: [],
      tomor2BookData: [],
      weekBookData: [],
      mouthBookData: [],
      tabData: [],
      show: false,
      tabNum: 0,
      calendarList: [
        { value: "全部", highlight: 1 },
        { value: "今天", highlight: 2 },
        { value: "明天", highlight: 2 },
        { value: "后天", highlight: 2 },
        { value: "本周", highlight: 2 },
        { value: "本月", highlight: 2 },
      ],
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
    goWordList(item) {
      uni.setStorageSync("nowUnitOrLesson", item.lessonName);
      this.toNav("/pages/word/wordList?id=3" + "&unitId=" + item.id);
    },
    tabClick(i) {
      this.tabData = this.tabAllData[i].wordReviewList;
      this.tabNum = i;
    },
    async getData() {
      var that = this;
      let res = await getUserLessonList();
      this.bookData = res.data.result;
      this.allBookData = res.data.result;
      this.tadayBookData = res.data.result.filter((item) => {
        return item.reviewPlanDateName == "今天";
      });
      this.tomorBookData = res.data.result.filter((item) => {
        console.log("item", item);
        return item.reviewPlanDateName == "明天";
      });
      this.tomor2BookData = res.data.result.filter((item) => {
        console.log("item", item);
        return item.reviewPlanDateName == "后天";
      });
      this.weekBookData = res.data.result.filter((item) => {
        console.log("item", item);
        return item.reviewPlanDateName == "本周";
      });
      this.mouthBookData = res.data.result.filter((item) => {
        console.log("item", item);
        return item.reviewPlanDateName == "本月";
      });
    },
    async getTab(id) {
      var res = {
        lessonId: id,
      };
      let data = await queryListByLessonId(res);
      this.tabAllData = data.data.result;
      this.tabData = data.data.result[this.tabNum].wordReviewList;
    },
    //展开/收起
    launch(id) {
      this.tabNum = 0;
      this.bookData.forEach((item) => {
        if (item.id == id) {
          item.click = !item.click;
          item.click && this.getTab(id);
        } else {
          item.click = false;
        }
      });
      this.bookData = JSON.parse(JSON.stringify(this.bookData));
    },
    changeHighlight(index) {
      this.calendarList.forEach((item, i) => {
        if (i == index) {
          item.highlight = 1;
        } else {
          item.highlight = 2;
        }
        if (index == 0) {
          this.bookData = this.allBookData;
        } else if (index == 1) {
          this.bookData = this.tadayBookData;
        } else if (index == 2) {
          this.bookData = this.tomorBookData;
        } else if (index == 3) {
          this.bookData = this.tomor2BookData;
        } else if (index == 4) {
          this.bookData = this.weekBookData;
        } else if (index == 5) {
          this.bookData = this.mouthBookData;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-icon,
.nav-slot,
.nav-btn {
  color: black !important;
}

.main {
  background: linear-gradient(180deg, #d1eaff 0%, #f8fdff 14%) !important;
}

.calendar {
  display: flex;
  padding: 40rpx 50rpx 5rpx;
  .c_filter {
    margin-right: 20rpx;
    width: 95rpx;
    height: 95rpx;
    text-align: center;
    line-height: 95rpx;
    background-size: cover;
  }
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
  color: #3d3d3d;
}

.headRight {
  color: #8a8a8a;
  font-size: 24rpx;
}

.headRight text {
  margin-right: 16rpx;
}

.headLeft-icon {
  width: 8rpx;
  height: 30rpx;
  border-radius: 2rpx;
  background: #3a73d9;
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
  letter-spacing: 2rpx;
}

.list {
  padding: 0 40rpx 40rpx;
  .listItem-contentBook {
    margin-top: 35rpx;

    .listItem-contentBook-head {
      position: relative;
      background-size: contain;
      padding: 40rpx 40rpx 25rpx 10rpx;
      border-radius: 10rpx 10rpx 0 0;
      height: 160rpx;
      .l_date {
        transform: rotate(-45deg);
        position: absolute;
        top: 20rpx;
        color: #7199d6;
        width: 48rpx;
        font-size: 24rpx;
      }
    }
  }
}

.listItem-contentBook-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20rpx;
  margin-bottom: 22rpx;
}

.listItem-contentBook-topTitle {
  color: #1863e5;
  font-size: 24rpx;
}

.listItem-contentBook-topDate {
  color: #8a8a8a;
}

.listItem-contentBook-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.listItem-contentBook-bottomL {
  color: #3d3d3d;
  font-weight: 600;
  font-size: 36rpx;
}

.listItem-contentBook-bottomC {
  font-size: 24rpx;
  color: #8a8a8a;
}

.listItem-contentBook-bottomC text {
  color: #24a800;
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
  color: #8a8a8a;
  font-size: 24rpx;
}

.listItem-contentBook-tabItem-select {
  color: #e79315;
  border-bottom: 4rpx solid #e79315;
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
  background: #f9f9f9;
}

.listItem-contentBook-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateX(180deg);
  padding: 8rpx;
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
  background: linear-gradient(
    180deg,
    rgba(195, 216, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
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
