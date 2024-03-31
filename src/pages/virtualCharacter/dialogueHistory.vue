<template>
  <view class="main-body">
    <cy-navbar showBack>
      <view class="t-size-30">对话历史</view>
    </cy-navbar>

<!--    <view class="flex align-item-center justify-content-center">
      <image :src="`${imageBaseUrl}/xl-image-49.png`" mode="widthFix" class="dialogue-img"></image>
    </view>-->

    <view class="px-4 pb-5">
      <view class="mt-5" v-for="(item,index) in contentData" :key="index" @click="clickContent(item)">
        <view class="t-size-26">2024.01.01</view>
        <view class="box mt-2">
          <view class="top flex justify-content-between align-item-center px-3">
            <view class="flex align-item-center">
              <image :src="item.avatar"></image>
              <view class="ml-1 t-size-26">{{item.sessionName}}</view>
            </view>
            <view class="flex align-item-start">
              <view class="t-size-22" style="margin-top: 8rpx">{{item.chatTime}}</view>
              <view class="ml-1"><u-icon name="arrow-right" color="#8A8A8A" size="20"></u-icon></view>
            </view>
          </view>

          <view class="bottom flex justify-content-around align-item-center t-color-818181">
            <view class="flex flex-direction-column align-item-center">
              <view class="font-weight-bold t-size-32 t-color-DC0C0C">{{ item.totalScore }}</view>
              <view class="mt-1 t-size-22">总评分</view>
            </view>
            <view class="flex flex-direction-column align-item-center">
              <view>
                <text class="font-weight-bold t-size-32 t-color-3D3D3D">{{item.speechScore}}</text>
                <text class="mt-1 t-size-22">/100</text>
              </view>
              <view class="mt-1 t-size-22">发音评分</view>
            </view>
            <view class="flex flex-direction-column align-item-center">
              <view>
                <text class="font-weight-bold t-size-32 t-color-3D3D3D">{{item.grammarScore}}</text>
                <text class="t-size-22">/100</text>
              </view>
              <view class="mt-1 t-size-22">语法评分</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="flex justify-content-center align-item-center t-size-22 t-color-3D3D3D">
      没有更多记录了哦~
    </view>
  </view>
</template>

<script>

import MyMixin from "@/utils/MyMixin";
import {getAiDialogueList} from "@/api/aiDialogue";
export default {
  mixins: [MyMixin],
  data() {
    return {
      // 总评分 发音评分 语法评分
      scope: {
        totalScore: 88,
        pronunciationScore: 78,
        grammarScore: 99,
      },
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      contentData: [],
    };
  },
  onLoad() {
    this.network().getData();
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.network().getData()
  },
  methods: {
    clickContent(item) {
      this.$navigateTo(`/pages/virtualCharacter/dialogueHistoryDetail?id=${item.id}`)
    },
    network() {
      return {
        getData: async () => {
          const res = await getAiDialogueList(this.queryParams);
          this.contentData = this.contentData.concat(res.data.result.records)
        }
      }
    }
  },
}
</script>

<style lang="scss">

.dialogue-img {
  margin-top: 260rpx;
}

.box {
  .top {
    width: 670rpx;
    height: 102rpx;
    border-radius: 20rpx 20rpx 0 0;
    background: linear-gradient(180deg, rgba(150, 189, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%);

    image {
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
    }
  }

  .bottom {
    width: 670rpx;
    height: 132rpx;
    border-radius: 0 0 20rpx 20rpx;
    background: rgba(255, 255, 255, 0.5);
  }
}


</style>
