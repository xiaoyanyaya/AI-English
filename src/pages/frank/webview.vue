<template>
  <view class="main">
    <web-view
      :src="
        'https://wapi-dev.aien.xiaolixb.com/h5/index.html?source=' +
        source +
        '&token=' +
        token +
        '&id=' +
        id +
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
      playauth: null,
      source: null,
      token: null,
      id: null,
      vName: "",
      pTime: "",
      cover: "",
      playTimes: "",
      currTime: "",
    };
  },
  onLoad(e) {
    console.log("webviw eeeeeeeeeeeee", e);
    this.videoId = e.videoId;
    this.id = e.id;
    this.vName = e.vName;
    this.pTime = e.pTime;
    this.cover = e.cover;
    this.playTimes = e.playTimes;
    this.currTime = e.currTime;
    this.token = store.state.token;
    this.getLive();
  },
  methods: {
    async getLive() {
      const res = await getPlayAuth(this.videoId);
      this.playauth = res.data.result;
      // console.log("播放凭证res0000001", res.data.result);
      const res2 = await getPlayUrl(this.videoId);
      this.source = res2.data.result;
      console.log("播放地址res0000001", res2.data.result);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>