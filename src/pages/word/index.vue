<template>
  <view class="main">
    <cy-navbar
      showBack
      :isReturnHome="isReturnHome"
      :allTrans="true"
      bgColor="linear-gradient(180deg, #D9EEFF 0%, #fff 100%)"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">词汇速记</view>
    </cy-navbar>
    <view class="content">
      <!-- 教材 -->
      <view class="model_box">
        <view class="title"> <text class="text">教材</text>同步</view>
        <image class="bg_img" :src="imageBaseUrl + '/word/7-1-06.png'"> </image>
        <view class="body">
          <view class="body_top">
            <image class="img_book" :src="textBook.bookImage" mode="widthFix">
            </image>
            <view class="right">
              <text class="ver">{{ textBook.bookFullName.split("-")[1] }}</text>
              <text class="grade">{{
                textBook.bookFullName.split("-")[0]
              }}</text>
              <text class="num">共{{ textBook.wordNums }}个单词</text>
              <view class="change_share">
                <view
                  class="change_box"
                  @click="
                    toNav(
                      `/pages/common/switchTextbooks?pageType=textBook&bookId=${textBook.id}`
                    )
                  "
                >
                  <image class="image" :src="imageBaseUrl + '/6-3-01.png'">
                  </image>
                  <view class="text">切换教材</view>
                </view>
                <button
                  @click="shareTextBook"
                  open-type="share"
                  data-name="shareBtn"
                  size="mini"
                  class="share_box"
                >
                  <image
                    class="image"
                    :src="imageBaseUrl + '/word/6-26-01.png'"
                  >
                  </image>
                  <view class="text">分享</view>
                </button>
              </view>
            </view>
          </view>
          <view class="body_footer">
            <view class="footer">
              <view
                class="item-box-listItem item-box-l"
                :style="{
                  backgroundImage: 'url(' + imageBaseUrl + '/word/7-1-07.png)',
                }"
                @click="
                  toNav(`/pages/word/textbook?id=0&bookId=${textBook.id}`)
                "
              >
                <text> 词汇学习 </text>
                <image
                  class="item-box-listItem-img"
                  :src="imageBaseUrl + '/word/7-1-01.png'"
                  mode="widthFix"
                >
                </image>
              </view>
            </view>
            <view class="footer">
              <view
                class="item-box-listItem item-box-r"
                :style="{
                  backgroundImage: 'url(' + imageBaseUrl + '/word/7-1-08.png)',
                }"
                @click="toNav('/pages/word/reverseForgetting/index')"
              >
                <text> 抗遗忘复习 </text>
                <image
                  class="item-box-listItem-img"
                  :src="imageBaseUrl + '/word/7-1-03.png'"
                  mode="widthFix"
                >
                </image>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 考纲 -->
      <view class="model_box">
        <view class="title"> <text class="text">考纲</text>冲刺</view>
        <image class="bg_img" :src="imageBaseUrl + '/word/7-1-06.png'"> </image>
        <view class="body_dict">
          <view class="body_top">
            <image class="img_book" :src="dictBook.bookImage" mode="widthFix">
            </image>
            <view class="right">
              <text class="ver">{{ dictBook.bookName }}</text>
              <text class="grade">{{ dictBook.bookFullName }}</text>
              <text class="num">共{{ dictBook.wordNums }}个单词</text>
              <view class="change_share">
                <view
                  class="change_box"
                  @click="
                    toNav(
                      `/pages/common/switchTextbooks?pageType=dictBook&bookId=${dictBook.id}`
                    )
                  "
                >
                  <image class="image" :src="imageBaseUrl + '/6-3-01.png'">
                  </image>
                  <view class="text">切换教材</view>
                </view>
                <button
                  @click="shareDictBook"
                  open-type="share"
                  data-name="shareBtn"
                  size="mini"
                  class="share_box"
                >
                  <image
                    class="image"
                    :src="imageBaseUrl + '/word/6-26-01.png'"
                  >
                  </image>
                  <view class="text">分享</view>
                </button>
              </view>
            </view>
          </view>
          <view class="body_footer">
            <view class="footer">
              <view
                @click="
                  toNav(`/pages/word/examFrequency?bookId=${dictBook.id}`)
                "
                class="item-box-listItem item-box-l"
                :style="{
                  backgroundColor: '#e4f8e1',
                }"
              >
                <text>考频查询</text>
                <image
                  class="item-box-listItem-imgs"
                  :src="imageBaseUrl + '/11-14-01.png'"
                >
                </image>
                <view class="item-box-listItem-icon"> </view>
              </view>
            </view>
            <view class="footer">
              <view
                class="item-box-listItem item-box-r"
                :style="{
                  backgroundColor: '#e8e6fe',
                }"
                @click="toNav(`/pages/word/fastQuestion?bookId=${dictBook.id}`)"
              >
                <text>极速刷词</text>
                <image
                  class="item-box-listItem-imgs"
                  :src="imageBaseUrl + '/11-14-02.png'"
                >
                </image>
                <view class="item-box-listItem-icon"> </view>
              </view>
            </view>
          </view>
          <view class="body_footer">
            <view class="footer">
              <view
                class="item-box-listItem item-box-l"
                :style="{
                  backgroundImage: 'url(' + imageBaseUrl + '/word/7-1-07.png)',
                }"
                @click="
                  toNav(`/pages/word/textbook?id=1&bookId=${dictBook.id}`)
                "
              >
                <text> 词汇学习 </text>
                <image
                  class="item-box-listItem-img"
                  :src="imageBaseUrl + '/word/7-1-01.png'"
                  mode="widthFix"
                >
                </image>
              </view>
            </view>
            <view class="footer">
              <view
                class="item-box-listItem item-box-r"
                :style="{
                  backgroundImage: 'url(' + imageBaseUrl + '/word/7-1-08.png)',
                }"
                @click="toNav('/pages/word/reverseForgetting/index')"
              >
                <text> 抗遗忘复习 </text>
                <image
                  class="item-box-listItem-img"
                  :src="imageBaseUrl + '/word/7-1-03.png'"
                  mode="widthFix"
                >
                </image>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 专题 -->
      <view class="special_box">
        <view class="title">
          <view><text class="text">专项</text>训练</view>
          <view class="iconfont icon-shangxiahuadong icon"> </view>
        </view>
        <view class="item-box-select">
          <view
            class="item-box-selectItem"
            v-for="item in typeData"
            :key="item.id"
            @click="goTextBook(item)"
          >
            <view class="item-box-selectItem-head">
              <image :src="item.unitImage" mode="heightFix"></image>
            </view>
            <view class="item-box-selectItem-name">
              {{ item.unitName.split("(")[1].slice(0, -1) }}
            </view>
            <view class="item-box-selectItem-text">
              {{ item.wordNums }}个单词
            </view>
            <view class="item-box-selectItem-textB">
              挑战次数：{{ item.reviewNum }}次
            </view>
          </view>
          <view
            v-if="typeData.length % 3 != 0"
            class="item-box-selectItem-null"
          ></view>
        </view>
      </view>
      <!-- 查询 -->
      <view class="search-box">
        <image :src="imageBaseUrl + '/word/icon3.png'" mode=""></image>
        <input
          type="text"
          name=""
          id=""
          placeholder="AI查单词"
          v-model="value"
        />
        <view class="search-box-icon" @click="value = ''">
          <u-icon v-if="value.length > 0" name="close-circle"></u-icon>
        </view>
        <view
          v-if="value.length > 0"
          class="search-boxIcon"
          @click="
            toNav(
              '/pages/word/definition?wordEn=' +
                value +
                '&state=1' +
                '&fromSearch=1'
            )
          "
        >
          搜索
        </view>
      </view>
    </view>
    <wordTab :type="0"></wordTab>
  </view>
