<template>
  <view class="main">
    <web-view v-if="isLoad" :src="src"></web-view>
  </view>
</template>

<script>
import { getPlayAuth, getPlayUrl } from "@/api/frank";
import store from "@/store/";
import { h5Domain } from "@/configs/env";

export default {
  data() {
    return {
      isLoad: false,
      src: "",
    };
  },
  async onLoad(e) {
    console.log("webviw eeeeeeeeeeeee", e);
    this.src = `${h5Domain}/index.html?videoId=${e.videoId}&token=${store.state.token}&pid=${e.pid}`;
    // await this.getLive();
    this.isLoad = true;
  },
  methods: {
    async getLive() {
      // const res = await getPlayAuth(this.videoId);
      // this.playauth = res.data.result;
      // console.log("播放凭证res0000001", res.data.result);
      const res2 = await getPlayUrl(this.vodVideoId, this.videoId);
      this.source = res2.data.result;
      console.log("播放地址res0000001", res2.data.result);
      this.isLoad = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>