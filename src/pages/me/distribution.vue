<template>
  <view class="pt-5">
    <cy-navbar show-back>
      <view class="t-size-30">分销中心</view>
    </cy-navbar>

    <view class="px-4">
      <view class="flex align-item-center user-info px-3 pt-3 pb-3 pl-1">
        <view class="mr-4 mt-1">
          <image :src="userInfo.avatar ? userInfo.avatar : `${imageBaseUrl}/icon_11.png`"
                 mode="widthFix" class="avatar"/>
        </view>
        <view class="flex flex-direction-column justify-content-center">
          <view class="t-color-3D3D3D mb-1">{{ userInfo.nickName }}</view>
          <view class="t-size-24 t-color-8A8A8A">{{ userInfo.title }}</view>
        </view>
      </view>

      <view class="mt-4 my-promotion flex flex-direction-column justify-content-between">
        <view class="price px-4 pt-3 pb-3 flex align-item-center justify-content-between">
          <view class="flex flex-direction-column justify-content-start">
            <view class="font-weight-bold t-size-36 t-color-DC0C0C">{{ userInfo.canWithdrawAmount }}</view>
            <view class="t-size-24 mt-1 t-color-3D3D3D">可提现佣金(元)</view>
          </view>
          <view class="withdraw flex align-item-center t-size-24 justify-content-center t-color-fff" @click="toPrice">
            申请提现
          </view>
        </view>
        <view class="record px-3 flex align-item-center justify-content-end">
          <image :src="`${imageBaseUrl}/icon_12.png`" mode="widthFix" class="mr-2 ml-1"/>
          <view class="t-color-8A8A8A t-size-24 mr-4">提现记录</view>
        </view>
      </view>

      <view class="content-menu mt-4 pr-1 pb-1">
        <view class="item flex justify-content-center align-item-center"
              :class="index === 3 ? 'mr-3' : ''"
              @click="toPage(0, index)"
              v-for="(item, index) in contentMenuList" :key="index">
          <image class="mr-3 mt-1" :src="`${imageBaseUrl}/${item.image}`" mode="widthFix"/>
          <view class="flex flex-direction-column justify-content-center pt-3 pb-3">
            <view class="t-size-24 t-color-3D3D3D mt-2">{{ item.title }}</view>
            <view class="t-size-24 t-color-8A8A8A mt-1">{{ item.subTitle }}</view>
          </view>
        </view>
      </view>

      <view class="person-info-box px-4 pb-4 mt-4">
        <view class="flex align-item-center justify-content-between pt-4 mt-1 position-relative"
              v-for="(item, index) in menuList" :key="index"
              @click="toPage(1, index)">
          <view class="flex align-item-center">
            <image :src="`${imageBaseUrl}/${item.image}`" class="ml-1" mode="widthFix"></image>
            <view class="ml-3 t-size-28">{{item.title}}</view>
          </view>
          <view class="flex align-item-center">
            <view class="ml-2">
              <u-icon name="arrow-right" color="#8A8A8A" size="28"></u-icon>
            </view>
          </view>

          <view v-if="index === 0" class="share-btn">
            <button open-type="share">分享</button>
          </view>
        </view>
      </view>

      <view class="flex justify-content-center mt-5">
        <text class="text-center t-color-2D6CDA agreement ">《用户推广协议》</text>
      </view>
    </view>

  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import {commissionIndex} from "@/api/me";
import store from "@/store";

export default {
  mixins: [MyMixin],
  data() {
    return {
      contentMenuList: [{
        title: '直销佣金',
        image: '8-13-08.png',
        subTitle: ''
      },{
        title: '下级合伙人',
        image: '8-13-09.png',
        subTitle: ''
      },{
        title: '直销用戶',
        image: '8-13-10.png',
        subTitle: ''
      },{
        title: '直销订单',
        image: '8-13-11.png',
        subTitle: ''
      }],
      menuList: [
        { title: '邀请好友', image: '8-13-12.png' },
      ],
      userInfo: {}
    };
  },
  onShareAppMessage() {
    var promoCode = store.state.userInfo.promoCode;
    const SRC = `pages/index/index?promoCode=${promoCode}`;
    const path = ``;
    // 来自页面内分享按钮
    return {
      title: "小礼AI极简英语",
      path: `${SRC}${path}`,
      // imageUrl: `${this.imgDomain}wxapp/icon1.1/pic_visit.png`,
    };
  },
  onLoad() {
    this.commissionIndex();
  },
  methods: {
    commissionIndex() {
      commissionIndex().then(res => {
        console.log(res.data.result)
        this.userInfo = res.data.result
        this.contentMenuList[0].subTitle = res.data.result.totalAmount + '元'
        // this.contentMenuList[1].subTitle = res.data.result.directPromoters + '人'
        this.contentMenuList[1].subTitle = res.data.result.directPartners + '人'
        this.contentMenuList[2].subTitle = res.data.result.directReferrals + '人'
        this.contentMenuList[3].subTitle = res.data.result.promotionOrders + '笔'
      });
    },
    toPrice() {
      this.$navigateTo("/pages/me/withdraw?canWithdrawAmount=" + this.userInfo.canWithdrawAmount)
    },
    toPage(type, index) {
      if (type === 0) {
        switch (index) {
          case 0:
            this.$navigateTo("/pages/me/mingxi")
            break
          case 1:
            this.$navigateTo("/pages/me/agent?paegType=0")
            break
          case 2:
            this.$navigateTo("/pages/me/directThrust")
            break
          case 3:
            this.$navigateTo("/pages/me/order")
            break
        }
      }
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5F9FF;
}

.user-info {
  border-radius: 10rpx;
  opacity: 1;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }
}

.my-promotion {
  border-radius: 30rpx;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;

  .withdraw {
    padding: 12rpx 40rpx;
    border-radius: 50rpx;
    background: #5ED063;
    box-shadow: 0px 0px 10rpx 0px #D8D8D8;
  }

  .record {
    height: 70rpx;
    opacity: 1;
    border-top: 1rpx solid rgba(216,216,216,0.2);

    image {
      width: 30rpx;
      height: 30rpx;
      margin-top: 6rpx;
    }
  }
}

.content-menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;

  .item {
    image {
      width: 60rpx;
      height: 60rpx;
    }
  }
}

.person-info-box {
  border-radius: 30rpx;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
  font-size: 10rpx;

  image {
    width: 40rpx;
    height: 40rpx;
  }
}

.agreement {
  border-bottom: 1px solid #2D6CDA;
}

.share-btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
}
</style>
