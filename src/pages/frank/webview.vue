<template>
  <view class="main">
    <web-view
      v-if="isLoad"
      :src="
        'https://wapi-dev.aien.xiaolixb.com/h5/index.html?source=' +
        source +
        '&token=' +
        token +
        '&id=' +
        videoId +
        '&vName=' +
        vName +
        '&pTime=' +
        pTime +
        '&cover=' +
        cover +
        '&playTimes=' +
        playTimes +
        '&currTime=' +
        currTime
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
      vodVideoId: null,
      playauth: null,
      source: null,
      token: null,
      vName: "",
      pTime: "",
      cover: "",
      playTimes: "",
      currTime: "",
      isLoad: false,
    };
  },
  async onLoad(e) {
    console.log("webviw eeeeeeeeeeeee", e);
    this.videoId = e.videoId;
    this.vodVideoId = e.vodVideoId;
    this.vName = e.vName;
    this.pTime = e.pTime;
    this.cover = e.cover;
    this.playTimes = e.playTimes;
    this.currTime = e.currTime;
    this.token = store.state.token;
    await this.getLive();
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