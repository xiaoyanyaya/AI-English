<template>
  <view class="pt-5">
    <cy-navbar show-back>
      <view class="t-size-30">分销中心</view>
    </cy-navbar>

    <view class="px-4">
      <view class="flex align-item-center user-info px-3 pt-3 pb-3 pl-1">
        <view class="flex justify-content-between align-item-center w-100">
          <view class="flex">
            <view class="mr-4 mt-1">
              <image
                :src="
                  userInfo.avatar
                    ? userInfo.avatar
                    : `${imageBaseUrl}/icon_11.png`
                "
                mode="widthFix"
                class="avatar"
              />
            </view>
            <view class="flex flex-direction-column justify-content-center">
              <view class="t-color-3D3D3D mb-1">{{ userInfo.nickName }}</view>
              <view class="t-size-24 t-color-8A8A8A">{{ userInfo.title }}</view>
            </view>
          </view>
          <view
            class="qrcode-box flex align-item-center justify-content-center mr-1"
            @click="clickQrCode"
          >
            <image :src="`${imageBaseUrl}/11-4-01.png`" mode="widthFix" />
            <view class="t-size-24 ml-1">推广码</view>
          </view>
        </view>
      </view>

      <view
        class="mt-4 my-promotion flex flex-direction-column justify-content-between"
      >
        <view
          class="price px-4 pt-3 pb-3 flex align-item-center justify-content-between"
        >
          <view class="flex flex-direction-column justify-content-start">
            <view class="font-weight-bold t-size-36 t-color-DC0C0C"
              >{{ userInfo.canWithdrawAmount }}
            </view>
            <view class="t-size-24 mt-1 t-color-3D3D3D">可提现佣金(元)</view>
          </view>
          <view
            class="withdraw flex align-item-center t-size-24 justify-content-center t-color-fff"
            @click="toPrice"
          >
            申请提现
          </view>
        </view>
        <view
          class="record px-3 flex align-item-center justify-content-between"
        >
          <view class="t-size-24 t-color-9F9F9F pl-1">
            冻结佣金 {{ userInfo.freezeAmount }}
          </view>
          <view class="flex align-item-center">
            <image
              :src="`${imageBaseUrl}/icon_12.png`"
              mode="widthFix"
              class="mr-2 ml-1"
            />
            <view class="t-color-8A8A8A t-size-24 mr-4">提现记录</view>
          </view>
        </view>
      </view>

      <view class="content-menu mt-4 pr-1 pb-1">
        <view
          class="item flex justify-content-center align-item-center"
          :class="index === 3 ? 'mr-3' : ''"
          @click="toPage(0, index)"
          v-for="(item, index) in contentMenuList"
          :key="index"
        >
          <image
            class="mr-3 mt-1"
            :src="`${imageBaseUrl}/${item.image}`"
            mode="widthFix"
          />
          <view
            class="flex flex-direction-column justify-content-center pt-3 pb-3"
          >
            <view class="t-size-24 t-color-3D3D3D mt-2">{{ item.title }}</view>
            <view class="t-size-24 t-color-8A8A8A mt-1"
              >{{ item.subTitle }}
            </view>
          </view>
        </view>
      </view>

      <view class="person-info-box px-4 pb-4 mt-4">
        <view
          class="flex align-item-center justify-content-between pt-4 mt-1 position-relative"
          v-for="(item, index) in menuList"
          :key="index"
          @click="toPage(1, index)"
        >
          <view class="flex align-item-center">
            <image
              :src="`${imageBaseUrl}/${item.image}`"
              class="ml-1"
              mode="widthFix"
            ></image>
            <view class="ml-3 t-size-28">{{ item.title }}</view>
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

      <!--   推广码popup   -->
      <view class="popup" v-if="showQrCode">
        <view
          class="popup-content flex flex-direction-column align-item-center pb-3"
        >
          <view
            class="flex justify-content-between align-item-center title-box"
            style="width: 100%"
          >
            <view></view>
            <view class="t-size-32 title font-weight-bold">推广码</view>
            <view
              class="t-size-30 mr-4 pl-2 pr-2 pt-2 pb-2"
              @click="showQrCode = false"
            >
              <u-icon name="close" color="#FFFFFF" size="30"></u-icon>
            </view>
          </view>
          <view class="flex justify-content-center mt-5 qrcode mb-3">
            <image :src="qrCodeUrl" mode="widthFix" class="mt-3" />
          </view>
          <view
            @click="downloadQrcode"
            class="flex justify-content-center align-item-center t-color-fff mt-3 download-box"
          >
            <image
              :src="`${imageBaseUrl}/11-4-02.png`"
              class="download-img"
              mode="widthFix"
            />
            <view class="t-size-26 ml-2">下载</view>
          </view>
        </view>
      </view>

      <!--      <view class="flex justify-content-center mt-5">
        <text class="text-center t-color-2D6CDA agreement" @click="toUserPage(4, '用户推广协议')">《用户推广协议》</text>
      </view>-->
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import { commissionIndex } from "@/api/me";
import store from "@/store";
import { promoQRCode } from "../../api/me";

