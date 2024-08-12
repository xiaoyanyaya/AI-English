<template>
  <view class="main-body pb-5 pt-4">
    <cy-navbar show-back>
      <view class="t-size-30">推广订单</view>
    </cy-navbar>

    <view class="px-3">
      <view class="px-3 pt-3 pb-4 bg-white radio-10">
        <view class="flex justify-content-between">
          <view class="flex align-item-end">
            <view class="t-size-30 mr-1">物业先生</view>
            <view class="t-size-26 t-color-8A8A8A">(MID:1124)</view>
          </view>
          <view class="t-color-3A73D9 t-size-26">
            已付款
          </view>
        </view>

        <view class="mt-4 order-content px-3 pt-1 pb-3 t-size-30 t-color-6a6a6a">
          <view v-for="(item, index) in orderContent" :key="index">
            <view class="flex align-item-center justify-content-between mt-2">
              <view>{{ item.title }}</view>
              <view v-if="index === 3" class="flex align-item-center recomment">
                <image :src="item.avatar" class="avatar mr-1"/>
                <view class="t-size-28">{{ getNameWithEllipsis(item.nickName, 10) }}</view>
              </view>
              <view v-else :class="index === 4 ? 't-color-DC0C0C' : ''">
                {{ item.content }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>

import MyMixin from "../../utils/MyMixin";
import {orderList} from "../../api/me";
export default {
  mixins: [MyMixin],
  data() {
    return {
      orderContent: [{
        title: "订单编号：",
        content: "202012121212121212"
      }, {
        title: "付款时间：",
        content: "2020-12-12 12:12:12"
      }, {
        title: "订单金额：",
        content: "￥100.00"
      }, {
        title: "推荐人：",
        avatar: "https://wapi-dev.aien.xiaolixb.com/v1/sys/common/static/avatar/U8pNyZmEpbZm49be7eb68e426f2254dabc7cff85422e_1714556046292.jpeg",
        nickName: "物业先生"
      }, {
        title: "佣金：",
        content: "￥10.00"
      }]
    };
  },
  onLoad() {
    this.orderList();
  },
  methods: {
    orderList() {
      orderList().then(res => {
        console.log("res", res)
      });
    }
  },
}
</script>

<style lang="scss">
.order-content {
  background: #e7e7e7;
}

.recomment {
  .avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
  }
}
</style>