</template>

<script>
import wordTab from "@/pages/word/components/word-tabbar/index.vue";
import MyMixin from "@/utils/MyMixin";
import { listByBookType } from "@/api/word";
import { getSourceCB } from "@/api/user";

export default {
  mixins: [MyMixin],
  components: {
    wordTab,
  },
  data() {
    return {
      typeData: [],
      typePages: 0,
      value: "",
      getData: {
        bookType: 101,
      },
      textBook: {},
      dictBook: {},
      shareContent: {
        id: "", //书籍类型
        bookId: "",
      },
      isReturnHome: 0,
    };
  },
  onShow() {
    this.textBook = uni.getStorageSync("basicData").currWordConfig.textBook;
    this.dictBook = uni.getStorageSync("basicData").currWordConfig.dictBook;
    console.log("textBook", this.textBook);
    console.log("dictBook", this.dictBook);
  },
  onLoad(e) {
    this.getList();
    if (e.isReturnHome) {
      this.isReturnHome = 1;
    }
    if (e.code) this.getSourceCB(e.code);
  },
  onShareAppMessage(res) {
    if (res.from == "button") {
      return {
        title: "词汇速记",
        path: `pages/word/textbook?promoCode=${this.$store.state.userInfo.promoCode}&id=${this.shareContent.id}&bookId=${this.shareContent.bookId}&isReturnHome=1`,
      };
    } else {
      return {
        title: "小礼AI极简英语",
        path:
          "pages/index/index?promoCode=" + this.$store.state.userInfo.promoCode,
      };
    }
  },
  methods: {
    goTextBook(item) {
      const val = item.unitName ? item.unitName : item.lessonName;
      uni.setStorageSync("nowUnitOrLesson", val);
      uni.setStorageSync("answerFromType", 2);
      this.toNav(
        "/pages/word/wordList?id=2&unitId=" + item.id + "&lessonId=" + item.id
      );
    },
    shareTextBook() {
      this.shareContent.id = 0;
      this.shareContent.bookId = textBook.id;
    },
    shareDictBook() {
      this.shareContent.id = 1;
      this.shareContent.bookId = dictBook.id;
    },
    toNav(urls) {
      uni.navigateTo({
        url: urls,
      });
    },
    async getList() {
      let data = await listByBookType(this.getData);
      this.typeData = data.data.result;
    },
    plus() {
      if (this.getData.pageNo != this.typePages) {
        this.getData.pageNo = this.getData.pageNo++;
        console.log(this.getData.pageNo++);
        this.getList();
      }
    },
    reduce() {
      if (this.getData.pageNo != 1) {
        this.getData.pageNo = this.getData.pageNo--;
        console.log(this.getData.pageNo--);
        this.getList();
      }
    },
    async getSourceCB(code) {
      const res = await getSourceCB({ code });
      uni.showToast({
        title: res.data.message,
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(180deg, #c8ddfe 0%, #ffffff 38%);
  min-height: 100vh;
  padding-bottom: 100rpx;
  .content {
    .frank_en {
      display: flex;
      justify-content: space-between;
      margin: 40rpx 55rpx;
      .frank_left {
        position: relative;
        width: 215rpx;
        height: 270rpx;
        background-color: #fff;
        border-radius: 5%;
        box-shadow: 2px 2px 8px #689aef;
        image {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 90%;
          height: 88%;
        }
        .frank_buton {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 10rpx;
          display: flex;
          justify-content: center;
          width: 90%;
          height: 40rpx;
          line-height: 50rpx;
          opacity: 0.8;
          text-align: center;
          font-size: 22rpx;
          color: #fff;
          background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
        }
      }
      .frank_right {
        flex: 1;
        padding-left: 45rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .flex_bu {
          display: flex;
          position: relative;
          margin-left: 35rpx;
          width: 322rpx;
          height: 68rpx;
          line-height: 68rpx;
          background: linear-gradient(
            90deg,
            #ffffff 42%,
            rgba(255, 255, 255, 0) 100%
          );
          .circle {
            position: absolute;
            left: -40rpx;
            top: -6rpx;
            width: 83rpx;
            height: 83rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 29rpx;
            height: 29rpx;
            margin-left: 55rpx;
            background: #e49739;
            border-radius: 50%;
            .icons {
              position: absolute;
              top: 50%;
              left: -3rpx;
              transform: translateY(-50%);
            }
          }
          .text {
            font-size: 24rpx;
            margin-left: 90rpx;
          }
        }

        .buton_stu {
          width: 360rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 10rpx;
          color: #fff;
          font-size: 22rpx;
          background: linear-gradient(180deg, #5a95fb 0%, #0853d5 100%);
        }
      }
    }

    .model_box {
      background: linear-gradient(180deg, #f5f9ff 0%, #fbfcff 100%);
      position: relative;
      .bg_img {
        position: absolute;
        width: 160rpx;
        height: 130rpx;
        top: 84rpx;
        right: 45rpx;
      }
      .title {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        height: 93rpx;
        line-height: 93rpx;
        padding-left: 43rpx;
        opacity: 1;
        font-size: 34rpx;
        font-weight: 400;
        color: #3d3d3d;
        .text {
          font-size: 34rpx;
          font-weight: 500;
          color: #3d3d3d;
        }
      }
      .body {
        height: 480rpx;
        padding: 0 65rpx;
        .body_top {
          display: flex;
          margin-bottom: 30rpx;
          .img_book {
            width: 197rpx;
            height: 277rpx;
            margin-right: 30rpx;
          }
          .right {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-around;
            padding-right: 58rpx;
            .ver {
              color: #1863e5;
              font-size: 28rpx;
            }
            .grade {
              font-size: 30rpx;
              font-weight: 500;
            }
            .num {
              color: #8a8a8a;
              font-size: 24rpx;
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
          }
        }
        .body_footer {
          display: flex;
          justify-content: space-between;
          margin-top: 10rpx;
          .footer {
            width: 294rpx;
            height: 144rpx;
            text {
              font-size: 26rpx;
            }
          }
        }
      }
      .body_dict {
        @extend .body;
        height: 635rpx;
      }
    }

    .special_box {
      background: linear-gradient(
        180deg,
        #eff5ff 0%,
        rgba(238, 245, 255, 0) 100%
      );
      padding-left: 43rpx;
      .title {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;
        height: 93rpx;
        line-height: 93rpx;
        opacity: 1;
        font-size: 34rpx;
        font-weight: 400;
        color: #3d3d3d;
        .text {
          font-size: 34rpx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .icon {
          color: #3a73d9;
          font-size: 48rpx !important;
          padding-right: 70rpx;
        }
      }
      .item-box-select {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        overflow-x: auto; /* 水平滚动 */
        height: 600rpx;
      }
      .item-box-selectItem-head image {
        height: 127rpx;
      }
      .item-box-selectItem-head {
        margin-bottom: 15rpx;
        display: flex;
        justify-content: center;
      }
      .item-box-selectItem {
        width: 202rpx;
        height: 284rpx;
        margin-bottom: 15rpx;
        background: #fff;
        padding: 20rpx;
        padding-bottom: 25rpx;
        border-radius: 10rpx;
        margin-right: 32rpx;
      }
      .item-box-selectItem-null {
        @extend .item-box-selectItem;
        background-color: #fcfdff;
      }
      .item-box-selectItem-text {
        font-size: 20rpx;
        color: #3a73d9;
        margin-bottom: 5rpx;
        margin-top: 10rpx;
      }
      .item-box-selectItem-textB {
        font-size: 20rpx;
        color: #8a8a8a;
      }
      .item-box-selectItem-name {
        font-size: 26rpx;
        margin-bottom: 6rpx;
      }
    }
  }
}

.search-boxIcon {
  position: absolute;
  right: 40rpx;
  background: #e9f5ff;
  width: 100rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  border-radius: 40rpx;
  color: #1863e5;
}
.search-box-icon {
  position: absolute;
  right: 160rpx;
}
.search-box input {
  flex: 1;
  margin-right: 150rpx;
  z-index: 0;
}
.search-box {
  margin: 30rpx 40rpx 70rpx;
  height: 70rpx;
  line-height: 70rpx;
  color: #8a8a8a;
  width: 670rpx;
  height: 70rpx;
  border-radius: 401rpx;
  box-sizing: border-box;
  border: 1rpx solid #bfbfbf;
  padding: 0 50rpx;
  display: flex;
  align-items: center;
  font-size: 24rpx;
  position: relative;
}
.search-box image {
  width: 26rpx;
  height: 26rpx;
  margin-right: 30rpx;
}

.item-box {
  background: #fff;
  border-radius: 10rpx;
}

.item-box-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-box-titleLeft-icon {
  width: 7rpx;
  border-radius: 2rpx;
  background: #3a73d9;
  height: 28rpx;
  margin-right: 10rpx;
}

.item-box-titleLeft {
  font-size: 30rpx;
  display: flex;
  align-items: center;
}

.item-box-titleRight {
  display: flex;
}

.item-box-titleRight-icon {
  display: flex;
  align-items: center;
}

.item-box-titleRight-icon image {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  size: 0;
}

.item-box-list {
  display: flex;
  justify-content: space-between;
}

.item-box-listItem {
  width: 294rpx;
  height: 120rpx;
  border-radius: 10rpx;
  padding: 35rpx;
  margin: 15rpx 0;
  background-size: 100% 100%;
  position: relative;
}

.item-box-listItem-icon image {
  width: 50rpx;
  height: 12rpx;
  position: absolute;
  left: 25rpx;
  bottom: 25rpx;
}

.item-box-listItem-img {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  right: 15rpx;
  bottom: 15rpx;
}

.item-box-listItem-imgs {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  right: 38rpx;
  bottom: 35rpx;
}

.item-boxBottom {
  position: relative;
  height: 141rpx;
  border-radius: 10rpx;
  width: 100%;
  background-size: 100% 100%;
}

.item-boxBottom-content {
  display: flex;
  padding: 25rpx;
}

.item-boxBottom-contentLeft-title {
  font-weight: 600;
  color: #fff;
}

.item-boxBottom-contentLeft-bottom {
  background: #fff;
  border-radius: 26rpx;
  padding: 4rpx 30rpx;
  display: flex;
  align-items: center;
  color: #1863e5;
  font-size: 20rpx;
  width: 260rpx;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 26rpx;
}

.item-boxBottom-contentRight image {
  width: 172rpx;
  height: 124rpx;
  position: absolute;
  right: 30rpx;
  top: 10rpx;
}

.item-boxBottom-contentLeft-bottom image {
  width: 20rpx;
  height: 19rpx;
  margin-right: 10rpx;
}
</style>