export default {
  mixins: [MyMixin],
  data() {
    return {
      contentMenuList: [
        {
          title: "直销佣金",
          image: "8-13-08.png",
          subTitle: "",
        },
        {
          title: "下级合作伙伴",
          image: "8-13-09.png",
          subTitle: "",
        },
        {
          title: "直销用戶",
          image: "8-13-10.png",
          subTitle: "",
        },
        {
          title: "直销订单",
          image: "8-13-11.png",
          subTitle: "",
        },
      ],
      // 邀请码
      qrCodeUrl: "",
      showQrCode: false,
      menuList: [{ title: "邀请好友", image: "8-13-12.png" }],
      userInfo: {},
      osName: "ios",
    };
  },
  onShareAppMessage(res) {
    var promoCode = store.state.userInfo.promoCode;
    const SRC = `pages/index/index?promoCode=${promoCode}`;
    const path = ``;
    // 来自页面内分享按钮
    if (res.from === "button") {
      return {
        title: "小礼AI极简单词",
        path: `${SRC}${path}`,
        imageUrl: `${this.imageBaseUrl}/10-19.png`,
      };
    } else {
      return {
        title: "小礼AI极简单词",
        path:
          "pages/index/index?promoCode=" + this.$store.state.userInfo.promoCode,
      };
    }
  },
  onLoad() {
    console.log("eeeeeeeeeeeeeeee");

    this.commissionIndex();
    this.promoQRCode();
    uni.getSystemInfo({
      success: (res) => {
        this.osName = res.osName;
      },
    });
  },
  methods: {
    clickQrCode() {
      this.showQrCode = true;
      uni.getSetting({
        success: (res) => {
          console.log("授权情况", res.authSetting);
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            uni.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                console.log("授权成功");
              },
              fail: () => {
                uni.showModal({
                  title: "提示",
                  content: "请授权保存图片到相册",
                  success: (res) => {
                    if (res.confirm) {
                      uni.openSetting();
                    }
                  },
                });
              },
            });
          }
        },
      });
    },
    promoQRCode() {
      promoQRCode().then((res) => {
        this.qrCodeUrl = res.data.result;
      });
    },
    downloadQrcode() {
      let _this = this;
      uni.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            uni.authorize({
              scope: "scope.writePhotosAlbum",
              success(res) {
                uni.showToast({
                  title: "授权成功",
                  icon: "none",
                  duration: 2200,
                });
                _this.onSavePhoto();
              },
              fail() {
                uni.showModal({
                  content: "检测到您没打开相册功能权限，是否去设置打开？",
                  confirmText: "确认",
                  cancelText: "取消",
                  success: (res) => {
                    if (res.confirm) {
                      uni.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.writePhotosAlbum"]) {
                            _this.onSavePhoto();
                          } else {
                            //用户未同意保存图片权限
                          }
                        },
                        fail: (err) => {
                          console.log(err);
                        },
                      });
                    } else {
                      uni.showToast({
                        title: "获取授权相册授权失败",
                        icon: "none",
                        success: function () {
                          uni.navigateBack();
                        },
                      });
                    }
                  },
                });
              },
            });
          } else {
            _this.onSavePhoto();
          }
        },
        fail() {
          uni.showToast({
            title: "获取授权相机授权失败",
            icon: "none",
            success: function () {
              uni.navigateBack();
            },
          });
        },
      });
    },
    onSavePhoto() {
      // #ifdef MP-WEIXIN
      let _this = this;
      uni.showLoading({
        title: "保存中",
      });
      uni.getImageInfo({
        src: _this.qrCodeUrl,
        success: function (e) {
          var filePathNew =
            wx.env.USER_DATA_PATH + "/" + new Date().valueOf() + "." + e.type;
          uni.downloadFile({
            url: _this.qrCodeUrl, //仅为示例，并非真实的资源
            filePath: filePathNew,
            success: (res) => {
              if (res.statusCode === 200) {
                uni.saveImageToPhotosAlbum({
                  filePath: filePathNew,
                  success: function () {
                    uni.showToast({
                      title: "保存到相册成功",
                      icon: "none",
                      duration: 2200,
                    });
                    _this.showQrCode = false;
                    uni.hideLoading();
                  },
                  fail: function (err) {
                    console.log("saveImageToPhotosAlbum() fail ", err);
                    _this.showQrCode = false;
                    uni.hideLoading();
                  },
                });
              }
            },
          });
        },
        complete: function (e) {
          console.log("getImageInfo", e.path);
        },
      });
      // #endif
    },
    toUserPage(type, title) {
      uni.navigateTo({
        url: `/pages/me/content?type=${type}&title=${title}`,
      });
    },
    commissionIndex() {
      commissionIndex().then((res) => {
        console.log(res.data.result);
        this.userInfo = res.data.result;
        this.contentMenuList[0].subTitle = res.data.result.totalAmount + "元";
        // this.contentMenuList[1].subTitle = res.data.result.directPromoters + '人'
        this.contentMenuList[1].subTitle =
          res.data.result.directPartners + "人";
        this.contentMenuList[2].subTitle =
          res.data.result.directReferrals + "人";
        this.contentMenuList[3].subTitle =
          res.data.result.promotionOrders + "笔";
      });
    },
    toPrice() {
      this.$navigateTo(
        "/pages/me/withdraw?canWithdrawAmount=" +
          this.userInfo.canWithdrawAmount
      );
    },
    toPage(type, index) {
      if (type === 0) {
        switch (index) {
          case 0:
            this.$navigateTo("/pages/me/mingxi");
            break;
          case 1:
            this.$navigateTo("/pages/me/agent?paegType=0");
            break;
          case 2:
            this.$navigateTo("/pages/me/directThrust");
            break;
          case 3:
            this.$navigateTo("/pages/me/order");
            break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f5f9ff;
}

.user-info {
  border-radius: 10rpx;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }

  .qrcode-box {
    border: 1rpx solid #3a73d9;
    width: 170rpx;
    height: 54rpx;
    border-radius: 25rpx;
    color: #3a73d9;

    image {
      width: 26rpx;
      height: 26rpx;
    }
  }
}

.my-promotion {
  border-radius: 30rpx;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;

  .withdraw {
    padding: 12rpx 40rpx;
    border-radius: 50rpx;
    background: #5ed063;
    box-shadow: 0px 0px 10rpx 0px #d8d8d8;
  }

  .record {
    height: 70rpx;
    opacity: 1;
    border-top: 1rpx solid rgba(216, 216, 216, 0.2);

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
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;

  .item {
    image {
      width: 60rpx;
      height: 60rpx;
    }
  }
}

.person-info-box {
  border-radius: 30rpx;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;
  font-size: 10rpx;

  image {
    width: 40rpx;
    height: 40rpx;
  }
}

.agreement {
  border-bottom: 1px solid #2d6cda;
}

.share-btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e8f2ff;
    border-radius: 20rpx;
    width: 80%;
    overflow: hidden;

    .title-box {
      color: #ffffff;
      height: 80rpx;
      opacity: 0.9;
      background: linear-gradient(180deg, #6ab3f8 0%, #1863e5 100%);

      .title {
        margin-left: 90rpx;
      }
    }

    .qrcode {
      width: 80%;
      height: 440rpx;
      border-radius: 40rpx;
      background: #ffffff;

      image {
        width: 75%;
        height: 75%;
      }
    }

    .download-box {
      width: 350rpx;
      height: 65rpx;
      border-radius: 50rpx;
      background: #3a73d9;

      .download-img {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }
}
</style>
