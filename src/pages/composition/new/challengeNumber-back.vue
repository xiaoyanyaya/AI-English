<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack>
      <view class="t-size-30">挑战人数</view>
    </cy-navbar>

    <view class="px-4 mt-4 mb-5">
      <view class="top-bg">
        <image src="/static/logo.png"></image>
      </view>

      <view class="seniority-btn mt-3 flex align-item-center justify-content-center t-color-fff font-weight-bold">
        <view>排行榜</view>
      </view>
    </view>

    <view class="person-list" v-for="(item, index) in personList" :key="index">
      <view class="item flex align-item-center" :class="{active: item.isSelect}">
        <view class="sort" :class="{active: item.isSelect}">{{ item.sort }}</view>
        <view class="avatar">
          <image :src="item.avatar"></image>
        </view>
        <view class="name" :class="{active: item.isSelect}">{{item.name}}</view>
        <view class="score font-weight-bold t-size-36">{{item.score}}分</view>
      </view>
      <view class="px-5">
        <view class="line-hr"></view>
      </view>
    </view>

  </view>
</template>

<script>
import {tr} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";
import {getChallengeCompositionList} from "@/api/composition";

export default {
  data() {
    return {
      personList: [{
        sort: 1,
        name: '张三',
        score: 100,
        avatar: '/static/logo.png',
        isSelect: false
      }, {
        sort: 2,
        name: '李四',
        score: 90,
        avatar: '/static/logo.png',
        isSelect: false
      }, {
        sort: 3,
        name: '王五',
        score: 80,
        avatar: '/static/logo.png',
        isSelect: false
      }, {
        sort: 4,
        name: '赵六',
        score: 70,
        avatar: '/static/logo.png',
        isSelect: true
      }],
      id: '',
    };
  },
  onLoad({id}) {
    this.id = id;
    this.network().getChallengeCompositionList();
  },
  methods: {
    network() {
      return {
        getChallengeCompositionList: async () => {
          const res = await getChallengeCompositionList({compositionTitleId: this.id});
          console.log(res.data.result.records)
        }
      }
    }
  },
}
</script>

<style lang="scss">
.top-bg {
  width: 680rpx;
  height: 300rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.seniority-btn {
  width: 680rpx;
  height: 80rpx;
  border-radius: 184rpx;
  background: #326ED6;
}

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
      width: 25%;

      &.active {
        color: #3B49C5;
      }
    }
    .avatar {
      width: 25%;
      overflow: hidden;

      image {
        border-radius: 50%;
        width: 60rpx;
        height: 60rpx;
      }
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
