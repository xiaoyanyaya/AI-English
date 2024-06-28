<template>
  <view class="main">
    <cy-navbar :showBack="false" bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">疯狂挑战</view>
    </cy-navbar>

    <view class="px-3 mt-3">
      <view class="mt-5 flex justify-content-center">
        <u-tabs bg-color="transparent" inactive-color="#8A8A8A" bar-width="170" active-color="#1863E5"
                :list="topOptinsList" :current="currentTopOptions" @change="changeTopOptions"></u-tabs>
      </view>

      <view class="head">
        <view class="headL mr-1">
          <image :src="textBook.bookImage" mode=""></image>
        </view>
        <view class="headR">
          <view class="headR-title mt-1 flex align-item-center" @click="toSwtichTextBook">
            <view class="mr-1">{{ textBook.bookSecondTypeText }}</view>
            <image :src="`${imageBaseUrl}/word/6-24-02.png`" style="width: 24rpx; height: 20rpx"></image>
          </view>
          <view class="headR-name">
            {{ textBook.bookName }}
          </view>
          <view class="headR-num">
            共{{ textBook.wordNums }}个单词
          </view>
          <view class="flex align-item-center mt-2">
            <view @click="$navigateTo('/pages/word/chanllenge/wordList?bookId='+textBook.id)"
                  class="t-size-24 join-btn t-color-fff flex align-item-center justify-content-center font-weight-bold">
              参与挑战
            </view>
            <view class="share-friend ml-3 flex align-item-center">
              <image :src="`${imageBaseUrl}/word/6-24-01.png`" style="width: 20rpx; height: 20rpx"></image>
              <view class="t-size-22 t-color-1863E5 ml-1">邀请好友挑战</view>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-5 flex justify-content-center">
        <u-tabs bg-color="transparent" inactive-color="#8A8A8A" active-color="#E79315"
                :list="optinsList" :current="currentOptions" @change="changeOptions"></u-tabs>
      </view>
    </view>

    <view class="mt-3 content-box pt-2 px-1">
      <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" v-if="tableData.length > 1">
        <view class="scroll-view-item_H uni-bg-red">
          <view
            :class="index === 0 ? 't-size-26 font-weight-bold t-color-3D3D3D mb-3' :
            't-size-24 t-color-878787 pt-3 pb-3 border-bottom'"
            v-for="(item, index) in tableData"
            :key="index" class="flex table-item">
            <view :style="{color: item.value1.tColor}">{{ item.value1.value }}</view>
            <view :style="{color: item.value2.tColor}">{{ item.value2.value }}</view>
            <view :style="{color: item.value3.tColor}">{{ item.value3.value }}</view>
            <view :style="{color: item.value4.tColor}">{{ item.value4.value }}</view>
            <view :style="{color: item.value5.tColor}">{{ item.value5.value }}</view>
            <view :style="{color: item.value6.tColor}">{{ item.value6.value }}</view>
            <view :style="{color: item.value7.tColor}">{{ item.value7.value }}</view>
          </view>
        </view>
      </scroll-view>
      <view v-else class="mt-5 flex align-item-center justify-content-center">
        <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
      </view>
    </view>


    <view style="height: 160rpx"></view>
    <wordTab :type="2"></wordTab>
  </view>
</template>

<script>
import wordTab from "@/pages/word/components/word-tabbar/index.vue";
import MyMixin from "@/utils/MyMixin";
import {queryBookById, queryChallengeByBook, queryChallengeByUser} from "../../../api/word";

