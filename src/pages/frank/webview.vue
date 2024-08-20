<template>
  <view class="main">
    <web-view
      :src="
        'https://aien.xiaolixb.com/h5/index.html?videoId=' +
        videoId +
        '&playauth=' +
        playauth +
        '&source=' +
        source +
        '&token=' +
        token +
        '&id=' +
        id
      "
    ></web-view>
  </view>
</template>

<script>
import { getPlayAuth, getPlayUrl } from "@/api/frank";
import store from "@/store/";

export default {
  data() {
    return {
      videoId: null,
      playauth: null,
      source: null,
      token: null,
      id: null,
    };
  },
  onLoad(e) {
    console.log("webviw eeeeeeeeeeeee", e);
    this.videoId = e.videoId;
    this.id = e.id;
    this.token = store.state.token;
    this.getLive();
  },
  methods: {
    async getLive() {
      const res = await getPlayAuth(this.videoId);
      this.playauth = res.data.result;
      console.log("播放凭证res0000001", res.data.result);
      const res2 = await getPlayUrl(this.videoId);
      this.source = res2.data.result;
      console.log("播放地址res0000001", res2.data.result);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>