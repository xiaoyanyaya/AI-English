<template>
  <view class="pb-5 main-body">
    <cy-navbar showBack>
      <view class="t-size-30">挑战详情</view>
    </cy-navbar>

    <view class="mt-5 flex flex-direction-column align-item-center justify-content-center">
      <image :src="imageBaseUrl + '/logo.png'" class="avatar"></image>
      <view class="name t-size-40 font-weight-bold mt-5 t-color-3D3D3D">Jogn Doe</view>
      <view class="flex mt-3 align-item-center justify-content-around score-box">
        <view class="flex flex-direction-column align-item-center justify-content-center"
          v-for="(item, index) in scoreNumber" :key="index">
          <view class="font-weight-bold t-size-40"
                :style="{color: item.color}"
          >{{item.number}}</view>
          <view class="mt-2 t-color-BFBFBF">{{item.title}}</view>
        </view>
      </view>
    </view>

    <view class="px-4 mt-5">
      <view class="article px-3 pt-6 pb-3">
        <text>
          Dear Sir/Madam,
          I am glad to see your notice Volunteers Wanted. Some foreign students will visit Sans Temple this Sunday morning. I'm willing to be a volunteer.
          Let me introduce myself to you. I'm a middle school student aged 15. I'm an outgoing girl/boy who can always get on well with others. As for the time, I will be available this Sunday morning. My oral English is so excellent that I have no difficulty communicating with foreign friends. More importantly, I know a lot about Sansu culture. I'm sure I can help them have a better understanding of it.
          I believe I can manage it if you give me a chance. Please reply to me by Friday!
          Yours,
          Li Hua
        </text>
      </view>
    </view>

    <view class="flex align-item-center justify-content-center mt-5">
      <view class="collection-btn flex align-item-center justify-content-center">
        <view><u-icon name="star" color="#FFFFFF" size="50"></u-icon></view>
        <view class="t-size-32 ml-2 t-color-fff">收藏</view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
export default {
  mixins: [MyMixin],
  data() {
    return {
      scoreNumber: [{
        title: '挑战次数',
        color: '#3D3D3D',
        number: 0
      }, {
        title: '最高得分',
        color: '#DC0C0C',
        number: 98
      }]
    };
  }
}
</script>

<style lang="scss">
  .avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }

  .score-box {
    width: 585rpx;
    height: 150rpx;
    border-radius: 10rpx;
    background: #FFFFFF;
  }

  .article {
    border-radius: 10rpx;
    background: #FFFFFF;
  }

  .collection-btn {
    width: 420rpx;
    height: 100rpx;
    border-radius: 163rpx;
    opacity: 1;

    background: linear-gradient(180deg, #FFC876 0%, #D07412 100%);
  }

</style>