export default {
  mixins: [MyMixin],
  components: {wordTab},
  data() {
    return {
      dateTIme: "今天",

      currentTopOptions: 0,
      topOptinsList: [{
        name: "教材挑战排名",
        id: 0,
      }, {
        name: "考纲挑战排名",
        id: 1,
      }, {
        name: "挑战总排名",
        id: 2,
      }],

      currentOptions: 0,
      optinsList: [{
        name: "我的挑战历程",
        id: 0,
      }, {
        name: "教材挑战排名",
        id: 1,
      }],

      tableData: [{
        value1: {
          value: "日期",
          type: "text",
          tColor: "#3D3D3D"
        },
        value2: {
          value: "用时(min)",
          type: "text",
          tColor: "#3D3D3D"
        },
        value3: {
          value: "正确数",
          type: "text",
          tColor: "#3D3D3D"
        },
        value4: {
          value: "错误数",
          type: "text",
          tColor: "#3D3D3D"
        },
        value5: {
          value: "结果",
          type: "text",
          tColor: "#3D3D3D"
        },
        value6: {
          value: "结果",
          type: "text",
          tColor: "#3D3D3D"
        },
        value7: {
          value: "结果",
          type: "text",
          tColor: "#3D3D3D"
        }
      }, {
        value1: {
          value: "2024-03-27",
          type: "text",
          tColor: "#6D6D6D"
        },
        value2: {
          value: "10",
          type: "text",
          tColor: "#6D6D6D"
        },
        value3: {
          value: "16",
          type: "text",
          tColor: "#C40000"
        },
        value4: {
          value: "0",
          type: "text",
          tColor: "#6D6D6D"
        },
        value5: {
          value: "通过",
          type: "text",
          tColor: "#6D6D6D"
        },
        value6: {
          value: "结果",
          type: "text",
          tColor: "#6D6D6D"
        },
        value7: {
          value: "结果",
          type: "text",
          tColor: "#6D6D6D"
        }
      }],
      textBook: {},
    };
  },
  onLoad() {
    this.initData()

    // 切换教材监听
    uni.$on("switchTextbook", ({textBookId}) => {
      console.log("switchTextbooks", textBookId)
      this.network().queryBookById(textBookId)
    })
  },
  methods: {
    initData() {
      var result = uni.getStorageSync("basicData").currWordConfig.textBook;
      if (result) {
        this.network().queryBookById(result.id)
        this.network().queryChallengeByUser(result.id)
      }
    },
    toSwtichTextBook() {
      this.$navigateTo(`/pages/common/switchTextbooks?pageType=textBook`)
    },
    changeTopOptions(index) {
      this.currentTopOptions = index;
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:

          break;
      }
    },
    changeOptions(index) {
      this.currentOptions = index;
      switch (index) {
        case 0:
          this.network().queryChallengeByUser(this.textBook.id)
          break;
        case 1:
          this.network().queryChallengeByBook(this.textBook.id)
          break;
      }
    },
    network() {
      return {
        queryBookById: async (id) => {
          const res = await queryBookById({id})
          this.textBook = res.data.result
        },
        queryChallengeByUser: async (id) => {
          const res = await queryChallengeByUser({bookId: id})
          console.log("queryChallengeByUser", res)
        },
        queryChallengeByBook: async (id) => {
          const res = await queryChallengeByBook({bookId: id})
          console.log("queryChallengeByBook", res)
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(180deg, #D1EAFF 0%, #F8FDFF 14%) !important;
}

.head {
  display: flex;
  margin-bottom: 50rpx;
  padding: 30rpx;
  padding-bottom: 0;


  .headL image {
    width: 170rpx;
    height: 224rpx;
    margin-right: 30rpx;
  }

  .headR-title {
    color: #C40000;
    margin: 10rpx 0;
    font-weight: 600;
  }

  .headR-name {
    font-size: 30rpx;
    margin-bottom: 10rpx;
    font-weight: 600;
  }

  .headR-num {
    font-size: 20rpx;
    color: #8A8A8A;
  }

  .join-btn {
    width: 169rpx;
    height: 70rpx;
    border-radius: 10rpx;
    background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
  }
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.scroll-view-item_H {
  display: inline-block;
  height: 500rpx;
  text-align: center;

  .border-bottom {
    border-bottom: 1px solid #D8D8D8;
  }
}

.content-box {
  border-radius: 50rpx 50rpx 0 0;
  width: 750rpx;
  height: 500rpx;
  position: fixed;
  bottom: 160rpx;
  box-sizing: border-box;
  background: #F7FBFF;
  border-top: 1px solid #B4CFFF;
  border-bottom: 1px solid #B4CFFF;

  .table-item {
    width: 1200rpx;

    view {
      width: 20%;
      text-align: center;
    }
  }
}
</style>
