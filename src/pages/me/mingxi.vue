<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">佣金明细</view>
    </cy-navbar>
    <view class="mingxi">
      <view class="ticheng">
        <block v-for="(item,index) of list" :key="index">
          <li class="tc" @click="jump(item.id)">
            <view class="flex align-item-center">
              <u-icon name="rmb-circle" color="#3a73d9" size="60"></u-icon>
              <view class="ml-3">
                <span class="t-size-30 t-color-000">{{item.name}}</span><br/>
                <span class="t-size-26 t-color-8A8A8A">{{ item.create_time }}</span>
              </view>
            </view>
            <view class="tc_2">
              +{{ item.money }}<br/>
            </view>
          </li>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import {detailList} from "../../api/me";

export default {
  data() {
    return {
      list: [],
      num: 0,
    };
  },
  onLoad() {
    this._load()
  },
  methods: {
    _load() {
      this.list = [{
        "id": 3,
        "money": "1.00",
        "status": 1,
        "name": "建设银行",
        "create_time": "2019-10-23 14:49:58",
      }, {
        "id": 3,
        "money": "1.00",
        "status": 1,
        "name": "建设银行",
        "create_time": "2019-10-23 14:49:58",
      }, {
        "id": 3,
        "money": "1.00",
        "status": 1,
        "name": "建设银行",
        "create_time": "2019-10-23 14:49:58",
      }]
    },
    detailList() {
      detailList().then(res => {
        console.log("res", res)
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
    color: #E1461D;
  }

  .tc_2 span {
    color: #9A9A9A;
  }
}
</style>
