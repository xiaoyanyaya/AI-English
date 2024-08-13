<template>
  <view class="body pb-5" :style="bodyStyle">
    <cy-navbar showBack bgColor="transparent" textColor="#3D3D3D">
      <view class="t-size-30">推广订单</view>
    </cy-navbar>

    <view class="px-3">
      <view class="px-3 pt-3 mt-4 pb-4 bg-white radio-10"
            v-for="(data, dataIndex) in orderContent" :key="dataIndex">
        <view class="flex justify-content-between align-item-center">
          <view class="flex align-item-center">
            <image :src="data.userInfo.avatar" class="avatar mr-2"/>
            <view class="flex align-item-end">
              <view class="t-size-30">{{ data.userInfo.nickName }}</view>
              <view class="t-size-22 t-color-8A8A8A"> (MID:{{ data.userInfo.memberNo }})</view>
            </view>
          </view>
          <view class="t-color-1863E5 mr-3">
            已付款
          </view>
        </view>

        <view class="mt-4 order-content px-3 pt-1 t-size-30 t-color-6a6a6a">
          <view v-for="(item, index) in data.data" :key="index"
                :class="index === data.data.length - 1 ? '' : 'item'">
            <view class="flex align-item-center justify-content-between mt-2">
              <view>{{ item.title }}</view>
              <view v-if="index === 3" class="flex align-item-center recomment">
<!--                <image :src="item.avatar" class="avatar mr-1"/>-->
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
    <!--    <view v-show="list.length < 1" class="mt-5 flex align-item-center justify-content-center">
          <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
        </view>-->
  </view>
</template>
<script>

import MyMixin from "../../utils/MyMixin";
import {orderList} from "../../api/me";

export default {
  mixins: [MyMixin],
  computed: {
    bodyStyle() {
      return `background-image: url(${this.imageBaseUrl}/8-13-03.png);
              background-size: 100% 100%;`
    }
  },
  data() {
    return {
      isModeData: true,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
      orderContent: []
    };
  },
  onLoad() {
    this.orderList();
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.orderList()
  },
  methods: {
    orderList() {
      if (!this.isModeData) return
      orderList(this.queryParams).then(res => {
        console.log("res", res)
        res.data.result.records.forEach(d => {
          this.orderContent.push({
            userInfo: {
              avatar: d.avatar,
              nickName: d.nickName,
              memberNo: d.memberNo
            },
            data: [
              {
                title: "订单编号：",
                content: d.orderNo
              }, {
                title: "付款时间：",
                content: d.payTime
              }, {
                title: "订单金额：",
                content: `￥${d.payAmount}`
              }, {
                title: "推荐人：",
                avatar: d.promoAvatar,
                nickName: d.promoNickName
              }, {
                title: "佣金：",
                content: `￥${d.promoCommissionAmount}`
              }
            ]
          })
        })
        if (res.data.result.records.length < this.queryParams.pageSize) {
          this.isModeData = false
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

.order-content {

  .item {
    padding-bottom: 14rpx;
    border-bottom: 1rpx solid rgba(216, 216, 216, 0.3);
  }
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}
</style>
