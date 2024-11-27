<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :allTrans="true"
      bgColor="linear-gradient(180deg, #cde1ff 0%, #ebf3fe 100%)"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">极速刷词</view>
    </cy-navbar>

    <image class="bg_img" :src="imageBaseUrl + '/word/7-1-06.png'"></image>

    <view class="top_box">
      <view class="title">
        <view class="flex flex-1 align-item-center t-color-e79315 t-size-28">
          <view class="mr-1">星级</view>
          <image
            v-for="(item, index) in freqStar"
            :key="index"
            :src="imageBaseUrl + '/frank/8-7-32.png'"
          />
          <image
            v-if="freqStar == 0"
            :key="index"
            :src="imageBaseUrl + '/frank/8-7-32.png'"
          />
          <view class="t-size-26 t-color-2A67D2"
            >（总词数：{{ freqWordNum }}）</view
          >
        </view>
        <view class="change" @click="showChangePop = true">
          <image :src="imageBaseUrl + '/6-3-01.png'"></image>
          <text class="t-size-24 t-color-2A67D2 mt-1">切换考频</text>
        </view>
      </view>
      <view class="card">
        <view
          class="flex justify-content-between mt-1 ml-4 t-color-999 t-size-26"
        >
          <view>
            历史刷词数：
            <u-count-to
              :start-val="0"
              :end-val="overWordNum"
              font-size="26"
              color="#999"
            ></u-count-to>
          </view>
          <view class="flex t-color-999">
            历史生词数：
            <u-count-to
              :start-val="0"
              :end-val="newWordNum"
              font-size="26"
              color="2A67D2"
            ></u-count-to>
            <text
              @click="
                toNav(
                  `/pages/word/examFrequency?bookId=${wordListParams.bookId}&showOnKnow=1`
                )
              "
              class="t-color-2A67D2 t-size-26"
            >
              <text class="iconfont icon-dianji"></text>
              查看
            </text>
          </view>
        </view>
        <view class="flex justify-content-between mt-1 t-color-999 t-size-26">
          <view class="gren_button">
            正确数：
            <text>{{ correctNum }}</text>
          </view>
          <view class="red_button">
            生词数：
            <text>{{ errNum }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="!tostNodata" class="content">
      <view class="headTitle">{{ currWordItem.questionText }}</view>
      <view class="headAudio">
        <view class="flex justify-content-center">
          <view
            v-if="currWordItem.symbolUsa"
            @click="currWordItem.audioUsa ? play(currWordItem.audioUsa) : ''"
            class="headAudio-box"
          >
            <image
              v-if="gif"
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
            <text class="ml-1">英</text>
            <text class="headAudio-boxC">[{{ currWordItem.symbolUsa }}]</text>
          </view>
        </view>
      </view>
      <view v-for="(item, index) in currWordItem.qustionList" :key="index">
        <view
          @click="selectAnser(item[0], index)"
          :class="{
            select_item: true,
            active_item: index == activeAnserIndex,
            active_zhengque: showCuowu && index == actAnserIndex,
          }"
        >
          {{ item[1] }}
          <view
            v-show="showCuowu && index == activeAnserIndex"
            class="iconfont icon-chakanshijue-daticuowu cuowu"
          ></view>
          <view
            v-show="showZhengque && index == activeAnserIndex"
            class="iconfont icon-daanzhengque zhengque"
          ></view>
          <view
            v-show="showCuowu && index == actAnserIndex"
            class="iconfont icon-daanzhengque zhengque"
          ></view>
        </view>
      </view>
      <view class="flex justify-content-between mt-8">
        <view class="report_sty" @click="showReport">我要报错</view>
        <view @click="nextTopic" class="next_sty">下一个</view>
      </view>
    </view>

    <!-- 提示 -->
    <view v-if="tostNodata" class="toast_sty">
      <image class="bg_img" :src="imageBaseUrl + '/word/7-1-06.png'"></image>
      <view class="text">
        <view>恭喜，您已完成本轮考频刷词！</view>
        <view class="button" @click="showChangePop = true"
          >切换考频继续答题</view
        >
      </view>
    </view>

    <!-- 考频列类型pop-->
    <u-popup v-model="showChangePop" closeable="true" mode="bottom">
      <view class="pop_box">
        <view class="title">
          切换考频
          <text>（共{{ frequencyList.length }}个等级）</text>
        </view>
        <view
          v-for="(item, index) in frequencyList"
          :key="index"
          @click="changeFrequency(index, item)"
          :class="{
            freq_item: index != activeFreqIndex,
            active_freq: index == activeFreqIndex,
          }"
        >
          <view class="huanxing"></view>
          <!-- <text>{{ item.examFrequencyText }}</text> -->
          <view class="mr-1 t-color-e79315">星级</view>
          <image
            v-for="(item2, index2) in item.examFrequencyType"
            :key="index2"
            :src="imageBaseUrl + '/frank/8-7-32.png'"
          />
          <image
            v-if="item.examFrequencyType == 0"
            :key="index"
            :src="imageBaseUrl + '/frank/8-7-32.png'"
          />
          <text class="t-color-999 t-size-24"
            >（共{{ item.wordNum }}个单词）</text
          >
        </view>
      </view>
    </u-popup>

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
          <u-form-item label="单词" prop="wordEn" label-width="180">
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
          <u-form-item label="错误描述" prop="malContent" label-width="180">
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
import MyMixin from "@/utils/MyMixin";
import {
  getWordDictQuestionList,
  getFrequencyList,
  addUserStudyDict,
  getNewWordNum,
  getOverWordNum,
  getMalType,
  postAddMal,
} from "@/api/word";
const innerAudioContext = uni.createInnerAudioContext();

