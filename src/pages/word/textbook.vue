<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      bgColor="linear-gradient(180deg, #D9EEFF 0%, #F3F9FF 7%)"
      textColor="#3D3D3D"
    >
      <view class="t-size-30" v-if="id == 0">教材单元列表</view>
      <view class="t-size-30" v-if="id == 1">考纲单元列表</view>
    </cy-navbar>
    <view class="py-2 px-55">
      <view class="top">
        <view class="head">
          <view class="headL">
            <image :src="bookData.bookImage" mode=""></image>
          </view>
          <view class="headR">
            <view v-if="id == 1" class="headR-title">
              {{ bookData.bookFullName }}
            </view>
            <view v-else class="headR-title">
              {{ bookData.bookFullName.split("-")[1] }}
            </view>
            <view v-if="id == 1" class="headR-name">
              {{ bookData.bookName }}
            </view>
            <view v-else class="headR-name">
              {{ bookData.bookFullName.split("-")[0] }}
            </view>
            <view class="headR-num"> 共{{ bookData.wordNums }}个单词 </view>
            <view class="change_share">
              <view
                class="change_box"
                @click="
                  toNav(`/pages/common/switchTextbooks?pageType=${bookType}`)
                "
              >
                <image class="image" :src="imageBaseUrl + '/word/6-24-02.png'">
                </image>
                <view class="text">切换教材</view>
              </view>
              <button
                open-type="share"
                data-name="shareBtn"
                size="mini"
                class="share_box"
              >
                <image class="image" :src="imageBaseUrl + '/word/6-26-01.png'">
                </image>
                <view class="text">分享</view>
              </button>
            </view>
            <view class="headR-line" v-if="false">
              <view class="headR-lineText"> 学习进度35% </view>
              <u-line-progress
                active-color="#2979ff"
                :percent="70"
                height="16"
                :show-percent="false"
              ></u-line-progress>
            </view>
          </view>
        </view>
        <view class="addtask" v-if="id == 1" @click="show = true">
          <u-icon name="plus" size="30"></u-icon><text>新建任务</text>
        </view>
        <view class="mt-5 mb-3 flex justify-content-center">
          <u-tabs
            bg-color="transparent"
            inactive-color="#8A8A8A"
            active-color="#E79315"
            :list="optinsList"
            :current="currentOptions"
            @change="changeOptions"
          ></u-tabs>
        </view>
      </view>
      <!-- 单元词汇列表 -->
      <view :class="{ list: true, 'pt-33': id == 0, 'pt-46': id == 1 }">
        <view class="listItem" v-for="(item, index) in list" :key="item.id">
          <!-- 单元列表 -->
          <view class="unit" @click="openWord(index)">
            <image
              class="listItem-img"
              :src="imageBaseUrl + '/word/6-27-02.png'"
              mode="widthFix"
            ></image>
            <view class="listItem-name">
              {{ item.unitName || item.lessonName }}
            </view>
            <view class="listItem-right">
              <view class="listItem-rightTop" v-if="item.challengeNums">
                挑战人数：<text style="font-weight: 600">{{
                  item.challengeNums
                }}</text>
              </view>
              <view class="flex align-item-center">
                <view
                  @click.stop="
                    toNav(
                      '/pages/word/wordList?unitId=' +
                        item.id +
                        '&id=' +
                        id +
                        '&title=' +
                        item.lessonName
                    )
                  "
                  class="listItem-rightBottom-goStu"
                >
                  进入学习
                </view>
              </view>
            </view>
          </view>
          <!-- 词汇列表 -->
          <view v-if="item.isOpen" class="w_list">
            <view v-if="openData.length == 0" class="no_word">
              <image
                v-if="currentOptions == 2"
                :src="imageBaseUrl + '/word/7-2-02.png'"
              >
              </image>
              <image v-else :src="imageBaseUrl + '/word/7-2-01.png'"> </image>
            </view>
            <view
              v-for="item2 in openData"
              :key="item2.id"
              @click="item2.audioUsa ? play(item2.audioUsa, item2.id) : ''"
              class="listItem_word"
            >
              <view class="listItem-l">
                <image
                  v-if="gif && selectId == item2.id"
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
                    {{ item2.wordEn }}
                  </view>
                  <view class="listItem-cTitle-definition">
                    {{ "['" + item2.symbolUsa + "']" }}
                  </view>
                </view>
                <view class="listItem-cContent">
                  <view class="listItem-cContent-item">
                    {{ item2.wordCn }}
                  </view>
                </view>
              </view>
              <view
                class="listItem-r"
                @click.stop="
                  toNav(
                    '/pages/word/definition?wordEn=' + item2.wordEn + '&id=1'
                  )
                "
              >
                词汇讲解
              </view>
            </view>
          </view>
        </view>
        <view class="study" v-if="list.length < 1">
          <image
            :src="imageBaseUrl + '/word/new_study.png'"
            mode="widthFix"
          ></image>
        </view>
      </view>
    </view>
    <u-popup v-model="show" mode="bottom" border-radius="14">
      <view class="popupTitle"> 新建学习任务设置 </view>
      <view class="popupSelect">
        <view class="popupSelect-title"> 单词数量 </view>
        <view class="popupSelect-list">
          <view
            class="popupSelect-listItem"
            v-for="item in wordNumData"
            :key="item.value"
            @click="selectClick(item.value)"
            :class="
              selectNum == item.value ? 'popupSelect-listItem-select' : ''
            "
          >
            {{ item.text }}
          </view>
        </view>
      </view>
      <view class="popupButton">
        <view class="popupButton-l" @click="show = false"> 取消 </view>
        <view class="popupButton-r" @click="addBook"> 确认 </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {
  unitList,
  lessonList,
  wordNum,
  addLessonOutline,
  listByUnitId,
  unLearnListByUnitId,
  errOrOkListByUnitId,
} from "@/api/word";
const innerAudioContext = uni.createInnerAudioContext();

