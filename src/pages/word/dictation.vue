<template>
  <view class="main">
    <cy-navbar showBack :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">词汇听写</view>
    </cy-navbar>

    <view
      class="t-color-3D3D3D t-size-30 font-weight-bold text-center table-nowrap px-5 mt-5"
    >
      {{ baseInfo.bookFullName }}
      <view v-if="pageType != 'chanllenge'">
        {{ unitOrLesson }}
      </view>
    </view>

    <view class="frequency">
      <view class="frequencyLeft">
        <u-line-progress
          inactive-color="#FDF5EC"
          active-color="#FFAB2D"
          height="40"
          :percent="(currentTopic / totalTopic) * 100"
        >
          <view class="frequencyLeft-text">
            {{ currentTopic }}/{{ totalTopic }}
          </view>
        </u-line-progress>
      </view>
      <view>
        <cy-current-time></cy-current-time>
      </view>
    </view>

    <view class="playImg" @click="clickPlay">
      <image
        :src="
          imageBaseUrl + (playing ? '/word/5-31-01.gif' : '/word/speaker.png')
        "
        mode=""
      ></image>
    </view>

    <view class="definition" v-if="setData.show">
      {{ "['" + currentTopicData.symbolUsa + "]" }}
    </view>
    <view class="word" v-if="setData.show">
      {{ currentTopicData.wordCn }}
    </view>

    <view class="flex align-item-center justify-content-center">
      <view
        class="mt-4 wordFilling-content"
        :class="currentTopicData.wordFilling.length > 10 ? 'grid' : 'flex'"
      >
        <view
          class="mr-1 ml-1"
          v-for="(item, index) in currentTopicData.wordFilling"
          :key="index"
        >
          <view
            :class="wordFillingClass"
            class="inputBox flex justify-content-center t-size-40 font-weight-bold"
          >
            {{ item.value }}
          </view>
          <view class="inputHr" v-show="item.isShow"></view>
        </view>
        <view
          class="ml-2 mt-4"
          @click="deleteWord"
          @longpress="longpressDeleteWord"
        >
          <u-icon name="close"></u-icon>
        </view>
      </view>
    </view>
    <view
      v-if="isInit"
      class="statusMessageBox flex justify-content-center align-item-center t-size-22"
    >
      <div
        v-show="currentTopicData.currentTopicStatus !== 'normal'"
        :class="
          currentTopicData.currentTopicStatus === 'success'
            ? 't-color-43A71C'
            : 't-color-DC0C0C'
        "
      >
        {{
          currentTopicData.currentTopicStatus === "success"
            ? "单词正确！"
            : "单词错误，请再次输入!"
        }}
      </div>
    </view>

    <view class="keys">
      <view
        class="keysItem"
        v-for="(item, i) in currentTopicData.shuffledStr"
        @click="selectWord(item, i)"
        :class="
          currentTopicData.selectWordIndex.find((obj) => obj === i) >= 0
            ? 'keysItem-select'
            : ''
        "
      >
        {{ item }}
      </view>
    </view>

    <view style="height: 170rpx; width: 100%"></view>
    <view class="selectTopicBox flex justify-content-center align-item-center">
      <view
        v-if="currentTopic > 1"
        class="btnBox flex flex-direction-column align-item-center"
        @click="lastTopic"
      >
        <image
          :src="`${imageBaseUrl}${
            debounceShow ? '/word/6-1-01.png' : '/word/pre_s.png'
          }`"
          mode=""
        ></image>
        <view :class="{ 't-color-1863E5': debounceShow }" class="mt-2 t-size-24"
          >上一个
        </view>
      </view>
      <view
        v-if=""
        class="btnBox flex flex-direction-column align-item-center"
        @click="nextTopic"
      >
        <image
          :src="`${imageBaseUrl}${
            debounceShow ? '/word/6-1-02.png' : '/word/next_s.png'
          }`"
          mode=""
        ></image>
        <view :class="{ 't-color-1863E5': debounceShow }" class="mt-2 t-size-24"
          >{{ currentTopic < totalTopic ? "下一个" : "结束" }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {
  challengeFinish,
  challengeWord,
  getWordEn,
  reviewFinish,
  reviewNext,
} from "@/api/word";
import { challengeFinishPost } from "../../api/word";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      // id
      id: "",
      lessonId: 0,
      bookId: 0,
      // 基本信息，上页面传递过来
      baseInfo: {},

      // 基本信息 - 题目合集
      topicList: [],
      // 总题目数
      totalTopic: 0,
      // 当前题目
      currentTopic: 0,
      // 题目数据（缓存做过的题目）
      topicDataCache: [],
      // 当前题目数据
      currentTopicData: {},

      // 条件模块
      setData: {},
      // 是否可以点击上一个下一个
      debounceShow: true,

      // 记录开始时间
      startTime: 0,
      // 页面停留时间
      stayTime: "00:00:00",
      // 页面是否初始化完毕
      isInit: false,

      // 当前页面类型
      pageType: "",
      playing: false,
      // 当前用户点击的是上一个还是下一个
      isNext: false,
      unitOrLesson: "", //单元名称、课时名称
    };
  },
  onLoad({ id, lessonId, pageType, bookId }) {
    this.getSystemInfo();
    this.pageType = pageType;
    this.id = id;
    this.lessonId = lessonId;
    this.bookId = bookId;
    this.setData = uni.getStorageSync("setData");
    this.baseInfo = uni.getStorageSync("wordList");
    this.unitOrLesson = uni.getStorageSync("nowUnitOrLesson");
    this.topicList = this.baseInfo.wordLessonDictList;
    this.totalTopic = this.topicList.length;
    // 初始化获取第一题
    this.nextTopic();
  },
  onUnload() {
    // 页面卸载时，停止音频播放
    this.stopPlay();
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  // 计算属性
  computed: {
    wordFillingClass() {
      if (this.currentTopicData.currentTopicStatus === "success") {
        return "t-color-43A71C";
      } else if (this.currentTopicData.currentTopicStatus === "error") {
        return "t-color-DC0C0C";
      } else {
        return "t-color-3D3D3D";
      }
    },
  },
  // 监听单词填写（深度监听）
  watch: {
    "currentTopicData.wordFilling": {
      handler: function (val, oldVal) {
        // 防止undefined
        if (!val) return;

        // val 全部填写完毕
        if (
          val.every((item) => item.value) &&
          this.currentTopicData.currentTopicStatus === "normal"
        ) {
          this.network().reviewNext(false, true);
        }
      },
      deep: true,
    },
  },
  methods: {
    clickSelectWord(value) {
      var letterList = uni.getStorageSync("letterList");
      letterList.forEach((obj, index) => {
        if (obj.letter === value) {
          console.log("点击了", obj.letter);
          this.publicPlayAudio(obj.audioFemale);
          return;
        }
      });
    },
    // 停止当前播放
    stopPlay() {
      this.playing = false;
      // 页面卸载时，停止音频播放
      if (this.currentTopicData.auditManager) {
        this.currentTopicData.auditManager.manager.stop();
      }
    },
    // 上一题
    lastTopic() {
      // 增加防抖
      if (!this.debounceShow) return;
      this.debounceShow = false;

      this.isNext = false;
      // 清除当前题目的定时器
      if (this.currentTopicData.timeout) {
        clearTimeout(this.currentTopicData.timeout);
      }
      if (this.currentTopic > 1) {
        // 从缓存中取出上一题数据
        this.currentTopicData = this.topicDataCache.pop();
        this.currentTopicData.auditManager.playCount = 0;
        this.currentTopic--;
        this.playAudio();
      }

      setTimeout(() => {
        this.debounceShow = true;
      }, 500);
    },
    // 下一题
    async nextTopic() {
      // 增加防抖
      if (!this.debounceShow) return;
      this.debounceShow = false;

      this.isNext = true;
      // 清除当前题目的定时器
      if (this.currentTopicData.timeout) {
        clearTimeout(this.currentTopicData.timeout);
      }
      if (this.currentTopic > 0) {
        // 记录当前题目的答题数据
        this.topicDataCache.push(this.currentTopicData);
      }

      if (this.currentTopicData.currentTopicStatus === "normal") {
        this.network().reviewNext(true);
      }
      if (this.currentTopic < this.totalTopic) {
        this.isInit = false;
        this.currentTopic++;
        var currentTopicData = this.topicList[this.currentTopic - 1];
        this.network().getWordEn(currentTopicData.wordEn);
      } else if (this.currentTopic === this.totalTopic) {
        // 判断是挑战还是复习
        let data = {};
        if (this.pageType == "chanllenge") {
          data = await challengeFinishPost({ id: this.id });
        } else {
          data = await reviewFinish({ id: this.id });
        }
        this.$navigateTo(
          "/pages/word/answer?id=" +
            this.id +
            "&pageType=" +
            this.pageType +
            "&bookId=" +
            this.bookId
        );
      }

      setTimeout(() => {
        this.debounceShow = true;
      }, 500);
    },
    // 点击播放按钮
    clickPlay() {
      this.currentTopicData.auditManager.playCount = this.setData.num - 1;
    },
    // 单词填写格式化
    wordFormat() {
      var index = 0;
      this.currentTopicData.questionText.split("").forEach((item) => {
        this.currentTopicData.wordFilling.push({
          value: item === "_" ? "" : item,
          isShow: item === "_",
          index: item === "_" ? index : "",
        });
        if (item === "_") {
          index += 1;
        }
      });
      // 保留转换后的数据
      this.currentTopicData.wordFillingFormat = JSON.parse(
        JSON.stringify(this.currentTopicData.wordFilling)
      );
    },
    // 选择单词
    selectWord(item, i) {
      this.clickSelectWord(item);
      if (!this.currentTopicData.selectWordIndex.find((item) => item === i)) {
        if (
          this.currentTopicData.selectWordIndex.length <
          this.currentTopicData.questionAnswer.length
        ) {
          var wordFillindIndex = this.currentTopicData.selectWordIndex.length;
          this.currentTopicData.wordFilling.find(
            (item) => item.index === wordFillindIndex
          ).value = item;
          this.currentTopicData.selectWordIndex.push(i);
        }
        if (this.currentTopicData.questionText.indexOf("_") != -1) {
          this.currentTopicData.questionText = this.replaceCharAt(
            this.currentTopicData.questionText,
            this.currentTopicData.questionText.indexOf("_"),
            item
          );
        }
      }
    },
    // 删除单词
    deleteWord() {
      if (this.currentTopicData.selectWordIndex.length > 0) {
        this.currentTopicData.wordFilling.find(
          (item) =>
            item.index === this.currentTopicData.selectWordIndex.length - 1
        ).value = "";
        this.currentTopicData.selectWordIndex.pop();
        this.currentTopicData.currentTopicStatus = "normal";
      }
    },
    longpressDeleteWord() {
      this.currentTopicData.wordFilling = JSON.parse(
        JSON.stringify(this.currentTopicData.wordFillingFormat)
      );
      this.currentTopicData.selectWordIndex = [];
      this.currentTopicData.currentTopicStatus = "normal";
    },
    // 替换字符串指定位置字符
    replaceCharAt(str, index, newChar) {
      // 检查索引是否有效
      if (index < 0 || index >= str.length) {
        return str; // 或者可以抛出错误
      }
      // 转换为字符数组
      let chars = str.split("");
      // 替换指定下标的字符
      chars[index] = newChar;
      // 转换回字符串
      let newStr = chars.join("");
      return newStr;
    },
    playAudio() {
      var data = this.currentTopicData;
      let voicePath = "";
      if (this.systemInfo.platform === "android") {
        if (data.auditManager.templateFile) {
          voicePath = data.auditManager.templateFile;
        } else {
          uni.downloadFile({
            url: data.auditManager.file,
            success: (res) => {
              if (res.statusCode === 200) {
                voicePath = res.tempFilePath;
                data.auditManager.templateFile = voicePath;
              }
            },
          });
        }
      } else {
        voicePath = data.auditManager.file;
        data.auditManager.manager.obeyMuteSwitch = false;
      }

      data.auditManager.manager.src = voicePath;
      data.auditManager.manager.play();
      // 播放中
      data.auditManager.manager.onPlay(() => {
        this.playing = true;
      });

      // 保存定时器
      data.timeout = setTimeout(() => {
        if (data.auditManager.playCount < this.setData.num - 1) {
          this.playAudio();
          data.auditManager.playCount++;
        } else {
          this.playing = false;
        }
      }, 3000);
    },
    // 接口请求模块
    network() {
      return {
        getWordEn: async (wordEn) => {
          let res = await getWordEn({ wordEn });
          let data = res.data.result;

          // 可选单词乱序
          data.shuffledStr = this.shuffleString(
            (data.questionAnswer || "") + (data.questionAnswerNoise || "")
          );
          // 选中的单词索引
          data.selectWordIndex = [];
          // 当前单词填写状态 正常，正确，错误
          data.currentTopicStatus = "normal";
          // 单词填写初始化
          data.wordFilling = [];
          // 初始化音频播放器
          data.auditManager = {
            file: data.audioUsa,
            templateFile: "", // 保存下载后的音频文件
            playCount: 0, // 播放次数
            manager: uni.createInnerAudioContext(),
          };
          // data.questionText = "___________"
          this.currentTopicData = data;
          this.wordFormat();
          this.isInit = true;
          this.playAudio();
        },
        reviewNext: async (isSkip = false, isNext = false) => {
          var getData = {
            wordIndex: this.currentTopic,
            questionAnswer: this.currentTopicData.wordEn,
            wordEn: this.currentTopicData.wordEn,
            userAnswer: this.currentTopicData.wordFilling
              .map((item) => item.value)
              .join(""),
          };

          // 判断是挑战还是复习
          let res;
          if (this.pageType == "chanllenge") {
            getData = {
              ...getData,
              challengeId: this.id,
            };
            res = await challengeWord(getData);
          } else {
            getData = {
              ...getData,
              reviewId: this.id,
              lessonId: this.lessonId,
            };
            res = await reviewNext(getData);
          }
          if (isSkip) return;

          if (res.data.code == 200 && res.data.result.answerResult == 1) {
            // 正确
            this.currentTopicData.currentTopicStatus = "success";

            if (this.currentTopic < this.totalTopic && isNext) {
              // 下一题
              setTimeout(() => {
                this.nextTopic();
              }, 500);
            } else {
              // 完成
              let data = {};
              // 判断是挑战还是复习
              if (this.pageType == "chanllenge") {
                data = await challengeFinishPost({ id: this.id });
              } else {
                data = await reviewFinish({ id: this.id });
              }
              this.$navigateTo(
                "/pages/word/answer?id=" +
                  this.id +
                  "&pageType=" +
                  this.pageType +
                  "&bookId=" +
                  this.bookId
              );
            }
          } else {
            // 错误
            this.currentTopicData.currentTopicStatus = "error";
          }
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(
    180deg,
    #dff0ff 0%,
    #f0f7fd 6%,
    #ffffff 21%
  ) !important;
}

.frequency {
  display: flex;
  justify-content: center;
  padding: 0 70rpx;
  margin-top: 58rpx;
  margin-bottom: 95rpx;
  align-items: center;

  .frequencyLeft {
    flex: 1;
    margin-right: 28rpx;

    .frequencyLeft-text {
      padding-left: 20rpx;
      color: black;
    }
  }
}

.playImg {
  display: flex;
  justify-content: center;
  margin-bottom: 59rpx;

  image {
    width: 126rpx;
    height: 94rpx;
  }
}

.definition {
  text-align: center;
  color: rgba(109, 109, 109, 1);
  font-size: 30rpx;
}

.word {
  font-size: 30rpx;
  text-align: center;
  padding: 0 50rpx;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
}

.inputBox {
  height: 70rpx;
}

.inputHr {
  width: 36rpx;
  height: 6rpx;
  background: #3d3d3d;
}

.statusMessageBox {
  height: 50rpx;
}

.keys {
  display: flex;
  margin-top: 50rpx;
  padding: 0 40rpx;
  flex-wrap: wrap;
  padding-bottom: 160rpx;

  .keysItem {
    border-radius: 10rpx;
    border: 2rpx solid #517ef1;
    background: #f1f6ff;
    width: 90rpx;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
    margin-right: 26rpx;
    margin-bottom: 30rpx;
  }

  .keysItem-select {
    border: 2rpx solid #e06d25;
    background: #fab472;
    color: #fff;
  }
}

.keysItem:nth-child(6n) {
  margin-right: 0;
}

.selectTopicBox {
  height: 170rpx;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1rpx solid #e6e6e6;
  background: #ffffff;

  .btnBox {
    margin: 0 95rpx;
  }

  image {
    width: 28rpx;
    height: 34rpx;
  }
}

.wordFilling-content {
  width: 680rpx;
  // grip布局
  grid-template-columns: repeat(auto-fill, 70rpx);
  grid-gap: 10rpx;
  justify-content: center;
  align-items: center;
}
</style>
