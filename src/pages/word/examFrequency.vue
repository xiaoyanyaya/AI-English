<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :allTrans="true"
      bgColor="linear-gradient(180deg, #D9EEFF 0%, #fff 100%)"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">单词考频</view>
    </cy-navbar>

    <view class="top_show">
      <view class="img">
        <image :src="imageBaseUrl + '/11-14-10.png'"></image>
      </view>
      <view
        @click="toNav(`/pages/word/fastQuestion?bookId=${bookData.id}`)"
        class="fast_sty"
      >
        <text>极速刷词</text>
      </view>
      <view class="freq_sty">
        <view
          v-for="(item, index) in frequencyList"
          @click="changeFreq(item, index)"
          :key="item.examFrequencyType"
          :class="{
            actFreq: actFreqIndex == index,
            'pl-2': true,
            'pr-2': true,
          }"
        >
          {{ item.examFrequencyText }}
        </view>
      </view>
      <view class="tabs_sty">
        <view
          v-for="(item, index) in tabsList"
          @click="changeTab(item, index)"
          :key="item.value"
          :class="{ actTab: actTabIndex == index, 'pb-4': true }"
        >
          {{ item.lable }}
        </view>
      </view>
    </view>

    <!-- 单词列表 -->
    <scroll-view @scrolltolower="onScrolltolower" scroll-y>
      <view :style="{ 'padding-top': topBoxHeight + 10 + 'px' }" class="p_list">
        <view v-if="wordList.length == 0" class="no_word">
          <image :src="imageBaseUrl + '/word/7-2-01.png'"></image>
        </view>
        <view
          v-for="item in wordList"
          :key="item.id"
          @click="item.audioUsa ? play(item.audioUsa, item.id) : ''"
          class="listItem_word"
        >
          <view class="listItem-l">
            <image
              v-if="gif && selectId == item.id"
              class="listItem-lGif"
              :src="imageBaseUrl + '/word/in_play.gif'"
              mode=""
            ></image>
            <u-icon
              v-else
              name="volume-up"
              size="36"
              color="rgba(24, 99, 229, 1)"
            ></u-icon>
          </view>
          <view class="listItem-c">
            <view class="listItem-cTitle">
              <view class="listItem-cTitle-word">
                {{ item.wordEn }}
              </view>
              <view v-if="item.symbolUsa" class="listItem-cTitle-definition">
                {{ "[" + item.symbolUsa + "]" }}
              </view>
            </view>
            <view class="listItem-cContent-item">
              <view
                v-for="wordCn in item.wordCnList"
                :key="wordCn"
                class="ellipsis"
              >
                {{ wordCn }}
              </view>
            </view>
          </view>
          <view class="star">
            <view class="image">
              <image
                v-for="(item, index) in Number(item.examFrequencyType)"
                :key="index"
                :src="imageBaseUrl + '/frank/8-7-32.png'"
            /></view>
            <view
              class="listItem-r"
              @click.stop="
                toNav(
                  '/pages/word/definition?wordEn=' +
                    item.wordEn +
                    '&id=1' +
                    '&lessonId=' +
                    bookData.id +
                    '&state=1'
                )
              "
            >
              词汇讲解
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
      
  <script>
import {
  getFastWordList,
  getStudyWordList,
  getFrequencyList,
} from "@/api/word";
import MyMixin from "@/utils/MyMixin";
const innerAudioContext = uni.createInnerAudioContext();

