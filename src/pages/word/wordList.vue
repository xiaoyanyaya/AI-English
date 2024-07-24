<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :isReturnHome="isReturnHome"
      bgColor="#def0ff"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">单词列表</view>
    </cy-navbar>
    <view class="content">
      <view class="t-color-3D3D3D t-size-30 font-weight-bold text-center title">
        <view>
          {{
            id == 0 || id == 2 || id == 3
              ? allData.bookFullName
              : dictBook.bookFullName
          }}
        </view>
        <view>
          {{ unitOrLesson }}
        </view>
      </view>
      <!-- 单词列表 -->
      <view class="list">
        <view v-if="id == 3" class="noforget_box">
          <view class="left">
            {{ getNameWithEllipsis(allData.lessonName, 14) }}
          </view>
          <view class="right">
            <view class="r_top">
              {{ allData.createTime }}
            </view>
            <view class="r_body">
              <view class="succ">正确（{{ allData.correctWordNum }}）</view>
              <view class="err">错误 （{{ allData.errorWordNum }}）</view>
            </view>
          </view>
        </view>
        <view
          class="listItem"
          v-for="item in allData.wordLessonDictList"
          :key="item.id"
          v-if="id == 0 || id == 2 || id == 3"
          @click="item.audioUsa ? play(item.audioUsa, item.id) : ''"
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
              <view class="listItem-cTitle-definition">
                {{ "['" + item.symbolUsa + "']" }}
              </view>
            </view>
            <view class="listItem-cContent">
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
          </view>
          <view
            class="listItem-r"
            @click.stop="
              toNav(
                '/pages/word/definition?wordEn=' +
                  item.wordEn +
                  '&lessonId=' +
                  lessonId
              )
            "
          >
            词汇讲解
          </view>
          <view v-if="item.answerResult != null" class="listItem-img">
            <image
              v-if="item.answerResult == 0"
              :src="imageBaseUrl + '/word/5-21-41.png'"
            ></image>
            <image v-else :src="imageBaseUrl + '/word/5-21-40.png'"></image>
          </view>
        </view>
        <view
          class="listItem"
          v-for="item in allData"
          :key="item.id"
          v-if="id == 1"
          @click="item.audioUsa ? play(item.audioUsa) : ''"
        >
          <view class="listItem-l">
            <u-icon
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
              <view class="listItem-cTitle-definition">
                {{ "['" + item.symbolUsa + "']" }}
              </view>
            </view>
            <view class="listItem-cContent">
              <view class="listItem-cContent-item">
                <view
                  v-for="wordCn in item2.wordCnList"
                  :key="wordCn"
                  class="ellipsis"
                >
                  {{ wordCn }}
                </view>
              </view>
            </view>
          </view>
          <view
            class="listItem-r"
            @click.stop="
              toNav(
                '/pages/word/definition?wordEn=' +
                  item.wordEn +
                  '&id=1' +
                  '&lessonId=' +
                  lessonId
              )
            "
          >
            词汇讲解
          </view>
        </view>
      </view>
      <view class="button" @click="chanllenge">
        {{ chanllengeBtnText }}
      </view>
    </view>
    <!-- <audio :src="audioSrc" autoplay auto></audio> -->
  </view>
</template>

<script>
// import uSticky from "@/node_modules/uview-ui/components/u-sticky";
// const bgAudioManager = uni.getBackgroundAudioManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
import MyMixin from "@/utils/MyMixin";
import {
  wordList,
  lessonWordListByL,
  lessonWordList,
  queryById,
} from "@/api/word";
import { reviewStart } from "@/api/word";

