<template>
  <view class="body" :style="bodyStyle">
    <cy-navbar showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">申请成为合作商</view>
    </cy-navbar>

    <view class="content">
      <view class="username-title ml-2">
        <span class="t-color-DC0C0C t-size-32 must-icon">*</span>
        <span class="font-weight-bold t-size-36 ml-2">姓名</span>
      </view>
      <view class="username-box mt-2 flex align-item-center px-4">
        <input v-model="params.realname" class="flex-1" type="text" placeholder="请输入姓名"/>
      </view>

      <view class="username-title ml-2 mt-10">
        <span class="t-color-DC0C0C t-size-32 must-icon">*</span>
        <span class="font-weight-bold t-size-36 ml-2">手机号</span>
      </view>
      <view class="username-box mt-2 flex align-item-center px-4">
        <input v-model="params.phone" disabled class="flex-1" type="number" placeholder="手机号"/>
      </view>

      <view class="footer ml-5 mt-7">
        <view class="select">
          <view @click="isAuthorize = !isAuthorize"
                class="circle flex align-item-center justify-content-center"
                :class="isAuthorize ? 'c-active' : ''">
            <u-icon v-if="isAuthorize" name="checkbox-mark" size="20" color="#FFFFFF"></u-icon>
          </view>
        </view>
        <span class="ml-2 t-color-8A8A8A">阅读并同意</span>
        <span class="text" @click="toUserPage(4, '用户推广协议')">《用户推广协议》</span>
      </view>

      <view class="flex align-item-center justify-content-center">
        <view class="btn-box flex align-item-center justify-content-center t-size-32 t-color-fff" @click="partnerApply">
            立即申请
        </view>
      </view>
    </view>

    <u-modal
      :width="550"
      :mask-close-able="true"
      :show-confirm-button="false"
      :show-title="false"
      v-model="showModel">
      <view class="slot-content">
        <view class="t-color-8A8A8A t-size-30 review">已阅读并同意《用户推广协议》</view>
        <view class="flex align-item-center justify-content-around t-size-24 font-weight-bold mt-4">
          <view class="t-color-8A8A8A" @click="showModel = false">不同意</view>
          <view @click="clickAllow"
                class="t-color-fff allow flex align-item-center justify-content-center">
            同意并申请
          </view>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
import MyMixin from "../../../utils/MyMixin";
import {partnerApply} from "../../../api/me";

export default {
  mixins: [MyMixin],
  data() {
    return {
      isAuthorize: false,
      params: {
        realname: '',
        phone: ''
      },
      showModel: false,
      message: '',
      messageDate: ''
    };
  },
  computed: {
    bodyStyle() {
      return  `background-image: url(${this.imageBaseUrl}/8-13-03.png);
              background-size: 100% 100%;`
    }
  },
  onLoad() {
    this.params.phone = uni.getStorageSync("userPhone");
  },
  methods: {
    toUserPage(type, title) {
      uni.navigateTo({
        url: `/pages/me/content?type=${type}&title=${title}`
      })
    },
    clickAllow() {
      this.isAuthorize = true;
      this.showModel = false;
      this.partnerApply();
    },
    partnerApply() {
      if (!this.params.realname) {
        return uni.showToast({
          title: '请输入姓名',
          icon: 'none',
          duration: 1500
        });
      }
      if (!this.params.phone) {
        return uni.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 1500
        });
      }

      if (!this.isAuthorize) {
        return this.showModel = true;
      }

      partnerApply(this.params).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.message = res.data.message
          this.messageDate = res.data.result
          uni.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 1500
          });
          setTimeout(() => {
            this.$navigateTo(`/pages/me/apply/applySuccess?message=${this.message}&messageDate=${this.messageDate}`);
          }, 1500);
        }
      });
    }
  },
}
</script>

<style lang="scss">
.body {
  min-height: 100vh;
}

.content {
  padding: 120rpx 70rpx 0 70rpx;

  .username-title {

  }

  .username-box {
    height: 100rpx;
    border-radius: 30rpx;
    background: #ffffff;
  }
}

.must-icon {
  margin-top: -10rpx;
  position: absolute;
}

.footer {
  display: flex;
  justify-content: flex-start;

  img {
    width: 32rpx;
    height: 32rpx;
  }

  p {
    color: #999999;
    font-size: 24rpx;
  }

  .text {
    color: #1863E5;
    font-size: 24rpx;
  }
}
.slot-content {
  padding: 40rpx;

  .review {
    line-height: 40rpx;
  }

  .allow {
    background: #2b55a0;
    width: 200rpx;
    height: 64rpx;
    border-radius: 30rpx;
  }
}
.circle {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 1rpx solid #8A8A8A;
  margin-top: 4rpx;
}

.c-active {
  background: #3A73D9;
  border: 1rpx solid #3A73D9;
}

.btn-box {
  width: 450rpx;
  height: 80rpx;
  border-radius: 50rpx;
  background: #3A73D9;
  margin-top: 150rpx;
}
</style>
