<template>
  <view class="main">
    <web-view :src="webViewSrc"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      appId: null,
      webViewSrc: "",
    };
  },
  async onLoad() {
    const url = encodeURIComponent(
      "https://wapi-dev.aien.xiaolixb.com/h5/index.html#/pages/getCode/index"
    );
    this.webViewSrc = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc99b9d003bba0524&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
  },
};
</script>

<style>
</style>