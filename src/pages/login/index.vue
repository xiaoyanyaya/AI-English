<template>
  <div class="authorize">
    <div class="authorize-info">
      <div class="logo">
        <img :src="imageBaseUrl + '/logo.png'" />
      </div>
    </div>
    <div class="authorize-get">
      <div class="authorize-get-til">申请获取以下授权：</div>
      <div class="authorize-get-ul">
        <div class="authorize-get-li"><text>获得你的公开信息（昵称、头像等）</text></div>
        <div class="authorize-get-li"><text>获得你的联系方式</text></div>
      </div>
    </div>

    <div class="authorize-sub">
      <!-- @click="bindGetUserInfoTest" -->
      <button v-if="!isAuthPhone" class="btn-login bt" open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumberWx">授权登录</button>
      <button v-else class="btn-login bt" @click="loginInfo">授权登录</button>
      <button class="btn-nologin bt" @click="notLogin">暂不登录</button>
    </div>
    <div class="footer">
      <div class="select">
        <view  @click="isAuthorize = !isAuthorize"
          class="circle flex align-item-center justify-content-center"
        :class="isAuthorize ? 'c-active' : ''">
          <u-icon v-if="isAuthorize" name="checkbox-mark" size="20" color="#FFFFFF"></u-icon>
        </view>
      </div>
      <p>登录代表同意</p>
      <span class="text" @click="toUserPage(0, '用户协议')">《用户注册协议》</span>
      <p>&</p>
      <span class="text" @click="toUserPage(1, '隐私政策')">《隐私政策》</span>
    </div>

    <u-modal
      :width="550"
      :mask-close-able="true"
      :show-confirm-button="false"
      :show-title="false"
      v-model="showModel">
      <view class="slot-content">
        <view class="t-color-8A8A8A t-size-30 review">已阅读并同意《用户注册协议》《隐私政策》</view>
        <view class="flex align-item-center justify-content-around t-size-24 font-weight-bold mt-4">
          <view class="t-color-8A8A8A" @click="showModel = false">不同意</view>
          <view @click="clickAllow"
            class="t-color-fff allow flex align-item-center justify-content-center">
            同意并登录
          </view>
        </view>
      </view>
    </u-modal>

  </div>
</template>

<script>
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      isAuthorize: false,
      pagePath: '',
      showModel: false
    };
  },
  onLoad({pagePath}) {
    this.pagePath = pagePath;
  },
  methods: {
    clickAllow() {
      this.isAuthorize = true;
      this.showModel = false;
      this.loginInfo();
    },
    toUserPage(type, title) {
      uni.navigateTo({
        url: `/pages/me/content?type=${type}&title=${title}`
      })
    },
    toPage() {
      console.log("跳转嗷嗷", this.pagePath)
      if (this.pagePath) {
        // 特殊处理
        if (this.pagePath === '/pages/index/index') {
          uni.switchTab({
            url: '/pages/index/index'
          })
        } else if (this.pagePath === '/pages/me/index') {
          uni.switchTab({
            url: '/pages/me/index'
          })
        } else if (this.pagePath === '/pages/frank/index') {
          uni.switchTab({
            url: '/pages/frank/index'
          })
        } else {
          uni.redirectTo({
            url: this.pagePath
          })
        }
      } else {
        uni.switchTab({
          url: '/pages/frank/index'
        })
      }

      console.log("跳转执行")
    },
    async getPhoneNumberWx(res) {
      console.log("获取手机号登陆")
      if (!this.isAuthorize) {
        return this.showModel = true;
      }
      this.utils().$toast('登录中...', 'loading');

      const loginRes = await this.login();
      if (loginRes.data.code === 200) {
        this.utils().$toast('登录成功', 'success');
        this.getPhone(res, 'back').then((res) => {
          console.log("获取手机号登陆成功1")
          this.toPage();
        });
      }
    },
    async loginInfo() {
      if (!this.isAuthorize) {
        return this.showModel = true;
      }
      this.utils().$toast('登录中...', 'loading');

      const loginRes = await this.login();
      if (loginRes.data.code === 200) {
        this.utils().$toast('登录成功', 'success');
        this.toPage();
      }
    },
    notLogin() {
      // uni.navigateBack();
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  },
}
</script>


<style lang="scss" scoped>
.authorize {
  background-image: url('https://aien.xiaolixb.com/assets/s2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.authorize-info {
  padding: 0 50rpx;
  padding-top: 220rpx;
  display: flex;
  align-items: center;
  width: 100%;

  text-align: center;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 168rpx;
    height: 168rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.footer {
  display: flex;
  justify-content: flex-start;
  // padding: 0.5rem 0.5rem 0 0.5rem;
  position: fixed;
  bottom: 120rpx;
  left: 74rpx;

  img {
    width: 32rpx;
    height: 32rpx;
  }

  p {
    color: #999999;
    font-size: 24rpx;
  }

  .text {
    color: #3A73D9;
    font-size: 24rpx;
  }
}

.authorize-get {
  padding: 80rpx 40rpx 0 50rpx;
}

.authorize-get-til {
  font-size: 32rpx;
  color: #0d0d0d;
}


.authorize-get-li {
  font-size: 24rpx;

  color: #999999;
  margin-top: 16rpx;
}

.authorize-sub {
  // padding: 504rpx 0.5rem 0 0.5rem;
  position: fixed;
  bottom: 180rpx;
  left: 60rpx;

  .btn-login  {
    margin-bottom: 32rpx;
    background: #3A73D9;
    color: #ffffff;
  }

  .btn-nologin {
    margin-bottom: 32rpx;
    // background: #333333;
    color: #3A73D9!important;
    border: 1rpx solid #3A73D9;
    color: #ffffff;
  }

  .btn-nologin, .btn-login {
    border-radius: 40rpx !important;
    height: 80rpx !important;
    font-size: 32rpx;
  }
}

.authorize-sub .bt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 622rpx;
  height: 80rpx;
  border-radius: 8rpx;
}

.pop-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
}

.pop-main {
  position: fixed;
  top: 50%;
  left: 50%;
  background: #ffffff;
  border-radius: 20rpx;
}

.pop-authorize {
  text-align: center;
  padding-top: 120rpx;
  width: 580rpx;
  margin-left: -290rpx;
  margin-top: -200rpx;
}

.pop-authorize-til {
  font-size: 34rpx;
  font-weight: bolder;
}

.pop-authorize-bt {
  width: 460rpx;
  line-height: 106rpx;
  border-radius: 8rpx;
  background: #5fba5d;
  font-size: 32rpx;
  color: #ffffff;
  margin: 49rpx auto;
  display: flex;
  align-items: center;
}

.pop-authorize-bt-ic {
  width: 60rpx;
  height: 60rpx;
  margin-right: 22rpx;
  margin-left: 30rpx;
}

.pop-authorize-close {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  left: 240rpx;
  bottom: -220rpx;
}

.select {
  margin-right: 10rpx;
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
</style>
