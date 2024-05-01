<template>
  <view class="pb-5">
    <cy-navbar show-back>
      <view class="t-size-30">{{title}}</view>
    </cy-navbar>

    <view class="px-4">
      <view class="person-info-box px-4 pt-3 pb-3 mt-5 flex align-item-center justify-content-between">
        <input class="" :maxlength="10" style="width: 80%;" :focus="true" :placeholder="placeholder" v-model="value"/>
        <text class=" t-color-BFBFBF">{{value.length}}/10</text>
      </view>

      <view class="save-btn flex align-item-center justify-content-center" @click="save">
        保存
      </view>
    </view>

  </view>
</template>

<script>
import {saveNickname} from "@/api/me";
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      title: '修改昵称',
      value: '',
      placeholder: '请输入'
    };
  },
  onLoad({value}) {
    this.value = value;
  },
  methods: {
    save() {
      if (!this.value) {
        this.utils().$toast('请输入昵称', 'error');
        return;
      }
      saveNickname({nickName: this.value}).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.utils().$toast('保存成功', 'success');
          this.getUserInfo();
          setTimeout(() => {
            uni.navigateBack(1)
          }, 500)
        }
      })
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
  height: 75rpx;
  border-radius: 50rpx;
  opacity: 1;
  margin-top: 30rpx;
  color: #FFFFFF;
  background: #43D0B2;
  box-shadow: 0px 0px 10rpx 0px #D8D8D8;
}
</style>