export default {
  mixins: [MyMixin],
  data() {
    return {
      query: null,
      frequencyList: [],
      wordList: [],
      frequencyListParams: {
        bookId: "",
      },
      fastParams: {
        bookId: "",
        examFrequencyType: "",
        pageSize: "20",
        pageNo: "1",
      },
      studyParams: {
        bookId: "",
        examFrequencyType: "",
        understandStatus: "",
        pageSize: "20",
        pageNo: "1",
      },
      pages: "",
      tabsList: [
        { lable: "词汇", value: "0" },
        { lable: "已掌握", value: "1" },
        { lable: "生词", value: "2" },
      ],
      actFreqIndex: null,
      actTabIndex: 0,
      bookData: [],
    };
  },
  async onLoad(e) {
    this.query = e;
    this.bookData = uni.getStorageSync("basicData").currWordConfig.dictBook;
  },
  async onShow() {
    this.fastParams.bookId = this.query.bookId;
    this.studyParams.bookId = this.query.bookId;
    this.frequencyListParams.bookId = this.query.bookId;

    const res = await getFrequencyList(this.frequencyListParams);
    this.frequencyList = res.data.result;
    this.frequencyList.unshift({
      examFrequencyText: "全部",
      examFrequencyType: "",
    });

    const freqType = uni.getStorageSync("freqType");
    this.fastParams.examFrequencyType = freqType
      ? freqType
      : this.frequencyList[0].examFrequencyType;
    this.studyParams.examFrequencyType = freqType
      ? freqType
      : this.frequencyList[0].examFrequencyType;

    //查看生词
    if (this.query.showOnKnow) {
      this.actFreqIndex = 0;
      this.actTabIndex = 2;
      this.studyParams.understandStatus = 0;
      this.studyParams.examFrequencyType = "";
      this.fastParams.examFrequencyType = "";
      this.getStudyWordList();
    } else {
      this.frequencyList.forEach((item, index) => {
        if (item.examFrequencyType == freqType) {
          this.actFreqIndex = index;
        }
      });
      //考频页词汇单词列表
      this.getFastWordList();
    }
  },
  methods: {
    initData(res) {
      this.pages = res.data.result.pages;
      this.wordList.forEach((item) => {
        item.wordCnList = item.wordCn ? item.wordCn.split("\n") : [];
      });
      let result1 = {
        wordLessonDictList: this.wordList,
        bookFullName: this.bookData.bookFullName,
        lessonName: "",
      };
      uni.setStorageSync("wordList", result1);
    },
    async getFastWordList() {
      const res = await getFastWordList(this.fastParams);
      this.wordList.push(...(res.data.result.records || []));
      this.initData(res);
    },
    async getStudyWordList() {
      const res = await getStudyWordList(this.studyParams);
      this.wordList.push(...(res.data.result.records || []));
      this.initData(res);
    },
    async changeFreq(item, index) {
      if (index) uni.setStorageSync("freqType", item.examFrequencyType);
      this.fastParams.pageNo = 1;
      this.studyParams.pageNo = 1;
      this.actFreqIndex = index;
      this.fastParams.examFrequencyType = item.examFrequencyType;
      this.studyParams.examFrequencyType = item.examFrequencyType;
      switch (this.actTabIndex) {
        case 0:
          const res = await getFastWordList(this.fastParams);
          this.wordList = res.data.result.records;
          this.initData(res);
          break;
        case 1:
        case 2:
          const res2 = await getStudyWordList(this.studyParams);
          this.wordList = res2.data.result.records;
          this.initData(res2);
          break;
      }
    },
    async changeTab(item, index) {
      this.fastParams.pageNo = 1;
      this.studyParams.pageNo = 1;
      this.actTabIndex = index;
      switch (index) {
        case 0:
          const res = await getFastWordList(this.fastParams);
          this.wordList = res.data.result.records;
          this.initData(res);
          break;
        case 1:
          this.studyParams.understandStatus = 1;
          const res2 = await getStudyWordList(this.studyParams);
          this.wordList = res2.data.result.records;
          this.initData(res2);
          break;
        case 2:
          this.studyParams.understandStatus = 0;
          const res3 = await getStudyWordList(this.studyParams);
          this.wordList = res3.data.result.records;
          this.initData(res3);
          break;
      }
    },
    // 上划加载更多
    onScrolltolower() {
      if (this.actTabIndex == 0) {
        if (this.fastParams.pageNo >= this.pages)
          return uni.showToast({ title: "没有更多了哦~", icon: "none" });
        this.fastParams.pageNo++;
        this.getFastWordList();
      } else {
        if (this.studyParams.pageNo >= this.pages)
          return uni.showToast({ title: "没有更多了哦~", icon: "none" });
        this.studyParams.pageNo++;
        this.getStudyWordList();
      }
    },
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
    play(src, id) {
      var that = this;
      this.gif = true;
      this.selectId = id;
      console.log("点击播放", this.gif, this.selectId);
      console.log(uni.getSystemInfoSync().platform);
      if (uni.getSystemInfoSync().platform === "ios") {
        innerAudioContext.src = encodeURI(src);
        console.log(innerAudioContext.src);
        innerAudioContext.play();
        innerAudioContext.onEnded(() => {
          console.log("音频播放结束");
          that.gif = false;
        });
      } else {
        uni.showLoading({
          title: "加载中",
        });
        uni.downloadFile({
          url: src,
          success: (res) => {
            if (res.statusCode === 200) {
              uni.hideLoading();
              innerAudioContext.src = res.tempFilePath;
              innerAudioContext.play();
              innerAudioContext.onEnded(() => {
                console.log("音频播放结束");
                that.gif = false;
              });
            }
          },
          fail: (error) => {
            console.log(error, "error");
          },
        });
      }
    },
  },
};
</script>
      
  <style lang="scss" scoped>
