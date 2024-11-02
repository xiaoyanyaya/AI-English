<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :bgColor="backColor"
      :isReturnHome="isReturnHome"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">答题结果</view>
    </cy-navbar>
    <view class="t-color-3D3D3D t-size-30 font-weight-bold text-center px-4">
      <view class="t-size-30" v-if="pageType === 'chanllenge'">
        <view>{{ data.bookFullName }}</view>
      </view>
      <view class="t-size-30" v-else>
        {{
          wordList.bookFullName ? wordList.bookFullName : bookData.bookFullName
        }}
      </view>
      <view v-if="pageType != 'chanllenge'">
        {{ unitOrLesson }}
      </view>
    </view>
    <view class="head mt-1">
      <image
        v-if="data.scoreLevel == 0"
        :src="imageBaseUrl + '/word/5-22-02.png'"
        mode="widthFix"
        :style="{ top: systemInfo.statusBarHeight + 'px' }"
      ></image>
      <image
        v-if="data.scoreLevel == 1"
        :src="imageBaseUrl + '/word/5-22-03.png'"
        mode="widthFix"
        :style="{ top: systemInfo.statusBarHeight + 'px' }"
      ></image>
    </view>
    <view class="statistics">
      <view class="statisticsItem">
        <view class="statisticsItem-top">
          <text v-if="pageType === 'chanllenge'">{{
            data.challengeScore
          }}</text>
          <text v-else>{{ data.reviewScore }}</text>
        </view>
        <view class="statisticsItem-bottom"> 分数 </view>
      </view>
      <view class="statisticsItem" v-if="false">
        <view class="statisticsItem-top"> 70% </view>
        <view class="statisticsItem-bottom"> 击败人数 </view>
      </view>
      <button
        open-type="share"
        data-name="shareBtn"
        size="mini"
        class="share_box"
        style="display: flex"
      >
        <image
          :src="`${imageBaseUrl}/word/6-24-01.png`"
          style="width: 30rpx; height: 30rpx"
        ></image>
        <view class="t-size-28 t-color-1863E5 ml-1">分享</view>
      </button>
      <view class="statisticsItem">
        <view class="statisticsItem-top"> {{ data.costTimes }}s </view>
        <view class="statisticsItem-bottom"> 用时 </view>
      </view>
    </view>
    <view class="tab">
      <view
        class="tabLeft"
        @click="tab = 0"
        :class="tab != 0 ? 'tabLeft-select' : ''"
      >
        答题卡
      </view>
      <view
        class="tabRight"
        @click="tab = 1"
        :class="tab == 1 ? 'tabRight-select' : ''"
      >
        词汇表
      </view>
    </view>
    <view class="list" v-if="tab == 1">
      <view class="listItem" v-for="(item, i) in data.wordReviewDictList">
        <view class="listItem-l">
          <view
            class="listItem-lL"
            :class="
              item.answerResult == 0
                ? 'red'
                : '' || item.answerResult == 1
                ? 'greey'
                : ''
            "
          >
            {{ i + 1 }}
          </view>
          <view class="listItem-lR">
            <view class="listItem-lR-t">
              <view class="listItem-lR-tName">
                {{ item.wordEn }}
              </view>
              <view class="listItem-lR-tHit">
                {{ "['" + item.symbolUsa + "]" }}
              </view>
            </view>
            <view class="listItem-lR-b">
              {{ item.wordCn }}
            </view>
          </view>
        </view>
        <view
          class="listItem-r"
          :class="
            item.answerResult == 0
              ? 'redFont'
              : '' || item.answerResult == 1
              ? 'greeyFont'
              : ''
          "
        >
          <text v-if="item.answerResult == 0">× 错误</text>
          <text v-else-if="item.answerResult == 1">√ 正确</text>
        </view>
      </view>
    </view>
    <view class="result" v-if="tab == 0">
      <view class="resultTitle">
        <view class="resultTitle-item">
          <view class="resultTitle-itemRed"></view>
          <view class="resultTitle-itemText"> 错误 </view>
        </view>
        <view class="resultTitle-item">
          <view class="resultTitle-itemGreen"></view>
          <view class="resultTitle-itemText"> 正确 </view>
        </view>
      </view>
      <view class="resultList">
        <view
          class="resultList-item"
          v-for="(item, i) in data.wordReviewDictList"
          :class="
            item.answerResult == 0
              ? 'red'
              : '' || item.answerResult == 1
              ? 'greey'
              : ''
          "
        >
          {{ i + 1 }}
        </view>
      </view>
    </view>
    <view class="charts-box" v-if="tab == 0">
      <qiun type="column" :opts="opts" :chartData="chartData" />
    </view>
    <view class="button">
      <view v-if="!isReturnHome" class="buttonLeft" @click="clickBtn(0)">
        <image :src="imageBaseUrl + '/word/5-21-26.png'" mode=""></image>
        {{ pageType === "chanllenge" ? "继续挑战" : "重新答题" }}
      </view>
      <view v-if="!isReturnHome" class="buttonLeft" @click="clickBtn(1)">
        <u-icon name="home" size="32"></u-icon>
        <text style="margin-left: 10rpx">{{
          pageType === "chanllenge" ? "挑战列表" : "复习列表"
        }}</text>
      </view>
      <view @click="goTry" v-if="isReturnHome" class="share_try">
        马上尝试！
      </view>
      <!-- <view v-if="pageType !== 'chanllenge'"
            class="buttonRight" @click="toNav('/pages/word/textbook?id='+wordType+'&bookId='+bookData.id)">
        <image :src="imageBaseUrl + '/word/5-21-29.png'" mode=""></image>
        挑战下一关
      </view> -->
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import qiun from "@/pages/word/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
import { reviewList, queryReviewList } from "@/api/word.js";
import { challengeFinishPost } from "../../api/word";

