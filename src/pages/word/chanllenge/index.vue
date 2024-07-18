<template>
  <view class="main">
    <cy-navbar
      showBack
      :isReturnHome="isReturnHome"
      bgColor="transparent"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">单词挑战赛</view>
    </cy-navbar>

    <view class="px-3 mt-3">
      <view class="flex justify-content-center">
        <u-tabs
          bg-color="transparent"
          inactive-color="#8A8A8A"
          bar-width="170"
          active-color="#1863E5"
          :list="topOptinsList"
          :current="currentTopOptions"
          @change="changeTopOptions"
        ></u-tabs>
      </view>

      <view v-if="currentTopOptions < 2">
        <view class="head">
          <view class="headL mr-1">
            <image :src="textBook.bookImage" mode=""></image>
          </view>
          <view class="headR">
            <view class="headR-title mt-1 flex align-item-center">
              <view class="mr-1">{{ textBook.bookFullName }}</view>
            </view>
            <view class="headR-name">
              {{ textBook.bookName }}
            </view>
            <view class="headR-num flex t-size-20">
              <view class="mr-5">共{{ textBook.wordNums }}个单词</view>
              <!-- <view class="share-friend ml-5 flex align-item-center">
                <image
                  :src="`${imageBaseUrl}/word/6-24-01.png`"
                  style="width: 20rpx; height: 20rpx"
                ></image>
                <view class="t-size-22 t-color-1863E5 ml-1">邀请好友挑战</view>
              </view> -->
              <button
                open-type="share"
                data-name="shareBtn"
                size="mini"
                class="share_box"
              >
                <image
                  :src="`${imageBaseUrl}/word/6-24-01.png`"
                  style="width: 20rpx; height: 20rpx"
                ></image>
                <view class="t-size-22 t-color-1863E5 ml-1">邀请好友挑战</view>
              </button>
            </view>
            <view class="flex align-item-center mt-4">
              <view
                class="swtich-book flex align-item-center justify-content-center mr-4"
                @click="toSwtichTextBook"
              >
                <image
                  :src="imageBaseUrl + '/6-3-01.png'"
                  style="width: 24rpx; height: 20rpx"
                ></image>
                <text class="t-color-2D6CDA t-size-24 ml-2">切换教材</text>
              </view>
              <view
                @click="
                  $navigateTo(
                    '/pages/word/chanllenge/wordList?bookId=' + textBook.id
                  )
                "
                class="t-size-24 join-btn t-color-fff flex align-item-center justify-content-center font-weight-bold"
              >
                参与挑战
              </view>
            </view>
          </view>
        </view>

        <view class="mt-5 flex justify-content-center">
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

      <view v-if="currentTopOptions === 2">
        <view class="flex align-item-center justify-content-center ranking-box">
          <image
            :src="`${imageBaseUrl}/word/6-30-03.png`"
            class="ranking-list"
          ></image>

          <view
            v-if="rankingList[0]"
            class="user-one flex flex-direction-column align-item-center"
          >
            <image :src="rankingList[0].avatar" class="user-avatar"></image>
            <view class="user-nickname">{{ rankingList[0].nickName }}</view>
            <view class="user-corse mt-1">{{ rankingList[0].avgScore }}</view>
          </view>

          <view
            v-if="rankingList[1]"
            class="user-two flex flex-direction-column align-item-center"
          >
            <image :src="rankingList[1].avatar" class="user-avatar"></image>
            <view class="user-nickname">{{ rankingList[1].nickName }}</view>
            <view class="user-corse mt-1">{{ rankingList[1].avgScore }}</view>
          </view>
          <image
            :src="`${imageBaseUrl}/word/6-30-04.png`"
            class="one-image"
          ></image>

          <view
            v-if="rankingList[2]"
            class="user-thire flex flex-direction-column align-item-center"
          >
            <image :src="rankingList[2].avatar" class="user-avatar"></image>
            <view class="user-nickname">{{ rankingList[2].nickName }}</view>
            <view class="user-corse mt-1">{{ rankingList[2].avgScore }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="mt-3 content-box pt-1 px-1">
      <scroll-view scroll-y="true" scroll-x="true">
        <view class="scroll-view-item_H uni-bg-red">
          <view
            :class="
              index === 0
                ? 't-size-26 font-weight-bold t-color-3D3D3D mb-3'
                : 't-size-24 t-color-878787 pt-3 pb-3 border-bottom'
            "
            class="flex table-item justify-content-center"
            v-for="(item, index) in tableData"
            :key="index"
            :style="{
              width: `${tableItemWidth}rpx`,
              backgroundColor: item.value1.isSelf ? '#E2EDFF' : '',
            }"
          >
            <view :style="{ color: item.value1.tColor }">{{
              item.value1.value
            }}</view>

            <view>
              <view
                v-if="currentTopOptions < 2"
                style="width: 100%"
                class="flex"
                :class="index === 0 ? 'justify-content-center' : 'pl-2'"
              >
                <view
                  v-if="currentOptions === 0 || index === 0"
                  :style="{ color: item.value2.tColor }"
                >
                  {{ item.value2.value }}
                </view>
                <view v-else>
                  <image :src="item.value2.value" class="avatar ml-3" />
                </view>
              </view>
              <view
                v-else
                class="flex align-item-center"
                style="width: 100%; position: absolute"
                :style="index !== 0 ? ' margin-top: -10rpx;' : ''"
              >
                <image
                  v-if="item.value2.value2"
                  :src="item.value2.value2"
                  class="avatar"
                />
                <view
                  :style="{ color: item.value2.tColor }"
                  class="ml-1 flex-1 flex justify-content-start table-nowrap"
                >
                  {{ item.value2.value }}
                </view>
              </view>
            </view>

            <view :style="{ color: item.value3.tColor }">{{
              item.value3.value
            }}</view>
            <view :style="{ color: item.value4.tColor }">{{
              item.value4.value
            }}</view>
            <view :style="{ color: item.value5.tColor }">{{
              item.value5.value
            }}</view>
            <view
              v-if="item.value6.value != null"
              :style="{ color: item.value6.tColor }"
              >{{ item.value6.value }}</view
            >
            <view
              v-if="item.value7.value != null"
              :style="{ color: item.value7.tColor }"
              >{{ item.value7.value }}</view
            >
            <view
              v-if="item.value8.value != null"
              :style="{ color: item.value8.tColor }"
              >{{ item.value8.value }}</view
            >
            <view
              v-if="item.value9.value != null"
              :style="{ color: item.value9.tColor }"
              >{{ item.value9.value }}</view
            >
            <view
              v-if="item.value10.value != null"
              :style="{ color: item.value10.tColor }"
              >{{ item.value10.value }}</view
            >
          </view>
        </view>
      </scroll-view>
    </view>
    <wordTab :type="2"></wordTab>
  </view>
