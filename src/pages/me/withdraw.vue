<template>
  <view class="main-body">
    <cy-navbar show-back>
      <view class="t-size-30">佣金提现</view>
    </cy-navbar>

    <view class="px-4 mt-5">
      <view class="price-content px-5 pt-4 pb-4">
        <view class="t-size-32 t-color-3D3D3D font-weight-bold">提现金额</view>
        <view class="mt-3 font-weight-bold t-color-E4483C flex align-item-end">
          <span class="mr-1 price-l">￥</span>
          <input :placeholder="`最高提现金额${maxPrice}元`" :max="maxPrice"
            class="t-size-40 t-color-E4483C ml-4" v-model="price" type="digit"/>
        </view>
      </view>

      <view class="pay-way-content mt-4">
        <view class="border-bottom t-size-30 t-color-3D3D3D font-weight-bold pt-4 pb-4">
          <view class="ml-5">
            提现方式
          </view>
        </view>

        <view v-for="(item, index) in paywey" :key="index" @click="clickPayWay(index)"
              :class="index < paywey.length - 1 ? 'border-bottom' : ''"
              class="flex justify-content-between pt-4 pb-4">
          <view class="flex align-item-center">
            <view class="">
              <image :src="`${imageBaseUrl}${item.image}`" mode="widthFix"></image>
            </view>
            <view class="t-color-8A8A8A t-size-30 ml-3">{{ item.title }}</view>
            <view class="ml-3 isRecommend t-size-18 t-color-fff" v-if="item.isRecommend">推荐</view>
          </view>
          <view class="pr-3 mt-2">
            <u-radio-group v-model="selectWay">
              <u-radio :name="item.title"></u-radio>
            </u-radio-group>
          </view>
        </view>
      </view>

      <view class="mt-4 inpu-content">
        <view v-for="(item, index) in inputList" :key="index"
              :class="index < inputList.length - 1 ? 'border-bottom' : ''"
              class="flex justify-content-between align-item-center pt-4 pb-4 pl-2 pr-5">
          <view class="t-color-3D3D3D font-weight-bold t-size-30 ml-3">{{ item.title }}</view>
          <input v-if="item.type === 'text'" :placeholder="item.placeholder" style="text-align: right"
                 class="t-color-3D3D3D t-size-30" type="text" v-model="item.value"/>
          <view v-if="item.type === 'image'"  @click="uploadQrCode"
                class=" flex align-item-center justify-content-center">
            <image class="upload-content" v-if="!item.value" :src="`${imageBaseUrl}/7-31-01.png`"></image>
            <image class="upload-content" v-else :src="item.value"></image>
          </view>
        </view>
      </view>
    </view>

    <view class="flex align-item-center justify-content-center mt-8">
      <view @click="network().withdrawApply()" class="submit flex align-item-center justify-content-center t-color-fff font-weight-bold t-size-32">
        提交申请
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "../../utils/MyMixin";
import store from '@/store/';
import {withdrawApply} from "@/api/me";

export default {
  mixins: [MyMixin],
  data() {
    return {
      selectWay: '支付宝',
      selectWayValue: 'alipay',
      maxPrice: 100,
      // 可提现金额
      price: 3.98,
      paywey: [
        {
          title: '支付宝',
          value: 'alipay',
          image: '/7-31-02.png',
          isRecommend: true,
          isSelect: true
        },
        {
          title: '微信',
          value: 'weixin',
          image: '/7-31-03.png',
          isRecommend: false,
          isSelect: false
        }
      ],

      inputList: [
        {
          title: '户名',
          placeholder: '请输入户名',
          type: 'text',
          value: ''
        },
        {
          title: '账号',
          placeholder: '请输入支付宝账号',
          type: 'text',
          value: ''
        }
      ],
    };
  },
  onLoad({ canWithdrawAmount }) {
    this.maxPrice = canWithdrawAmount;
    this.price = canWithdrawAmount;
  },
  methods: {
    clickPayWay(index) {
      this.selectWay = this.paywey[index].title;
      this.selectWayValue = this.paywey[index].value;
      this.paywey.forEach((item, i) => {
        item.isSelect = i === index;
      });

      // 格式化
      this.inputList[1].value = '';
      switch (index) {
        case 0:
          this.inputList[1].title = '账号';
          this.inputList[1].type = 'text';
          break;
        case 1:
          this.inputList[1].title = '上传收款码';
          this.inputList[1].type = 'image';
          break;
        default:
          break;
      }
    },
    uploadQrCode() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          var tempFilePaths = res.tempFilePaths[0];
          if (tempFilePaths) {
            this.inputList[1].value = tempFilePaths;
          }
        }
      });
    },
    network() {
      return {
        withdrawApply: async () => {
          if (this.price <= 0) {
            uni.showToast({
              title: '提现金额不能小于0',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          if (this.price > this.maxPrice) {
            uni.showToast({
              title: `提现金额不能大于可提现金额(${this.maxPrice}元)`,
              icon: 'none',
              duration: 2000
            });
            return;
          }

          var prams = {
            amount: this.price,
            withdrawType: this.selectWayValue,
            name: this.inputList[0].value,
          }
          var result = "";
          if (this.selectWayValue === 'alipay') {
            prams.account = this.inputList[1].value;

            uni.request({
              url: 'https://wapi-dev.aien.xiaolixb.com/v1/distribution/commission/withdraw/apply',
              method: 'POST',
              header: {
                'X-Access-Token': store.state.token,
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: prams,
              success: (res) => {
                result = res.data;
                uni.showToast({
                  title: result.message,
                  icon: 'none',
                  duration: 2000
                });
              },
              fail: (error) => {
                console.log("error", error)
              }
            })

          } else {
            prams.qrCodePic = this.inputList[1].value;
            console.log("prams", prams)

            uni.uploadFile({
              url: `https://wapi-dev.aien.xiaolixb.com/v1/distribution/commission/withdraw/apply`,
              filePath: this.inputList[1].value,
              name: 'qrCodePic',
              formData: prams,
              header: {
                'X-Access-Token': store.state.token,
                'content-type': 'multipart/form-data'
              },
              success: (res) => {
                result = JSON.parse(res.data);
                uni.showToast({
                  title: result.message,
                  icon: 'none',
                  duration: 2000
                });
              },
              fail: (error) => {
                console.log("error", error)
              }
            })
          }


        }
      }
    }
  },
}
</script>

<style lang="scss">
.price-content {
  border-radius: 10rpx;
  background: #FFFFFF;

  .price-l {
    position: absolute;
    margin-bottom: 7rpx;
  }
}

.pay-way-content {
  border-radius: 10rpx;
  background: #FFFFFF;

  .border-bottom {
    border-bottom: 1px solid #D8D8D8;
  }

  .isRecommend {
    padding: 4rpx 10rpx;
    margin-top: 4rpx;
    border-radius: 2rpx;
    background: #FF8817;
  }
}

image {
  width: 80rpx;
  height: 80rpx;
  margin-left: 50rpx;
}

.inpu-content {
  border-radius: 10rpx;
  background: #FFFFFF;

  .border-bottom {
    border-bottom: 1px solid #D8D8D8;
  }

  .upload-content {
    width: 110rpx;
    height: 100rpx;
    padding: 20rpx;
    background: #FAFAFA;
    box-sizing: border-box;
    position: relative;
    border: 1rpx dashed #C2C2C2;


  }
}

.submit {
  width: 450rpx;
  height: 80rpx;
  border-radius: 50rpx;
  background: #3A73D9;
}
</style>
