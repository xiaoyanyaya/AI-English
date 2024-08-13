<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">佣金明细</view>
    </cy-navbar>
    <view class="mingxi" v-show="list.length > 0">
      <view class="ticheng">
        <block v-for="(item,index) of list" :key="index">
          <li class="tc" @click="jump(item.id)">
            <view class="flex align-item-center">
              <u-icon name="rmb-circle" color="#3a73d9" size="60"></u-icon>
              <view class="ml-3">
                <span class="t-size-30 t-color-000">{{item.title}}</span><br/>
                <span class="t-size-26 t-color-8A8A8A">{{ item.createTime }}</span>
              </view>
            </view>
            <view class="font-weight-bold" :class="item.type === 'withdraw' ? 'tc_3' : 'tc_2'">
              {{ item.amount }}<br/>
            </view>
          </li>
        </block>wei
      </view>
    </view>
    <view v-show="list.length < 1" class="mt-5 flex align-item-center justify-content-center">
      <image :src="`${imageBaseUrl}/nodata.png`" style="width: 400rpx; height: 400rpx"></image>
    </view>
  </view>
</template>

<script>
import {detailList} from "../../api/me";
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
    this.detailList()
  },
  onLoad() {
    this.detailList()
  },
  methods: {
    detailList() {
      if (!this.isModeData) return
      detailList(this.queryParams).then(res => {
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

  .ticheng li:nth-of-type(odd) {
    background-color: #EEEEEE;
  }

  .ticheng li:nth-of-type(even) {
    background-color: #fff;
  }

  .tc {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    line-height: 46rpx;
    align-items: center;
  }

  .tc_2 {
    color: #4cab5b;
  }
  .tc_3 {
    color: #E1461D;
  }

  .tc_2 span {
    color: #9A9A9A;
  }
}
</style>
