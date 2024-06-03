<template>
  <view class="pb-5 ">
    <cy-navbar showBack isAbsolute :showBgColor="false">
      <view class="t-size-30">挑战排行榜</view>
    </cy-navbar>

    <view class="trophy flex align-item-center">
      <image :src="`${imageBaseUrl}/6-2-01.png`" mode="widthFix" style="width: 280rpx"></image>
    </view>
    <view style="width: 100%; height: 450rpx"></view>

    <view class="person-list"
          :style="{borderRadius: `${index == 0 ? '50rpx 50rpx 0rpx 0' : '0'}`}"
          v-for="(item, index) in personList" :key="index">
      <view class="item flex align-item-center justify-content-around" :class="{active: item.isSelect}">
        <image v-if="item.rankNum == 1" class="medal" mode="widthFix" :src="`${imageBaseUrl}/3-22-14.png`"></image>
        <image v-else-if="item.rankNum == 2" class="medal" mode="widthFix" :src="`${imageBaseUrl}/3-22-13.png`"></image>
        <image v-else-if="item.rankNum == 3" class="medal" mode="widthFix" :src="`${imageBaseUrl}/3-22-12.png`"></image>
        <view v-else class="sort" :class="{active: item.isSelect}">{{ item.rankNum }}</view>
        <view class="avatar">
          <image :src="item.avatar"></image>
        </view>
        <view class="name" :class="{active: item.isSelect}">{{ item.nickName }}</view>
        <view class="score font-weight-bold t-size-36">{{ item.nums }}次</view>
      </view>
      <!--      <view class="px-5">
              <view class="line-hr"></view>
            </view>-->
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

.trophy {
  width: 750px;
  height: 630rpx;
  position: absolute;
  z-index: 1;
  background: url("https://aien.xiaolixb.com/assets/6-2-02.png") no-repeat;
  background-size: 100% 100%;
  background-size: contain;
  padding-left: calc(50% - 140rpx);
}

.person-list {
  overflow: hidden;
  z-index: 9999;
  position: relative;
  background: #fff;

  .item {
    padding: 0 40rpx 0 0;
    width: 750rpx;
    height: 140rpx;
    box-sizing: border-box;

    &.active {
      background: #DAE7FF;
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
