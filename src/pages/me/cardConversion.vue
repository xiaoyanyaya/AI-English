<template>
  <view class="pt-3">
    <cy-navbar show-back>
      <view class="t-size-30">卡密激活</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box mt-4">
        <input
          class="t-size-28 px-4 pb-4 pt-4"
          :focus="isFocused"
          :maxlength="24"
          style="width: 80%"
          :placeholder="'请输入卡密'"
          v-model="value"
        />
      </view>

      <view
        class="save-btn flex align-item-center justify-content-center t-color-fff mt-4"
        @click="exchange"
      >
        立即激活
      </view>
      <view
        class="flex align-item-center justify-content-center t-size-28 t-color-8A8A8A mt-1"
      >
        请输入VIP会员激活码
      </view>
    </view>
  </view>
</template>

<script>
import { cardExchange } from "@/api/me";
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      value: "",
      isFocused: true, // 默认自动聚焦
    };
  },
  mounted() {
    // 在组件挂载后自动聚焦
    this.$nextTick(() => {
      this.isFocused = true;
    });
  },
  methods: {
    exchange() {
      cardExchange({ code: this.value }).then((res) => {
        console.log(res);
        if (res.data.code !== 200) {
          this.utils().$toast(res.data.message);
          return;
        }
        this.utils().$toast("兑换成功");
        // 返回会员中心
        setTimeout(() => {
          uni.switchTab({
            url: "/pages/me/index",
          });
        }, 300);
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f5fbfd;
}
.person-info-box {
  border-radius: 30rpx;
  background: #ffffff;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;
  font-size: 30rpx;
}

.save-btn {
  height: 74rpx;
  border-radius: 50rpx;
  opacity: 1;
  background: #43d0b2;
  box-shadow: 0px 0px 10rpx 0px #d8d8d8;
}
</style>
