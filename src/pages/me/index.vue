<template>
  <view class="pb-5">
    <cy-navbar>
      <view class="t-size-30">小礼AI极简英语</view>
    </cy-navbar>
    <view class="px-4 mt-5">
      <!-- 会员信息 -->
      <view
        class="user-box flex align-item-center justify-content-between border-box px-3"
      >
        <view class="flex align-item-center">
          <viwe
            class="mr-2 user-img-box flex align-item-center justify-content-center"
          >
            <u-icon
              size="40"
              color="#8a8a8a"
              v-if="!userInfo.memberNo"
              name="account"
            ></u-icon>
            <image
              v-else
              :src="userInfo.avatar"
              mode="widthFix"
              class="user-img"
            ></image>
          </viwe>
          <view
            v-if="!userInfo.memberNo"
            class="t-color-3D3D3D"
            @click="loginInfo"
            >点击登录</view
          >
          <view
            v-else
            class="ml-3"
            @click="$navigateTo('/pages/me/personInfo')"
          >
            <view class="t-size-32 t-color-3D3D3D flex align-item-center">
              <view>{{ userInfo.nickName || "小礼AI" }}</view>
              <image
                :src="`${imageBaseUrl}/icon_6.png`"
                mode="widthFix"
                class="user-write mt-1 ml-1"
              ></image>
            </view>
            <view class="t-size-24 t-color-8A8A8A mt-1"
              >会员ID: {{ userInfo.memberNo || "" }}</view
            >
            <view v-if="isVipExpired != -1">
              <view
                class="t-size-24 t-color-8A8A8A mt-05 flex align-item-center"
              >
                <image
                  :src="`${imageBaseUrl}/${
                    isVipExpired === 0 ? '8-19-01.png' : '8-19-02.png'
                  }`"
                  mode="widthFix"
                  class="vipExpired mr-1"
                ></image>
                <span v-if="isVipExpired === 0" class="t-color-ED7E1F"
                  >会员有效期至{{ userInfo.vipExpireDate }}</span
                >
                <span v-else>会员已过期</span>
              </view>
            </view>
          </view>
        </view>
        <view @click="$navigateTo('/pages/me/setting')">
          <image
            :src="`${imageBaseUrl}/new_icon5.png`"
            mode="widthFix"
            class="setting-img"
          ></image>
        </view>
      </view>

      <!-- 会员中心框 -->
      <view
        v-if="isShowPayCenter"
        :style="userCenterBoxStyle"
        class="user-center-box flex align-item-center justify-content-between border-box"
      >
        <view class="">
          <view class="flex align-item-center">
            <image
              :src="`${imageBaseUrl}/icon_11.png`"
              mode="widthFix"
              class="user-center-img"
            ></image>
            <view class="user-center-text ml-2">会员中心</view>
          </view>
          <view class="mt-2 t-size-24 user-center-desc">
            开通VIP立享所有权益
          </view>
        </view>
        <view
          v-if="osName === 'android' || iosPayWay == 0"
          class="user-center-btn t-color-fff flex align-item-center justify-content-center t-size-24"
          @click="$navigateTo('/pages/me/userCenter')"
        >
          立享优惠
        </view>
        <view
          v-else
          @click="changeMpuser"
          class="user-center-btn t-color-fff flex align-item-center justify-content-center t-size-24 position-relative"
        >
          立享优惠
          <view v-if="ifWxmpUser" class="share-btn">
            <button open-type="contact">优惠</button>
          </view>
        </view>
      </view>

      <!-- 操作列表框 -->
      <view v-if="isShowOther" class="person-info-box pb-4 mt-4">
        <view
          class="flex align-item-center justify-content-between pt-3 mt-1 position-relative px-4"
          :class="item.noPartner ? 'person-item pb-4 18' : 'person-border pb-4'"
          v-for="(item, index) in menuList"
          :key="index"
          @click="toPage(index)"
        >
          <view v-if="index === 0 && item.noPartner" class="share-btn">
            <button
              v-if="userInfo.distributionType != 0"
              open-type="getPhoneNumber"
              @getphonenumber="getPhone($event, '/pages/me/apply/cooperative')"
            >
              >客服
            </button>
          </view>
          <view v-if="index === 2" class="share-btn">
            <button open-type="contact">客服</button>
          </view>
          <view v-if="index === 3" class="share-btn">
            <button open-type="share">分享</button>
          </view>
          <view class="flex align-item-center" v-if="item.noPartner">
            <image
              :src="`${imageBaseUrl}/${item.image}`"
              class="ml-1"
              mode="widthFix"
            ></image>
            <view class="ml-5 noPartner-title">{{ item.title }}</view>
          </view>
          <view class="flex align-item-center" v-else>
            <image
              :src="`${imageBaseUrl}/${item.image}`"
              class="ml-1"
              mode="widthFix"
            ></image>
            <view class="ml-6">{{ item.title }}</view>
          </view>
          <view class="flex align-item-center">
            <view class="ml-2">
              <u-icon name="arrow-right" color="#8A8A8A" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="flex align-item-center justify-content-center">
      <image
        :src="`${imageBaseUrl}/8-21-01.png`"
        mode="widthFix"
        class="notes"
      ></image>
    </view>

    <view class="version-box flex align-item-center justify-content-center">
      版本号：{{ version }}
    </view>

    <cy-tabbar :currentActive="1"></cy-tabbar>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin.js";
import store from "@/store/";
import { sendCustomMessage } from "@/api/me";

export default {
  mixins: [MyMixin],
  data() {
    return {
      currentPage: 1,

      menuList: [
        { title: "申请成为合作商", image: "8-13-04.png", noPartner: true },
        // { title: '分销中心', image: 'icon_7.png' },
        { title: "卡密激活", image: "icon_8.png" },
        { title: "联系客服", image: "icon_9.png" },
        { title: "邀请好友", image: "icon_10.png" },
      ],

      userInfo: {},
      deviceBrand: "android",
      osName: "android",
      isShowPayCenter: false,
      isShowOther: false,
      version: "",
      ifWxmpUser: false,
      iosPayWay: 0,
    };
  },
  // 深度监听userInfo
  watch: {
    userInfo: {
      handler: function (val) {
        if (val) {
          if (val.distributionType) {
            this.menuList[0] = {
              title: "分销中心",
              image: "icon_7.png",
            };
          } else {
            this.menuList[0] = {
              title: "申请成为合作商",
              image: "8-13-04.png",
              noPartner: true,
            };
          }
        }
      },
      deep: true,
    },
  },
  computed: {
    userCenterBoxStyle() {
      return `background: url(${this.imageBaseUrl}/img_17.png) no-repeat center center; background-size: cover;`;
    },
    // 会员是否过期
    isVipExpired() {
      // 0: 未过期 1: 已过期 -1: 未开通
      // 时间格式 vipExpireDate: "2028-04-29"
      if (this.userInfo.vipExpireDate) {
        var vipExpireDate = new Date(this.userInfo.vipExpireDate).getTime();
        var now = new Date().getTime();
        if (vipExpireDate < now) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return -1;
      }
    },
  },
  onLoad({ promoCode }) {
    if (promoCode) {
      uni.setStorageSync("promoCode", promoCode);
    }
    this.getSystemInfo();
  },
  onShow() {
    // 如果token存在，就获取用户信息
    var isAuthPhone = uni.getStorageSync("isAuthPhone");
    if (store.state.token && isAuthPhone) {
      this.getUserInfo().then((data) => {
        this.userInfo = data;
        this.ifWxmpUser = data.ifWxmpUser;
      });
    }
    this.initData();
  },
  onShareAppMessage() {
    const SRC = `pages/index/index?promoCode=${this.userInfo.promoCode}`;
    const path = ``;
    // 来自页面内分享按钮
    return {
      title: "小礼AI极简英语",
      path: `${SRC}${path}`,
      imageUrl: `${this.imageBaseUrl}/9-07-01.png`,
    };
  },
  methods: {
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          // this.deviceBrand = res.platform;
          this.osName = res.osName;
        },
      });
    },
    loginInfo() {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    },
    initData() {
      this.userInfo = store.state.userInfo;

      var basicData = uni.getStorageSync("basicData");
      if (basicData) {
        this.version = basicData.version;
        var iosPay = basicData.iosPay;
        this.iosPayWay = basicData.iosPayWay;
        var wxappCheck = basicData.wxappCheck;
        // this.isShowOther = !wxappCheck;
        // if (this.deviceBrand === "android") {
        //   this.isShowPayCenter = !wxappCheck;
        // } else {
        //   if (!wxappCheck) this.isShowPayCenter = iosPay;
        // }

        if (!iosPay) {
          if (this.osName === "ios") {
            this.isShowPayCenter = false;
          } else {
            if (wxappCheck) this.isShowPayCenter = false;
            else this.isShowPayCenter = true;
          }
        }
        if (wxappCheck) {
          this.isShowPayCenter = false;
          this.isShowOther = false;
        } else {
          this.isShowPayCenter = true;
          this.isShowOther = true;
        }
      }
    },
    toPage(index) {
      if (index == 0) {
        if (this.userInfo.distributionType == 0) {
          uni.showToast({
            title: "申请已提交，请耐心等待平台审核",
            icon: "none",
          });
        } else if (this.menuList[index].noPartner) {
        } else {
          this.$navigateTo("/pages/me/distribution");
        }
      }
      if (index == 1) this.$navigateTo("/pages/me/cardConversion");
    },
    async changeMpuser() {
      //请求接入客服消息后再修改ifWxmpUser
      await sendCustomMessage();
      this.getUserInfo().then((data) => {
        this.ifWxmpUser = data.ifWxmpUser;
        if (this.ifWxmpUser) return;
        uni.navigateTo({ url: "/pages/word/authorization?type=pay" });
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f5f9ff;
}

.user-box {
  height: 152rpx;
  border-radius: 10rpx;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;

  .user-write {
    width: 34rpx;
    height: 34rpx;
  }

  .user-img-box {
    background: #d8d8d8;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    overflow: hidden;
  }

  .user-img {
    width: 80rpx;
    height: 80rpx;
  }

  .setting-img {
    width: 30rpx;
    height: 30rpx;
  }
}

.user-center-box {
  height: 200rpx;
  margin-top: 40rpx;
  border-radius: 10rpx;
  padding-left: 60rpx;
  padding-right: 50rpx;

  .user-center-img {
    width: 40rpx;
    height: 40rpx;
  }

  .user-center-text {
    font-family: Source Han Sans;
    font-size: 32rpx;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    font-feature-settings: "kern" on;
    background: linear-gradient(106deg, #e99544 14%, #592b00 79%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .user-center-desc {
    color: #a59789;
  }

  .user-center-btn {
    width: 210rpx;
    height: 60rpx;
    border-radius: 156rpx;
    background: #db7716;
  }
}

.person-info-box {
  border-radius: 30rpx;
  font-size: 30rpx;

  .person-item {
    background: linear-gradient(
      90deg,
      #ffffff 56%,
      rgba(255, 255, 255, 0) 100%
    );
    position: relative;
    color: #1863e5;

    image {
      position: absolute;
      left: 0rpx;
      width: 120rpx;
      height: 120rpx;
    }

    .noPartner-title {
      margin-left: 114rpx;
    }
  }

  .person-border {
    border-bottom: 1rpx solid rgba(216, 216, 216, 0.5);
  }

  image {
    width: 40rpx;
    height: 40rpx;
  }
}

.version-box {
  width: 750rpx;
}

.share-btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
}

.vipExpired {
  width: 30rpx;
  height: 30rpx;
}

.notes {
  width: 700rpx;
}
</style>
