<template>
  <view class="main">
    <cy-navbar
      :isReturnHome="isReturnHome"
      :showBack="true"
      :bgColor="backColor"
      textColor="#3D3D3D"
    >
      单词挑战赛
    </cy-navbar>
    <view class="content">
      <view class="head pl-1">
        <view class="headL mr-1">
          <image :src="textBook.bookImage" mode=""></image>
        </view>
        <view class="headR">
          <view
            v-if="textBook.bookFullName.split('-')[1]"
            class="headR-title mt-1"
          >
            {{ textBook.bookFullName.split("-")[1] }}
          </view>
          <view class="headR-name">
            {{ textBook.bookFullName.split("-")[0] }}
          </view>
          <view class="headR-num mt-2 t-color-1863E5">
            共{{ textBook.wordNums }}个单词
          </view>
          <view class="mt-2 t-color-8A8A8A t-size-22">
            已挑战次数：{{ textBook.challengeTimes }}
            <view class="flex align-item-center justify-content-between mt-1">
              <view>已挑战单词数：{{ textBook.totalWordNum }}</view>
              <view class="ml-5"
                >正确单词数：{{ textBook.correctWordNum }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="list">
        <view class="flex align-item-center justify-content-between px-3 mb-2">
          <view class="t-size-28 t-color-3D3D3D font-weight-bold"
            >单词列表
          </view>
          <view
            class="t-size-26 t-color-6a6a6a flex align-item-center"
            @click="network().queryListByBookId()"
          >
            <view class="iconfont" style="font-size: 26rpx">&#xe62d;</view>
            <view class="ml-1">换一批单词</view>
          </view>
        </view>
        <view
          class="listItem"
          v-for="(item, i) in allData"
          :key="item.id"
          v-if="id == 0 || id == 2 || id == 3"
          @click="item.audioUsa ? play(item.audioUsa, item.id) : ''"
        >
          <view class="listItem-l">
            <view v-if="item.audioUsa">
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
            <view v-else style="width: 38rpx; height: 26rpx"></view>
          </view>
          <view class="listItem-c">
            <view class="listItem-cTitle">
              <view class="listItem-cTitle-word"> {{ item.wordEn }}</view>
              <view class="listItem-cTitle-definition">
                {{ "['" + item.symbolUsa + "']" }}
              </view>
            </view>
            <view class="listItem-cContent">
              <view class="listItem-cContent-item">
                {{ item.wordCn }}
              </view>
            </view>
          </view>
          <view class="listItem-r" @click.stop="toDefined(item)">
            词汇讲解
          </view>
        </view>
      </view>
    </view>
    <view class="button" @click="chanllenge"> 立即挑战</view>
  </view>
</template>

<script>
import {
  queryListByBookId,
  queryBookById,
  queryChallengeByUser,
  queryBookChallengeInfo,
  challengeStart,
} from "../../../api/word";

const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
import MyMixin from "@/utils/MyMixin";
import { wordList, dictList, lessonWordList, queryById } from "@/api/word";

export default {
  mixins: [MyMixin],
  data() {
    return {
      id: 0,
      backColor: "transparent",
      data: {
        unitId: 0,
      },
      dataB: {
        lessonId: 0,
        pageSize: 99,
      },
      dataC: {
        id: 0,
      },
      allData: {},
      audioSrc: "",
      gif: false,
      selectId: 0,
      bookInfo: {},
      textBook: {
        bookFullName: "",
        correctWordNum: "",
        totalWordNum: "",
        correctWordNum: "",
      },
      bookId: "",
      query: {},
      isReturnHome: 0,
    };
  },
  onLoad(e) {
    if (e.isReturnHome) {
      this.isReturnHome = 1;
    }
    this.query = e;
    this.initData();
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#DEF0FF";
    } else {
      this.backColor = "transparent";
    }
  },
  onShow() {},
  methods: {
    async chanllenge() {
      let data = await challengeStart({
        bookId: this.bookId,
      });
      let result = {
        wordLessonDictList: this.allData,
        bookFullName: data.data.result.bookFullName,
      };
      uni.setStorageSync("wordList", result);
      var urls =
        "/pages/word/dictation?id=" +
        data.data.result.id +
        "&lessonId=" +
        data.data.result.lessonId +
        "&pageType=chanllenge&bookId=" +
        this.bookId;
      uni.redirectTo({ url: urls });
    },
    toDefined(item) {
      this.setWordLessonDictList();
      this.toNav(
        "/pages/word/definition?wordEn=" +
          item.wordEn +
          "&pageType=chanllenge&id=0&unitId=" +
          this.bookId +
          "&state=1"
      );
    },
    setWordLessonDictList() {
      var wordList = uni.getStorageSync("wordList");
      console.log("wordList", wordList);
      console.log("this.allData", this.allData);
      if (wordList) {
        wordList.wordLessonDictList = this.allData;
        uni.setStorageSync("wordList", wordList);
      } else {
        uni.setStorageSync("wordList", { wordLessonDictList: this.allData });
        this.setWordLessonDictList();
        this.toNav(
          "/pages/word/set?id=" + this.bookId + "&pageType=chanllenge"
        );
      }
    },
    async initData() {
      // var result = uni.getStorageSync("basicData").currWordConfig.textBook;
      // if (result) {
      // this.bookId = result.id;
      console.log("iddddddddddddd", this.query.bookId);
      this.bookId = this.query.bookId;
      this.network().queryListByBookId();
      await this.network().queryBookById();
      await this.network().queryBookChallengeInfo();
      // }
    },
    play(src, id) {
      var that = this;
      this.gif = true;
      this.selectId = id;
      // innerAudioContext.src = src;
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
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
    network() {
      return {
        queryListByBookId: async () => {
          let res = await queryListByBookId({ bookId: this.bookId });
          this.allData = res.data.result;
        },
        queryBookById: async () => {
          const res = await queryBookById({ id: this.bookId });
          this.bookInfo = res.data.result;
        },
        queryBookChallengeInfo: async () => {
          const res = await queryBookChallengeInfo({ bookId: this.bookId });
          this.textBook = Object.assign(this.bookInfo, res.data.result);
          console.log("textBook1", this.textBook);
        },
      };
    },
  },
};
</script>

<style lang="scss">
.nav-icon,
.nav-slot,
.nav-btn {
  color: black !important;
}

.main {
  background: linear-gradient(180deg, #def0ff 0%, #f7fcff 100%);
  padding-bottom: 200rpx;
}

.head {
  position: fixed;
  z-index: 999;
  display: flex;
  padding: 20rpx 0 30rpx 0;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(225, 241, 255);

  .headL image {
    width: 170rpx;
    height: 224rpx;
    margin-right: 30rpx;
  }

  .headR-title {
    color: #1863e5;
    margin: 10rpx 0;
    font-weight: 600;
  }

  .headR-name {
    font-size: 30rpx;
    margin-bottom: 10rpx;
    font-weight: 600;
  }

  .headR-num {
    font-size: 22rpx;
  }

  .join-btn {
    width: 169rpx;
    height: 70rpx;
    border-radius: 10rpx;
    background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
  }
}

.title {
  background: #def0ff;
  width: 100%;
  padding-bottom: 30rpx;
  z-index: 1;
  left: 0;
}

.content {
  padding: 0 50rpx 30rpx;
}

.list {
  padding-top: 300rpx;
}

.listItem {
  background: #fff;
  display: flex;
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.listItem-c {
  margin-left: 25rpx;
  flex: 1;
}

.listItem-cTitle {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.listItem-cTitle-word {
  font-weight: 600;
}

.listItem-cTitle-definition {
  margin-left: 20rpx;
  color: rgba(109, 109, 109, 1);
  font-size: 22rpx;
}

.listItem-cContent-item {
  color: rgba(109, 109, 109, 1);
  font-size: 22rpx;
  margin-bottom: 2rpx;
  white-space: pre-line;
  line-height: 36rpx;
}

.listItem-r {
  background: #f7a751;
  border-radius: 50rpx;
  color: #fff;
  font-size: 20rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
}

.listItem-l {
  position: relative;
  top: 4rpx;
}

.button {
  position: fixed;
  bottom: 70rpx;
  width: 206rpx;
  height: 80rpx;
  background: linear-gradient(180deg, #5692f9 0%, #1863e5 100%);
  border-radius: 50rpx;
  color: #fff;
  line-height: 80rpx;
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 26rpx;
}

.listItem-lGif {
  width: 38rpx;
  height: 26rpx;
  position: relative;
}
</style>
