<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack>
      <view class="t-size-30">挑战人数</view>
    </cy-navbar>

    <view class="px-4 mt-4 mb-5">
      <view class="top-content-box">
        <view class="top-content flex-direction-column flex align-item-center justify-content-center px-5">
          <view class="tags t-size-24 flex align-item-center justify-content-center">
            <text class="mr-4">{{compositionLabel}}</text>
          </view>
          <view class=" t-size-26 mt-1">
            <!--            <view class="mb-1">书面表达（满分 25分）</view>-->
            <rich-text :nodes="title"></rich-text>
          </view>
        </view>
      </view>

      <view class="flex align-item-center justify-content-between px-2 mt-5 mb-3">
        <view class="t-color-3D3D3D t-size-30 font-weight-bold">挑战列表</view>
<!--        <view class="t-color-8A8A8A t-size-24 flex align-item-center">
          <view class="iconfont" style="font-size: 40rpx">&#xe6ad;</view>
          <view class="ml-1">综合排序</view>
        </view>-->
      </view>

      <view class="content-box px-4 pb-2 mb-3" v-for="(item, index) in challengeData" :key="index">
        <view class="flex justify-content-between align-item-start person-box">
          <div class="flex person">
            <view>
              <image class="avatar" :src="item.avatar"></image>
            </view>
            <view class="ml-3">
              <view class=" mb-1 t-size-30 font-weight-bold">{{item.userId_dictText}}</view>
              <view class="t-size-24 t-color-8A8A8A">{{item.createTime}}</view>
            </view>
          </div>
          <div class="collection flex align-item-center">
            <image class="iconfont" :src="`${imageBaseUrl}/3-22-04.png`"></image>
            <view class="ml-2 t-size-24 t-color-8A8A8A">收藏({{item.compositionFavoritesSource}})</view>
          </div>
        </view>
        <view class="mt-2 content-text">
          {{item.compositionCorrect}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {getChallengeCompositionList} from "@/api/composition"
import myMixin from "@/utils/MyMixin";

export default {
  mixins: [myMixin],
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
      title: '',
      compositionLabel: '',
      challengeData: [],
      challenge: {
        compositionInfo: null,
        compositionLabel: "AI出题",
        compositionTitleImage: "",
        compositionTitleText: "假设你是刘军，在上周末的乡村旅游中，你发现了一些游客的不文明行为。请根据下表信息给某英文报VOICE栏目的编辑写一封邮件，反映这些问题并提出建议。",
        compositionType: "101",
        createBy: "admin",
        createTime: "2024-03-28 18:00:25",
        favoritesTimes: 0,
        id: "1762779778687045664",
        infoCity: "广州市",
        infoProvince: "广东省",
        infoPublish: "教育出版社",
        infoYear: "2023",
        note: "这是一篇关于人工智能优点的作文",
        status: 1,
        updateBy: null,
        updateTime: null,
      }
    };
  },
  onLoad({id, title, compositionLabel}) {
    this.id = id;
    this.title = title;
    this.compositionLabel = compositionLabel;
    this.network().getChallengeCompositionList();
  },
  methods: {
    network() {
      return {
        getChallengeCompositionList: async () => {
          const res = await getChallengeCompositionList({compositionLibraryId: this.id});
          this.challengeData = res.data.result
        }
      }
    }
  },
}
</script>

<style lang="scss">
.top-content-box {
  border-radius: 20rpx;
  overflow: hidden;

  .top-content {
    margin-top: -15rpx;
    width: 670rpx;
    line-height: 40rpx;
    padding: 60rpx 50rpx 50rpx 70rpx;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.38) 100%);
    position: relative;

    .tags {
      position: absolute;
      left: -50rpx;
      top: 20rpx;
      transform: rotate(-45deg);
      width: 220rpx;
      height: 50rpx;
      color: #DC0C0C;
      background: #FFDCDC;
    }
  }
}

.content-box {
  width: 670rpx;
  border-radius: 20rpx;
  opacity: 1;
  background: #FFFFFF;
}

.person-box {
  border-bottom: 1px solid #E5E5E5;
  padding: 20rpx 0;

  .person {
    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
  }
  .collection {
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
.content-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 40rpx;
  // 首行缩进
  text-indent: 2em;
  color: #7C6E6E



;
}

</style>