.main {
  position: relative;
  background: #fff;
  min-height: 100vh;

  .top_show {
    position: fixed;
    top: 9%;
    background-color: #fff;
    z-index: 999;
    .img {
      margin: 20rpx 40rpx;
      width: 670rpx;
      height: 250rpx;
      border-radius: 10rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .fast_sty {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 40rpx;
      color: #ffffff;
      width: 670rpx;
      height: 80rpx;
      border-radius: 10rpx;
      background: linear-gradient(180deg, #5a95fb 0%, #3677e6 100%);
      margin-bottom: 20rpx;
      text {
        margin-left: 10rpx;
      }
    }
    .freq_sty {
      display: flex;
      justify-content: space-between;
      margin: 20rpx 60rpx;
      width: 630rpx;
      height: 60rpx;
      line-height: 60rpx;
      color: #e6bd81;
      font-size: 28rpx;
      .actFreq {
        border: 1rpx solid #e79315;
        color: #e79315;
      }
    }
    .tabs_sty {
      display: flex;
      justify-content: space-between;
      margin: 20rpx 60rpx;
      margin: 20rpx 140rpx;
      width: 480rpx;
      height: 40rpx;
      line-height: 40rpx;
      color: #1863e5;
      font-size: 28rpx;
      .actTab {
        border-bottom: 4rpx solid #1863e5;
      }
    }
  }

  .p_list {
    position: relative;
    padding-top: 530rpx;
    margin: 0 55rpx;
    width: 640rpx;
    height: 88vh;

    .no_word {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin-top: 30rpx;
      width: 250rpx;
      height: 170rpx;

      image {
        width: 100%;
        height: 90%;
      }
    }

    .listItem_word {
      position: relative;
      background: #fff;
      display: flex;
      padding: 20rpx 40rpx;
      border-radius: 10rpx;
      margin-bottom: 20rpx;
      border-top: 1px solid #d8d8d8;
    }

    .listItem-c {
      margin-left: 25rpx;
    }

    .listItem-cTitle {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;
      width: 380rpx;
      white-space: nowrap; /* 禁止换行 */
    }

    .listItem-cTitle-word {
      font-weight: 600;
    }

    .listItem-cTitle-definition {
      overflow: hidden; /* 溢出部分隐藏 */
      text-overflow: ellipsis; /* 超出部分用省略号代替 */
      white-space: nowrap; /* 禁止换行 */
      margin-left: 20rpx;
      color: rgba(109, 109, 109, 1);
      font-size: 22rpx;
    }

    .listItem-cContent-item {
      width: 380rpx;
      white-space: pre-line; /* 保留换行符，允许自动换行 */
      overflow: hidden;
      color: rgba(109, 109, 109, 1);
      font-size: 22rpx;
      margin-bottom: 2rpx;
      line-height: 36rpx;
      .ellipsis {
        width: 380rpx;
        overflow: hidden; /* 溢出部分隐藏 */
        text-overflow: ellipsis; /* 超出部分用省略号代替 */
        white-space: nowrap; /* 禁止换行 */
      }
    }

    .star {
      .image {
        position: absolute;
        top: 10%;
        right: 3%;
        image {
          margin-right: 8rpx;
          width: 28rpx;
          height: 28rpx;
        }
      }
    }

    .listItem-r {
      position: absolute;
      top: 60%;
      right: 3%;
      transform: translateY(-50%);
      padding: 5rpx;
      font-size: 22rpx;
      color: #f18928;
    }

    .listItem-l {
      position: relative;
      top: 4rpx;
    }
  }
}
</style>