</template>

<script>
import wordTab from "@/pages/word/components/word-tabbar/index.vue";
import MyMixin from "@/utils/MyMixin";
import {
  queryBookById,
  queryChallengeByMyself,
  queryChallengeByBook,
  queryChallengeByTotal,
  queryChallengeByUser,
} from "../../../api/word";

export default {
  mixins: [MyMixin],
  components: { wordTab },
  data() {
    return {
      dateTIme: "今天",
      currentTopOptions: 0,
      topOptinsList: [
        {
          name: "教材挑战排名",
          id: 0,
        },
        {
          name: "考纲挑战排名",
          id: 1,
        },
        {
          name: "挑战总排名",
          id: 2,
        },
      ],
      currentOptions: 0,
      optinsList: [
        {
          name: "我的挑战历程",
          id: 0,
        },
        {
          name: "教材挑战排名",
          id: 1,
        },
      ],
      // table-item的宽度
      tableItemWidth: 0,
      // 我的挑战历程标题
      myChallengeTitle: {
        value1: {
          value: "序号",
          type: "text",
          tColor: "#3D3D3D",
        },
        value2: {
          value: "日期",
          type: "text",
          tColor: "#3D3D3D",
        },
        value3: {
          value: "单词数",
          type: "text",
          tColor: "#3D3D3D",
        },
        value4: {
          value: "准确数",
          type: "text",
          tColor: "#3D3D3D",
        },
        value5: {
          value: "用时",
          type: "text",
          tColor: "#3D3D3D",
        },
      },
      // 教材挑战排名标题
      textChallengeTitle: {
        value1: {
          value: "序号",
          type: "text",
          tColor: "#3D3D3D",
        },
        value2: {
          value: "头像",
          type: "image",
          tColor: "#3D3D3D",
        },
        value3: {
          value: "昵称",
          type: "text",
          tColor: "#3D3D3D",
        },
        value4: {
          value: "挑战次数",
          type: "text",
          tColor: "#3D3D3D",
        },
        value5: {
          value: "挑战单词数",
          type: "text",
          tColor: "#3D3D3D",
        },
        value6: {
          value: "正确单词数",
          type: "text",
          tColor: "#3D3D3D",
        },
        value7: {
          value: "最高分",
          type: "text",
          tColor: "#3D3D3D",
        },
        value8: {
          value: "最低分",
          type: "text",
          tColor: "#3D3D3D",
        },
        value9: {
          value: "平均得分",
          type: "text",
          tColor: "#3D3D3D",
        },
        value10: {
          value: "平均用时",
          type: "text",
          tColor: "#3D3D3D",
        },
      },
      // 挑战总排名标题 （字段：名次，头像/昵称，正确数/总数，得分，总耗时）
      totalChallengeTitle: {
        value1: {
          value: "名次",
          type: "text",
          tColor: "#3D3D3D",
        },
        value2: {
          value: "头像/昵称",
          type: "image",
          tColor: "#3D3D3D",
        },
        value3: {
          value: "正确数/总数",
          type: "text",
          tColor: "#3D3D3D",
        },
        value4: {
          value: "得分",
          type: "text",
          tColor: "#3D3D3D",
        },
        value5: {
          value: "总耗时",
          type: "text",
          tColor: "#3D3D3D",
        },
      },
      // 存放第一到第三名
      rankingList: [],
      tableData: [],
      textBook: {},
      isReturnHome: 0,
    };
  },
  onLoad(e) {
    this.initData();
    // 切换教材监听
    uni.$on("switchTextbook", ({ textBookId }) => {
      // this.tableData 去掉除了标题的数据
      var tableData = this.tableData.slice(0, 1);
      this.tableData = tableData;
      this.initBasicData();
    });
    if (e.isReturnHome) {
      console.log("分享页面进来~~~~~~~~~");
      this.isReturnHome = 1;
    }
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      return {
        title: "疯狂挑战",
        path: `pages/word/chanllenge/index?isReturnHome=1`,
      };
    }
  },
  methods: {
    initData() {
      this.tableData = [];
      this.tableItemWidth = 900;
      this.tableData.push(this.myChallengeTitle);
      this.initBasicData();
    },
    initBasicData() {
      var result = {};
      if (this.currentTopOptions === 0) {
        result = uni.getStorageSync("basicData").currWordConfig.textBook;
      }
      if (this.currentTopOptions === 1) {
        result = uni.getStorageSync("basicData").currWordConfig.dictBook;
      }
      this.textBook = result;
      console.log("textBook", result);
      if (result) {
        this.network().queryChallengeByUser(result.id);
      }
    },
    toSwtichTextBook() {
      if (this.currentTopOptions === 0) {
        this.$navigateTo(
          `/pages/common/switchTextbooks?pageType=textBook&bookId=${this.textBook.id}`
        );
      }
      if (this.currentTopOptions === 1) {
        this.$navigateTo(
          `/pages/common/switchTextbooks?pageType=dictBook&bookId=${this.textBook.id}`
        );
      }
    },
    changeTopOptions(index) {
      this.currentTopOptions = index;
      switch (index) {
        case 0:
          this.tableData = [];
          this.tableItemWidth = 700;
          this.tableData.push(this.myChallengeTitle);
          this.initBasicData();
          break;
        case 1:
          this.tableData = [];
          this.tableItemWidth = 1400;
          this.tableData.push(this.textChallengeTitle);
          this.initBasicData();
          break;
        case 2:
          this.tableData = [];
          this.tableItemWidth = 700;
          this.tableData.push(this.totalChallengeTitle);
          this.network().queryChallengeByTotal();
          break;
      }
    },
    changeOptions(index) {
      this.currentOptions = index;
      switch (index) {
        case 0:
          this.tableData = [];
          this.tableItemWidth = 700;
          this.tableData.push(this.myChallengeTitle);
          this.network().queryChallengeByUser(this.textBook.id);
          break;
        case 1:
          this.tableData = [];
          this.tableItemWidth = 1400;
          this.tableData.push(this.textChallengeTitle);
          this.network().queryChallengeByBook(this.textBook.id);
          break;
      }
    },
    network() {
      return {
        queryChallengeByUser: async (id) => {
          const res = await queryChallengeByUser({ bookId: id });
          res.data.result.records.forEach((data, index) => {
            let item = {
              value1: {
                value: index + 1,
                type: "text",
                tColor: "#3D3D3D",
              },
              value2: {
                value: data.finishTime.split(" ")[0],
                type: "text",
                tColor: "#3D3D3D",
              },
              value3: {
                value: data.totalWordNum,
                type: "text",
                tColor: "#3D3D3D",
              },
              value4: {
                value: data.correctWordNum,
                type: "text",
                tColor: "#DC0C0C",
              },
              value5: {
                value: data.costTimes,
                type: "text",
                tColor: "#3D3D3D",
              },
            };
            this.tableData.push(item);
            console.log("我的tableData", this.tableData);
          });
        },
        queryChallengeByBook: async (id) => {
          const res = await queryChallengeByBook({ bookId: id });
          res.data.result.forEach((data, index) => {
            let item = {
              value1: {
                value: index + 1,
                type: "text",
                tColor: "#3D3D3D",
              },
              value2: {
                value: data.avatar,
                type: "text",
                tColor: "#3D3D3D",
              },
              value3: {
                value: data.nickName,
                type: "text",
                tColor: "#3D3D3D",
              },
              value4: {
                value: data.challengeTimes,
                type: "text",
                tColor: "#3D3D3D",
              },
              value5: {
                value: data.totalWordNum,
                type: "text",
                tColor: "#3D3D3D",
              },
              value6: {
                value: data.correctWordNum,
                type: "text",
                tColor: "#DC0C0C",
              },
              value7: {
                value: data.maxScore,
                type: "text",
                tColor: "#3D3D3D",
              },
              value8: {
                value: data.minScore,
                type: "text",
                tColor: "#3D3D3D",
              },
              value9: {
                value: data.avgScore,
                type: "text",
                tColor: "#3D3D3D",
              },
              value10: {
                value: data.avgCostTimes,
                type: "text",
                tColor: "#3D3D3D",
              },
            };
            this.tableData.push(item);
            console.log("考纲tableData", this.tableData);
          });
        },
        queryChallengeByTotal: async () => {
          const self = await queryChallengeByMyself({
            bookId: this.textBook.id,
          });
          console.log("self", self);
          const seldData = self.data.result[0];
          seldData.isSelect = true;

          const res = await queryChallengeByTotal({ bookId: this.textBook.id });
          res.data.result.forEach((data, index) => {
            let item = {
              value1: {
                value: data.rankNum,
                value2: data.userId,
                type: "text",
                tColor: "#3D3D3D",
              },
              value2: {
                value: data.nickName,
                value2: data.avatar,
                type: "text",
                tColor: "#3D3D3D",
              },
              value3: {
                value: data.correctWordNum,
                value2: data.totalWordNum,
                type: "text",
                tColor: "#3D3D3D",
              },
              value4: {
                value: data.avgScore,
                type: "text",
                tColor: "#DC0C0C",
              },
              value5: {
                value: data.totalCostTimes || "",
                type: "text",
                tColor: "#3D3D3D",
              },
            };
            this.tableData.push(item);
            if (index < 3) {
              this.rankingList.push(data);
            }
          });

          this.tableData.forEach((data, index) => {
            console.log("data.userId", data, seldData.userId);
            if (data.value1.value2 == seldData.userId) {
              this.tableData.splice(index, 1);
              this.tableData[1] = {
                value1: {
                  value: seldData.rankNum,
                  value2: seldData.userId,
                  isSelf: true,
                  type: "text",
                  tColor: "#1863E5",
                },
                value2: {
                  value: seldData.nickName,
                  value2: seldData.avatar,
                  type: "text",
                  tColor: "#1863E5",
                },
                value3: {
                  value: seldData.correctWordNum,
                  value2: seldData.totalWordNum,
                  type: "text",
                  tColor: "#3D3D3D",
                },
                value4: {
                  value: seldData.avgScore,
                  type: "text",
                  tColor: "#DC0C0C",
                },
                value5: {
                  value: seldData.totalCostTimes || "",
                  type: "text",
                  tColor: "#3D3D3D",
                },
              };
            }
          });
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  background: linear-gradient(180deg, #d1eaff 0%, #fff 100%) !important;
}

.head {
  display: flex;
  margin-bottom: 50rpx;
  padding: 30rpx;
  padding-bottom: 0;

  .headL image {
    width: 197rpx;
    height: 277rpx;
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
    color: #8a8a8a;
    .share_box {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background-color: #dff0ff;
    }
  }
  button::after {
    border: none; /*去掉分享按钮的边框 */
  }

  .swtich-book {
    width: 172rpx;
    height: 65rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    border: 1px solid #1863e5;
  }

  .join-btn {
    width: 169rpx;
    height: 65rpx;
    border-radius: 10rpx;
    background: linear-gradient(180deg, #5a95fb 0%, #1258d0 100%);
  }
}

.ranking-box {
  height: 430rpx;
  position: relative;

  .ranking-list {
    position: absolute;
    width: 531rpx;
    height: 191rpx;
    bottom: 30rpx;
  }

  .user-one {
    position: absolute;
    left: 300rpx;
    bottom: 230rpx;

    .user-avatar {
      box-sizing: border-box;
      border: 1px solid #ffc736;
    }
  }
  .one-image {
    position: absolute;
    width: 55rpx;
    height: 61rpx;
    left: 322rpx;
    bottom: 380rpx;
  }

  .user-two {
    position: absolute;
    left: 120rpx;
    bottom: 190rpx;

    .user-avatar {
      box-sizing: border-box;
      border: 1px solid #b3b3b3;
    }
  }

  .user-thire {
    position: absolute;
    left: 480rpx;
    bottom: 140rpx;

    .user-avatar {
      box-sizing: border-box;
      border: 1px solid #d17448;
    }
  }

  .user-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }

  .user-nickname {
    font-size: 24rpx;
    color: #3d3d3d;
  }

  .user-corse {
    font-size: 24rpx;
    color: #dc0c0c;
  }
}

.content-box {
  border-radius: 50rpx 50rpx 0 0;
  width: 750rpx;
  height: 45vh;
  bottom: 160rpx;
  box-sizing: border-box;
  border-top: 1px solid #b4cfff;
}

.scroll-view-item_H {
  white-space: nowrap;
  width: 100%;
  height: 43vh;
  display: inline-block;
  text-align: center;
}

.border-bottom {
  border-bottom: 1px solid #d8d8d8;
}

.table-item {
  view {
    width: 25%;

    .avatar {
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
    }
  }
}

.user-info {
}

.top {
  width: 195rpx;
  height: 31rpx;
  background: #e3eeff;
}

.bottom {
  width: 195rpx;
  height: 114rpx;
  background: linear-gradient(180deg, #b5d3ff 0%, #ffffff 100%);
}
</style>
