<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">{{pageTitle}}</view>
    </cy-navbar>
    <view class="agent">
      <view class="head">
        共 <span>10000</span> 人
      </view>
      <view class="t_tou mt-2 mb-1">
        <view class="tou_1">微信头像</view>
        <view class="tou_1">微信昵称</view>
        <view class="tou_1">等级</view>
      </view>
      <view class="t">
        <block v-for="(item,index) of list" :key="index">
          <li class="flex align-item-center pt-2 pb-2">
            <view class="t_01_1">
              <image :src="item.avatar"></image>
            </view>
            <view class="t_01_1">{{item.nickName}}</view>
            <view class="t_01_1">{{item.distributionType}}级代理</view>
          </li>
        </block>
      </view>
    </view>
  </view>
</template>
<script>
import {directPromoters, directReferrals} from "../../api/me";

export default {
  data() {
    return {
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
      isModeData: true,
      list: [],
      pageTitle: '下级推广员',
      paegType: '',
    };
  },
  onLoad({ paegType }) {
    console.log('paegType', paegType)
    this.paegType = paegType || '1'
    this.pageTitle = paegType === '0' ? '下级推广员' : '我的直推'
    this.getData();
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.getData()
  },
  methods: {
    getData() {
      this.list = []
      this.queryParams.pageNo = 1
      this.isModeData = true
      if (this.paegType === '0') {
        console.log('下级推广员')
        this.directPromoters()
      } else {
        console.log('我的直推')
        this.directReferrals()
      }
    },
    // 我的推广员
    directPromoters() {
      if (!this.isModeData) return
      directPromoters().then(res => {
        this.list = this.list.concat(res.data.result.records)
        if (res.data.result.records.length < this.queryParams.pageSize) {
          this.isModeData = false
        }
      });
    },
    // 我的直推
    directReferrals() {
      if (!this.isModeData) return
      directReferrals().then(res => {
        this.list = this.list.concat(res.data.result.records)
        if (res.data.result.records.length < this.queryParams.pageSize) {
          this.isModeData = false
        }
      });
    }
  },
}
</script>

<style lang="scss">
.agent {
  .head {
    background-color: #3a73d9;
    color: #fff;
    text-align: center;

    padding: 100rpx 0;
  }

  .head span {
    font-size: 30px;
    padding: 0 5px;
  }

  .t_tou {
    display: flex;
    height: 30px;
    line-height: 30px;
  }

  .tou_1 {
    width: 34%;
    text-align: center;
  }

  .t_01_1 {
    width: 34%;
    text-align: center;
  }

  .t_01_1 image {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  .t li:nth-of-type(odd) {
    background-color: #EEEEEE;
  }

  .t li:nth-of-type(even) {
    background-color: #fff;
  }

}
</style>
