<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">直销用戶</view>
    </cy-navbar>
    <view class="mingxi" v-show="list.length > 0">
      <view >
        <block v-for="(item,index) of list" :key="index">
          <li class="tc" @click="jump(item.id)">
            <view class="flex align-item-center">
              <image :src="item.avatar" class="avatar"></image>
              <view class="ml-3">
                <view class="flex align-item-end mb-1">
                  <span class="t-size-30 t-color-000 mr-1">{{item.nickName}}</span>
                  <span class="t-size-24 t-color-8A8A8A">(MID:{{item.memberNo}})</span>
                </view>
                <span class="t-size-26 t-color-8A8A8A">注册时间：{{ item.createTime }}</span>
              </view>
            </view>
            <view class="">
              <view class="t-size-30">
                共消费 <span class="t-color-E1461D orderNums">{{item.orderNums}}</span> 单
              </view>
            </view>
          </li>
        </block>
      </view>
    </view>
    <view v-show="list.length < 1" class="mt-5 flex align-item-center justify-content-center">
      <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
    </view>
  </view>
</template>

<script>
import {detailList, directReferrals} from "../../api/me";
import MyMixin from "../../utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      list: [],
      num: 0,
      isModeData: true,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  // 触底加载
  onReachBottom() {
    this.queryParams.pageNo += 1
    this.directReferrals()
  },
  onLoad() {
    this.directReferrals()
  },
  methods: {
    directReferrals() {
      if (!this.isModeData) return
      directReferrals(this.queryParams).then(res => {
        this.list = this.list.concat(res.data.result.records)
        if (res.data.result.records.length < this.queryParams.pageSize) {
          this.isModeData = false
        }
      })
    },
  }
}
</script>

<style lang="scss">
.mingxi {
  .head {
    display: flex;
    margin: 10px 0;
  }

  .head_l {
    display: flex;
    width: 85%;
    justify-content: space-around;
  }

  .head_r {
    width: 15%;
    text-align: center;
  }

  .head_l_1 {
    border: 1px solid #F2F2F2;
    padding: 0px 15px;
    line-height: 25px;
  }

  .head_btn {
    margin: 10px 20px 0;
    border: 1px solid #F2F2F2;
    padding: 0px 15px;
    line-height: 25px;
  }

  .ling {
    color: #E1461D;
    border: 1px solid #E1461D;
    padding: 0px 15px;
    line-height: 25px;
  }

  .shouyi {
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
    background-color: #FAFAFA;
    display: flex;
    height: 30px;
    line-height: 30px;
    padding: 3px 10px;
    margin-top: 15px;
  }

  .sy_l {
    width: 50%;
  }

  .sy_l span {
    font-weight: bold;
  }

  .tc {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    line-height: 46rpx;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
  }

}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 30px;
}
.orderNums {
  margin: 0 6rpx;
}
</style>
