<template>
  <view class="">
    <cy-navbar @customBack="returnCustom" customBack show-back>
      <view class="t-size-30">会员中心</view>
    </cy-navbar>

    <view class="px-4 mt-5">
      <view class="open-user-box px-4 pt-3 pb-5">
        <view class="flex pb-3">
          <view class="font-weight-bold t-size-26">开通VIP会员</view>
          <image
            class="customer ml-3"
            :src="`${imageBaseUrl}/8-19-01.png`"
            mode="widthFix"
          ></image>
        </view>

        <view class="package-grade">
          <view
            class="package-item flex flex-direction-column align-item-center"
            :class="{ active: item.isActive }"
            @click="selectPackage(index, item)"
            v-for="(item, index) in packageList"
            :key="index"
          >
            <view class="mt-2">{{ item.title }}</view>
            <view class="price mt-2">
              <text>￥</text>
              <text>{{ item.price }}</text>
            </view>
            <view v-if="item.marketPrice" class="oriPricee mt-1"
              >原价{{ item.marketPrice }}</view
            >
            <view
              class="time-box flex align-item-center justify-content-center t-color-3D3D3D t-size-20"
            >
              {{ item.note }}
            </view>
          </view>
        </view>

        <view class="desc-menu-box mt-3 px-2 pt-4">
          <view
            class="flex align-item-center t-size-24 pb-4"
            v-for="(item, index) in descMenu"
          >
            <view class="cricle flex align1-item-center justify-content-center">
              <u-icon name="checkbox-mark" color="#FFFFFF" size="22"></u-icon>
            </view>
            <view class="title ml-2">{{ item.title }}</view>
          </view>
        </view>

        <view class="mt-4 pay-desc">会员购买后不支持7天无理由退货</view>
      </view>

      <!--      <view class="why-box mt-6 flex align-item-center justify-content-around">
        <view class="left">
          <view class="text-center font-weight-bold">普通软件</view>
          <view class="flex ml-2 mr-2 mt-2 align-item-start">
            <u-icon name="close-circle" class="close-circle" color="#FFB546" size="28"></u-icon>
            <view class="ml-1">机械式的跟读，只能练出哑巴英语</view>
          </view>
          <view class="flex ml-2 mr-2 mt-2">
            <u-icon name="close-circle" class="close-circle" color="#FFB546" size="28"></u-icon>
            <view class="ml-1">枯燥的背诵记忆</view>
          </view>
        </view>
        <view class="right">
          <view class="text-center font-weight-bold title">小礼AI极简英语</view>
          <view class="flex ml-2 mr-2 mt-2 align-item-start">
            <u-icon name="close-circle" class="close-circle" color="#24A800" size="28"></u-icon>
            <view class="ml-1 c-24A800">机械式的跟读，只能练出哑巴英语</view>
          </view>
          <view class="flex ml-2 mr-2 mt-2">
            <u-icon name="close-circle" class="close-circle" color="#24A800" size="28"></u-icon>
            <view class="ml-1 c-24A800">枯燥的背诵记忆</view>
          </view>
        </view>
      </view>-->

      <view
        @click="showPayWay = true"
        class="pay-way mt-3 px-5 pt-5 pb-5 flex align-item-center justify-content-between"
      >
        <view class="t-color-3D3D3D">支付方式</view>
        <view class="flex align-item-center">
          <view class="t-color-8A8A8A">{{
            payWayList[payWay].title || "请选择"
          }}</view>
          <view class="ml-2">
            <u-icon name="arrow-right" color="#8A8A8A" size="28"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <view class="pay-price-box mt-1">
      <view class="flex align-item-center justify-content-between">
        <view class="flex align-item-center">
          <view class="t-size-26 t-color-3D3D3D mt-1">实付：</view>
          <view class="t-size-26 t-color-DC0C0C">
            <text class="t-size-28">￥</text>
            <text class="t-size-40 font-weight-bold">{{
              selectPackageData.price || 0
            }}</text>
          </view>
        </view>
        <view
          class="pay-btn flex align-item-center justify-content-center t-color-fff"
          @click="vipBuy"
        >
          确认协议并缴费
        </view>
      </view>

      <view class="flex mt-2 align-item-center justify-content-center">
        <view
          @click="isAgree = !isAgree"
          :class="['cricle2', isAgree ? 'isAgree' : 'noAgree']"
          class="flex align-item-center justify-content-center"
        >
          <u-icon
            v-if="isAgree"
            name="checkbox-mark"
            color="#FFFFFF"
            size="28"
          ></u-icon>
        </view>
        <view class="t-size-22 t-color-3D3D3D ml-2">
          已阅读并同意
          <text class="t-color-2D6CDA" @click="toPage(5, '购买协议')"
            >《购买协议》</text
          >
          &
          <text class="t-color-2D6CDA" @click="toPage(1, '隐私政策')"
            >《隐私政策》</text
          >
        </view>
      </view>
    </view>

    <u-popup v-model="showPayWay" mode="bottom">
      <view class="pay-way-box">
        <view class="px-4 pt-3 pb-3 flex align-item-center title">
          <u-icon
            name="arrow-left"
            color="iconcss"
            size="28"
            @click="showPayWay = false"
          ></u-icon>
          <view class="ml-5">选择支付方式</view>
        </view>
        <view style="height: 110rpx"></view>
        <view
          v-for="(item, index) in payWayList"
          :key="index"
          @click="clickPayWay(index)"
          class="flex align-item-center item-box"
        >
          <view>
            <image
              :src="`${imageBaseUrl}${item.image}`"
              mode="widthFix"
            ></image>
          </view>
          <view class="flex align-item-center ml-3 item-title">
            <view>{{ item.title }}</view>
            <view class="ml-2" v-if="item.isRecommend">推荐</view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import { vipBuy, vipPackage } from "@/api/me";
