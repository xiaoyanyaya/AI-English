<template>
  <view class="main pb-5">
    <view
      class="head"
      :style="{ backgroundImage: 'url(' + imageBaseUrl + '/word/word_bg.png)' }"
      ref="head"
    >
      <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      </cy-navbar>
      <view class="headTitle">
        {{ allData.wordEn ? allData.wordEn : data.wordEn }}
        <view class="headTitle-bar"></view>
      </view>
      <view class="headAudio" v-if="allData.symbolUsa">
        <view
          class="headAudio-box"
          @click="allData.audioUsa ? play(allData.audioUsa) : ''"
        >
          <text>英</text>
          <text class="headAudio-boxC">[{{ allData.symbolUsa }}]</text>
          <image :src="imageBaseUrl + '/word/5-21-31.png'" mode=""></image>
          <view class="baocuo" @click="showReport">
            <u-icon name="question-circle" color="#7d7d7d" size="26"></u-icon>
            <text>我要报错</text>
          </view>
        </view>
      </view>
      <view class="headText" v-if="allData.wordCn">
        <view class="headText-item">
          {{ allData.wordCn }}
        </view>
      </view>
      <view class="tab">
        <view
          class="tabItem"
          @click="tab = 0"
          :class="tab == 0 ? 'tabItem-select' : ''"
        >
          AI单词讲解
          <image
            v-if="tab == 0"
            :src="imageBaseUrl + '/word/5-21-32.png'"
            mode=""
          ></image>
        </view>
        <view
          class="tabItem"
          @click="tab = 1"
          :class="tab == 1 ? 'tabItem-select' : ''"
        >
          AI记词技巧
          <image
            v-if="tab == 1"
            :src="imageBaseUrl + '/word/5-21-32.png'"
            mode=""
          ></image>
        </view>
      </view>
    </view>
    <!-- <view class="content">
      <view class="tab">
        <view class="tabItem" @click="tab=0" :class="tab==0?'tabItem-select':''">
          AI单词讲解
          <image v-if="tab==0" :src="imageBaseUrl+'/word/5-21-32.png'" mode=""></image>
        </view>
        <view class="tabItem" @click="tab=1" :class="tab==1?'tabItem-select':''">
          AI记词技巧
          <image v-if="tab==1" :src="imageBaseUrl+'/word/5-21-32.png'" mode=""></image>
        </view>
      </view>
    </view> -->
    <view
      class="content"
      :style="{ height: 'calc(100vh - 160rpx - ' + height + 'rpx )' }"
    >
      <view class="contentText" v-if="tab == 1">
        <view
          class="contentText-item"
          v-for="(item, i) in allData.skillItemList"
          :key="i"
          v-if="allData.skillItemList"
        >
          <view class="contentText-itemTitle">
            {{ item.itemIndex }}{{ item.itemName }}
          </view>
          <view class="contentText-itemText">
            {{ item.itemText }}
          </view>
        </view>
        <view
          v-if="allData ? allData.skillItemList.length < 1 : true"
          class="contentText-img"
        >
          <image :src="imageBaseUrl + '/nodata.png'" mode="widthFix"></image>
        </view>
      </view>
      <view class="contentText" v-if="tab == 0">
        <view
          class="contentText-item"
          v-for="(item, i) in allData.explainItemList"
          v-if="allData.explainItemList"
        >
          <view class="contentText-itemTitle">
            {{ item.itemIndex }}{{ item.itemName }}
          </view>
          <view class="contentText-itemText">
            {{ item.itemText }}
          </view>
        </view>
        <view
          v-if="
            allData.explainItemList ? allData.explainItemList.length < 1 : true
          "
          class="contentText-img"
        >
          <image :src="imageBaseUrl + '/nodata.png'" mode="widthFix"></image>
        </view>
      </view>
    </view>
    <view class="controller" v-if="showBtn == 1">
      <view v-if="activeIndex == 0 || fromSearch == 1" class="controllerItem">
        <image :src="imageBaseUrl + '/word/pre_s.png'" mode=""></image>
        <view style="color: #8a8a8a"> 上一个 </view>
      </view>
      <view v-else class="controllerItem" @click="previous">
        <image :src="imageBaseUrl + '/word/6-1-01.png'" mode=""></image>
        <view class="t-color-1863E5"> 上一个 </view>
      </view>
      <view
        class="button t-color-fff flex align-item-center justify-content-center"
        @click="chanllenge"
        v-if="state == 0"
      >
        立即听写
      </view>
      <view
        v-if="activeIndex == wordList.length - 1 || fromSearch == 1"
        class="controllerItem"
      >
        <image :src="imageBaseUrl + '/word/next_s.png'" mode=""></image>
        <view style="color: #8a8a8a"> 下一个 </view>
      </view>
      <view v-else class="controllerItem" @click="next">
        <image :src="imageBaseUrl + '/word/6-1-02.png'" mode=""></image>
        <view class="t-color-1863E5"> 下一个 </view>
      </view>
    </view>

    <!-- 报错pop -->
    <u-popup
      v-model="showReportPop"
      @close="reportPopClose"
      closeable="true"
      mode="bottom"
      border-radius="15"
    >
      <view class="reppop_box">
        <view class="title">报错提交</view>
        <u-form :model="reportForm" ref="uForm">
          <u-form-item label="单词" label-width="180">
            <u-input v-model="reportForm.wordEn" disabled="true" />
          </u-form-item>
          <u-form-item label="错误类型" prop="malType" label-width="180">
            <u-input
              v-model="reportForm.malType"
              type="select"
              @click="showMalType = true"
            />
            <u-action-sheet
              :list="actionSheetList"
              v-model="showMalType"
              @click="actionSheetCallback"
            ></u-action-sheet>
          </u-form-item>
          <u-form-item label="错误描述" label-width="180">
            <u-input
              v-model="reportForm.malContent"
              type="textarea"
              maxlength="100"
            />
          </u-form-item>
        </u-form>
        <view class="submit_sty" @click="submit">提交</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext();
