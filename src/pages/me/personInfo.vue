<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">个人信息</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box px-4 pb-4 mt-5"
            v-for="(parent, parentIndex) in personInfo" :key="parentIndex">
        <view class="flex align-item-center justify-content-between pt-4 position-relative"
              v-for="(item, index) in parent" :key="index"
              @click="toPage(parentIndex, index)">
          <view v-if="parentIndex == 0 && index == 0" class="chooseAvatar">
            <button open-type="chooseAvatar" @chooseavatar="chooseavatar">
            </button>
          </view>
          <view v-if="parentIndex == 0 && index == 2" class="chooseAvatar">
            <button open-type="getPhoneNumber"
                    @getphonenumber="getphonenumber($event)">
            </button>
          </view>
          <view>{{ item.title }}</view>
          <view class="flex align-item-center">
            <viwe v-if="parentIndex == 0 && index == 0"
                  class="mr-2 user-img-box flex align-item-center justify-content-center">
              <image :src="item.value" mode="widthFix" class="user-img"></image>
            </viwe>
            <view v-else class="t-size-26 t-color-8A8A8A">{{ item.value }}</view>
            <view class="ml-2">
              <u-icon v-if="item.isShowArrow" name="arrow-right" color="#8A8A8A" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";
import store from '@/store/';
import {apiDomain} from "@/configs/env";

export default {
  mixins: [MyMixin],
  data() {
    return {
      personInfo: [
        [
          {title: '头像', value: '点击上传', isShowArrow: true},
          {title: '昵称', value: '', isShowArrow: true},
          {title: '手机号', value: '点击绑定', isShowArrow: true},
          {title: '会员ID', value: ''}
        ],
        [
          {title: '年级', value: '请选择', isShowArrow: true},
          {title: '英语等级', value: '请选择', isShowArrow: true},
          {title: '兴趣爱好', value: '请选择', isShowArrow: true}
        ]
      ],

      showEnglishLevel: false
    }
  },
  onShow() {
    var userInfo = store.state.userInfo
    this.personInfo[0][0].value = userInfo.avatar
    this.personInfo[0][1].value = userInfo.nickName || ""
    this.personInfo[0][2].value = userInfo.phone || ""
    this.personInfo[0][3].value = userInfo.memberNo || ""

    this.setGrade()
    this.setEnglishLevel()
    this.setInterest()
  },
  methods: {
    getphonenumber(res) {
      this.getPhone(res, '').then(data => {
        this.getUserInfo().then(data => {
          this.personInfo[0][2].value = data.phone || ""
        })
      })
    },
    chooseavatar(res) {
      // 微信小程序选择图片
      console.log('选择图片', res.detail.avatarUrl)
      if (res.detail.avatarUrl) {
        this.unploadFile(res.detail.avatarUrl, `${apiDomain}/member/saveAvatar`).then(data => {
          console.log("上传头像成功", data)
          this.personInfo[0][0].value = data.avatar
          this.personInfo[0][1].value = data.nickName || ""
          this.personInfo[0][2].value = data.phone || ""
          this.personInfo[0][3].value = data.memberNo || ""
        })
      }
    },
    // 设置年年级
    setGrade() {
      var basicData = uni.getStorageSync('basicData')
      var currGrade = basicData.currGrade || "";
      var data = basicData.dictCodeList.grade
      data.forEach((item, index) => {
        if (item.value === currGrade) {
          this.personInfo[1][0].value = item.title
        }
      });
    },
    // 设置英语等级
    setEnglishLevel() {
      var basicData = uni.getStorageSync('basicData')
      var currLevel = basicData.currEnglishLevel || "";
      var data = basicData.dictCodeList.english_level
      data.forEach((item, index) => {
        if (item.value === currLevel) {
          this.personInfo[1][1].value = item.title
        }
      });
    },
    // 设置兴趣爱好
    setInterest(interest) {
      var basicData = uni.getStorageSync('basicData')
      var currTags = basicData.currTags || "";
      var data = basicData.dictCodeList.personal_tag
      data.forEach((item, index) => {
        if (item.value === currTags) {
          this.personInfo[1][2].value = item.title
        }
      });
    },
    toPage(parentIndex, index) {
      if (parentIndex == 0) {
        if (index == 1) this.$navigateTo('/pages/me/updateInfo?value=' + this.personInfo[0][1].value)
      } else {
        if (index == 0) this.$navigateTo('/pages/me/selectGrade')
        if (index == 1) this.$navigateTo('/pages/me/selectLevel')
        if (index == 2) this.$navigateTo('/pages/me/selectInterest')
      }
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

.chooseAvatar {
  position: absolute;
  width: 100%;
  height: 70rpx;
  z-index: 1000;
  top: 20rpx;
  opacity: 0;

  button {
    width: 100%;
    height: 70rpx;
    background: rgba(0, 0, 0, 0);
  }
}

.user-img-box {
  background: #D8D8D8;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  overflow: hidden;
}
.user-img {
  width: 60rpx;
  height: 60rpx;
}
</style>