import { getPrepayPaymentResponse } from "../../api/me";
import { requestApi } from "@/jslibs/uRequest";
import store from "@/store";
export default {
  mixins: [MyMixin],
  data() {
    return {
      // 套餐
      packageList: [],
      descMenu: [
        {
          title: "独创弗兰克英语理念，颠覆性重塑学习方法",
        },
        {
          title: "融合AI技术，让英语学习智能、高效、有趣",
        },
        {
          title: "匹配全国英语教材新课改，轻松掌握提分秘籍",
        },
      ],
      payWayList: [
        /*{
        title: '支付宝',
        image: '/alipay.png',
        isRecommend: false
      }, */ {
          title: "微信支付",
          image: "/wechatpay.png",
          value: 1,
          isRecommend: true,
        },
      ],
      payWay: 0,
      // 选中的套餐
      selectPackageData: {},
      showPayWay: false,
      // 是否同意协议
      isAgree: true,
      paymentData: {
        orderNo: "",
        payWay: 1,
        amount: 0,
        description: "",
        orderType: "vip_order_applet",
        clientSource: "wxapp",
      },
      type: "",
    };
  },
  onLoad({ type }) {
    if (type) {
      this.type = type;
    }
    this.vipPackage();
  },
  methods: {
    returnCustom() {
      if (this.type) {
        uni.switchTab({
          url: "/pages/me/index",
        });
      } else {
        uni.navigateBack(1);
      }
    },
    toPage(type, title) {
      this.$navigateTo(`/pages/me/content?type=${type}&title=${title}`);
    },
    clickPayWay(index) {
      this.payWay = index;
      this.showPayWay = false;

      this.paymentData.payWay = this.payWayList[index].value;
    },
    selectPackage(index, item) {
      this.packageList.forEach((item, i) => {
        item.isActive = i === index;
      });
      this.selectPackageData = item;
    },
    vipPackage() {
      vipPackage().then((res) => {
        res.data.result.forEach((item) => {
          if (item.ifDefault === 1) {
            item.isActive = true;
            this.selectPackageData = item;
          } else {
            item.isActive = false;
          }
        });
        this.packageList = res.data.result;
      });
    },
    vipBuy() {
      var data = this.packageList.find((item) => item.isActive);
      if (!data) {
        uni.showToast({
          title: "请选择套餐",
          icon: "none",
        });
        return;
      }
      if (!this.isAgree) {
        uni.showToast({
          title: "请先同意协议",
          icon: "none",
        });
        return;
      }

      vipBuy({
        chargeVipId: data.id,
        payWay: "wxpay",
        clientSource: "wxapp",
      }).then((res) => {
        console.log(res);
        if (res.data.code !== 200) {
          uni.showToast({
            title: res.data.message,
            icon: "none",
          });
        } else {
          let { chargeVipId, orderNo, amount, description } = res.data.result;
          this.paymentData.orderNo = orderNo;
          this.paymentData.amount = amount;
          this.paymentData.description = description;
          this.getPrepayPaymentResponse();
        }
      });
    },
    getPrepayPaymentResponse() {
      let url = "/weixin/getH5PayNeedParam";
      requestApi({
        url,
        method: "post",
        data: this.paymentData,
        header: {
          "content-type": "application/json",
          "X-Sign": this.getSign(url, this.paymentData),
          "X-TIMESTAMP": this.getDateTimeToString(),
          "X-Access-Token": store.state.token,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          uni.showToast({
            title: res.message,
            icon: "none",
          });
        } else {
          this.requestPayment(res);
        }
      });
    },
    requestPayment(data) {
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: data.result.timeStamp,
        nonceStr: data.result.nonceStr,
        package: data.result.packageVal,
        signType: data.result.signType,
        paySign: data.result.paySign,
        success: function (res) {
          console.log("success:" + JSON.stringify(res));
          uni.navigateTo({
            url: "/pages/me/paySuccess",
          });
        },
        fail: function (err) {
          console.log("fail:" + JSON.stringify(err));
        },
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f5fbfd;
}

.open-user-box {
  border-radius: 30rpx;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;

  .customer {
    width: 30rpx;
    height: 30rpx;
    margin-top: 4rpx;
  }

  .package-grade {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20rpx;

    .package-item {
      height: 240rpx;
      border-radius: 10rpx;
      background: #ffffff;
      box-sizing: border-box;
      border: 2rpx solid #bfbfbf;
      position: relative;

      &.active {
        border: 2rpx solid #ffc187;
        background: #fff1e5;
      }

      .price {
        color: #dc0c0c;

        text:nth-child(1) {
          font-size: 24rpx;
        }

        text:nth-child(2) {
          font-size: 40rpx;
          fong-width: bold;
        }
      }

      .oriPricee {
        color: #bfbfbf;
        text-decoration: line-through;
        font-size: 22rpx;
      }

      .time-box {
        width: 137rpx;
        height: 34rpx;
        border-radius: 10rpx;
        background: #fcdbb9;
        position: absolute;
        bottom: 20rpx;
      }
    }
  }
}

.desc-menu-box {
  border-radius: 20rpx;
  background: #fff5ec;

  .title {
    color: #813f00;
  }
}

.pay-desc {
  color: #813f00;
}

.why-box {
  height: 267rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  background: linear-gradient(110deg, #e0f2ff 1%, #faf0f0 100%);
  box-shadow: 0px 0px 10px 0px #d8d8d8;

  .left {
    width: 50%;

    .close-circle {
      margin-top: 2rpx;
    }
  }

  .right {
    width: 50%;

    .title {
      color: #c00606;
    }

    .c-24A800 {
      color: #24a800;
    }
  }
}

.pay-way {
  border-radius: 30rpx;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;
}

.cricle {
  width: 34rpx;
  height: 34rpx;
  background: #ffb546;
  border-radius: 50%;
}

.cricle2 {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;

  &.isAgree {
    background: #2d6cda;
  }

  &.noAgree {
    border: 1px solid #c0c4cc;
  }
}

.pay-price-box {
  width: 750rpx;
  height: 201rpx;
  background: #ffffff;
  padding: 40rpx 70rpx 40rpx 70rpx;

  .pay-btn {
    width: 354rpx;
    height: 60rpx;
    border-radius: 348rpx;
    opacity: 1;
    background: #2d6cda;
  }
}

.pay-way-box {
  background: #ffffff;
  height: 500rpx;

  .title {
    position: fixed;
    top: 0;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #d8d8d8;
  }

  .iconcss {
    margin-top: 2rpx;
  }

  .item-box {
    image {
      width: 80rpx;
      height: 80rpx;
      margin-left: 50rpx;
    }

    .item-title {
      flex: 1;
      font-size: 26rpx;
      color: #3d3d3d;
      padding-bottom: 50rpx;
      margin-top: 50rpx;
      border-bottom: 1px solid #d8d8d8;

      view:nth-child(2) {
        color: #ffffff;
        background: #ff8817;
        font-size: 16rpx;
        padding: 2rpx 10rpx;
      }
    }
  }
}
</style>
