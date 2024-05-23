<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack>
      <view class="t-size-30">挑战列表</view>
    </cy-navbar>

    <view class="px-4 mt-4 mb-5">
      <view class="top-content-box">
        <view class="top-content flex-direction-column flex align-item-center justify-content-center px-5">
          <view class="tags t-size-24 flex align-item-center justify-content-center">
            <text class="mr-4">{{ compositionLabel }}</text>
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

      <view v-show="challengeData.length > 0" class="content-box px-4 pb-2 mb-3" v-for="(item, index) in challengeData"
            @click="clickChallenge(item)"
            :key="index">
        <view class="flex justify-content-between align-item-start person-box">
          <div class="flex person">
            <view>
              <image class="avatar" :src="item.avatar"></image>
            </view>
            <view class="ml-3">
              <view class=" mb-1 t-size-30 font-weight-bold">{{ item.nickName }}</view>
              <view class="t-size-24 t-color-8A8A8A">{{ item.createTime }}</view>
            </view>
          </div>
          <div class="collection flex align-item-center"
               @click="network().addCompositionCollectOther(item, index)">
            <u-icon name="star-fill" class="t-size-32"
                    :class="item.compositionCollectStatus == 1 ? 't-color-fea831' : 't-color-d9d9d9'"></u-icon>
            <!--            <image class="iconfont" :src="`${imageBaseUrl}/3-22-04.png`"></image>-->
            <view class="ml-1 t-size-24 t-color-8A8A8A">收藏({{ item.favoritesTimes }})</view>
          </div>
        </view>
        <view class="mt-2 content-text">
          {{ item.compositionText }}
        </view>
      </view>
      <view class="flex align-item-center justify-content-center" v-show="challengeData.length < 1">
        <view class="t-line-32 t-color-818181" style="margin-top: 150rpx">未有挑战者，快来挑战吧!</view>
      </view>
    </view>
  </view>
</template>

<script>
import {getChallengeCompositionList, addCompositionCollectOther, deleteCompositionCollectOther} from "@/api/composition"
import myMixin from "@/utils/MyMixin";

export default {
  mixins: [myMixin],
  data() {
    return {
      id: '',
      title: '',
      compositionLabel: '',
      challengeData: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
      isMoreData: true,
    };
  },
  onLoad({id, title, compositionLabel}) {
    this.id = id;
    this.title = title;
    this.compositionLabel = compositionLabel;
    this.initData();
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.network().getChallengeCompositionList();
  },
  methods: {
    initData() {
      this.queryParams.pageNo = 1;
      this.challengeData = [];
      this.isMoreData = true;
      this.network().getChallengeCompositionList();
    },
    clickChallenge(item) {
      this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=6&id=${item.id}&pageTilte=作文详情&isShowTitle=1`);
    },
    network() {
      return {
        getChallengeCompositionList: async () => {
          if (!this.isMoreData) return;

          this.queryParams.compositionLibraryId = this.id;
          const res = await getChallengeCompositionList(this.queryParams);
          res.data.result.forEach(item => {
            item.compositionCorrect = item.compositionCorrect.replaceAll('<p>', '').replaceAll('</p>', '')
            item.compositionText = item.compositionText.replaceAll('\n', '<br/>')
            this.challengeData.push(item);
          })
          this.isMoreData = res.data.result.length === this.queryParams.pageSize;
        },
        addCompositionCollectOther: async (item, index) => {
          uni.showLoading({
            title: item.compositionCollectStatus === 1 ? '取消收藏中...' : '收藏中...',
            mask: true
          })
          var compositionCollectId = item.compositionCollectId
          var id = item.id
          setTimeout(() => {
            if (item.compositionCollectStatus === 1) {
              deleteCompositionCollectOther({
                compositionFavoritesId: id
              }).then(res => {
                console.log(res, "取消收藏")
                if (res.data.code === 200) {
                  uni.showToast({
                    title: '取消收藏成功',
                    icon: 'none'
                  })
                  this.$set(this.challengeData[index], 'compositionCollectStatus', 0);
                  this.$set(this.challengeData[index], 'favoritesTimes', this.challengeData[index].favoritesTimes - 1);
                } else {
                  uni.showToast({
                    title: '取消收藏失败',
                    icon: 'none'
                  })
                }
              })
            } else {
              addCompositionCollectOther({
                compositionFavoritesId: id
              }).then(res => {
                console.log(res, "收藏")
                if (res.data.code === 200) {
                  uni.showToast({
                    title: '收藏成功',
                    icon: 'none'
                  })
                  this.$set(this.challengeData[index], 'compositionCollectStatus', 1);
                  this.$set(this.challengeData[index], 'favoritesTimes', this.challengeData[index].favoritesTimes + 1);
                } else {
                  uni.showToast({
                    title: '收藏失败',
                    icon: 'none'
                  })
                }
              })
            }
            this.$forceUpdate();
          }, 500)
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
  line-height: 40rpx;
  // 首行缩进
  text-indent: 2em;
  color: #7C6E6E;
}

</style>
