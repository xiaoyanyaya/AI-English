<template>
  <view class="main">
    <web-view :src="webViewSrc"></web-view>
  </view>
</template>

<script>
import { h5Domain } from "@/configs/env";

export default {
  data() {
    return {
      token: null,
      appId: null,
      webViewSrc: "",
    };
  },
  async onLoad() {
    console.log("000000000000000000", h5Domain);
    const url = `${h5Domain}/index.html#/pages/getCode/index`;

    const encUrl = encodeURIComponent(url);
    this.webViewSrc = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc99b9d003bba0524&redirect_uri=${encUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
  },
};
</script>

<style>
</style>