export default {
  mixins: [MyMixin],
  data() {
    return {
      freqWordNum: "", //本轮总词数
      overWordNum: "", //历史刷词数
      newWordNum: "", //历史生词数
      freqStar: "",
      frequencyList: [], //考频类型列表
      frequencyListParams: {
        bookId: "",
      },
      correctNum: 0,
      errNum: 0,
      nowIndex: 0, //当前题目对应的题目数组索引
      activeFreqIndex: null,
      activeAnserIndex: null, //用户选的答案索引
      actAnserIndex: null, //正确答案索引
      wordList: [{ symbolUsa: "", questionText: "" }],
      currWordItem: { symbolUsa: "", questionText: "" },
      wordListParams: {
        bookId: "",
        examFrequencyType: "",
        wordNum: "10",
      },
      anserParams: {
        userAnswer: "",
        bookId: "",
        unitId: "",
        examFrequencyType: "",
        wordEn: "",
        questionType: "1", //题目类型 默认1
        questionText: "",
        qustionOptionMap: {},
        questionAnswer: "",
      },
      gif: false,
      showChangePop: false,
      showReportPop: false,
      tostNodata: false,
      showCuowu: false,
      showZhengque: false,
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
    this.frequencyListParams.bookId = e.bookId;
    this.wordListParams.bookId = e.bookId;
    this.anserParams.bookId = e.bookId;

    //获取考频列表
    await this.getFrequencyList();
    //获取单词列表
    await this.getWordDictQuestionList();
    //获取历史刷次数
    const res = await getOverWordNum({ bookId: e.bookId });
    this.overWordNum = res.data.result.totalHistoryNum;
    //获取历史生次数
    const res2 = await getNewWordNum({ bookId: e.bookId });
    this.newWordNum = res2.data.result.errorWordNum;
    //获取报障类型
    const res3 = await getMalType();
    this.actionSheetList = Object.entries(res3.data.result).map(
      ([id, text]) => ({
        text: text,
        id: id.toString(),
      })
    );
  },
  onReady() {
    this.$refs.uForm.setRules(this.formRules);
  },
  methods: {
    async getFrequencyList() {
      const res = await getFrequencyList(this.frequencyListParams);
      this.frequencyList = res.data.result;
      const freqType = uni.getStorageSync("freqType");
      if (freqType) {
        this.freqStar = freqType;
        this.frequencyList.forEach((item) => {
          if (this.freqStar == item.examFrequencyType) {
            this.freqWordNum = item.wordNum;
          }
        });
        this.wordListParams.examFrequencyType = this.freqStar;
        this.anserParams.examFrequencyType = this.freqStar;
      } else {
        this.freqStar = this.frequencyList[0].examFrequencyType;
        this.freqWordNum = this.frequencyList[0].wordNum;
        this.wordListParams.examFrequencyType =
          this.frequencyList[0].examFrequencyType;
        this.anserParams.examFrequencyType =
          this.frequencyList[0].examFrequencyType;
      }
    },
    async getWordDictQuestionList() {
      const res = await getWordDictQuestionList(this.wordListParams);
      this.wordList = Array.isArray(res.data.result)
        ? res.data.result
        : [{ symbolUsa: "", questionText: "" }];
      this.currWordItem = this.wordList[0];
      if (this.currWordItem?.qustionOptionMap) {
        this.tostNodata = false;
        this.wordList.forEach((item) => {
          if (item.qustionOptionMap) {
            item.qustionList = Object.entries(item.qustionOptionMap);
          }
        });
        Object.entries(this.currWordItem.qustionOptionMap).forEach(
          (item, index) => {
            if (this.currWordItem.questionAnswer == item[0]) {
              this.actAnserIndex = index;
            }
          }
        );
      } else {
        this.tostNodata = true;
      }
      setTimeout(() => {
        this.currWordItem?.audioUsa && this.play(this.currWordItem.audioUsa);
      }, 800);
    },
    async changeFrequency(index, item) {
      uni.setStorageSync("freqType", item.examFrequencyType);
      this.tostNodata = false;
      this.freqStar = item.examFrequencyType;
      this.freqWordNum = item.wordNum;
      this.correctNum = 0;
      this.errNum = 0;
      this.activeFreqIndex = index;
      this.activeAnserIndex = null;
      this.wordListParams.examFrequencyType = item.examFrequencyType;
      this.anserParams.examFrequencyType = item.examFrequencyType;
      await this.getWordDictQuestionList();
      this.showChangePop = false;
    },
    selectAnser(key, index) {
      this.activeAnserIndex = index;
      this.anserParams.userAnswer = key;
    },
    async nextTopic() {
      const throttleStatus = this.throttle(); // 节流
      if (!throttleStatus) return;
      if (this.activeAnserIndex === null)
        return uni.showToast({ title: "请先选择您的答案", icon: "none" });
      //判断正确错误
      if (this.currWordItem.questionAnswer == this.anserParams.userAnswer) {
        this.correctNum = this.correctNum + 1;
        this.showZhengque = true;
      } else {
        this.errNum = this.errNum + 1;
        this.showCuowu = true;
      }
      //赋值答题参数
      this.anserParams.wordEn = this.currWordItem.wordEn;
      this.anserParams.questionText = this.currWordItem.questionText;
      this.anserParams.questionAnswer = this.currWordItem.questionAnswer;
      this.anserParams.qustionOptionMap = this.currWordItem.qustionOptionMap;
      //答题存储
      await addUserStudyDict(this.anserParams);
      //刷新题目
      if (this.showCuowu) {
        setTimeout(async () => {
          this.nextCommon();
        }, 1200);
      } else {
        setTimeout(async () => {
          this.nextCommon();
        }, 800);
      }
    },
    async nextCommon() {
      this.showCuowu = false;
      this.showZhengque = false;
      if (!this.wordList[this.nowIndex + 1]) {
        await this.getWordDictQuestionList();
        if (!this.wordList[0].id) {
          uni.showToast({ title: "太棒啦！全部刷完啦", icon: "none" });
        }
        this.nowIndex = 0;
      } else {
        this.nowIndex = this.nowIndex + 1;
        this.currWordItem = this.wordList[this.nowIndex];
        Object.entries(this.currWordItem.qustionOptionMap).forEach(
          (item, index) => {
            if (this.currWordItem.questionAnswer == item[0]) {
              this.actAnserIndex = index;
            }
          }
        );
        this.currWordItem?.audioUsa && this.play(this.currWordItem.audioUsa);
      }
      this.activeAnserIndex = null;
    },
    showReport() {
      this.showReportPop = true;
      this.reportForm.wordEn = this.currWordItem.questionText;
      this.addMalParams.wordEn = this.currWordItem.questionText;
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
      this.reportForm.malType = "";
      this.addMalParams.malType = "";
      this.reportForm.malContent = "";
    },
    toNav(urls) {
      uni.redirectTo({
        url: urls,
      });
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
  background: #ebf3fe;
  min-height: 100vh;

  .u-drawer__scroll-view {
    padding-bottom: 50rpx;
  }

  .bg_img {
    position: absolute;
    width: 220rpx;
    height: 180rpx;
    top: 32%;
    left: 60%;
  }

  .top_box {
    margin: 40rpx 60rpx 30rpx;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      image {
        margin-right: 10rpx;
        width: 30rpx;
        height: 30rpx;
      }
      .change {
        width: 172rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 10rpx;
        border: 1rpx solid #1863e5;
        image {
          margin: 0 12rpx;
          width: 26rpx;
          height: 20rpx;
        }
      }
    }
    .card {
      position: relative;
      padding: 20rpx 50rpx;
      margin: 45rpx 0;
      width: 630rpx;
      border-radius: 10rpx;
      background: #eaf3ff;
      box-shadow: 5rpx 5rpx 10rpx 5rpx #aad3f7;
      .gren_button {
        width: 230rpx;
        height: 65rpx;
        line-height: 65rpx;
        border-radius: 203rpx;
        background: #7dc66a;
        margin: 15rpx 0;
        text-align: center;
        color: #fff;
        font-size: 26rpx;
      }
      .red_button {
        @extend .gren_button;
        background-color: #e6716a;
      }
    }
  }

  .content {
    padding: 15rpx 90rpx;
    font-size: 20rpx;
    .headTitle {
      text-align: center;
      font-size: 70rpx;
      font-weight: 600;
    }
    .headAudio {
      margin: 30rpx 0 60rpx;
    }
    .headAudio-box {
      background: #fff;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      padding: 12rpx;
      margin-left: 10rpx;
      font-size: 30rpx;
      color: #565656;
    }
    .listItem-lGif {
      width: 38rpx;
      height: 26rpx;
    }
    .headAudio-boxC {
      margin: 0 15rpx;
      color: #8a8a8a;
      font-size: 24rpx;
    }
    .select_item {
      position: relative;
      width: 570rpx;
      height: 100rpx;
      line-height: 100rpx;
      margin-bottom: 40rpx;
      border-radius: 20rpx;
      background: #ffffff;
      border: 1rpx solid #bfbfbf;
      text-align: center;
      font-size: 28rpx;
      color: #3d3d3d;
      .cuowu {
        position: absolute;
        right: 8%;
        top: 3%;
        font-size: 55rpx;
        color: #fb6f65;
      }
      .zhengque {
        @extend .cuowu;
        color: #2bb550;
      }
    }
    .active_item {
      @extend .select_item;
      background: #e0f0ff;
      border: 1rpx solid #1863e5;
    }
    .active_zhengque {
      @extend .select_item;
      background-color: #ecf9ef;
      border: 3rpx solid #2bb550;
    }
    .report_sty {
      width: 250rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #7d7d7d;
      font-size: 26rpx;
      border-radius: 163rpx;
      border: 1rpx solid #7d7d7d;
    }

    .next_sty {
      width: 250rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #fff;
      font-size: 26rpx;
      border-radius: 163rpx;
      background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
    }
  }

  .toast_sty {
    image {
      position: absolute;
      top: 45%;
      left: 40%;
      transform: translateX(-50%);
      width: 250rpx;
      height: 200rpx;
    }
    .text {
      position: absolute;
      left: 50%;
      bottom: 25%;
      transform: translateX(-50%);
      width: 55vw;
      color: #8a8a8a;
      font-size: 28rpx;
      text-align: center;
      .button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        margin-top: 12rpx;
        font-size: 24rpx;
        color: #5a95fb;
        width: 50%;
        border-bottom: 1rpx solid #5a95fb;
      }
    }
  }

  .pop_box {
    height: 65vh;
    padding: 40rpx 60rpx;
    .title {
      font-weight: 400;
      font-size: 30rpx;
      margin-bottom: 40rpx;
      text {
        font-size: 22rpx;
        color: #8a8a8a;
      }
    }
    .freq_item {
      display: flex;
      align-items: center;
      width: 630rpx;
      height: 110rpx;
      border-radius: 10rpx;
      background: #ffffff;
      box-sizing: border-box;
      border: 1rpx solid #bfbfbf;
      margin: 30rpx 0;
      padding-left: 55rpx;
      .huanxing {
        width: 43rpx;
        height: 43rpx;
        margin-right: 20rpx;
        border: 10rpx solid #d8d8d8;
        border-radius: 50%; /* 圆角，确保形状是圆的 */
      }
      image {
        margin-right: 10rpx;
        width: 30rpx;
        height: 30rpx;
      }
    }
    .active_freq {
      @extend .freq_item;
      background: #e1edff;
      border: 1rpx solid #1863e5;
      .huanxing {
        border: 10rpx solid #1863e5;
      }
    }
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
}
</style>
