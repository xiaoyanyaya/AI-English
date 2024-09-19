<template>
  <view class="main">
    <!-- 授权链接回跳地址：https://wapi-dev.aien.xiaolixb.com/h5/index.html#/pages/getCode/index -->
    <!-- 使用urlEncode处理：https%3A%2F%2Fwapi-dev.aien.xiaolixb.com%2Fh5%2Findex.html%23%2Fpages%2FgetCode%2Findex -->
    <web-view
      :src="`https://wapi-dev.aien.xiaolixb.com/h5/index.html#/pages/getCode/index?token=${token}`"
    ></web-view>
    <!-- <web-view
      :src="`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fwapi-dev.aien.xiaolixb.com%2Fh5%2Findex.html%23%2Fpages%2FgetCode%2Findex&response_type=code&scope=snsapi_base&state=123#wechat_redirect`"
    ></web-view> -->
  </view>
</template>

<script>
import store from "@/store/";
import { postWxApiConfig } from "@/api/word";

export default {
  data() {
    return {
      token: null,
      appId: null,
    };
  },
  async onLoad() {
    this.token = store.state.token;
    const configRes = await postWxApiConfig({
      url: location.href.split("#")[0],
    });
    this.appId = configRes.data.result.appId;
    console.log("appid", this.appId);
  },
};
</script>

<style>
</style>