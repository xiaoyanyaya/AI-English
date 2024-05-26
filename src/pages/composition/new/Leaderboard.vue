<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack>
      <view class="t-size-30">挑战排行榜</view>
    </cy-navbar>

    <view class="person-list" v-for="(item, index) in personList" :key="index">
      <view class="item flex align-item-center justify-content-around" :class="{active: item.isSelect}">
        <image v-if="item.rankNum == 1" class="medal" mode="widthFix" :src="`${imageBaseUrl}/3-22-14.png`"></image>
        <image v-else-if="item.rankNum == 2" class="medal" mode="widthFix" :src="`${imageBaseUrl}/3-22-13.png`"></image>
        <image v-else-if="item.rankNum == 3" class="medal" mode="widthFix" :src="`${imageBaseUrl}/3-22-12.png`"></image>
        <view v-else class="sort" :class="{active: item.isSelect}">{{ item.rankNum }}</view>
        <view class="avatar">
          <image :src="item.avatar"></image>
        </view>
        <view class="name" :class="{active: item.isSelect}">{{item.nickName}}</view>
        <view class="score font-weight-bold t-size-36">{{item.nums}}次</view>
      </view>
      <view class="px-5">
        <view class="line-hr"></view>
      </view>
    </view>

    <view v-if="personList.length < 1" class="flex align-item-center justify-content-center">
      <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
    </view>

  </view>
</template>

<script>
import {tr} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";
import {getChallengeCompositionList, getChallengeCompositionRank, getChallengeCompositionSelf} from "@/api/composition";
import myMixin from "@/utils/MyMixin";

export default {
  mixins: [myMixin],
  data() {
    return {
      personList: [],
      id: '',
    };
  },
  onLoad() {
    this.network().getChallengeCompositionRank();
  },
  methods: {
    network() {
      return {
        getChallengeCompositionRank: async () => {
          const self = await getChallengeCompositionSelf();
          const seldData = self.data.result[0];
          seldData.isSelect = true;
          const res = await getChallengeCompositionRank();
          const data = res.data.result;
          // 根据data的
          // 将自己的数据放在第一位
          data.forEach((item, index) => {
            if (item.userId === seldData.userId) {
              data.splice(index, 1);
              data.unshift(seldData);
            }
          });
          this.personList = data;
        },
        getChallengeCompositionSelf: async () => {
          const res = await getChallengeCompositionSelf();
          console.log(res.data.result)
        },
      }
    }
  },
}
</script>

<style lang="scss">

.person-list {

  .item {
    padding: 0 40rpx 0 0;
    width: 750rpx;
    height: 140rpx;
    box-sizing: border-box;

    &.active {
      background: linear-gradient(180deg, #A4C6FF 0%, #CBDEFF 98%);
    }

    view {
      display: flex;
      justify-content: center;
    }

    .sort {
      width: 100rpx;
      margin-left: 30rpx;

      &.active {
        color: #3B49C5;
      }
    }
    .avatar {
      width: 25%;
      overflow: hidden;

      image {
        border-radius: 50%;
        width: 80rpx;
        height: 80rpx;
      }
    }
    .medal {
      width: 100rpx;
      margin-bottom: -30rpx;
      margin-left: 30rpx;
    }

    .name {
      width: 25%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.active {
        color: #3B49C5;
      }
    }

    .score {
      width: 25%;
      font-family: Source Han Sans;
      line-height: normal;
      letter-spacing: 0em;
      color: #DC0C0C;
    }
  }
}

.line-hr {
  height: 1px;
  background: #E5E5E5;
}
</style>
