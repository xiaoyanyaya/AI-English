<template>
  <view class="main">
    <cy-navbar
      :showBack="true"
      :isReturnHome="isReturnHome"
      bgColor="linear-gradient(180deg, #D9EEFF 0%, #F3F9FF 7%)"
      textColor="#3D3D3D"
    >
      <view class="t-size-30" v-if="id == 0">教材单元列表</view>
      <view class="t-size-30" v-if="id == 1">考纲单元列表</view>
      <view class="t-size-30" v-if="id == 2">专题单元列表</view>
    </cy-navbar>
    <view class="pb-2">
      <view class="top">
        <view class="head">
          <view class="headL">
            <image v-if="id == 2" :src="bookData.unitImage" mode=""></image>
            <image v-else :src="bookData.bookImage" mode=""></image>
          </view>
          <view class="headR">
            <view v-if="id == 1" class="headR-title">
              {{ bookData.bookFullName }}
            </view>
            <view v-else-if="id == 0" class="headR-title">
              {{ bookData.bookFullName.split("-")[1] }}
            </view>
            <view v-else class="headR-title">
              {{ bookData.unitFullName.split("-")[0] }}
            </view>
            <view v-if="id == 1" class="headR-name">
              {{ bookData.bookName }}
            </view>
            <view v-else-if="id == 0" class="headR-name">
              {{ bookData.bookFullName.split("-")[0] }}
            </view>
            <view v-else class="headR-name">
              {{ bookData.unitFullName.split("-")[1] }}
            </view>
            <view class="headR-num"> 共{{ bookData.wordNums }}个单词</view>
            <view class="change_share">
              <view
                class="change_box"
                @click="
                  toNav(
                    `/pages/common/switchTextbooks?pageType=${bookType}&bookId=${bookData.id}`
                  )
                "
              >
                <image class="image" :src="imageBaseUrl + '/6-3-01.png'">
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
              <view class="headR-lineText"> 学习进度35%</view>
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
          <u-icon name="plus" size="30"></u-icon>
          <text>新建任务</text>
        </view>
        <view class="mt-4 mb-1">
          <u-tabs
            bg-color="transparent"
            inactive-color="#8A8A8A"
            active-color="#E79315"
            itemStyle="font-size: 14rpx"
            :list="optinsList"
            :current="currentOptions"
            @change="changeOptions"
          ></u-tabs>
        </view>
      </view>
      <!-- 单元词汇列表 -->
      <scroll-view
        v-if="id == 1 && currentOptions === 0"
        @scrolltolower="onScrolltolower"
        scroll-y
      >
        <view
          :style="{ 'padding-top': topBoxHeight + 10 + 'px' }"
          class="p_list"
        >
          <view v-if="openData.length == 0" class="no_word">
            <image :src="imageBaseUrl + '/word/7-2-01.png'"></image>
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
            <view
              class="listItem-r"
              @click.stop="
                toNav(
                  '/pages/word/definition?wordEn=' +
                    item2.wordEn +
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
      </scroll-view>
      <view v-else :style="{ 'padding-top': topBoxHeight + 'px' }">
        <!-- 单元列表 -->
        <view class="listItem" v-for="(item, index) in list" :key="item.id">
          <view
            :class="{ unit: true, ufixed: item.isOpen }"
            @click="openWord(index)"
          >
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
                挑战人数：
                <text style="font-weight: 600">{{ item.challengeNums }} </text>
              </view>
              <view class="flex align-item-center">
                <view
                  @click.stop="wWrite(item)"
                  class="listItem-rightBottom-goStu"
                >
                  单词听写
                </view>
                <image
                  v-if="item.isOpen"
                  class="img"
                  :src="imageBaseUrl + '/word/6-27-01.png'"
                ></image>
                <image
                  v-else
                  class="img"
                  :src="imageBaseUrl + '/word/6-27-03.png'"
                ></image>
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
              <image v-else :src="imageBaseUrl + '/word/7-2-01.png'"></image>
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
              <view
                class="listItem-r"
                @click.stop="
                  toNav(
                    '/pages/word/definition?wordEn=' +
                      item2.wordEn +
                      '&id=1' +
                      '&lessonId=' +
                      item.id +
                      '&state=1'
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
    <!-- 新建任务设置弹框 -->
    <u-popup v-model="show" mode="bottom" border-radius="14">
      <view class="popupTitle"> 新建学习任务设置</view>
      <view class="popupSelect">
        <view class="popupSelect-title"> 单词数量</view>
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
        <view class="popupButton-l" @click="show = false"> 取消</view>
        <view class="popupButton-r" @click="addBook"> 确认</view>
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
  listByUnitId,
  unLearnListByUnitId,
  errOrOkListByUnitId,
  addLesson,
  dictBookList,
  unLearnDictBookList,
  learnDictBookList,
  labelWordCount,
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
      bookData: {
        bookName: "",
        bookFullName: "",
        wordNums: "",
      },
      wordNumData: [],
      optinsList: [
        {
          name: "词汇",
          id: 0,
        },
        {
          name: "已学",
          id: 1,
        },
        {
          name: "未学",
          id: 1,
        },
        {
          name: "错词",
          id: 1,
        },
      ],
      currentOptions: 0,
      openData: [],
      gif: false,
      selectId: 0,
      isReturnHome: 0,
      topBoxHeight: "500",
      unitIndex: 0, //第几单元/第几课时
      tableNum: {
        totalCnt: "",
        passCnt: "",
        unLearnCnt: "",
        errorCnt: "",
      },
      pagingParams: {
        bookId: null,
        pageNo: 1,
        pageSize: 20,
        totalPage: null,
      },
    };
  },
  async onLoad(e) {
    this.id = e.id;
    this.query = e;
    if (this.id == 0) {
      uni.setStorageSync("answerFromType", 0);
    }
    if (this.id == 1) {
      uni.setStorageSync("answerFromType", 1);
    }
    this.initData(e); //首次进入页面初始化数据

    if (e.isReturnHome) {
      this.isReturnHome = 1;
    }
  },
  onShow() {
    // 监听切换教材
    uni.$on("switchTextbook", ({ textBookId }) => {
      this.unitIndex = 0;
      this.openData = [];
      this.initData(this.query);
    });
  },
  mounted() {
    // 获取到盒子的高度 this===当前组件实例
    uni
      .createSelectorQuery()
      .in(this)
      .select(".top")
      .boundingClientRect((rect) => {
        if (rect) {
          this.topBoxHeight = rect.height;
          console.log("mounted~~~this.topBoxHeight", this.topBoxHeight);
        }
      })
      .exec();
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
      return {
        title: "词汇速记",
        path: `pages/word/textbook?id=${this.query.id}&bookId=${this.data.bookId}&isReturnHome=1`,
      };
    }
  },
  methods: {
    // 初始化页面数据
    async initData(e) {
      if (e.id == 0) {
        this.bookData = uni.getStorageSync("basicData").currWordConfig.textBook;
        this.bookType = "textBook";
        this.data.bookId = this.bookData.id;
      } else if (e.id == 1) {
        this.bookData = uni.getStorageSync("basicData").currWordConfig.dictBook;
        this.bookType = "dictBook";
        this.data.bookId = this.bookData.id; //获取bookid后再去获取分页数据
        this.getPagingList();
      } else if (e.id == 2) {
        this.bookData = uni.getStorageSync("basicData").currWordConfig.specBook; ////专题那本
        this.bookType = "specBook";
        this.data.bookId = this.bookData.bookId;
      }
      this.currentOptions = 0;
      this.getUnit();
      this.getLabelWordCount();
      uni.$off("switchTextbook");
    },
    // 获取分页数据
    async getPagingList() {
      this.pagingParams.bookId = this.data.bookId;
      let res = await dictBookList(this.pagingParams);
      this.openData.push(...(res.data.result.records || []));
      this.openData.forEach(
        (item) => (item.wordCnList = item.wordCn.split("\n"))
      );
      this.pagingParams.totalPage = res.data.result.pages;
      let result2 = {
        wordLessonDictList: this.openData,
        bookFullName: this.bookData.bookFullName,
        lessonName: "",
      };
      uni.setStorageSync("wordList", result2);
    },
    // 切换标签
    async changeOptions(index) {
      this.resetOpen();
      this.currentOptions = index;
      switch (this.id) {
        case "0": //教材
        case "2": //专题
          console.log("教材列表 || 专题列表");
          if (index == 0) {
            let data = await listByUnitId({
              unitId: this.list[this.unitIndex]?.id,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else if (index == 1) {
            let data = await errOrOkListByUnitId({
              unitId: this.list[this.unitIndex]?.id,
              answerResult: 1,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else if (index == 2) {
            let data = await unLearnListByUnitId({
              unitId: this.list[this.unitIndex]?.id,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else {
            let data = await errOrOkListByUnitId({
              unitId: this.list[this.unitIndex]?.id,
              answerResult: 0,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          }
          let result1 = {
            wordLessonDictList: this.openData,
            bookFullName: this.bookData.bookFullName,
            lessonName: "",
          };
          uni.setStorageSync("wordList", result1);
          break;
        case "1": //考纲
          if (index == 0) {
            this.getPagingList();
          } else if (index == 1) {
            let data = await learnDictBookList({
              lessonId: this.list[this.unitIndex]?.id,
              answerResult: 1,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else if (index == 2) {
            let data = await unLearnDictBookList({
              lessonId: this.list[this.unitIndex]?.id,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else {
            let data = await learnDictBookList({
              lessonId: this.list[this.unitIndex]?.id,
              answerResult: 0,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          }
          let result2 = {
            wordLessonDictList: this.openData,
            bookFullName: this.bookData.bookFullName,
            lessonName: "",
          };
          uni.setStorageSync("wordList", result2);
          break;
      }
    },
    // 下拉单词列表
    async openWord(index) {
      //  scrollToElement() {
      // 获取目标元素信息
      // uni
      //   .createSelectorQuery()
      //   .select(".w_list")
      //   .boundingClientRect((rect) => {
      //     if (rect) {
      //       // 使用 scrollTop 将页面滚动到目标元素的位置
      //       uni.pageScrollTo({
      //         // scrollTop: rect.top, // 将页面滚动到目标元素顶部
      //         scrollTop: uni.getSystemInfoSync().windowHeight / 38 - 110, // 将页面滚动到目标元素顶部
      //         duration: 300, // 滚动动画时长
      //       });
      //     }
      //   })
      //   .exec();
      // }
      console.log("下拉index", index);
      this.list.forEach((item, index2) => {
        if (index == index2) return;
        item.isOpen = false;
      });
      this.unitIndex = index;
      switch (this.id) {
        case "0": //教材
        case "2": //专题
          console.log("教材列表||专题列表");
          if (this.currentOptions == 0) {
            let data = await listByUnitId({
              unitId: this.list[index]?.id,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else if (this.currentOptions == 1) {
            let data = await errOrOkListByUnitId({
              unitId: this.list[index]?.id,
              answerResult: 1,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else if (this.currentOptions == 2) {
            let data = await unLearnListByUnitId({
              unitId: this.list[index]?.id,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else {
            let data = await errOrOkListByUnitId({
              unitId: this.list[index]?.id,
              answerResult: 0,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          }
          let result1 = {
            wordLessonDictList: this.openData,
            bookFullName: this.bookData.bookFullName,
            lessonName: "",
          };
          uni.setStorageSync("wordList", result1);
          break;
        case "1": //考纲
          console.log("考纲列表");
          if (this.currentOptions == 0) {
            this.getPagingList();
          } else if (this.currentOptions == 1) {
            let data = await learnDictBookList({
              lessonId: this.list[index]?.id,
              answerResult: 1,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else if (this.currentOptions == 2) {
            let data = await unLearnDictBookList({
              lessonId: this.list[index]?.id,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          } else {
            let data = await learnDictBookList({
              lessonId: this.list[index]?.id,
              answerResult: 0,
            });
            console.log("change_data", data);
            this.openData = data.data.result;
            this.openData.forEach(
              (item) => (item.wordCnList = item.wordCn.split("\n"))
            );
          }
          let result2 = {
            wordLessonDictList: this.openData,
            bookFullName: this.bookData.bookFullName,
            lessonName: "",
          };
          uni.setStorageSync("wordList", result2);
          break;
      }
      this.list[index].isOpen = !this.list[index].isOpen;
    },
    async getUnit() {
      if (this.id == 0 || this.id == 2) {
        let unit = await unitList(this.data);
        this.list = unit.data.result;
        let res1 = await listByUnitId({
          unitId: this.list[0]?.id,
        });
        this.openData = res1.data.result;
        this.openData.forEach(
          (item) => (item.wordCnList = item.wordCn.split("\n"))
        );
      } else if (this.id == 1) {
        let lesson = await lessonList(this.data);
        this.list = lesson.data.result;
        let res = await wordNum();
        this.wordNumData = res.data.result;
        this.selectNum = res.data.result[0].value;
      }
      let result = {
        wordLessonDictList: this.openData,
        bookFullName: this.bookData.bookFullName,
        lessonName: "",
      };
      uni.setStorageSync("wordList", result);
      this.resetOpen();
    },
    // 重置列表isopen
    resetOpen() {
      if (this.list.length == 0) return;
      this.list.forEach((item) => (item.isOpen = false));
      this.list[this.unitIndex].isOpen = true;
    },
    // 获取标签单词数量
    async getLabelWordCount() {
      const res = await labelWordCount({ bookId: this.data.bookId });
      this.optinsList[0].name =
        "词汇" + "(" + res.data.result[0].totalCnt + ")";
      this.optinsList[1].name = "已学" + "(" + res.data.result[0].passCnt + ")";
      this.optinsList[2].name =
        "未学" + "(" + res.data.result[0].unLearnCnt + ")";
      this.optinsList[3].name =
        "错词" + "(" + res.data.result[0].errorCnt + ")";
    },
    // 上划加载更多
    onScrolltolower() {
      if (this.pagingParams.pageNo >= this.pagingParams.totalPage)
        return uni.showToast({ title: "没有更多了哦~", icon: "none" });
      this.pagingParams.pageNo++;
      this.getPagingList();
    },
    wWrite(item) {
      const val = item.unitName ? item.unitName : item.lessonName;
      uni.setStorageSync("nowUnitOrLesson", val);
      this.toNav(
        "/pages/word/wordList?unitId=" +
          item.id +
          "&id=" +
          this.id +
          "&title=" +
          item.lessonName +
          "&lessonId=" +
          item.id
      );
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
    selectClick(num) {
      this.selectNum = num;
    },
    async addBook() {
      let data = {
        bookId: this.data.bookId,
        wordNum: this.selectNum,
      };
      let res = await addLesson(data);
      console.log("添加任务res", res);
      let lesson = await lessonList(this.data); //刷新任务列表
      this.list = lesson.data.result;
      uni.setStorageSync("nowUnitOrLesson", res.data.result.lessonName);
      if (res.data.code == 200) {
        this.toNav(
          "/pages/word/wordList?unitId=" +
            res.data.result.id +
            "&id=1" +
            "&lessonId=" +
            res.data.result.id
        );
      } else {
        uni.showModal({
          title: res.data.message,
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
            } else if (res.cancel) {
              console.log("用户点击取消");
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
    border: 1rpx solid #1863e5;

    .image {
      width: 26rpx;
      height: 20rpx;
    }

    .text {
      @extend .text_e;
      color: #1863e5;
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
}

.top {
  position: fixed;
  z-index: 999;
  padding: 30rpx 55rpx;
  padding-bottom: 0;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(180deg, #f3f9ff 0%, #feffff 100%);

  .head {
    display: flex;
    padding: 0 30rpx;
  }
}

.headL image {
  width: 197rpx;
  height: 277rpx;
  margin-right: 50rpx;
}

.headR-title {
  color: #1863e5;
  margin: 20rpx 0 16rpx;
  font-weight: 600;
}

.headR-name {
  font-size: 30rpx;
  margin-bottom: 15rpx;
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
    margin-left: 12rpx;
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
  background: #307cff;
  border-radius: 50rpx;
  color: #fff;
  font-size: 20rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
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
.p_list {
  position: relative;
  margin: 0 55rpx;
  width: 640rpx;
  height: 95vh;
}

.w_list {
  position: relative;
  width: 640rpx;
  min-height: 130rpx;
  // padding-top: 110rpx;

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
// .ufixed {
//   position: fixed;
//   top: 38%;
//   z-index: 999;
// }

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

.listItem-r {
  position: absolute;
  top: 50%;
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
  width: 640rpx;
  height: 80rpx;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
  margin-bottom: 40rpx;
  margin-top: 30rpx;

  text {
    margin-left: 10rpx;
  }
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
  padding-top: 20rpx;
  text-align: center;
}

.study image {
  width: 380rpx;
  height: 100%;
}
</style>