export default {
  mixins: [MyMixin],
  components: {
    qiun,
  },
  data() {
    return {
      isReturnHome: 0,
      backColor: "transparent",
      tab: 0,
      chartData: {},
      id: 0,
      opts: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: [
          "#A1C3FF",
          "#4FC455",
          "#F06B6B",
          "#BFBFBF",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        pixelRatio: 2,
        padding: [15, 15, 0, 5],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: true,
          position: "bottom",
          float: "center",
          padding: 5,
          margin: 5,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          fontSize: 13,
          fontColor: "#666666",
          lineHeight: 11,
          hiddenColor: "#CECECE",
          itemGap: 10,
        },
        xAxis: {
          disableGrid: true,
          disabled: false,
          axisLine: true,
          axisLineColor: "#CCCCCC",
          calibration: false,
          fontColor: "#666666",
          fontSize: 13,
          lineHeight: 20,
          marginTop: 0,
          rotateLabel: false,
          rotateAngle: 45,
          itemCount: 5,
          boundaryGap: "center",
          splitNumber: 5,
          gridColor: "#CCCCCC",
          gridType: "solid",
          dashLength: 4,
          gridEval: 1,
          scrollShow: false,
          scrollAlign: "left",
          scrollColor: "#A6A6A6",
          scrollBackgroundColor: "#EFEBEF",
          title: "",
          titleFontSize: 13,
          titleOffsetY: 0,
          titleOffsetX: 0,
          titleFontColor: "#666666",
          format: "",
        },
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
          disabled: false,
          disableGrid: false,
          splitNumber: 5,
          gridType: "solid",
          dashLength: 8,
          gridColor: "#CCCCCC",
          padding: 10,
          showTitle: false,
        },
        extra: {
          column: {
            type: "group",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            seriesGap: 2,
            categoryGap: 3,
            barBorderCircle: false,
            linearType: "none",
            linearOpacity: 1,
            colorStop: 0,
            meterBorder: 1,
            meterFillColor: "#FFFFFF",
            labelPosition: "outside",
          },
          tooltip: {
            showBox: true,
            showArrow: true,
            showCategory: false,
            borderWidth: 0,
            borderRadius: 0,
            borderColor: "#000000",
            borderOpacity: 0.7,
            bgColor: "#000000",
            bgOpacity: 0.7,
            gridType: "solid",
            dashLength: 4,
            gridColor: "#CCCCCC",
            boxPadding: 3,
            fontSize: 13,
            lineHeight: 20,
            fontColor: "#FFFFFF",
            legendShow: true,
            legendShape: "auto",
            splitLine: true,
            horizentalLine: false,
            xAxisLabel: false,
            yAxisLabel: false,
            labelBgColor: "#FFFFFF",
            labelBgOpacity: 0.7,
            labelFontColor: "#666666",
          },
          markLine: {
            type: "solid",
            dashLength: 4,
            data: [],
          },
        },
      },
      data: {},
      bookData: {},
      wordType: "",
      wordList: [],
      pageType: "",
      bookId: "",
      unitOrLesson: "",
      nowUnitId: "",
      sharePath: "",
    };
  },
  onReady() {
    this.getServerData();
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  onShareAppMessage(res) {
    const id = uni.getStorageSync("answerFromType");
    let bookId = "";
    let path = "";
    if (id == 0) {
      bookId = uni.getStorageSync("basicData").currWordConfig.textBook.id; //教材单元列表
      path = `/pages/word/textbook?id=${id}&bookId=${bookId}&btnTitle=重新答题&isReturnHome=1`;
    } else if (id == 1) {
      bookId = uni.getStorageSync("basicData").currWordConfig.dictBook.id; //考纲单元列表
      path = `/pages/word/textbook?id=${id}&bookId=${bookId}&btnTitle=重新答题&isReturnHome=1`;
    } else if (id == 2) {
      bookId = uni.getStorageSync("basicData").currWordConfig.textBook.id; ////专题单元列表
      path = `/pages/word/textbook?id=${id}&bookId=${bookId}&btnTitle=重新答题&isReturnHome=1`;
    } else if (id[1] == 0) {
      bookId = uni.getStorageSync("basicData").currWordConfig.textBook.id; //-->单词挑战赛页-教材挑战
      path = `/pages/word/chanllenge/wordList?bookId=${bookId}&isReturnHome=1`;
    } else if (id[1] == 1) {
      bookId = uni.getStorageSync("basicData").currWordConfig.dictBook.id; //-->单词挑战赛页-考纲挑战
      path = `/pages/word/chanllenge/wordList?bookId=${bookId}&isReturnHome=1`;
    }
    // 获取userInfo
    const userInfo = this.$store.state.userInfo;
    const fromType = uni.getStorageSync("answerFromType");
    if (res.from == "button") {
      return {
        title: `${userInfo.nickName}的听写榜，快来试试吧`,
        path: `pages/word/answer?promoCode=${this.$store.state.userInfo.promoCode}&id=${this.id}&bookId=${this.bookId}&pageType=${this.pageType}&isReturnHome=1&fromType=${fromType}`,
      };
    } else {
      return {
        title: "小礼AI极简英语",
        path:
          "pages/index/index?promoCode=" + this.$store.state.userInfo.promoCode,
      };
    }
  },
  onLoad(e) {
    if (e.isReturnHome) {
      this.isReturnHome = 1;
      let bookId = "";
      if (e.fromType == 0) {
        bookId = uni.getStorageSync("basicData").currWordConfig.textBook.id; //教材单元列表
        this.sharePath = `/pages/word/textbook?id=${e.fromType}&bookId=${bookId}&btnTitle=重新答题&isReturnHome=1`;
      } else if (e.fromType == 1) {
        bookId = uni.getStorageSync("basicData").currWordConfig.dictBook.id; //考纲单元列表
        this.sharePath = `/pages/word/textbook?id=${e.fromType}&bookId=${bookId}&btnTitle=重新答题&isReturnHome=1`;
      } else if (e.fromType == 2) {
        bookId = uni.getStorageSync("basicData").currWordConfig.textBook.id; ////专题单元列表
        this.sharePath = `/pages/word/textbook?id=${e.fromType}&bookId=${bookId}&btnTitle=重新答题&isReturnHome=1`;
      } else if (e.fromType.split(",")[1] == 0) {
        bookId = uni.getStorageSync("basicData").currWordConfig.textBook.id; //-->单词挑战赛页-教材挑战
        this.sharePath = `/pages/word/chanllenge/wordList?bookId=${bookId}&isReturnHome=1`;
      } else if (e.fromType.split(",")[1] == 1) {
        bookId = uni.getStorageSync("basicData").currWordConfig.dictBook.id; //-->单词挑战赛页-考纲挑战
        this.sharePath = `/pages/word/chanllenge/wordList?bookId=${bookId}&isReturnHome=1`;
      }
    }
    this.id = e.id;
    this.pageType = e.pageType;
    this.bookId = e.bookId;
    this.getData();
    this.bookData = uni.getStorageSync("bookData");
    this.wordList = uni.getStorageSync("wordList");
    this.wordType = uni.getStorageSync("wordType");
    this.unitOrLesson = uni.getStorageSync("nowUnitOrLesson");
    this.nowUnitId = uni.getStorageSync("nowUnitId");

    //判断用户是否关注公众号
    this.getUserInfo().then((data) => {
      const ifWxmpUser = data.ifWxmpUser;
      if (ifWxmpUser) return;
      this.toNav("/pages/word/authorization");
    });
  },
  methods: {
    goTry() {
      uni.redirectTo({ url: this.sharePath });
    },
    clickBtn(type) {
      switch (type) {
        case 0:
          if (this.pageType !== "chanllenge") {
            // 重新答题
            uni.redirectTo({
              url:
                "/pages/word/wordList?id=" +
                this.wordType +
                "&unitId=" +
                this.nowUnitId +
                "&btnTitle=重新答题",
            });
          } else {
            uni.redirectTo({
              url: "/pages/word/chanllenge/wordList?bookId=" + this.bookId,
            });
          }
          break;
        case 1:
          if (this.pageType !== "chanllenge") {
            // this.toNav('/pages/word/textbook?id=' + this.wordType + '&bookId=' + this.bookData.id)
            // uni.redirectTo({
            //   url: "/pages/word/reverseForgetting/index",
            // });
            this.toNav("/pages/word/reverseForgetting/index");
          } else {
            // uni.redirectTo({
            //   url: "/pages/word/chanllenge/index",
            // });
            this.toNav("/pages/word/chanllenge/index");
          }
          break;
      }
    },
    async getData() {
      var dataPass = {
        id: this.id,
      };
      let data = {};
      if (this.pageType == "chanllenge") {
        data = await challengeFinishPost({ id: this.id });
        data.data.result.wordReviewDictList =
          data.data.result.wordChallengeDictList;
        data.data.result.challengeScore =
          data.data.result.challengeScore.toFixed(2);
      } else {
        data = await reviewList(dataPass);
        data.data.result.reviewScore = data.data.result.reviewScore.toFixed(2);
      }
      this.data = data.data.result;
    },
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: [""],
          series: [
            {
              name: "总数",
              data: [this.data.totalWordNum],
            },
            {
              name: "正确",
              data: [this.data.correctWordNum],
            },
            {
              name: "错误",
              data: [this.data.errorWordNum],
            } /*, {
            name: "跳过",
            data: [this.data.totalWordNum - this.data.correctWordNum - this.data.errorWordNum]
          }*/,
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
  },
};
</script>

<style>
.nav-icon,
.nav-slot,
.nav-btn {
  color: black !important;
}

.main {
  background: linear-gradient(180deg, #dfecff 0%, #ffffff 33%);
  padding-bottom: 80rpx;
}

.head image {
  width: 100%;
  position: absolute;
  left: 0;
}

.head {
  height: 390rpx;
}

.statistics {
  display: flex;
  justify-content: space-around;
  padding: 0 150rpx;
}

.share_box {
  justify-content: space-evenly;
  align-items: center;
  color: #8a8a8a;
  height: 60rpx;
  line-height: 60rpx;
  background-color: #fff;
}
button::after {
  border: none; /*去掉分享按钮的边框 */
}

.statisticsItem-top {
  font-size: 37rpx;
  text-align: center;
}

.statisticsItem-bottom {
  color: #595959;
  font-size: 20rpx;
  text-align: center;
}

.charts-box {
  width: calc(100% - 130rpx);
  height: 300rpx;
  left: 0;
  right: 0;
  margin: auto;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35rpx;
  margin-bottom: 60rpx;
}

.tabLeft {
  width: 276rpx;
  height: 70rpx;
  line-height: 70rpx;
  background: linear-gradient(180deg, #7faeff 0%, #1b68ec 100%);
  color: #fff;
  font-size: 32rpx;
  border-radius: 50rpx 0 0 50rpx;
  text-align: center;
}

.tabLeft-select {
  border: 2rpx solid #1863e5;
  color: #1863e5;
  background: #fff;
}

.tabRight {
  width: 276rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  border-radius: 0rpx 50rpx 50rpx 0rpx;
  text-align: center;
  border: 2rpx solid #1863e5;
  color: #1863e5;
}

.tabRight-select {
  border: 0;
  color: #fff;
  background: linear-gradient(180deg, #7faeff 0%, #1b68ec 100%);
}

.resultTitle {
  display: flex;
  margin-bottom: 40rpx;
  justify-content: space-around;
  padding: 0 130rpx;
}

.resultTitle-itemRed {
  width: 26rpx;
  height: 26rpx;
  background: #f06b6b;
  border-radius: 50%;
}

.resultTitle-itemGreen {
  width: 26rpx;
  height: 26rpx;
  background: #4fc455;
  border-radius: 50%;
}

.resultTitle-itemGrey {
  width: 26rpx;
  height: 26rpx;
  background: #bfbfbf;
  border-radius: 50%;
}

.resultTitle-itemText {
  color: #595959;
  font-size: 20rpx;
  margin-left: 10rpx;
}

.resultTitle-item {
  display: flex;
  align-items: center;
}

.resultList {
  display: flex;
  flex-wrap: wrap;
  padding: 0 80rpx;
  margin-bottom: 50rpx;
}

.resultList-item {
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  line-height: 58rpx;
  text-align: center;
  color: #fff;
  background: #bfbfbf;
  font-size: 30rpx;
  margin: 0 23rpx;
  margin-bottom: 30rpx;
}

.red {
  background: #f06b6b !important;
}

.greey {
  background: #4fc455 !important;
}

.redFont {
  color: #f06b6b !important;
}

.greeyFont {
  color: #4fc455 !important;
}

.button {
  display: flex;
  justify-content: space-around;
  margin-top: 50rpx;
}

.share_try {
  width: 200rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 80rpx;
  text-align: center;
  background-color: #659cfa;
  color: #fff;
  font-size: 26rpx;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttonLeft {
  display: flex;
  align-items: center;
  color: #8a8a8a;
  font-size: 24rpx;
  border: 2rpx solid #8a8a8a;
  width: 200rpx;
  height: 77rpx;
  justify-content: center;
  border-radius: 80rpx;
}

.buttonLeft image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 10rpx;
}

.buttonRight {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 24rpx;
  width: 200rpx;
  height: 77rpx;
  justify-content: center;
  border-radius: 80rpx;
  background: linear-gradient(180deg, #f99f56 0%, #e57b18 100%);
}

.buttonRight image {
  width: 34rpx;
  height: 26rpx;
  margin-right: 10rpx;
}

.list {
  padding: 0 40rpx;
}

.listItem {
  background: #f6fbff;
  border-radius: 10rpx;
  padding: 18rpx 50rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.listItem-l {
  width: 500rpx;
  display: flex;
  align-items: center;
}

.listItem-lL {
  margin-right: 20rpx;
  background: #bfbfbf;
  border-radius: 50%;
  color: #fff;
  font-size: 30rpx;
  width: 52rpx;
  height: 52rpx;
  text-align: center;
  line-height: 52rpx;
}

.listItem-lR-t {
  display: flex;
  align-items: center;
  margin-bottom: 4rpx;
}

.listItem-lR-tName {
  color: #3d3d3d;
  font-size: 26rpx;
}

.listItem-lR-tHit {
  font-size: 22rpx;
  color: #6d6d6d;
  margin-left: 10rpx;
}

.listItem-lR-b {
  font-size: 24rpx;
}

.listItem-r {
  font-size: 24rpx;
}
</style>
