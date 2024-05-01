<template>
  <view class="pt-3">
    <cy-navbar show-back>
      <view class="t-size-30">卡密兑换</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box px-4 pb-4 pt-4 mt-4">
        <input class="t-size-28"
               :maxlength="10" style="width: 80%;" :placeholder="'请输入卡密'" v-model="value"/>
      </view>

      <view class="save-btn flex align-item-center justify-content-center t-color-fff mt-3" @click="exchange">
        立即兑换
      </view>
    </view>

  </view>
</template>

<script>
import {cardExchange} from "@/api/me";
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      value:''
    };
  },
  methods: {
    exchange() {
      cardExchange({code: this.value}).then(res => {
        console.log(res)
        if (res.data.code !== 200) {
          this.utils().$toast(res.data.message);
          return;
        }
        this.utils().$toast('兑换成功');
      });
    }
  },
}
</script>

<style lang="scss">
page {
  background: #F5FBFD;
}
.person-info-box {
  border-radius: 30rpx;
  background: #FFFFFF;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
  font-size: 30rpx;
}

.save-btn {
  height: 74rpx;
  border-radius: 50rpx;
  opacity: 1;
  background: #43D0B2;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
}
</style>
