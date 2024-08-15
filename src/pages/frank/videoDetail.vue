<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">视频详情?</view>
    </cy-navbar>
    <view @click="loghehe" class="">
      {{ test.hehe }}
    </view>
    <div id="J_prismPlayer"></div>
  </view>
</template>

<script>
import { getPlayAuth } from "@/api/frank";
import { loadWebPlayerSDK, loadComponent, hehe } from "./videoDetail.vue";

export default {
  data() {
    return {
      backColor: "transparent",
      videoId: null,
      playauth: null,
    };
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  onLoad(e) {
    console.log("eeeeeeee", e);
    this.videoId = e.videoId;
  },
  async mounted() {
    console.log("mounted!!!!!!!!!!!!!!!");

    await this.getLive(); // 获取播放凭证
    // 在适合的生命周期，通过script和link标签引入播放器sdk、css
    loadWebPlayerSDK()
      .then(() => {
        // 如果需要使用自定义组件，打开以下注释
        // this.loadComponent().then(() => {
        let player = new Aliplayer(
          {
            id: "J_prismPlayer",
            width: "100%",
            vid: this.videoId, // 必选参数。音视频ID。示例：1e067a2831b641db90d570b6480f****。
            playauth: this.playauth, // 必选参数。音视频播放凭证。
          },
          function (player) {}
        );
        player.one("canplay", function () {
          console.log("canplay", player.tag);
          player.tag.play();
        });
        // }).catch((e) => { console.log("加载组件失败", e) })
      })
      .catch((e) => {
        console.log("加载播放器SDK失败", e);
      });
  },
  methods: {
    async getLive() {
      const res = await getPlayAuth(this.videoId);
      this.playauth = res.data.result;
      console.log("播放凭证res000000", res);
    },
    loghehe() {
      console.log("hehheh", hehe);
    },
  },
};
</script>

<script  module="test" lang="wxs">
    function loadWebPlayerSDK() {
    return new Promise(function(resolve, reject) {
      const s_tag = document.createElement("script"); // 引入播放器js
      s_tag.type = "text/javascript";
      s_tag.src =
        "https://g.alicdn.com/apsara-media-box/imp-web-player/2.20.3/aliplayer-min.js";
      s_tag.charset = "utf-8";
      s_tag.onload = function() {
        resolve();
      };
      document.body.appendChild(s_tag);
      const l_tag = document.createElement("link"); // 引入播放器css
      l_tag.rel = "stylesheet";
      l_tag.href =
        "https://g.alicdn.com/apsara-media-box/imp-web-player/2.20.3/skins/default/aliplayer-min.css";
      document.body.appendChild(l_tag);
    });
  }
   function loadComponent() {
    return new Promise(function(resolve, reject) {
      const s_tag = document.createElement("script");
      s_tag.type = "text/javascript";
      // 需要先下载组件 js 文件，放到项目 /static/ 目录下
      // 下载地址：https://github.com/aliyunvideo/AliyunPlayer_Web/blob/master/customComponents/dist/aliplayer-components/aliplayercomponents-1.0.9.min.js
      s_tag.src = "./static/aliplayercomponents-1.0.9.min.js";
      s_tag.charset = "utf-8";
      s_tag.onload = function() {
        resolve();
      };
      document.body.appendChild(s_tag);
    });
  }
  module.exports = {
    loadWebPlayerSDK: loadWebPlayerSDK,
    loadComponent: loadComponent,
    hehe: 'Hello wxs',
  }
</script>  

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;
}
</style>