export default {
  mixins: [MyMixin],
  data() {
    return {
      id: 0,
      query: null,
      bookType: "",
      backColor: "transparent",
      show: false,
      selectNum: 0,
      data: {
        bookId: 0,
      },
      openParams: {
        unitId: 0,
      },
      list: [],
      bookData: {},
      wordNumData: [],
      optinsList: [
        {
          name: "单词列表",
          id: 0,
        },
        {
          name: "已掌握",
          id: 1,
        },
        {
          name: "未学习",
          id: 1,
        },
        {
          name: "错词本",
          id: 1,
        },
      ],
      currentOptions: 0,
      openData: [],
      gif: false,
      selectId: 0,
    };
  },
  onLoad(e) {
    console.log("eeeeee", e);
    this.id = e.id;
    this.query = e;
    this.data.bookId = e.bookId;
  },
  async onShow() {
    this.getUnit();
    if (this.query.id == 0) {
      this.bookData = uni.getStorageSync("basicData").currWordConfig.textBook;
      this.bookType = "textBook";
    } else {
      this.bookData = uni.getStorageSync("basicData").currWordConfig.dictBook;
      this.bookType = "dictBook";
    }
    console.log("bookData", this.bookData);
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  methods: {
    // 切换标签
    async changeOptions(index) {
      console.log("index_change!", index);
      this.resetOpen();
      this.currentOptions = index;
      if (index == 0) {
        let data = await listByUnitId({
          unitId: this.list[0].id,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      } else if (index == 1) {
        let data = await errOrOkListByUnitId({
          unitId: this.list[0].id,
          answerResult: 1,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      } else if (index == 2) {
        let data = await unLearnListByUnitId({
          unitId: this.list[0].id,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      } else {
        let data = await errOrOkListByUnitId({
          unitId: this.list[0].id,
          answerResult: 2,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      }
    },
    // 下拉单词列表
    async openWord(index) {
      console.log("下拉index", index);
      this.list[index].isOpen = !this.list[index].isOpen;
      this.list.forEach((item, index2) => {
        if (index == index2) return;
        item.isOpen = false;
      });
      //   切换当前高亮项的单元
      if (this.currentOptions == 0) {
        let data = await listByUnitId({
          unitId: this.list[index].id,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
        console.log("this.openData", this.openData);
      } else if (this.currentOptions == 1) {
        let data = await errOrOkListByUnitId({
          unitId: this.list[index].id,
          answerResult: -1,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      } else if (this.currentOptions == 2) {
        let data = await unLearnListByUnitId({
          unitId: this.list[index].id,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      } else {
        let data = await errOrOkListByUnitId({
          unitId: this.list[index].id,
          answerResult: -2,
        });
        console.log("change_data", data);
        this.openData = data.data.result;
      }
    },
    // 重置列表isopen
    resetOpen() {
      this.list.forEach((item) => (item.isOpen = false));
      this.list[0].isOpen = true;
    },
    play(src, id) {
      var that = this;
      this.gif = true;
      this.selectId = id;
      console.log("点击播放", this.gif, this.selectId);
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
    async getUnit() {
      if (this.id == 0) {
        let data = await unitList(this.data);
        this.list = data.data.result;
        let data1 = await listByUnitId({
          unitId: this.list[0].id,
        });
        this.openData = data1.data.result;
        console.log("this.openData", this.openData);
      } else if (this.id == 1) {
        let data = await lessonList(this.data);
        this.list = data.data.result;
        let data1 = await listByUnitId({
          unitId: this.list[0].id,
        });
        this.openData = data1.data.result;
        let res = await wordNum();
        this.wordNumData = res.data.result;
        this.selectNum = res.data.result[0].value;
      }
      this.resetOpen();
    },
    selectClick(num) {
      this.selectNum = num;
    },
    async addBook() {
      var data = {
        bookId: this.data.bookId,
        wordNum: this.selectNum,
      };
      let res = await addLessonOutline(data);
      if (res.data.code == 200) {
        this.toNav(
          "/pages/word/wordList?unitId=" + res.data.result.id + "&id=1"
        );
      } else {
        uni.showModal({
          title: res.data.message,
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
    },
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
}

.change_share {
  display: flex;
  justify-content: space-between;
  .box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 70rpx;
    border-radius: 10rpx;
    margin-top: 30rpx;
    box-sizing: border-box;
  }
  .text_e {
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    font-size: 24rpx;
    font-weight: 500;
  }
  .change_box {
    @extend .box;
    width: 172rpx;
    border: 1rpx solid #c40000;
    .image {
      width: 26rpx;
      height: 20rpx;
    }
    .text {
      @extend .text_e;
      color: #c40000;
    }
  }
  .share_box {
    @extend .box;
    width: 133rpx;
    border: 1rpx solid #1863e5 !important;
    background-color: #fff;
    padding: 0;
    margin-left: 30rpx;
    .image {
      width: 30rpx;
      height: 25rpx;
    }
    .text {
      @extend .text_e;
      color: #1863e5;
    }
  }
}

.list {
  width: 640rpx;
  margin-top: 48rpx;
  overflow: hidden;
}

.top {
  position: fixed;
  z-index: 999;
  top: 10%;
  width: 640rpx;
  background-color: #fff;
  .head {
    display: flex;
    margin-bottom: 50rpx;
    padding: 30rpx;
    padding-bottom: 0;
  }
}

.headL image {
  width: 170rpx;
  height: 224rpx;
  margin-right: 30rpx;
}

.headR-title {
  color: #f75a6c;
  margin: 10rpx 0;
  font-weight: 600;
}

.headR-name {
  font-size: 30rpx;
  margin-bottom: 6rpx;
  font-weight: 600;
}

.headR-num {
  font-size: 20rpx;
  color: #8a8a8a;
}

.headR-lineText {
  font-size: 20rpx;
  color: #3a73d9;
  margin-top: 30rpx;
}

.listItem {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20rpx;
  align-items: center;
  box-sizing: border-box;
}

.listItem-right {
  padding-right: 20rpx;
  .img {
    width: 26rpx;
    height: 26rpx;
  }
}

.listItem-rightTop {
  font-size: 22rpx;
  color: #dc710e;
}

.listItem-rightBottom {
  font-size: 22rpx;
  margin-right: 10srpx;
}

.listItem-rightBottom-goStu {
  font-size: 22rpx;
  color: #1863e5;
  padding-left: 20rpx;
}

.listItem-name {
  font-size: 26rpx;
  flex: 1;
  font-weight: 600;
}

.listItem-img {
  width: 42rpx;
  margin-right: 30rpx;
}

.w_list {
  position: relative;
  width: 640rpx;
  min-height: 130rpx;
  .no_word {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin-top: 8rpx;
    width: 200rpx;
    height: 130rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}

.unit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 22rpx;
  width: 640rpx;
  height: 110rpx;
  border-radius: 10px;
  background: linear-gradient(90deg, #def1ff 0%, #ffffff 100%);
}

.listItem_word {
  background: #fff;
  display: flex;
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  border-top: 1px solid #d8d8d8;
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

.addtask {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
  border-radius: 10rpx;
  height: 70rpx;
  margin-bottom: 40rpx;
}

.addtask text {
  margin-left: 10rpx;
}

.nav-icon,
.nav-slot,
.nav-btn {
  color: black !important;
}

.popupTitle {
  text-align: center;
  margin: 50rpx 0;
  font-weight: 600;
}

.popupSelect {
  padding: 0 60rpx;
}

.popupSelect-title {
  font-size: 26rpx;
}

.popupSelect-list {
  display: flex;
  margin-top: 20rpx;
  flex-wrap: wrap;
}

.popupSelect-listItem {
  font-size: 26rpx;
  background: #f4f4f4;
  width: 178rpx;
  height: 73rpx;
  margin-right: 48rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  text-align: center;
  line-height: 73rpx;
}

.popupSelect-listItem:nth-child(3n) {
  margin-right: 0;
}

.popupButton {
  margin-top: 103rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 65rpx;
}

.popupButton-l {
  border: 2rpx solid rgba(19, 89, 209, 1);
  width: 200rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(19, 89, 209, 1);
  border-radius: 80rpx;
  margin-right: 50rpx;
}

.popupButton-r {
  width: 200rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 80rpx;
  background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
}

.popupSelect-listItem-select {
  background: #e5f1ff;
  border: 2rpx solid #1863e5;
}

.study {
  text-align: center;
}

.study image {
  width: 380rpx;
}
</style>