export default {
  mixins: [MyMixin],
  data() {
    return {
      id: 0,
      lessonId: "",
      allData: {
        bookFullName: "",
        lessonName: "",
        errorWordNum: "",
        correctWordNum: "",
      },
      dictBook: {},
      audioSrc: "",
      gif: false,
      selectId: 0,
      title: "",
      chanllengeBtnText: "立即挑战",
      setData: {
        show: true,
        num: 3,
      },
      unitOrLesson: "",
      query: {},
      isReturnHome: 0,
    };
  },
  onLoad(e) {
    console.log("eeee", e);
    if (e.isReturnHome) {
      console.log("分享页面进来~~~~~~~~~");
      this.isReturnHome = 1;
    }
    this.query = e;
    if (e.id == 0) {
      this.chanllengeBtnText = "立即听写";
    }
    if (e.id == 2) {
      this.chanllengeBtnText = "立即听写";
    }
    if (e.id == 3) {
      this.chanllengeBtnText = "开始复习";
    }
    if (e.btnTitle) {
      this.chanllengeBtnText = e.btnTitle;
      if (e.btnTitle == "重新答题") {
        this.lessonId = uni.getStorageSync("lessonId");
      }
    }
    if (e.title) {
      this.title = e.title;
    }
    if (e.id) {
      this.id = e.id;
      uni.setStorageSync("wordType", e.id);
    } else {
      this.id = uni.getStorageSync("wordType");
    }
    if (e.id == 1) {
      this.chanllengeBtnText = "立即听写";
      this.lessonId = e.btnTitle ? uni.getStorageSync("lessonId") : e.lessonId; //考纲传直接传上个页面的课时id(dict的id)
      uni.setStorageSync("lessonId", this.lessonId);
    }
    this.dictBook = uni.getStorageSync("basicData").currWordConfig.dictBook;
    this.unitOrLesson = uni.getStorageSync("nowUnitOrLesson");
  },
  onShow() {
    this.getWord();
  },
  methods: {
    async chanllenge() {
      uni.setStorageSync("setData", this.setData);
      let data = {};
      data = await reviewStart({ lessonId: this.lessonId });
      console.log("dataaaaaaaaaaaaa", data);
      var urls =
        "/pages/word/dictation?id=" +
        data.data.result.id +
        "&lessonId=" +
        data.data.result.lessonId +
        "&title=" +
        (this.title ? this.title : "") +
        "&pageType=" +
        (this.pageType ? this.pageType : "") +
        "&bookId=" +
        (this.id == 1 ? this.lessonId : this.allData.id);
      this.toNav(urls);
    },
    async getWord() {
      uni.setStorageSync("nowUnitId", this.query.unitId);
      if (this.id == 0) {
        let data = await wordList({ unitId: this.query.unitId });
        console.log("id=0单词列表res的data", data);
        this.allData = data.data.result;
        this.allData.wordLessonDictList.forEach(
          (item) => (item.wordCnList = item.wordCn.split("\n"))
        );
        this.lessonId = this.allData.id; //教材页面的课时id:返回单词列表同时返回课时id
        uni.setStorageSync("lessonId", this.lessonId);
        uni.setStorageSync("wordList", data.data.result);
      } else if (this.id == 1) {
        let data = await lessonWordListByL({ lessonId: this.query.unitId });
        console.log("id=1单词列表res的data", data);
        this.allData = data.data.result;
        this.allData.forEach(
          (item) => (item.wordCnList = item.wordCn.split("\n"))
        );
        let result = {
          wordLessonDictList: data.data.result,
          bookFullName: this.dictBook.bookFullName,
          lessonName: "",
        };
        uni.setStorageSync("wordList", result);
      } else if (this.id == 2) {
        let data = await lessonWordList({ unitId: this.query.unitId });
        console.log("id=2单词列表res的data", data);
        this.allData = data.data.result;
        this.allData.wordLessonDictList.forEach(
          (item) => (item.wordCnList = item.wordCn.split("\n"))
        );
        this.lessonId = this.allData.id; //专题页面的课时id:返回单词列表同时返回课时id
        uni.setStorageSync("lessonId", this.lessonId);
        uni.setStorageSync("wordList", data.data.result);
      } else if (this.id == 3) {
        let data = await queryById({ id: this.query.unitId });
        console.log("id=3单词列表res的data", data);
        this.allData = data.data.result;
        this.allData.wordLessonDictList.forEach(
          (item) => (item.wordCnList = item.wordCn.split("\n"))
        );
        this.lessonId = this.allData.id; //抗遗忘复习的课时id:返回单词列表同时返回课时id
        uni.setStorageSync("lessonId", this.lessonId);
        uni.setStorageSync("wordList", data.data.result);
      }
    },
    play(src, id) {
      var that = this;
      this.gif = true;
      this.selectId = id;
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
  min-height: 100vh;
  background: linear-gradient(180deg, #def0ff 0%, #f7fcff 100%);
}

.content {
  padding: 0 55rpx 30rpx;

  .title {
    position: fixed;
    top: 8%;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 140rpx;
    align-items: 140rpx;
    padding: 40rpx 0 30rpx;
    box-sizing: border-box;
    text-align: center;
    background: #def0ff;
  }

  .list {
    padding-top: 135rpx;

    .noforget_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10rpx 20rpx 30rpx 50rpx;
      height: 140rpx;
      background: #eaf3ff;
      box-sizing: border-box;
      border: 3rpx solid transparent; /* 使用透明边框，以便后面覆盖 */
      margin-bottom: 20rpx;
      border-image: linear-gradient(102deg, #e5f3ff 0%, #85b2ff 100%) 3;
      border-radius: 10rpx !important;
      .left {
        font-size: 40rpx;
        color: #1863e5;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .r_top {
          font-size: 20rpx;
          color: #8a8a8a;
        }
        .r_body {
          margin-top: 25rpx;
          display: flex;
          .succ {
            color: #24a800;
          }
          .err {
            color: #dc0c0c;
          }
        }
      }
    }
  }
}

.listItem {
  position: relative;
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

.listItem-r {
  position: absolute;
  top: 50%;
  right: 11%;
  transform: translateY(-50%);
  background: #f7a751;
  border-radius: 50rpx;
  color: #fff;
  font-size: 20rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
}

.listItem-img {
  image {
    position: absolute;
    top: 32%;
    right: 2%;
    width: 40rpx;
    height: 40rpx;
  }
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
