<template>
  <view class="body" :style="bodyStyle">
    <cy-navbar
      @customBack="returnCustom"
      customBack
      showBack
      bgColor="transparent"
      textColor="#3D3D3D"
    >
      <view class="t-size-30">申请成为合作商</view>
    </cy-navbar>

    <view
      class="flex align-item-center justify-content-center flex-direction-column"
    >
      <image
        :src="`${imageBaseUrl}/8-13-06.png`"
        mode="widthFix"
        class="main-image mb-5"
      ></image>

      <view class="t-color-3D3D3D t-size-36">{{ message }}</view>
      <view class="t-color-8A8A8A t-size-26 mt-2">{{ messageDate }} 提交</view>

      <!--      <view class="flex align-item-center justify-content-center">
        <view class="btn-box-01 flex align-item-center justify-content-center t-size-32 t-color-fff">
          进入分销中心
        </view>
      </view>-->
      <view class="flex align-item-center justify-content-center">
        <view
          class="btn-box-02 flex align-item-center justify-content-center t-size-32 t-color-fff"
          @click="clickBtn"
        >
          进入分销中心
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "../../../utils/MyMixin";

export default {
  mixins: [MyMixin],
  computed: {
    bodyStyle() {
      return `background-image: url(${this.imageBaseUrl}/8-13-03.png);
              background-size: 100% 100%;`;
    },
  },
  data() {
    return {
      message: "",
      messageDate: "",
    };
  },
  onLoad({ message, messageDate }) {
    this.message = message;
    this.messageDate = messageDate;
  },
  methods: {
    returnCustom() {
      uni.switchTab({
        url: "/pages/me/index",
      });
    },
    clickBtn() {
      uni.switchTab({
        url: "/pages/me/index",
      });
    },
  },
};
</script>

<style lang="scss">
.body {
  min-height: 100vh;
}

.main-image {
  width: 22%;
  margin-top: 200rpx;
}

.btn-box-01,
.btn-box-02 {
  width: 450rpx;
  height: 80rpx;
  border-radius: 50rpx;
}
.btn-box-01 {
  background: #1863e5;
  color: #fff;
}
.btn-box-02 {
  background: #ffffff;
  border: 1px solid #1863e5;
  color: #1863e5;
  margin-top: 130rpx;
}
</style>