import MyMixin from "@/utils/MyMixin";
import { getWordEn, reviewStart, getMalTypeDict, postAddMal } from "@/api/word";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      tab: 0,
      data: {
        wordEn: "",
      },
      lessonId: "",
      allData: {},
      wordList: {},
      height: 0,
      lista: [],
      state: 0,
      fromSearch: 0, //1：搜索进来的
      // 是否显示上一个下一个按钮
      showBtn: 1,
      pageType: "",
      unitId: "",
      setData: {
        show: true,
        num: 3,
      },
      activeIndex: 0, //当前项索引
      showReportPop: false,
      reportForm: {
        wordEn: "",
        malType: "",
        malContent: "",
      },
      addMalParams: {
        wordEn: "",
        malType: "",
        malContent: "",
      },
      formRules: {
        malType: [
          { required: true, message: "请输入错误类型", trigger: "change" },
        ],
      },
      showMalType: false,
      actionSheetList: [],
    };
  },
  async onLoad(e) {
    this.lessonId = e.lessonId;
    var that = this;
    this.data.wordEn = e.wordEn;
    if (e.state) {
      this.state = e.state;
    }
    if (e.pageType) {
      this.pageType = e.pageType;
    }
    if (e.unitId) {
      this.unitId = e.unitId;
    }
    this.getWordEn();
    if (e.showBtn) {
      this.showBtn = e.showBtn;
    }
    if (e.fromSearch) {
      //搜索单词
      this.fromSearch = e.fromSearch;
      this.wordList = [];
    } else {
      // if (e.id == 1) {
      // this.wordList = uni.getStorageSync("wordList");
      // } else {
      this.wordList = uni.getStorageSync("wordList").wordLessonDictList;
      // }
      console.log("vuex中的wordList", this.wordList);
      let index = this.wordList.findIndex(
        (obj) => obj.wordEn === this.data.wordEn
      );
      if (index !== -1) {
        this.activeIndex = index;
        console.log("this.activeIndex", this.activeIndex);
      } else {
        uni.showModal({
          title: "未找到单词~",
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              // 执行操作
            } else if (res.cancel) {
              console.log("用户点击取消");
              // 操作取消
            }
          },
        });
      }
    }

    this.$nextTick(() => {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".head")
        .boundingClientRect((rect) => {
          that.height = rect.height * 2; // 输出元素的高度
        })
        .exec();
    });
    //报错类型
    const errType = await getMalTypeDict();
    this.actionSheetList = Object.entries(errType.data.result).map(
      ([id, text]) => ({
        text: text,
        id: id.toString(),
      })
    );
  },
  onReady() {
    this.$refs.uForm.setRules(this.formRules);
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "transparent";
    } else {
      this.backColor = "transparent";
    }
  },
  methods: {
    showReport() {
      this.showReportPop = true;
      this.reportForm.wordEn = this.allData.wordEn;
      this.addMalParams.wordEn = this.allData.wordEn;
    },
    actionSheetCallback(index) {
      this.reportForm.malType = this.actionSheetList[index].text;
      this.addMalParams.malType = this.actionSheetList[index].id;
    },
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.addMalParams.malContent = this.reportForm.malContent;
          postAddMal(this.addMalParams).then((res) => {
            if (res.data.code == 200) {
              uni.showToast({ title: "上报成功！感谢反馈", icon: "none" });
            } else {
              uni.showToast({ title: res.message });
            }
            this.showReportPop = false;
            this.reportForm.malType = "";
            this.reportForm.malContent = "";
          });
        }
      });
    },
    reportPopClose() {
      this.$refs.uForm.resetFields();
      this.reportForm.malType = "";
      this.addMalParams.malType = "";
      this.reportForm.malContent = "";
    },
    async getWordEn() {
      let data = await getWordEn(this.data);
      this.allData = data.data.result;
      this.play(this.allData.audioUsa);
      if (this.allData.wordFormat) {
        var res = {
          name: "词形词态",
          data: "allData.wordFormat",
        };
        this.lista.push(res);
      }
      if (this.allData.wordSentence) {
        var res = {
          name: "例句",
          data: "allData.wordSentence",
        };
        this.lista.push(res);
      }
      if (this.allData.wordPhrase) {
        var res = {
          name: "短词语组",
          data: "allData.wordPhrase",
        };
        this.lista.push(res);
      }
      if (this.allData.wordSynonym) {
        var res = {
          name: "同义词",
          data: "allData.wordSynonym",
        };
        this.lista.push(res);
      }
      if (this.allData.wordCognate) {
        var res = {
          name: "同根词",
          data: "allData.wordCognate",
        };
        this.lista.push(res);
      }
    },
    // chanllenge() {
    //   this.toNav('/pages/word/set?id='+this.unitId+'&pageType='+this.pageType)
    // },
    // 直接跳到答题页面dictation
    async chanllenge() {
      uni.setStorageSync("setData", this.setData);
      let data = {};
      data = await reviewStart({ lessonId: this.lessonId });
      console.log("data000000000", data);
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
        this.unitId;
      this.toNav(urls);
    },
    play(src) {
      if (uni.getSystemInfoSync().platform === "ios") {
        innerAudioContext.src = encodeURI(src);
        // console.log(innerAudioContext.src)
        innerAudioContext.play();
        innerAudioContext.onEnded(() => {
          console.log("音频播放结束");
        });
        // console.log('ios')
        // bgAudioManager.src = src
        // bgAudioManager.play()
        // bgAudioManager.onEnded(()=>{
        // 	bgAudioManager.stop()
        // })
      } else {
        // uni.showLoading({
        // 	title: '加载中'
        // });
        uni.downloadFile({
          url: src,
          success: (res) => {
            if (res.statusCode === 200) {
              uni.hideLoading();
              innerAudioContext.src = res.tempFilePath;
              innerAudioContext.play();
              innerAudioContext.onEnded(() => {
                console.log("音频播放结束");
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
    next() {
      let index = this.wordList.findIndex(
        (obj) => obj.wordEn === this.data.wordEn
      );
      if (index !== -1) {
        // 如果找到了目标对象
        if (index < this.wordList.length - 1) {
          // 如果目标对象不是数组的最后一个元素，那么可以获取下一个对象的id
          let previousObj = this.wordList[index + 1];
          let previousId = previousObj.wordEn;
          this.data.wordEn = previousId;
          let index2 = this.wordList.findIndex(
            (obj) => obj.wordEn === this.data.wordEn
          );
          this.activeIndex = index2;
          this.getWordEn();
        } else {
          // 如果目标对象是数组的最后一个元素，那么没有下一个对象
          // uni.showModal({
          //   title: "这是最后一个单词~",
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log("用户点击确定");
          //       // 执行操作
          //     } else if (res.cancel) {
          //       console.log("用户点击取消");
          //       // 操作取消
          //     }
          //   },
          // });
          // console.log("这是数组的最后一个对象，没有下一个对象");
        }
      } else {
        // 如果没有找到目标对象
        uni.showModal({
          title: "未找到单词~",
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              // 执行操作
            } else if (res.cancel) {
              console.log("用户点击取消");
              // 操作取消
            }
          },
        });
        console.log("在数组中未找到id为", this.data.wordEn, "的对象");
      }
    },
    previous() {
      console.log(this.wordList);
      let index = this.wordList.findIndex(
        (obj) => obj.wordEn === this.data.wordEn
      );
      if (index !== -1) {
        // 如果找到了目标对象
        if (index > 0) {
          // 如果目标对象不是数组的第一个元素，那么可以获取上一个对象的id
          let previousObj = this.wordList[index - 1];
          let previousId = previousObj.wordEn;
          this.data.wordEn = previousId;
          let index2 = this.wordList.findIndex(
            (obj) => obj.wordEn === this.data.wordEn
          );
          this.activeIndex = index2;
          this.getWordEn();
        } else {
          // 如果目标对象是数组的第一个元素，那么没有上一个对象
          // uni.showModal({
          //   title: "这是第一个单词~",
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log("用户点击确定");
          //       // 执行操作
          //     } else if (res.cancel) {
          //       console.log("用户点击取消");
          //       // 操作取消
          //     }
          //   },
          // });
          // console.log("这是数组的第一个对象，没有上一个对象");
        }
      } else {
        // 如果没有找到目标对象
        uni.showModal({
          title: "未找到单词~",
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              // 执行操作
            } else if (res.cancel) {
              console.log("用户点击取消");
              // 操作取消
            }
          },
        });
        console.log("在数组中未找到id为", this.data.wordEn, "的对象");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nav-icon,
.nav-slot,
.nav-btn {
  color: black !important;
}

.main {
  background-size: 100% 100%;
  min-height: 100vh;
}

.baocuo {
  position: absolute;
  top: 17%;
  right: 55rpx;
  font-size: 24rpx;
  color: #7d7d7d;
}

.head {
  text-align: center;
  padding-bottom: 50rpx;
  background-size: 100% 100%;
  /* position: fixed; */
  width: 100%;
  /* top: 0;
  z-index: 1; */
}

.headTitle {
  font-size: 75rpx;
  font-weight: 600;
  position: relative;
  display: inline;
}

.headTitle-bar {
  background: rgba(220, 12, 12, 0.3);
  height: 11rpx;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 16rpx;
}

.headAudio {
  margin-top: 35rpx;
  display: flex;
  justify-content: center;
}

.headAudio image {
  width: 15rpx;
  height: 30rpx;
}

.headAudio-box {
  background: #fff;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
  font-size: 30rpx;
  color: #565656;
}

.headAudio-boxC {
  margin: 0 15rpx;
  color: #8a8a8a;
  font-size: 24rpx;
}

.headText {
  margin: 0rpx 66rpx;
  margin-top: 30rpx;
  color: #3d3d3d;
  font-size: 30rpx;
  border-bottom: 2rpx dashed #1863e5;
  padding-bottom: 40rpx;
}

.headText-item {
  margin-bottom: 6rpx;
}

.report_sty {
  z-index: 999;
  width: 180rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  color: #7d7d7d;
  font-size: 24rpx;
  border-radius: 163rpx;
  border: 1rpx solid #7d7d7d;
}

.content {
  /* padding-top: 520rpx; */
  padding-bottom: 100rpx;
  overflow-y: scroll;
}

.content::-webkit-scrollbar {
  width: 0;
}

.tab {
  display: flex;
  margin-top: 50rpx;
  justify-content: space-around;
  padding: 0 50rpx;
}

.tabItem {
  color: #8a8a8a;
  font-size: 34rpx;
}

.tabItem-select {
  color: #1863e5;
  font-weight: 600;
  position: relative;
}

.tabItem image {
  position: absolute;
  width: 40rpx;
  height: 6rpx;
  bottom: -15rpx;
  left: 0;
  right: 0;
  margin: auto;
}

.contentText {
  border-radius: 30rpx;
  background: #fff;
  padding: 30rpx 50rpx 160rpx;
}

.contentText-item {
  margin-bottom: 40rpx;
}

.contentText-itemTitle {
  display: inline;
  position: relative;
  font-size: 30rpx;
  font-weight: 600;
}

.contentText-itemTitle-bar {
  height: 9rpx;
  position: absolute;
  width: 100%;
  bottom: 2rpx;
  background: linear-gradient(90deg, #9bbfff 0%, rgba(255, 255, 255, 0) 135%);
}

.contentText-itemText {
  color: #8a8a8a;
  font-size: 28rpx;
  white-space: pre-line;
  line-height: 42rpx;
  margin-top: 10rpx;
}

.controller {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 80rpx;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 150rpx;
  border-top: 2rpx solid #bfbfbf;
  background-color: #fff;
}

.controllerItem {
  padding: 15rpx;
  text-align: center;
  font-size: 24rpx;
  color: #8a8a8a;
}
.button {
  width: 206rpx;
  height: 80rpx;
  border-radius: 201rpx;
}
.controllerItem:nth-child(2) {
  margin-right: 0;
}

.controller image {
  width: 28rpx;
  height: 34rpx;
  margin-bottom: 6rpx;
}

.contentText-img {
  text-align: center;
  margin-top: 50rpx;
}

.contentText-img image {
  width: 400rpx;
}

.reppop_box {
  position: relative;
  height: 55vh;
  padding: 50rpx;
  .title {
    color: #1863e5;
    font-size: 28rpx;
    text-align: center;
    margin-bottom: 40rpx;
  }
  .submit_sty {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    width: 90%;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #43a2ff;
    border-radius: 10rpx;
    color: #fff;
    font-size: 28rpx;
    text-align: center;
  }
}
</style>
