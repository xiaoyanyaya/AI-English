<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">单词列表</view>
    </cy-navbar>
    <view class="content">
      <view class="title">
        <view class="book_name">
          {{
            id == 0 || id == 2 || id == 3
              ? allData.bookFullName
              : bookData.bookFullName
          }}
        </view>
        <view class="unit">
          {{ id == 0 || id == 2 || id == 3 ? allData.lessonName : "" }}
        </view>
      </view>
      <view class="list">
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
                {{ item.wordCn }}
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
                {{ item.wordCn }}
              </view>
            </view>
          </view>
          <view
            class="listItem-r"
            @click="
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
import { wordList, dictList, lessonWordList, queryById } from "@/api/word";
import { reviewStart } from "@/api/word";

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
      lessonId: "",
      allData: {
        bookFullName: "",
        lessonName: "",
      },
      bookData: {},
      audioSrc: "",
      gif: false,
      selectId: 0,
      title: "",
      chanllengeBtnText: "立即挑战",
      setData: {
        show: true,
        num: 3,
      },
    };
  },
  onLoad(e) {
    if (e.title) {
      this.title = e.title;
    }
    if (e.id) {
      this.id = e.id;
      uni.setStorageSync("wordType", e.id);
    } else {
      this.id = uni.getStorageSync("wordType");
    }
    if (e.id == 0) {
      this.data.unitId = e.unitId;
      this.chanllengeBtnText = "开始答题";
    } else if (e.id == 1) {
      this.dataB.lessonId = e.unitId;
      this.chanllengeBtnText = "开始答题";
      this.lessonId = e.lessonId; //考纲传直接传上个页面的课时id(dict的id)
      console.log(e.unitId);
    } else if (e.id == 2) {
      this.data.unitId = e.unitId;
      this.chanllengeBtnText = "开始答题";
    } else if (e.id == 3) {
      this.dataC.id = e.unitId;
    }
    if (e.btnTitle) {
      this.chanllengeBtnText = e.btnTitle;
    }
    this.bookData = uni.getStorageSync("bookData");
    console.log("bookData,", this.bookData);
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#DEF0FF";
    } else {
      this.backColor = "transparent";
    }
  },
  onShow() {
    this.getWord();
  },
  // computed: {
  //   topHeight() {
  //     //cy-navbar组件默认高度80+系统状态栏高度
  //     // padding-top: ${80 + this.systemInfo.statusBarHeight}px;
  //     return `
  //           padding-top: ${80 + this.systemInfo.statusBarHeight}px;
  //     `;
  //   },
  // },
  methods: {
    async chanllenge() {
      // 直接跳到答题页面dictation
      // this.toNav(
      //   "/pages/word/set?id=" +
      //     (this.id == 1 ? this.dataB.lessonId : this.allData.id) +
      //     "&title=" +
      //     (this.title ? this.title : "")
      // );
      uni.setStorageSync("setData", this.setData);
      uni.setStorageSync("wordList", this.allData);
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
        (this.id == 1 ? this.dataB.lessonId : this.allData.id);
      this.toNav(urls);
    },
    async getWord() {
      if (this.id == 0) {
        let data = await wordList(this.data);
        console.log("id=0单词列表res的data", data);
        this.allData = data.data.result;
        this.lessonId = this.allData.id; //教材页面的课时id:返回单词列表同时返回课时id
        uni.setStorageSync("wordList", data.data.result);
      } else if (this.id == 1) {
        let data = await dictList(this.dataB);
        console.log("id=1单词列表res的data", data);
        this.allData = data.data.result.records;
        uni.setStorageSync("wordList", data.data.result.records);
      } else if (this.id == 2) {
        let data = await lessonWordList(this.data);
        console.log("id=2单词列表res的data", data);
        this.allData = data.data.result;
        this.lessonId = this.allData.id; //专题页面的课时id:返回单词列表同时返回课时id
        uni.setStorageSync("wordList", data.data.result);
      } else if (this.id == 3) {
        let data = await queryById(this.dataC);
        console.log("id=3单词列表res的data", data);
        this.allData = data.data.result;
        this.lessonId = this.allData.id; ////抗遗忘复习
        uni.setStorageSync("wordList", data.data.result);
      }
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
        // console.log('ios')
        // bgAudioManager.src = src
        // bgAudioManager.play()
        // bgAudioManager.onEnded(()=>{
        // 	bgAudioManager.stop()
        // })
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
    .book_name {
      font-size: 27rpx;
      font-weight: 400;
      padding-bottom: 10rpx;
    }
    .unit {
      font-size: 25rpx;
      color: #2e2e2e;
    }
  }
  .list {
    padding-top: 150rpx;
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
  color: rgba(109, 109, 109, 1);
  font-size: 22rpx;
  margin-bottom: 2rpx;
  white-space: pre-line;
  line-height: 36rpx;
}

.listItem-r {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
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
